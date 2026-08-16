// ── IELTS Journey — Firebase Integration ──
// Config embedded directly (Firebase configs are designed to be public)

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBpLMaUTOAFeeDnlu6D55vqlKvEsJRJXcw",
  authDomain: "ielts-journey-47522.firebaseapp.com",
  projectId: "ielts-journey-47522",
  storageBucket: "ielts-journey-47522.firebasestorage.app",
  messagingSenderId: "1000379583590",
  appId: "1:1000379583590:web:457c3d2cfcad95e6aa31a7",
  measurementId: "G-QR4X4RG8EE"
};

let _db = null;
let _auth = null;
let _currentUser = null;
let _syncTimeout = null;

// ── INITIALIZE ──
function tryAutoInitFirebase() {
  if (!window.firebase) { console.warn('Firebase SDK not loaded'); return; }

  try {
    // Prevent double init
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    _db   = firebase.firestore();
    _auth = firebase.auth();

    // Set auth persistence to LOCAL (survives refresh)
    _auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      // Auth state listener
      _auth.onAuthStateChanged(user => {
        _currentUser = user;
        updateAuthUI(user);
        if (user) {
          loadFromFirestore(user.uid);
        }
      });
    });

    // Handle redirect result (if user came back from Google redirect)
    _auth.getRedirectResult().catch(err => {
      if (err.code && err.code !== 'auth/no-current-user') {
        console.warn('Redirect result:', err.code);
      }
    });

    // Hide setup notice, show login if not logged in
    const notice = document.getElementById('firebaseSetupNotice');
    if (notice) notice.style.display = 'none';

  } catch (err) {
    console.error('Firebase init error:', err);
  }
}

// ── GOOGLE SIGN-IN ──
function signInWithGoogle() {
  if (!_auth) { showToast('Firebase ยังไม่พร้อม', 'error'); return; }
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  // Popup on HTTPS (Vercel), fallback redirect if blocked
  _auth.signInWithPopup(provider).catch(err => {
    if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
      _auth.signInWithRedirect(provider);
    } else {
      console.error('SignIn error:', err.code, err.message);
      showToast('Login ไม่สำเร็จ: ' + (err.code || err.message), 'error');
    }
  });
}

function signOutFirebase() {
  if (!_auth) return;
  _auth.signOut().then(() => showToast('ออกจากระบบแล้ว', 'info'));
}

// ── FIRESTORE: LOAD ──
async function loadFromFirestore(uid) {
  if (!_db) return;
  try {
    updateSyncStatus('loading');
    const doc = await _db.collection('users').doc(uid)
                         .collection('progress').doc('state').get();
    if (doc.exists) {
      const cloudData = doc.data();
      // Smart merge: cloud wins UNLESS cloud value is null and local has a value
      const merged = { ...state };
      Object.keys(cloudData).forEach(key => {
        if (cloudData[key] != null) {
          merged[key] = cloudData[key];
        }
        // If cloud has null but local has value → keep local (e.g. examDate just set)
      });
      // Special merge for errorEntries array
      const localErrors = state.errorEntries || [];
      const cloudErrors = cloudData.errorEntries || [];
      const mergedErrors = [...cloudErrors];
      localErrors.forEach(le => {
        if (!mergedErrors.find(ce => ce.id === le.id)) mergedErrors.push(le);
      });
      if (mergedErrors.length) merged.errorEntries = mergedErrors.sort((a,b) => b.id - a.id);

      state = merged;
      saveState();
      navigate(state.activeSection || 'dashboard');
      showToast('☁️ โหลดข้อมูลจาก Cloud แล้ว', 'success');
    } else {
      // First login — push everything local up
      await pushToFirestore(uid);
      showToast('☁️ บันทึกข้อมูลขึ้น Cloud แล้ว', 'success');
    }
    updateSyncStatus('synced');
  } catch (err) {
    console.error('Firestore load error:', err);
    updateSyncStatus('error');
  }
}

// ── FIRESTORE: PUSH ──
async function pushToFirestore(uid) {
  if (!_db || !uid) return;
  await _db.collection('users').doc(uid)
           .collection('progress').doc('state').set({
    ...state,
    _lastSync: new Date().toISOString()
  });
}

// ── AUTO SYNC (debounced 3s) ──
function onStateSaved() {
  if (!_currentUser || !_db) return;
  clearTimeout(_syncTimeout);
  updateSyncStatus('pending');
  _syncTimeout = setTimeout(async () => {
    try {
      updateSyncStatus('syncing');
      await pushToFirestore(_currentUser.uid);
      updateSyncStatus('synced');
    } catch { updateSyncStatus('error'); }
  }, 3000);
}

// ── FORCE SYNC (immediate, for critical fields like examDate) ──
async function forceSyncToCloud() {
  if (!_currentUser || !_db) return;
  clearTimeout(_syncTimeout);
  try {
    updateSyncStatus('syncing');
    await pushToFirestore(_currentUser.uid);
    updateSyncStatus('synced');
  } catch { updateSyncStatus('error'); }
}

// ── SYNC STATUS UI ──
function updateSyncStatus(status) {
  const el = document.getElementById('syncStatus');
  if (!el) return;
  const map = {
    loading: ['⬇️', 'โหลด...', 'var(--indigo-light)'],
    pending: ['⏳', 'รอ Sync', 'var(--amber-light)'],
    syncing: ['🔄', 'Syncing...', 'var(--indigo-light)'],
    synced:  ['✅', 'Synced', 'var(--emerald-light)'],
    error:   ['❌', 'Sync failed', 'var(--rose-light)']
  };
  const [icon, text, color] = map[status] || ['☁️', '', 'var(--text-muted)'];
  el.innerHTML = `<span style="color:${color};font-size:11px">${icon} ${text}</span>`;
}

// ── AUTH UI ──
function updateAuthUI(user) {
  const loginBtn  = document.getElementById('loginBtn');
  const userInfo  = document.getElementById('userInfo');
  const notice    = document.getElementById('firebaseSetupNotice');
  if (notice) notice.style.display = 'none';

  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (userInfo) {
      userInfo.style.display = 'flex';
      userInfo.innerHTML = `
        <img src="${user.photoURL || ''}" onerror="this.style.display='none'"
             style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0;background:var(--indigo-dim)" alt=""/>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.displayName || 'User'}</div>
          <div style="font-size:10px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.email || ''}</div>
        </div>
        <button onclick="signOutFirebase()" title="ออกจากระบบ"
                style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:16px;padding:2px 4px">↩</button>
      `;
      showToast(`👋 สวัสดี ${user.displayName?.split(' ')[0] || 'คุณ'}!`, 'success');
    }
  } else {
    if (loginBtn) loginBtn.style.display = 'flex';
    if (userInfo) userInfo.style.display = 'none';
  }
}

// ── STUBS (keep HTML references happy) ──
function openFirebaseSetup()  { /* no longer needed */ }
function closeFirebaseSetup() { /* no longer needed */ }
function saveFirebaseSetup()  { /* no longer needed */ }
function resetFirebaseConfig(){ signOutFirebase(); }
