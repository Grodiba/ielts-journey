// ── IELTS Journey — Firebase Integration ──
// Auth (Google Sign-In) + Firestore Sync

let _firebaseApp = null;
let _db = null;
let _auth = null;
let _currentUser = null;
let _syncTimeout = null;
let _isSyncing = false;

// ── CONFIG STORAGE ──
const FIREBASE_CONFIG_KEY = 'ielts_firebase_config';

function getSavedFirebaseConfig() {
  try {
    const raw = localStorage.getItem(FIREBASE_CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveFirebaseConfig(config) {
  localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
}

function clearFirebaseConfig() {
  localStorage.removeItem(FIREBASE_CONFIG_KEY);
}

// ── INITIALIZE FIREBASE ──
function initFirebase(config) {
  try {
    if (!window.firebase) {
      console.warn('Firebase SDK not loaded');
      return false;
    }
    // Prevent re-init
    if (_firebaseApp) return true;

    _firebaseApp = firebase.initializeApp(config);
    _db = firebase.firestore();
    _auth = firebase.auth();

    // Enable offline persistence (multi-tab)
    _db.enableMultiTabIndexedDbPersistence().catch(err => {
      // Fallback to single-tab persistence
      _db.enableIndexedDbPersistence().catch(() => {});
    });

    // Auth state listener
    _auth.onAuthStateChanged(user => {
      _currentUser = user;
      updateAuthUI(user);
      if (user) {
        loadFromFirestore(user.uid);
        showToast(`👋 สวัสดี ${user.displayName?.split(' ')[0] || 'คุณ'}!`, 'success');
      }
    });

    // Handle redirect result (after Google Sign-In redirect)
    _auth.getRedirectResult().then(result => {
      if (result && result.user) {
        // Already handled by onAuthStateChanged
      }
    }).catch(err => {
      if (err.code !== 'auth/no-current-user') {
        console.warn('Redirect result error:', err.code);
      }
    });

    return true;
  } catch (err) {
    console.error('Firebase init error:', err);
    return false;
  }
}

// ── AUTH ──
function signInWithGoogle() {
  if (!_auth) {
    showToast('Firebase ยังไม่ได้ตั้งค่า — กด 🔥 ตั้งค่า Firebase ก่อน', 'error');
    openFirebaseSetup();
    return;
  }
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  // Popup works on HTTPS (Vercel), fallback to redirect if blocked
  _auth.signInWithPopup(provider).catch(err => {
    if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
      showToast('Popup ถูกบล็อก — กำลัง redirect...', 'info');
      _auth.signInWithRedirect(provider);
    } else {
      console.error('SignIn error:', err.code, err.message);
      showToast('Login ไม่สำเร็จ: ' + (err.code || err.message), 'error');
    }
  });
}

function signOutFirebase() {
  if (!_auth) return;
  _auth.signOut().then(() => {
    showToast('ออกจากระบบแล้ว', 'info');
  });
}

// ── FIRESTORE: LOAD ──
async function loadFromFirestore(uid) {
  if (!_db) return;
  try {
    updateSyncStatus('loading');
    const doc = await _db.collection('users').doc(uid).collection('progress').doc('state').get();
    if (doc.exists) {
      const cloudData = doc.data();
      // Merge: cloud wins for most fields, but keep local errorEntries merged
      const localErrors = state.errorEntries || [];
      const cloudErrors = cloudData.errorEntries || [];

      // Merge error entries by ID (avoid duplicates)
      const mergedErrors = [...cloudErrors];
      localErrors.forEach(le => {
        if (!mergedErrors.find(ce => ce.id === le.id)) mergedErrors.push(le);
      });
      mergedErrors.sort((a, b) => b.id - a.id);

      state = {
        ...state,
        ...cloudData,
        errorEntries: mergedErrors
      };
      saveState(); // save merged to localStorage
      navigate(state.activeSection || 'dashboard');
      showToast('☁️ โหลดข้อมูลจาก Cloud แล้ว', 'success');
    } else {
      // First time — push local data up
      await pushToFirestore(uid);
      showToast('☁️ บันทึกข้อมูลขึ้น Cloud แล้ว', 'success');
    }
    updateSyncStatus('synced');
  } catch (err) {
    console.error('Firestore load error:', err);
    updateSyncStatus('error');
    showToast('⚠️ โหลด Cloud ไม่สำเร็จ — ใช้ข้อมูล local', 'info');
  }
}

// ── FIRESTORE: PUSH ──
async function pushToFirestore(uid) {
  if (!_db) return;
  try {
    await _db.collection('users').doc(uid).collection('progress').doc('state').set({
      ...state,
      _lastSync: new Date().toISOString(),
      _device: navigator.userAgent.slice(0, 50)
    });
  } catch (err) {
    console.error('Firestore push error:', err);
    throw err;
  }
}

// ── SYNC (DEBOUNCED) ──
function syncToCloud() {
  if (!_currentUser || !_db) return;
  clearTimeout(_syncTimeout);
  updateSyncStatus('pending');
  _syncTimeout = setTimeout(async () => {
    if (!_currentUser) return;
    try {
      _isSyncing = true;
      updateSyncStatus('syncing');
      await pushToFirestore(_currentUser.uid);
      updateSyncStatus('synced');
      _isSyncing = false;
    } catch (err) {
      updateSyncStatus('error');
      _isSyncing = false;
    }
  }, 3000); // 3s debounce
}

// ── SYNC STATUS UI ──
function updateSyncStatus(status) {
  const el = document.getElementById('syncStatus');
  if (!el) return;
  const configs = {
    idle:    { icon: '☁️', text: 'Cloud Sync', color: 'var(--text-muted)' },
    loading: { icon: '⬇️', text: 'โหลดข้อมูล...', color: 'var(--indigo-light)' },
    pending: { icon: '⏳', text: 'รอ Sync...', color: 'var(--amber-light)' },
    syncing: { icon: '🔄', text: 'Syncing...', color: 'var(--indigo-light)' },
    synced:  { icon: '✅', text: 'Synced', color: 'var(--emerald-light)' },
    error:   { icon: '❌', text: 'Sync failed', color: 'var(--rose-light)' }
  };
  const cfg = configs[status] || configs.idle;
  el.innerHTML = `<span style="color:${cfg.color};font-size:12px">${cfg.icon} ${cfg.text}</span>`;
}

// ── AUTH UI ──
function updateAuthUI(user) {
  const loginBtn = document.getElementById('loginBtn');
  const userInfo = document.getElementById('userInfo');
  const setupNotice = document.getElementById('firebaseSetupNotice');

  if (setupNotice) setupNotice.style.display = 'none';

  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (userInfo) {
      userInfo.style.display = 'flex';
      userInfo.innerHTML = `
        <img src="${user.photoURL || ''}" 
             onerror="this.src=''" 
             style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0;background:var(--indigo-dim)"
             alt=""/>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.displayName || 'User'}</div>
          <div style="font-size:10px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.email || ''}</div>
        </div>
        <button onclick="signOutFirebase()" title="ออกจากระบบ"
                style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:14px;padding:2px">↩</button>
      `;
    }
  } else {
    if (loginBtn) loginBtn.style.display = 'flex';
    if (userInfo) userInfo.style.display = 'none';
  }
}

// ── SETUP MODAL ──
function openFirebaseSetup() {
  const modal = document.getElementById('firebaseSetupModal');
  if (modal) { modal.hidden = false; modal.style.display = 'flex'; }
}

function closeFirebaseSetup() {
  const modal = document.getElementById('firebaseSetupModal');
  if (modal) { modal.hidden = true; modal.style.display = 'none'; }
}

function saveFirebaseSetup() {
  const raw = document.getElementById('firebaseConfigInput').value.trim();
  if (!raw) { showToast('กรอก config ก่อน', 'error'); return; }
  try {
    // Support both raw JSON and the full JS config object string
    let config;
    // Try to extract JSON from firebaseConfig = { ... } pattern
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      // Convert JS object to JSON (handle unquoted keys)
      const jsonStr = match[0]
        .replace(/\/\/.*/g, '') // remove comments
        .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\s*:)/g, '$1"$2"$3') // quote keys
        .replace(/,(\s*[}\]])/g, '$1'); // remove trailing commas
      config = JSON.parse(jsonStr);
    } else {
      config = JSON.parse(raw);
    }

    // Validate required fields
    const required = ['apiKey', 'authDomain', 'projectId'];
    const missing = required.filter(k => !config[k]);
    if (missing.length) {
      showToast(`Config ขาด: ${missing.join(', ')}`, 'error');
      return;
    }

    saveFirebaseConfig(config);
    closeFirebaseSetup();
    showToast('✅ บันทึก config แล้ว! กำลัง connect...', 'success');

    // Dynamically load Firebase SDK then init
    loadFirebaseSDK(() => {
      const ok = initFirebase(config);
      if (ok) {
        showToast('🔥 Firebase พร้อมแล้ว! คลิก Sign in with Google', 'success');
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) loginBtn.style.display = 'flex';
        const setupNotice = document.getElementById('firebaseSetupNotice');
        if (setupNotice) setupNotice.style.display = 'none';
      }
    });
  } catch (err) {
    console.error(err);
    showToast('Config format ผิด — ลองวาง JSON ใหม่', 'error');
  }
}

function resetFirebaseConfig() {
  if (!confirm('ลบ Firebase config และออกจากระบบ?')) return;
  clearFirebaseConfig();
  if (_auth) _auth.signOut();
  _firebaseApp = null; _db = null; _auth = null; _currentUser = null;
  location.reload();
}

// ── DYNAMIC SCRIPT LOADER ──
function loadFirebaseSDK(callback) {
  if (window.firebase) { callback(); return; }

  const ver = '9.23.0';
  const scripts = [
    `https://www.gstatic.com/firebasejs/${ver}/firebase-app-compat.js`,
    `https://www.gstatic.com/firebasejs/${ver}/firebase-auth-compat.js`,
    `https://www.gstatic.com/firebasejs/${ver}/firebase-firestore-compat.js`
  ];

  let loaded = 0;
  scripts.forEach(src => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => { loaded++; if (loaded === scripts.length) callback(); };
    s.onerror = () => showToast('โหลด Firebase SDK ไม่สำเร็จ — ตรวจ internet', 'error');
    document.head.appendChild(s);
  });
}

// ── AUTO INIT ON LOAD ──
function tryAutoInitFirebase() {
  const config = getSavedFirebaseConfig();
  if (!config) {
    // Show setup notice in sidebar
    const notice = document.getElementById('firebaseSetupNotice');
    if (notice) notice.style.display = 'block';
    return;
  }
  loadFirebaseSDK(() => {
    initFirebase(config);
  });
}

// ── HOOK INTO SAVESTATE ──
// Called by app.js after every state change
function onStateSaved() {
  syncToCloud();
}
