/* ═══════════════════════════════════════════════════
   English Journey — Application Logic
   State, Navigation, All Feature Modules
═══════════════════════════════════════════════════ */
'use strict';

// ── STATE ──
const STATE_KEY = 'english_journey_v1';
const defaultState = {
  xp: 0, level: 1, streak: 0, lastStudyDate: null,
  startDate: new Date().toDateString(),
  currentCEFRLevel: 'A2',
  completedLevels: [],
  sentencesBuilt: 0,
  grammarDone: [],
  grammarPractice: {},
  vocabLearned: [],
  vocabSentences: {},
  currentVocabLevel: 'A2',
  currentVocabDay: 1,
  currentVocabIdx: 0,
  errorEntries: [],
  speakingDone: [],
  checkpointTasks: {},
  currentGrammarLevel: 'A2',
  currentGrammarTopic: null,
  currentBuilderLevel: 'A2',
  currentBuilderExIdx: 0,
  builderStepsState: {},
  currentSpeakingLevel: 'A2',
  activeSection: 'dashboard'
};

let state = loadState();

function loadState() {
  try {
    const s = localStorage.getItem(STATE_KEY);
    return s ? { ...defaultState, ...JSON.parse(s) } : { ...defaultState };
  } catch { return { ...defaultState }; }
}
function saveState() {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch {}
  if (typeof onStateSaved === 'function') onStateSaved();
}

// ── XP SYSTEM ──
const XP_PER_LEVEL = 500;
function addXP(n) {
  state.xp += n;
  const newLevel = Math.floor(state.xp / XP_PER_LEVEL) + 1;
  if (newLevel > state.level) {
    state.level = newLevel;
    showToast(`🎉 Level Up! Level ${state.level}`, 'success');
  }
  updateXPBar();
  saveState();
}
function updateXPBar() {
  const xpInLevel = state.xp % XP_PER_LEVEL;
  const pct = Math.round((xpInLevel / XP_PER_LEVEL) * 100);
  const fill = document.getElementById('xpFill');
  const lbl = document.getElementById('xpLabel');
  const lvl = document.getElementById('levelLabel');
  if (fill) fill.style.width = pct + '%';
  if (lbl) lbl.textContent = `${xpInLevel} / ${XP_PER_LEVEL}`;
  if (lvl) lvl.textContent = state.level;
}

// ── STREAK ──
function checkStreak() {
  const today = new Date().toDateString();
  if (state.lastStudyDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (state.lastStudyDate === yesterday) {
    state.streak++;
    if (state.streak % 7 === 0) showToast(`🔥 ${state.streak} วัน Streak! ยอดเยี่ยม!`, 'success');
  } else {
    state.streak = 1;
  }
  state.lastStudyDate = today;
  saveState();
}

// ── TOAST ──
function showToast(msg, type = 'info') {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  t.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => {
    t.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => t.remove(), 300);
  }, 3000);
}

// ── NAVIGATION ──
function navigate(section) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-item').forEach(n => n.classList.remove('active'));

  const secEl = document.getElementById(`section-${section}`);
  const navEl = document.getElementById(`nav-${section}`);
  const mnavEl = document.getElementById(`mnav-${section}`);

  if (secEl) secEl.classList.add('active');
  if (navEl) navEl.classList.add('active');
  if (mnavEl) mnavEl.classList.add('active');

  state.activeSection = section;
  saveState();
  const inits = {
    dashboard: initDashboard, levelpath: initLevelPath, builder: initBuilder,
    vocabulary: initVocabulary, grammar: initGrammar, speaking: initSpeaking,
    levelup: initLevelUp, notebook: initNotebook
  };
  inits[section] && inits[section]();
  window.scrollTo(0, 0);
  closeSidebar();
}

// ── MOBILE SIDEBAR ──
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

// ── DASHBOARD ──
function initDashboard() {
  checkStreak();
  updateXPBar();

  const today = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateEl = document.getElementById('todayDate');
  if (dateEl) dateEl.textContent = today.toLocaleDateString('th-TH', opts);

  [document.getElementById('streakDisplay'), document.getElementById('streakStat')]
    .forEach(el => { if (el) el.textContent = state.streak; });

  const sentEl = document.getElementById('sentencesStat');
  if (sentEl) sentEl.textContent = state.sentencesBuilt;
  const vocabEl = document.getElementById('vocabStat');
  if (vocabEl) vocabEl.textContent = state.vocabLearned.length;

  const lvl = getLevelById(state.currentCEFRLevel);
  const badgeEl = document.getElementById('currentLevelBadge');
  if (badgeEl) badgeEl.textContent = `${lvl.icon} ${lvl.title}`;
  const goalEl = document.getElementById('currentLevelGoal');
  if (goalEl) goalEl.textContent = lvl.goal;
  const focusEl = document.getElementById('dashboardFocusChips');
  if (focusEl) focusEl.innerHTML = lvl.focus.map(f => `<span class="chip">${f}</span>`).join('');
  const dailyEl = document.getElementById('dashboardDailyText');
  if (dailyEl) dailyEl.textContent = lvl.daily;
}

// ── LEVEL PATH ──
function initLevelPath() {
  const c = document.getElementById('levelPathCards');
  if (!c) return;
  c.innerHTML = LEVELS.map((lvl, i) => {
    const isCurrent = lvl.id === state.currentCEFRLevel;
    const isDone = state.completedLevels.includes(lvl.id);
    return `
      <div class="phase-card ${isCurrent ? 'current' : ''}"
           onclick="showLevelDetail('${lvl.id}')"
           style="border-color:${isDone || isCurrent ? lvl.color + '40' : 'var(--border)'};background:${isCurrent ? lvl.color + '12' : 'var(--bg-glass)'}">
        <div class="phase-icon">${lvl.icon}</div>
        <div class="phase-month" style="color:${lvl.color}">${lvl.id}</div>
        <div class="phase-title">${lvl.title.split('—')[1] ? lvl.title.split('—')[1].trim() : lvl.title}</div>
        <div class="phase-subtitle">${lvl.subtitle}</div>
        ${isDone ? '<div class="badge badge-emerald" style="margin-top:8px">✅ ผ่านแล้ว</div>' : ''}
        ${isCurrent ? `<div class="badge" style="margin-top:8px;background:${lvl.color}20;color:${lvl.color}">▶ กำลังเรียน</div>` : ''}
      </div>
    `;
  }).join('');
}

function showLevelDetail(id) {
  const lvl = getLevelById(id);
  const el = document.getElementById('levelDetail');
  if (!el) return;
  el.style.display = 'block';
  const isCurrent = state.currentCEFRLevel === id;
  el.innerHTML = `
    <div style="border-left:4px solid ${lvl.color};padding-left:var(--sp-lg)">
      <div class="fs-xs fw-700" style="color:${lvl.color};letter-spacing:1px;margin-bottom:4px">${lvl.id}</div>
      <h2 class="font-display fw-800 mb-sm">${lvl.icon} ${lvl.title}</h2>
      <div class="fs-sm text-muted mb-lg">${lvl.goal}</div>
      <div class="fw-700 mb-md">✅ เมื่อเรียนจบระดับนี้ คุณจะสามารถ:</div>
      ${lvl.canDo.map(f => `<div class="fs-sm text-secondary" style="padding:4px 0;border-bottom:1px solid var(--border)">• ${f}</div>`).join('')}
      <div class="fw-700 mt-lg mb-md">🎯 Focus:</div>
      ${lvl.focus.map(f => `<div class="fs-sm text-secondary" style="padding:4px 0;border-bottom:1px solid var(--border)">• ${f}</div>`).join('')}
      <div class="fw-700 mt-lg mb-md">⏰ Daily:</div>
      <div class="fs-sm text-secondary mb-lg">${lvl.daily}</div>
      ${isCurrent
        ? '<div class="badge badge-indigo">▶ นี่คือระดับที่คุณกำลังเรียนอยู่</div>'
        : `<button class="btn btn-primary" onclick="setCurrentLevel('${lvl.id}')">🎯 ตั้งเป็นระดับที่กำลังเรียน</button>`}
    </div>
  `;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setCurrentLevel(id) {
  state.currentCEFRLevel = id;
  saveState();
  showToast(`🎯 ตั้งระดับที่กำลังเรียนเป็น ${id} แล้ว`, 'success');
  initLevelPath();
  showLevelDetail(id);
}

// ── SENTENCE BUILDER ──
let activeBuilderExIdx = 0;
let activeBuilderLevel = 'A2';
let stepStates = [];

function initBuilder() {
  activeBuilderLevel = state.currentBuilderLevel || state.currentCEFRLevel || 'A2';
  renderBuilderLevelChips();
  renderExerciseList();
  const filtered = EXPANSION_SETS.filter(e => e.level === activeBuilderLevel);
  if (filtered.length > 0) {
    activeBuilderExIdx = EXPANSION_SETS.indexOf(filtered[0]);
    loadExercise(activeBuilderExIdx);
  }
}

function renderBuilderLevelChips() {
  const c = document.getElementById('builderLevelChips');
  if (!c) return;
  c.innerHTML = LEVELS.map(lvl => `
    <button class="chip ${lvl.id === activeBuilderLevel ? 'active' : ''}" onclick="setBuilderLevel('${lvl.id}')">
      ${lvl.icon} ${lvl.id}
    </button>
  `).join('');
}

function setBuilderLevel(id) {
  activeBuilderLevel = id;
  state.currentBuilderLevel = id;
  saveState();
  renderBuilderLevelChips();
  const filtered = EXPANSION_SETS.filter(e => e.level === id);
  if (filtered.length > 0) {
    activeBuilderExIdx = EXPANSION_SETS.indexOf(filtered[0]);
    loadExercise(activeBuilderExIdx);
  }
  renderExerciseList();
}

function renderExerciseList() {
  const c = document.getElementById('exerciseList');
  if (!c) return;
  const filtered = EXPANSION_SETS.filter(e => e.level === activeBuilderLevel);
  c.innerHTML = filtered.map(ex => {
    const idx = EXPANSION_SETS.indexOf(ex);
    const isActive = idx === activeBuilderExIdx;
    const isDone = state.builderStepsState[ex.id]?.filter(s => s === 'completed').length === ex.steps.length;
    return `<button class="chip ${isActive ? 'active' : ''}" onclick="loadExercise(${idx})" style="${isDone ? 'border-color:rgba(16,185,129,0.4);color:var(--emerald-light)' : ''}">
      ${isDone ? '✅ ' : ''}${ex.starterWord}
    </button>`;
  }).join('');
}

function loadExercise(idx) {
  activeBuilderExIdx = idx;
  const ex = EXPANSION_SETS[idx];
  if (!ex) return;

  const exerciseEl = document.getElementById('builderExercise');
  if (exerciseEl) exerciseEl.style.display = 'block';

  document.getElementById('starterWord').textContent = ex.starterWord;
  document.getElementById('grammarFocusBadge').textContent = ex.grammarFocus;
  document.getElementById('stepsTotal').textContent = ex.steps.length;

  if (!state.builderStepsState[ex.id]) {
    state.builderStepsState[ex.id] = Array(ex.steps.length).fill('locked');
    state.builderStepsState[ex.id][0] = 'active';
  }
  stepStates = [...state.builderStepsState[ex.id]];
  renderSteps(ex);
  updateBuilderProgress(ex);
}

function renderSteps(ex) {
  const c = document.getElementById('expansionSteps');
  if (!c) return;
  c.innerHTML = ex.steps.map((step, i) => {
    const ss = stepStates[i] || 'locked';
    const completed = ss === 'completed';
    const active = ss === 'active';
    const locked = ss === 'locked';
    return `
      <div class="step-item ${ss}" id="step-${i}">
        <div class="flex gap-md items-center mb-md">
          <div class="step-number ${completed ? 'done' : ''}">${completed ? '✓' : i + 1}</div>
          <div class="flex-col" style="flex:1">
            <div class="fw-700 fs-sm" style="color:${completed ? 'var(--emerald-light)' : active ? 'var(--indigo-light)' : 'var(--text-muted)'}">
              Step ${i + 1}: ${step.prompt}
            </div>
            ${active ? `<div class="fs-xs text-muted">💡 Hint: ${step.hint}</div>` : ''}
          </div>
          ${completed ? '<span class="badge badge-emerald">Done</span>' : ''}
          ${locked ? '<span class="badge" style="background:var(--bg-glass);color:var(--text-muted)">🔒 Locked</span>' : ''}
        </div>
        ${!locked ? `
          <textarea class="input-field mb-md"
                    id="stepInput-${i}"
                    placeholder="พิมพ์ประโยคของคุณ..."
                    rows="2"
                    ${completed ? 'readonly' : ''}
                    style="${completed ? 'color:var(--emerald-light);' : ''}"></textarea>
          <div class="flex gap-sm flex-wrap">
            ${!completed ? `<button class="btn btn-primary btn-sm" onclick="completeStep(${i})">✅ ยืนยัน</button>` : ''}
            <button class="btn btn-ghost btn-sm" onclick="toggleModel(${i})">💡 ดูตัวอย่าง</button>
          </div>
          <div class="model-answer" id="model-${i}">✅ ${step.model}</div>
        ` : ''}
      </div>
    `;
  }).join('');

  ex.steps.forEach((_, i) => {
    const key = `${ex.id}_step_${i}`;
    const saved = localStorage.getItem(key);
    const inp = document.getElementById(`stepInput-${i}`);
    if (saved && inp) inp.value = saved;
  });
}

function toggleModel(stepIdx) {
  const modelEl = document.getElementById(`model-${stepIdx}`);
  if (modelEl) modelEl.classList.toggle('visible');
}

function completeStep(stepIdx) {
  const ex = EXPANSION_SETS[activeBuilderExIdx];
  const inp = document.getElementById(`stepInput-${stepIdx}`);
  const val = inp ? inp.value.trim() : '';
  if (!val) { showToast('พิมพ์ประโยคก่อนยืนยัน', 'error'); return; }

  localStorage.setItem(`${ex.id}_step_${stepIdx}`, val);

  stepStates[stepIdx] = 'completed';
  if (stepIdx + 1 < ex.steps.length) stepStates[stepIdx + 1] = 'active';
  state.builderStepsState[ex.id] = [...stepStates];

  const allDone = stepStates.every(s => s === 'completed');
  if (allDone) {
    state.sentencesBuilt += ex.steps.length;
    addXP(50);
    showToast(`🎉 Exercise "${ex.starterWord}" เสร็จแล้ว! +50 XP`, 'success');
  } else {
    addXP(10);
  }
  saveState();
  renderSteps(ex);
  updateBuilderProgress(ex);
  renderExerciseList();
}

function updateBuilderProgress(ex) {
  const done = stepStates.filter(s => s === 'completed').length;
  document.getElementById('stepsCompleted').textContent = done;
  const pct = Math.round((done / ex.steps.length) * 100);
  document.getElementById('builderProgress').style.width = pct + '%';
}

function revealCurrentModel() {
  const activeIdx = stepStates.indexOf('active');
  if (activeIdx >= 0) toggleModel(activeIdx);
}

function nextExercise() {
  const filtered = EXPANSION_SETS.filter(e => e.level === activeBuilderLevel);
  const currentFiltered = filtered.findIndex(e => EXPANSION_SETS.indexOf(e) === activeBuilderExIdx);
  const nextFiltered = (currentFiltered + 1) % filtered.length;
  loadExercise(EXPANSION_SETS.indexOf(filtered[nextFiltered]));
  renderExerciseList();
}

function resetExercise() {
  const ex = EXPANSION_SETS[activeBuilderExIdx];
  state.builderStepsState[ex.id] = Array(ex.steps.length).fill('locked');
  state.builderStepsState[ex.id][0] = 'active';
  ex.steps.forEach((_, i) => localStorage.removeItem(`${ex.id}_step_${i}`));
  stepStates = [...state.builderStepsState[ex.id]];
  saveState();
  renderSteps(ex);
  updateBuilderProgress(ex);
}

// ── SPEAKING ──
let speakingTimer = null;
let timerSeconds = 0;
let timerMax = 900;
let timerRunning = false;
let noStopInterval = null;
let activeSpeakingLevel = 'A2';

function initSpeaking() {
  activeSpeakingLevel = state.currentSpeakingLevel || state.currentCEFRLevel || 'A2';
  renderSpeakingLevelChips();
  renderSpeakingGrid();
}

function renderSpeakingLevelChips() {
  const c = document.getElementById('speakingLevelChips');
  if (!c) return;
  c.innerHTML = LEVELS.map(lvl => `
    <button class="chip ${lvl.id === activeSpeakingLevel ? 'active' : ''}" onclick="setSpeakingLevel('${lvl.id}')">
      ${lvl.icon} ${lvl.id}
    </button>
  `).join('');
}

function setSpeakingLevel(id) {
  activeSpeakingLevel = id;
  state.currentSpeakingLevel = id;
  saveState();
  renderSpeakingLevelChips();
  renderSpeakingGrid();
}

function renderSpeakingGrid() {
  const grid = document.getElementById('topicGrid');
  if (!grid) return;
  const filtered = SPEAKING_TOPICS.filter(t => t.level === activeSpeakingLevel);
  grid.innerHTML = filtered.map(t => `
    <div class="card card-sm" style="cursor:pointer;transition:all 0.2s;${state.speakingDone.includes(t.id) ? 'border-color:rgba(16,185,129,0.4)' : ''}"
         onclick="startSpeakingSession('${t.id}')">
      <div style="font-size:28px;margin-bottom:8px">${t.icon}</div>
      <div class="fw-700 fs-sm mb-sm">${t.title}</div>
      <div class="badge ${state.speakingDone.includes(t.id) ? 'badge-emerald' : 'badge-indigo'}">${state.speakingDone.includes(t.id) ? '✅ Done' : `${t.timerMin} นาที`}</div>
    </div>
  `).join('');
}

function startSpeakingSession(topicId) {
  const topic = SPEAKING_TOPICS.find(t => t.id === topicId);
  if (!topic) return;

  document.getElementById('topicGrid').style.display = 'none';
  const session = document.getElementById('speakingSession');
  session.style.display = 'block';

  document.getElementById('sessionTopicTitle').textContent = `${topic.icon} ${topic.title}`;

  timerMax = topic.timerMin * 60;
  timerSeconds = timerMax;
  timerRunning = false;
  updateTimerDisplay();

  const startersEl = document.getElementById('sessionStarters');
  if (startersEl) {
    startersEl.innerHTML = topic.starters.map(s =>
      `<div class="sentence-level-display" style="font-size:13px;padding:8px 12px">${s}</div>`
    ).join('');
  }

  const vocabEl = document.getElementById('sessionVocab');
  if (vocabEl) {
    vocabEl.innerHTML = topic.vocabulary.map(w => `<span class="phrase-chip">${w}</span>`).join('');
  }

  const tipsEl = document.getElementById('sessionTips');
  if (tipsEl) {
    tipsEl.innerHTML = topic.tips.map(tip => `<div class="fs-sm text-secondary">• ${tip}</div>`).join('');
  }

  const noStopEl = document.getElementById('noStopSubs');
  if (noStopEl) {
    const subs = [...NO_STOP_SUBS].sort(() => Math.random() - 0.5).slice(0, 4);
    noStopEl.innerHTML = subs.map(s => `
      <div class="flex gap-md items-center" style="padding:8px;background:var(--bg-glass);border-radius:var(--r-sm)">
        <div>
          <div class="fs-xs text-muted">ถ้าไม่รู้: <strong style="color:var(--rose-light)">${s.difficult}</strong></div>
          <div class="fs-sm fw-600" style="color:var(--emerald-light)">→ "${s.simple}"</div>
          <div class="fs-xs text-muted" style="font-style:italic">${s.example}</div>
        </div>
      </div>
    `).join('');
  }

  session._topicId = topicId;
}

function endSpeakingSession() {
  clearInterval(speakingTimer);
  clearInterval(noStopInterval);
  timerRunning = false;
  document.getElementById('timerStartBtn').textContent = '▶ เริ่ม';
  document.getElementById('noStopReminder').style.display = 'none';
  document.getElementById('speakingSession').style.display = 'none';
  document.getElementById('topicGrid').style.display = 'grid';
}

function toggleTimer() {
  if (timerRunning) {
    clearInterval(speakingTimer);
    clearInterval(noStopInterval);
    timerRunning = false;
    document.getElementById('timerStartBtn').textContent = '▶ เริ่ม';
    document.getElementById('noStopReminder').style.display = 'none';
  } else {
    timerRunning = true;
    document.getElementById('timerStartBtn').textContent = '⏸ หยุด';

    noStopInterval = setInterval(() => {
      const r = document.getElementById('noStopReminder');
      if (r) { r.style.display = 'block'; setTimeout(() => r.style.display = 'none', 5000); }
    }, 180000);

    speakingTimer = setInterval(() => {
      if (timerSeconds <= 0) {
        clearInterval(speakingTimer);
        clearInterval(noStopInterval);
        timerRunning = false;
        document.getElementById('timerStartBtn').textContent = '▶ เริ่ม';
        const session = document.getElementById('speakingSession');
        const topicId = session._topicId;
        if (topicId && !state.speakingDone.includes(topicId)) {
          state.speakingDone.push(topicId);
          addXP(80);
          showToast('🎉 Speaking session เสร็จแล้ว! +80 XP', 'success');
          saveState();
        }
        showToast('⏰ หมดเวลา! ยอดเยี่ยมมาก!', 'success');
        return;
      }
      timerSeconds--;
      updateTimerDisplay();
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(speakingTimer);
  clearInterval(noStopInterval);
  timerRunning = false;
  timerSeconds = timerMax;
  updateTimerDisplay();
  document.getElementById('timerStartBtn').textContent = '▶ เริ่ม';
  document.getElementById('noStopReminder').style.display = 'none';
}

function updateTimerDisplay() {
  const min = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
  const sec = (timerSeconds % 60).toString().padStart(2, '0');
  const el = document.getElementById('timerDisplay');
  if (el) el.textContent = `${min}:${sec}`;

  const pct = ((timerMax - timerSeconds) / timerMax) * 360;
  const ring = document.getElementById('timerRing');
  if (ring) ring.style.background = `conic-gradient(var(--emerald) ${pct}deg, var(--bg-glass) 0%)`;
}

// ── VOCABULARY ──
let currentVocabLevel = 'A2';
let currentVocabDay = 1;
let currentVocabIdx = 0;

function initVocabulary() {
  currentVocabLevel = state.currentVocabLevel || state.currentCEFRLevel || 'A2';
  currentVocabDay = state.currentVocabDay || 1;
  currentVocabIdx = state.currentVocabIdx || 0;
  renderVocabLevelChips();
  renderVocabDayTabs();
  loadVocabWord();
}

function renderVocabLevelChips() {
  const c = document.getElementById('vocabLevelChips');
  if (!c) return;
  c.innerHTML = LEVELS.map(lvl => `
    <button class="chip ${lvl.id === currentVocabLevel ? 'active' : ''}" onclick="setVocabLevel('${lvl.id}')">
      ${lvl.icon} ${lvl.id}
    </button>
  `).join('');
}

function setVocabLevel(level) {
  currentVocabLevel = level;
  const firstSet = VOCAB_SETS.find(v => v.level === level);
  currentVocabDay = firstSet ? firstSet.day : 1;
  currentVocabIdx = 0;
  state.currentVocabLevel = level;
  state.currentVocabDay = currentVocabDay;
  state.currentVocabIdx = 0;
  saveState();
  renderVocabLevelChips();
  renderVocabDayTabs();
  loadVocabWord();
}

function renderVocabDayTabs() {
  const c = document.getElementById('vocabDayTabs');
  if (!c) return;
  const sets = VOCAB_SETS.filter(v => v.level === currentVocabLevel);
  c.innerHTML = sets.map(vs => `
    <button class="tab ${vs.day === currentVocabDay ? 'active' : ''}" onclick="setVocabDay(${vs.day})">Day ${vs.day}</button>
  `).join('');
}

function setVocabDay(day) {
  currentVocabDay = day;
  currentVocabIdx = 0;
  state.currentVocabDay = day;
  state.currentVocabIdx = 0;
  saveState();
  renderVocabDayTabs();
  loadVocabWord();
}

function loadVocabWord() {
  const vs = VOCAB_SETS.find(v => v.level === currentVocabLevel && v.day === currentVocabDay);
  if (!vs) return;
  const word = vs.words[currentVocabIdx];
  if (!word) return;

  document.getElementById('vocabTheme').textContent = vs.theme;
  document.getElementById('vocabWord').textContent = word.word;
  document.getElementById('vocabThai').textContent = word.thai;
  document.getElementById('vocabChunk').textContent = word.chunk;
  document.getElementById('vocabExample').textContent = word.sentence;

  const learned = vs.words.filter((_, i) => state.vocabLearned.includes(`${currentVocabLevel}_${currentVocabDay}_${i}`)).length;
  const badge = document.getElementById('vocabProgressBadge');
  if (badge) badge.textContent = `${learned}/${vs.words.length} คำ`;

  const key = `vocab_sentence_${currentVocabLevel}_${currentVocabDay}_${currentVocabIdx}`;
  const saved = state.vocabSentences[key];
  const savedBox = document.getElementById('savedVocabSentence');
  const savedText = document.getElementById('savedSentenceText');
  const input = document.getElementById('myVocabSentence');
  if (saved) {
    if (savedBox) savedBox.style.display = 'block';
    if (savedText) savedText.textContent = saved;
    if (input) input.value = saved;
  } else {
    if (savedBox) savedBox.style.display = 'none';
    if (input) input.value = '';
  }

  const dotsEl = document.getElementById('vocabDots');
  if (dotsEl) {
    dotsEl.innerHTML = vs.words.map((_, i) => `
      <div onclick="goToVocab(${i})" style="width:8px;height:8px;border-radius:50%;cursor:pointer;background:${i === currentVocabIdx ? 'var(--indigo)' : 'var(--bg-glass)'};border:1px solid ${i === currentVocabIdx ? 'var(--indigo)' : 'var(--border)'}"></div>
    `).join('');
  }

  const prev = document.getElementById('prevVocabBtn');
  const next = document.getElementById('nextVocabBtn');
  if (prev) prev.disabled = currentVocabIdx === 0;
  if (next) next.disabled = currentVocabIdx === vs.words.length - 1;
}

function goToVocab(idx) { currentVocabIdx = idx; state.currentVocabIdx = idx; saveState(); loadVocabWord(); }
function prevVocab() { if (currentVocabIdx > 0) { currentVocabIdx--; state.currentVocabIdx = currentVocabIdx; saveState(); loadVocabWord(); } }
function nextVocab() {
  const vs = VOCAB_SETS.find(v => v.level === currentVocabLevel && v.day === currentVocabDay);
  if (vs && currentVocabIdx < vs.words.length - 1) {
    currentVocabIdx++; state.currentVocabIdx = currentVocabIdx; saveState(); loadVocabWord();
  }
}

function saveVocabSentence() {
  const val = document.getElementById('myVocabSentence').value.trim();
  if (!val) { showToast('พิมพ์ประโยคก่อน', 'error'); return; }
  const key = `vocab_sentence_${currentVocabLevel}_${currentVocabDay}_${currentVocabIdx}`;
  state.vocabSentences[key] = val;
  addXP(15);
  saveState();
  loadVocabWord();
  showToast('💾 บันทึกแล้ว! +15 XP', 'success');
}

function markVocabLearned() {
  const key = `${currentVocabLevel}_${currentVocabDay}_${currentVocabIdx}`;
  if (!state.vocabLearned.includes(key)) {
    state.vocabLearned.push(key);
    addXP(20);
    showToast('✅ จำได้แล้ว! +20 XP', 'success');
    saveState();
  }
  loadVocabWord();
}

// ── GRAMMAR ──
let currentGrammarLevel = 'A2';
let currentGrammarTopic = null;

function initGrammar() {
  currentGrammarLevel = state.currentGrammarLevel || state.currentCEFRLevel || 'A2';
  renderGrammarLevelChips();
  renderGrammarGrid();
}

function renderGrammarLevelChips() {
  const c = document.getElementById('grammarLevelChips');
  if (!c) return;
  c.innerHTML = LEVELS.map(lvl => `
    <button class="chip ${lvl.id === currentGrammarLevel ? 'active' : ''}" onclick="setGrammarLevel('${lvl.id}')">
      ${lvl.icon} ${lvl.id}
    </button>
  `).join('');
}

function setGrammarLevel(level) {
  currentGrammarLevel = level;
  state.currentGrammarLevel = level;
  saveState();
  renderGrammarLevelChips();
  renderGrammarGrid();
}

function renderGrammarGrid() {
  const c = document.getElementById('grammarGrid');
  if (!c) return;
  const topics = GRAMMAR_TOPICS.filter(t => t.level === currentGrammarLevel);
  const doneInLevel = topics.filter(t => state.grammarDone.includes(t.id)).length;
  const badge = document.getElementById('grammarProgressBadge');
  if (badge) badge.textContent = `${doneInLevel} / ${topics.length}`;
  const pct = topics.length ? Math.round((doneInLevel / topics.length) * 100) : 0;
  const bar = document.getElementById('grammarProgress');
  if (bar) bar.style.width = pct + '%';

  c.innerHTML = topics.map(t => `
    <div class="grammar-card ${state.grammarDone.includes(t.id) ? 'done' : ''}" onclick="showGrammarTopic('${t.id}')">
      <div style="font-size:24px;margin-bottom:8px">${t.icon}</div>
      <div class="fw-700 fs-sm mb-sm">${t.title}</div>
      ${state.grammarDone.includes(t.id) ? '<div class="badge badge-emerald">✅ Done</div>' : `<div class="badge badge-indigo">Topic ${t.order}</div>`}
    </div>
  `).join('');
}

function showGrammarTopic(id) {
  currentGrammarTopic = id;
  const topic = GRAMMAR_TOPICS.find(t => t.id === id);
  if (!topic) return;

  const detail = document.getElementById('grammarDetail');
  if (detail) detail.style.display = 'block';

  document.getElementById('grammarTopicTitle').textContent = `${topic.icon} ${topic.title}`;
  document.getElementById('grammarRule').textContent = topic.rule;

  const exEl = document.getElementById('grammarExamples');
  if (exEl) exEl.innerHTML = topic.examples.map(ex => `<div class="sentence-level-display" style="font-size:14px;padding:10px 14px">${ex}</div>`).join('');

  const ex2El = document.getElementById('grammarExamples2');
  if (ex2El) ex2El.innerHTML = topic.examples2.map(ex => `<div class="sentence-level-display" style="font-size:14px;padding:10px 14px;border-left-color:var(--indigo)">${ex}</div>`).join('');

  document.getElementById('grammarTip').textContent = topic.tip;

  const key = `grammar_practice_${id}`;
  const saved = state.grammarPractice[key];
  const savedBox = document.getElementById('grammarPracticeSaved');
  const savedText = document.getElementById('grammarPracticeText');
  const inp = document.getElementById('grammarPracticeInput');
  if (saved) {
    if (savedBox) savedBox.style.display = 'block';
    if (savedText) savedText.textContent = saved;
    if (inp) inp.value = saved;
  } else {
    if (savedBox) savedBox.style.display = 'none';
    if (inp) inp.value = '';
  }

  if (GRAMMAR_EXERCISES[id]) showExercisePanel(id);
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeGrammarDetail() {
  const detail = document.getElementById('grammarDetail');
  if (detail) detail.style.display = 'none';
  const panel = document.getElementById('grammarExercisePanel');
  if (panel) panel.style.display = 'none';
  currentGrammarTopic = null;
}

function saveGrammarPractice() {
  const val = document.getElementById('grammarPracticeInput').value.trim();
  if (!val || !currentGrammarTopic) { showToast('พิมพ์ประโยคก่อน', 'error'); return; }
  const key = `grammar_practice_${currentGrammarTopic}`;
  state.grammarPractice[key] = val;
  addXP(20);
  saveState();
  showGrammarTopic(currentGrammarTopic);
  showToast('💾 บันทึกแล้ว! +20 XP', 'success');
}

function markGrammarDone() {
  if (!currentGrammarTopic) return;
  if (!state.grammarDone.includes(currentGrammarTopic)) {
    state.grammarDone.push(currentGrammarTopic);
    addXP(40);
    showToast('✅ Grammar topic เสร็จแล้ว! +40 XP', 'success');
    saveState();
  }
  renderGrammarGrid();
  closeGrammarDetail();
}

// ══════════════════════════════════════════════════
// GRAMMAR EXERCISES — Interactive MCQ
// ══════════════════════════════════════════════════
let currentExerciseTopic = null;
let exerciseAnswers = {};

function showExercisePanel(topicId) {
  currentExerciseTopic = topicId;
  exerciseAnswers = {};
  const exData = GRAMMAR_EXERCISES[topicId];
  if (!exData) return;
  const topic = GRAMMAR_TOPICS.find(t => t.id === topicId);
  const panel = document.getElementById('grammarExercisePanel');
  if (panel) panel.style.display = 'block';
  document.getElementById('exerciseTopicTitle').textContent = topic ? `${topic.icon} ${topic.title}` : topicId;
  document.getElementById('exerciseIntro').textContent = exData.intro;
  document.getElementById('exerciseScore').textContent = `0/${exData.exercises.length}`;
  const result = document.getElementById('exerciseResult');
  if (result) result.style.display = 'none';
  renderExerciseQuestions(exData.exercises);
}

function renderExerciseQuestions(exercises) {
  const c = document.getElementById('exerciseQuestions');
  if (!c) return;
  c.innerHTML = exercises.map((ex, i) => {
    const typeLabels = { mcq: '🔘 Multiple Choice', gap: '✏️ Fill in the Blank', error: '🔍 Find the Error', build: '🔧 Build a Sentence' };
    return `
      <div class="card card-sm mb-md" id="exQ-${i}" style="transition:all 0.2s">
        <div class="flex gap-sm items-center mb-md">
          <span class="badge badge-indigo">${typeLabels[ex.type] || ex.type}</span>
          <span class="fs-xs text-muted">ข้อ ${i + 1}</span>
        </div>
        <div class="fw-600 mb-md" style="font-size:15px">${ex.q}</div>
        ${ex.type === 'mcq' || ex.type === 'error' ? `
          <div style="display:flex;flex-direction:column;gap:8px">
            ${ex.options.map((opt, oi) => `
              <label style="display:flex;align-items:center;gap:10px;padding:10px;border-radius:var(--r-md);cursor:pointer;border:1px solid var(--border);transition:all 0.2s"
                     class="ex-option" id="opt-${i}-${oi}">
                <input type="radio" name="ex-${i}" value="${oi}" style="display:none"
                       onchange="selectAnswer(${i}, ${oi}, this.closest('label'))">
                <div style="width:20px;height:20px;border-radius:50%;border:2px solid var(--border-strong);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px" id="radio-${i}-${oi}"></div>
                <span class="fs-sm">${opt}</span>
              </label>
            `).join('')}
          </div>
        ` : `
          <input type="text" class="input-field" id="textEx-${i}" placeholder="พิมพ์คำตอบของคุณ..."
                 oninput="exerciseAnswers[${i}] = this.value.trim().toLowerCase()"/>
        `}
        <div id="exFeedback-${i}" style="display:none;margin-top:10px"></div>
      </div>
    `;
  }).join('');
}

function selectAnswer(qIdx, optIdx, labelEl) {
  exerciseAnswers[qIdx] = optIdx;
  document.querySelectorAll(`[id^="opt-${qIdx}-"]`).forEach(el => {
    el.classList.remove('selected');
    el.style.borderColor = 'var(--border)';
    el.style.background = '';
  });
  document.querySelectorAll(`[id^="radio-${qIdx}-"]`).forEach(el => el.textContent = '');
  labelEl.classList.add('selected');
  labelEl.style.borderColor = 'var(--indigo)';
  labelEl.style.background = 'var(--indigo-dim)';
  const radioEl = document.getElementById(`radio-${qIdx}-${optIdx}`);
  if (radioEl) { radioEl.textContent = '●'; radioEl.style.color = 'var(--indigo-light)'; }
}

function checkExercises() {
  const exData = GRAMMAR_EXERCISES[currentExerciseTopic];
  if (!exData) return;
  let correct = 0;
  exData.exercises.forEach((ex, i) => {
    const feedbackEl = document.getElementById(`exFeedback-${i}`);
    const qCard = document.getElementById(`exQ-${i}`);
    let userAnswer = exerciseAnswers[i];
    let isCorrect = false;

    if (ex.type === 'mcq' || ex.type === 'error') {
      isCorrect = userAnswer === ex.answer;
      const correctOpt = document.getElementById(`opt-${i}-${ex.answer}`);
      if (correctOpt) { correctOpt.style.borderColor = 'var(--emerald)'; correctOpt.style.background = 'rgba(16,185,129,0.1)'; }
      if (!isCorrect && userAnswer !== undefined) {
        const wrongOpt = document.getElementById(`opt-${i}-${userAnswer}`);
        if (wrongOpt) { wrongOpt.style.borderColor = 'var(--rose)'; wrongOpt.style.background = 'rgba(244,63,94,0.1)'; }
      }
    } else {
      const inputEl = document.getElementById(`textEx-${i}`);
      const val = inputEl ? inputEl.value.trim().toLowerCase() : '';
      const ans = typeof ex.answer === 'string' ? ex.answer.toLowerCase() : '';
      isCorrect = val === ans || (ans.length > 0 && ans.includes(val) && val.length > 2);
    }

    if (isCorrect) correct++;

    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = `
        <div class="card card-xs" style="background:${isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.08)'};border-color:${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)'}">
          <div class="fs-sm fw-700 mb-sm" style="color:${isCorrect ? 'var(--emerald-light)' : 'var(--rose-light)'}">${isCorrect ? '✅ ถูกต้อง!' : '❌ ไม่ถูกต้อง'}</div>
          ${!isCorrect && (ex.type === 'gap' || ex.type === 'build') ? `<div class="fs-sm text-amber mb-sm">✏️ คำตอบ: <strong>${ex.answer}</strong></div>` : ''}
          <div class="fs-sm text-secondary">${ex.exp}</div>
        </div>
      `;
    }
    if (qCard) qCard.style.borderColor = isCorrect ? 'rgba(16,185,129,0.4)' : 'rgba(244,63,94,0.3)';
  });

  const score = Math.round((correct / exData.exercises.length) * 100);
  const badge = document.getElementById('exerciseScore');
  if (badge) badge.textContent = `${correct}/${exData.exercises.length}`;
  const result = document.getElementById('exerciseResult');
  if (result) {
    result.style.display = 'block';
    const xpEarned = correct * 10;
    result.innerHTML = `
      <div style="text-align:center">
        <div class="font-display fw-800" style="font-size:36px;color:${score >= 80 ? 'var(--emerald-light)' : score >= 60 ? 'var(--amber-light)' : 'var(--rose-light)'}">${score}%</div>
        <div class="fw-600 mb-sm">${correct}/${exData.exercises.length} ข้อถูก</div>
        <div class="fs-sm text-muted">${score >= 80 ? '🎉 ยอดเยี่ยม! เข้าใจดีมาก' : score >= 60 ? '👍 ดี! ลองทำใหม่ดูข้อที่ผิด' : '💪 ยังไม่แม่น — อ่าน rule อีกครั้ง แล้วลองใหม่'}</div>
        <div class="badge badge-indigo" style="margin-top:8px">+${xpEarned} XP</div>
      </div>
    `;
    addXP(xpEarned);
  }
  showToast(`📝 ตรวจแล้ว: ${correct}/${exData.exercises.length} ถูก`, score >= 60 ? 'success' : 'info');
}

function resetExercises() {
  exerciseAnswers = {};
  if (currentExerciseTopic && GRAMMAR_EXERCISES[currentExerciseTopic]) {
    renderExerciseQuestions(GRAMMAR_EXERCISES[currentExerciseTopic].exercises);
    const result = document.getElementById('exerciseResult');
    if (result) result.style.display = 'none';
    document.getElementById('exerciseScore').textContent = `0/${GRAMMAR_EXERCISES[currentExerciseTopic].exercises.length}`;
  }
}

function closeExercisePanel() {
  const panel = document.getElementById('grammarExercisePanel');
  if (panel) panel.style.display = 'none';
  currentExerciseTopic = null;
}

// ── LEVEL-UP CHECKPOINT ──
function initLevelUp() {
  const level = state.currentCEFRLevel;
  const lvl = getLevelById(level);
  const cp = LEVEL_CHECKPOINTS[level];
  const titleEl = document.getElementById('levelUpTitle');
  if (titleEl) titleEl.textContent = cp ? cp.name : 'Level Up';
  const badgeEl = document.getElementById('levelUpLevelBadge');
  if (badgeEl) { badgeEl.textContent = `${lvl.icon} ${lvl.id}`; badgeEl.style.background = lvl.color + '20'; badgeEl.style.color = lvl.color; }

  const c = document.getElementById('levelUpTasks');
  if (!c || !cp) return;
  const savedTasks = state.checkpointTasks[level] || {};
  const done = cp.tasks.filter((_, ti) => savedTasks[ti]).length;
  const allDone = done === cp.tasks.length;
  const progBadge = document.getElementById('levelUpProgress');
  if (progBadge) progBadge.textContent = `${done} / ${cp.tasks.length}`;
  const progBar = document.getElementById('levelUpProgressBar');
  if (progBar) progBar.style.width = Math.round((done / cp.tasks.length) * 100) + '%';

  c.innerHTML = cp.tasks.map((task, ti) => `
    <div class="checkpoint-task" onclick="toggleCheckpointTask('${level}', ${ti})">
      <div class="checkpoint-checkbox ${savedTasks[ti] ? 'checked' : ''}">${savedTasks[ti] ? '✓' : ''}</div>
      <div class="fs-sm ${savedTasks[ti] ? 'text-muted' : 'text-secondary'}" style="${savedTasks[ti] ? 'text-decoration:line-through' : ''}">${task}</div>
    </div>
  `).join('');

  const nextBox = document.getElementById('levelUpNextBox');
  if (nextBox) {
    if (allDone) {
      const next = getNextLevel(level);
      nextBox.style.display = 'block';
      nextBox.innerHTML = next
        ? `<div class="badge badge-emerald mb-md">🏆 ผ่านระดับ ${level} แล้ว!</div><button class="btn btn-primary" onclick="advanceToNextLevel()">➡️ ไปต่อระดับ ${next.id}</button>`
        : `<div class="badge badge-emerald">🏆 คุณผ่านทุกระดับแล้ว — ยินดีด้วย! คุณไปถึง C2 แล้ว 🎉</div>`;
    } else {
      nextBox.style.display = 'none';
      nextBox.innerHTML = '';
    }
  }
}

function toggleCheckpointTask(level, taskIdx) {
  if (!state.checkpointTasks[level]) state.checkpointTasks[level] = {};
  const wasChecked = state.checkpointTasks[level][taskIdx];
  state.checkpointTasks[level][taskIdx] = !wasChecked;

  const cp = LEVEL_CHECKPOINTS[level];
  const allDone = cp.tasks.every((_, i) => state.checkpointTasks[level][i]);
  if (allDone && !wasChecked) {
    addXP(200);
    if (!state.completedLevels.includes(level)) state.completedLevels.push(level);
    showToast(`🏆 ผ่านระดับ ${level} แล้ว! +200 XP`, 'success');
  }
  saveState();
  initLevelUp();
}

function advanceToNextLevel() {
  const next = getNextLevel(state.currentCEFRLevel);
  if (!next) return;
  state.currentCEFRLevel = next.id;
  saveState();
  showToast(`🎉 ยินดีด้วย! ตอนนี้คุณอยู่ระดับ ${next.id} แล้ว`, 'success');
  navigate('levelpath');
  showLevelDetail(next.id);
}

// ── ERROR NOTEBOOK ──
function initNotebook() {
  renderErrors();
  renderTodayErrors();
  updateErrorCount();
}

function addErrorEntry() {
  const wrong = document.getElementById('errorWrong').value.trim();
  const correct = document.getElementById('errorCorrect').value.trim();
  const reason = document.getElementById('errorReason').value.trim();

  if (!wrong || !correct) { showToast('กรอกประโยคผิดและถูกก่อน', 'error'); return; }

  const entry = {
    id: Date.now(),
    wrong, correct, reason,
    date: new Date().toLocaleDateString('th-TH'),
    dateKey: new Date().toDateString(),
    reviewed: false
  };
  state.errorEntries.unshift(entry);
  addXP(10);
  saveState();
  clearErrorForm();
  renderErrors();
  renderTodayErrors();
  updateErrorCount();
  showToast('📓 บันทึกแล้ว! +10 XP', 'success');
}

function clearErrorForm() {
  ['errorWrong', 'errorCorrect', 'errorReason'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function renderErrors(filter = '') {
  const c = document.getElementById('errorList');
  if (!c) return;
  let entries = state.errorEntries;
  if (filter) {
    const f = filter.toLowerCase();
    entries = entries.filter(e =>
      e.wrong.toLowerCase().includes(f) ||
      e.correct.toLowerCase().includes(f) ||
      (e.reason && e.reason.toLowerCase().includes(f))
    );
  }
  if (entries.length === 0) {
    c.innerHTML = `<div style="text-align:center;padding:var(--sp-xl);color:var(--text-muted)">${filter ? 'ไม่พบรายการที่ตรงกับการค้นหา' : 'ยังไม่มีรายการ — เริ่มบันทึกข้อผิดพลาดแรกของคุณ! 📝'}</div>`;
    return;
  }
  c.innerHTML = entries.map(e => `
    <div class="error-entry">
      <div class="flex-between flex-wrap gap-sm mb-md">
        <div>
          <div class="error-wrong">❌ ${e.wrong}</div>
          <div class="error-correct">✅ ${e.correct}</div>
          ${e.reason ? `<div class="error-reason mt-md">🧠 ${e.reason}</div>` : ''}
        </div>
        <div class="flex flex-col items-end gap-sm">
          <div class="error-date">${e.date}</div>
          <button class="btn btn-ghost btn-sm" onclick="deleteError(${e.id})">🗑️</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderTodayErrors() {
  const today = new Date().toDateString();
  const todayEntries = state.errorEntries.filter(e => e.dateKey === today);
  const section = document.getElementById('todayErrorsSection');
  const countEl = document.getElementById('todayErrorCount');
  const listEl = document.getElementById('todayErrors');

  if (section) section.style.display = todayEntries.length > 0 ? 'block' : 'none';
  if (countEl) countEl.textContent = todayEntries.length;
  if (listEl && todayEntries.length > 0) {
    listEl.innerHTML = todayEntries.map(e => `
      <div style="padding:6px 0;border-bottom:1px solid var(--border)">
        <div class="error-wrong fs-sm">❌ ${e.wrong}</div>
        <div class="error-correct fs-sm">✅ ${e.correct}</div>
      </div>
    `).join('');
  }
}

function filterErrors() {
  const val = document.getElementById('errorSearch').value;
  renderErrors(val);
}

function updateErrorCount() {
  const badge = document.getElementById('errorCountBadge');
  if (badge) badge.textContent = `${state.errorEntries.length} รายการ`;
}

function deleteError(id) {
  state.errorEntries = state.errorEntries.filter(e => e.id !== id);
  saveState();
  renderErrors();
  renderTodayErrors();
  updateErrorCount();
  showToast('🗑️ ลบแล้ว', 'info');
}

function clearAllErrors() {
  if (state.errorEntries.length === 0) return;
  if (!confirm('ลบรายการทั้งหมดใน Error Notebook?')) return;
  state.errorEntries = [];
  saveState();
  renderErrors();
  renderTodayErrors();
  updateErrorCount();
}

// ── KEYBOARD SHORTCUTS ──
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'Escape') closeGrammarDetail();
});

// ── MOBILE SIDEBAR ──
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
});
document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);

// ── NAV BINDINGS ──
document.querySelectorAll('.nav-item[data-section]').forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.section));
});
document.querySelectorAll('.mobile-nav-item[data-section]').forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.section));
});

// ── INIT ──
function init() {
  checkStreak();
  updateXPBar();
  navigate(state.activeSection || 'dashboard');
  if (typeof tryAutoInitFirebase === 'function') tryAutoInitFirebase();
  setTimeout(() => showToast('🚀 ยินดีต้อนรับสู่ English Journey! เริ่มจากระดับ A2 กันเลย', 'info'), 1000);
}

init();
