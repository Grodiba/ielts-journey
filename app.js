/* ═══════════════════════════════════════════════════
   IELTS Journey — Application Logic
   State, Navigation, All Feature Modules
═══════════════════════════════════════════════════ */
'use strict';

// ── STATE ──
const STATE_KEY = 'ielts_journey_v1';
const defaultState = {
  xp: 0, level: 1, streak: 0, lastStudyDate: null,
  startDate: new Date().toDateString(),
  examDate: null,
  sentencesBuilt: 0,
  grammarDone: [],
  grammarPractice: {},
  vocabLearned: [],
  vocabSentences: {},
  currentVocabDay: 1,
  currentVocabIdx: 0,
  errorEntries: [],
  speakingDone: [],
  checkpointTasks: {},
  currentGrammarTopic: null,
  currentBuilderContext: 'appsec',
  currentBuilderExIdx: 0,
  builderStepsState: {},
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
  // Sync to Firebase cloud (if configured and logged in)
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
  } else if (state.lastStudyDate !== today) {
    if (state.streak > 0 && state.lastStudyDate !== yesterday) state.streak = 1;
    else state.streak = 1;
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
  const inits = { dashboard: initDashboard, roadmap: initRoadmap, builder: initBuilder, speaking: initSpeaking, vocabulary: initVocabulary, grammar: initGrammar, ielts: initIELTS, checkpoints: initCheckpoints, notebook: initNotebook };
  inits[section] && inits[section]();
  window.scrollTo(0,0);
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
  const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  const dateEl = document.getElementById('todayDate');
  if (dateEl) dateEl.textContent = today.toLocaleDateString('th-TH', opts);

  const streakEls = [document.getElementById('streakDisplay'), document.getElementById('streakStat')];
  streakEls.forEach(el => { if (el) el.textContent = state.streak; });

  const sentEl = document.getElementById('sentencesStat');
  if (sentEl) sentEl.textContent = state.sentencesBuilt;

  const errEl = document.getElementById('errorsStat');
  if (errEl) errEl.textContent = state.errorEntries.length;

  // Countdown
  const startDate = new Date(state.startDate);
  const targetDate = new Date(startDate);
  targetDate.setMonth(targetDate.getMonth() + 4);
  const daysLeft = Math.max(0, Math.ceil((targetDate - today) / 86400000));
  const totalDays = 120;
  const elapsed = Math.min(totalDays, Math.round((today - startDate) / 86400000));
  const currentMonth = Math.min(4, Math.floor(elapsed / 30) + 1);

  const daysEl = document.getElementById('daysLeftDisplay');
  if (daysEl) daysEl.textContent = daysLeft;

  const monthEl = document.getElementById('currentMonthDisplay');
  if (monthEl) monthEl.textContent = `M${currentMonth}`;

  // Day number
  const dayNumEl = document.getElementById('dayNumberDisplay');
  if (dayNumEl) dayNumEl.textContent = elapsed + 1;

  // Exam date / booking reminder
  if (state.examDate) {
    const examDays = Math.max(0, Math.ceil((new Date(state.examDate) - today) / 86400000));
    const examEl = document.getElementById('examDateDisplay');
    if (examEl) examEl.textContent = `🗓️ สอบใน ${examDays} วัน`;
  }

  // Show booking reminder if month 3+ and no exam date
  const bookReminder = document.getElementById('examBookingReminder');
  if (bookReminder) {
    bookReminder.style.display = (currentMonth >= 3 && !state.examDate) ? 'flex' : 'none';
  }

  // Daily schedule
  renderDailySchedule();
}

function renderDailySchedule() {
  const c = document.getElementById('todaySchedule');
  if (!c) return;
  c.innerHTML = DAILY_SCHEDULE.base.map(s => `
    <div class="schedule-block">
      <div class="schedule-time" style="color:${s.color}">${s.time}</div>
      <div class="schedule-dot" style="background:${s.color}"></div>
      <div>
        <div class="schedule-label">${s.icon} ${s.activity}</div>
        <div class="schedule-desc">${s.desc}</div>
      </div>
    </div>
  `).join('');
}

// ── ROADMAP ──
let selectedPhase = null;
function initRoadmap() {
  const container = document.getElementById('roadmapPhases');
  if (!container) return;

  const colors = ['#6366f1','#10b981','#f59e0b','#f43f5e'];
  const startDate = new Date(state.startDate);
  const elapsed = Math.round((new Date() - startDate) / 86400000);
  const currentMonth = Math.min(4, Math.floor(elapsed / 30) + 1);

  container.innerHTML = ROADMAP.map((p,i) => `
    <div class="phase-card ${p.month === currentMonth ? 'current' : ''}" 
         onclick="showPhaseDetail(${i})"
         style="border-color:${p.month <= currentMonth ? p.color+'40' : 'var(--border)'};background:${p.month === currentMonth ? p.color+'12' : 'var(--bg-glass)'}">
      <div class="phase-icon">${p.icon}</div>
      <div class="phase-month" style="color:${p.color}">MONTH ${p.month}</div>
      <div class="phase-title">${p.title}</div>
      <div class="phase-subtitle">${p.subtitle}</div>
      ${p.month < currentMonth ? '<div class="badge badge-emerald" style="margin-top:8px">✅ ผ่านแล้ว</div>' : ''}
      ${p.month === currentMonth ? `<div class="badge" style="margin-top:8px;background:${p.color}20;color:${p.color}">▶ ตอนนี้</div>` : ''}
    </div>
  `).join('');

  // Schedule
  const schedEl = document.getElementById('scheduleVisual');
  if (schedEl) {
    schedEl.innerHTML = DAILY_SCHEDULE.base.map(s => `
      <div class="schedule-block">
        <div class="schedule-time" style="color:${s.color}">${s.time}</div>
        <div class="schedule-dot" style="background:${s.color}"></div>
        <div>
          <div class="schedule-label">${s.icon} ${s.activity}</div>
          <div class="schedule-desc">${s.desc}</div>
        </div>
      </div>
    `).join('');
  }

  // Week 4 schedule
  const weekEl = document.getElementById('weekSchedule');
  if (weekEl) {
    weekEl.innerHTML = DAILY_SCHEDULE.month4Weekly.map(d => `
      <div class="week-day-row">
        <div class="week-day-name">${d.day}</div>
        <div style="width:10px;height:10px;border-radius:50%;background:${d.color};flex-shrink:0"></div>
        <div>
          <div class="fw-600 fs-sm">${d.icon} ${d.activity}</div>
        </div>
      </div>
    `).join('');
  }

  // Exam date
  const examEl = document.getElementById('examDateDisplay');
  if (examEl && state.examDate) {
    const d = new Date(state.examDate);
    const days = Math.max(0, Math.ceil((d - new Date()) / 86400000));
    examEl.textContent = `📅 ${d.toLocaleDateString('th-TH')} (อีก ${days} วัน)`;
  }
}

function showPhaseDetail(idx) {
  const p = ROADMAP[idx];
  const el = document.getElementById('phaseDetail');
  if (!el) return;
  el.style.display = 'block';
  el.innerHTML = `
    <div style="border-left:4px solid ${p.color};padding-left:var(--sp-lg)">
      <div class="fs-xs fw-700" style="color:${p.color};letter-spacing:1px;margin-bottom:4px">MONTH ${p.month}</div>
      <h2 class="font-display fw-800 mb-sm">${p.icon} ${p.title}</h2>
      <div class="fs-sm text-muted mb-lg">${p.goal}</div>
      <div class="fw-700 mb-md">🎯 Focus areas:</div>
      ${p.focus.map(f => `<div class="fs-sm text-secondary" style="padding:4px 0;border-bottom:1px solid var(--border)">• ${f}</div>`).join('')}
      <div class="fw-700 mt-lg mb-md">⏰ Daily:</div>
      <div class="fs-sm text-secondary">${p.daily}</div>
    </div>
  `;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── SENTENCE BUILDER ──
let activeExIdx = 0;
let activeContext = 'appsec';
let stepStates = []; // 'locked','active','completed'

function initBuilder() {
  renderContextChips();
  renderExerciseList();
  if (EXPANSION_SETS.length > 0) loadExercise(activeExIdx);
}

function renderContextChips() {
  const c = document.getElementById('contextChips');
  if (!c) return;
  c.innerHTML = Object.values(CONTEXT_PACKS).map(p => `
    <button class="chip ${p.id === activeContext ? 'active' : ''}" onclick="setBuilderContext('${p.id}')">
      ${p.name}
    </button>
  `).join('');
}

function setBuilderContext(id) {
  activeContext = id;
  state.currentBuilderContext = id;
  saveState();
  renderContextChips();
  const filtered = EXPANSION_SETS.filter(e => e.context === id);
  if (filtered.length > 0) {
    activeExIdx = EXPANSION_SETS.indexOf(filtered[0]);
    loadExercise(activeExIdx);
  }
  renderExerciseList();
}

function renderExerciseList() {
  const c = document.getElementById('exerciseList');
  if (!c) return;
  const filtered = EXPANSION_SETS.filter(e => e.context === activeContext);
  c.innerHTML = filtered.map(ex => {
    const idx = EXPANSION_SETS.indexOf(ex);
    const isActive = idx === activeExIdx;
    const isDone = state.builderStepsState[ex.id]?.filter(s => s === 'completed').length === ex.steps.length;
    return `<button class="chip ${isActive ? 'active' : ''} ${isDone ? '' : ''}" onclick="loadExercise(${idx})" style="${isDone ? 'border-color:rgba(16,185,129,0.4);color:var(--emerald-light)' : ''}">
      ${isDone ? '✅ ' : ''}${ex.starterWord}
    </button>`;
  }).join('');
}

function loadExercise(idx) {
  activeExIdx = idx;
  const ex = EXPANSION_SETS[idx];
  if (!ex) return;

  const exerciseEl = document.getElementById('builderExercise');
  if (exerciseEl) exerciseEl.style.display = 'block';

  document.getElementById('starterWord').textContent = ex.starterWord;
  document.getElementById('grammarFocusBadge').textContent = ex.grammarFocus;
  document.getElementById('stepsTotal').textContent = ex.steps.length;

  // Load step states
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
          <div class="step-number ${completed ? 'done' : ''}">${completed ? '✓' : i+1}</div>
          <div class="flex-col" style="flex:1">
            <div class="fw-700 fs-sm" style="color:${completed ? 'var(--emerald-light)' : active ? 'var(--indigo-light)' : 'var(--text-muted)'}">
              Step ${i+1}: ${step.prompt}
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
                    ${completed || locked ? 'readonly' : ''}
                    style="${completed ? 'color:var(--emerald-light);' : ''}"></textarea>
          <div class="flex gap-sm flex-wrap">
            ${!completed ? `<button class="btn btn-primary btn-sm" onclick="completeStep(${i})">✅ ยืนยัน</button>` : ''}
            <button class="btn btn-ghost btn-sm" onclick="toggleModel(${i})">💡 ดูตัวอย่าง</button>
          </div>
          <div class="model-answer" id="model-${i}">
            ✅ ${step.model}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  // Restore saved inputs
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
  const ex = EXPANSION_SETS[activeExIdx];
  const inp = document.getElementById(`stepInput-${stepIdx}`);
  const val = inp ? inp.value.trim() : '';
  if (!val) { showToast('พิมพ์ประโยคก่อนยืนยัน', 'error'); return; }

  // Save input
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
  const filtered = EXPANSION_SETS.filter(e => e.context === activeContext);
  const currentFiltered = filtered.findIndex(e => EXPANSION_SETS.indexOf(e) === activeExIdx);
  const nextFiltered = (currentFiltered + 1) % filtered.length;
  loadExercise(EXPANSION_SETS.indexOf(filtered[nextFiltered]));
  renderExerciseList();
}

function resetExercise() {
  const ex = EXPANSION_SETS[activeExIdx];
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

function initSpeaking() {
  const grid = document.getElementById('topicGrid');
  if (!grid) return;
  grid.innerHTML = SPEAKING_TOPICS.map(t => `
    <div class="card card-sm" style="cursor:pointer;transition:all 0.2s;${state.speakingDone.includes(t.id) ? 'border-color:rgba(16,185,129,0.4)' : ''}" 
         onclick="startSpeakingSession('${t.id}')"
         onmouseover="this.style.borderColor='var(--emerald)'"
         onmouseout="this.style.borderColor='${state.speakingDone.includes(t.id) ? 'rgba(16,185,129,0.4)' : 'var(--border)'}'">
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

  // Starters
  const startersEl = document.getElementById('sessionStarters');
  if (startersEl) {
    startersEl.innerHTML = topic.starters.map(s =>
      `<div class="sentence-level-display" style="font-size:13px;padding:8px 12px">${s}</div>`
    ).join('');
  }

  // Vocab
  const vocabEl = document.getElementById('sessionVocab');
  if (vocabEl) {
    vocabEl.innerHTML = topic.vocabulary.map(w =>
      `<span class="phrase-chip">${w}</span>`
    ).join('');
  }

  // Tips
  const tipsEl = document.getElementById('sessionTips');
  if (tipsEl) {
    tipsEl.innerHTML = topic.tips.map(tip =>
      `<div class="fs-sm text-secondary">• ${tip}</div>`
    ).join('');
  }

  // No-stop subs (pick 4 random)
  const noStopEl = document.getElementById('noStopSubs');
  if (noStopEl) {
    const subs = NO_STOP_SUBS.slice(0, 4);
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

    // No-stop reminder every 3 min
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
  const min = Math.floor(timerSeconds / 60).toString().padStart(2,'0');
  const sec = (timerSeconds % 60).toString().padStart(2,'0');
  const el = document.getElementById('timerDisplay');
  if (el) el.textContent = `${min}:${sec}`;

  const pct = ((timerMax - timerSeconds) / timerMax) * 360;
  const ring = document.getElementById('timerRing');
  if (ring) ring.style.background = `conic-gradient(var(--emerald) ${pct}deg, var(--bg-glass) 0%)`;
}

// ── VOCABULARY ──
let currentVocabDay = 1;
let currentVocabIdx = 0;

function initVocabulary() {
  currentVocabDay = state.currentVocabDay || 1;
  currentVocabIdx = state.currentVocabIdx || 0;
  renderVocabDayTabs();
  loadVocabWord();
}

function renderVocabDayTabs() {
  const c = document.getElementById('vocabDayTabs');
  if (!c) return;
  c.innerHTML = VOCAB_SETS.map(vs => `
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
  const vs = VOCAB_SETS.find(v => v.day === currentVocabDay);
  if (!vs) return;
  const word = vs.words[currentVocabIdx];
  if (!word) return;

  document.getElementById('vocabTheme').textContent = vs.theme;
  document.getElementById('vocabWord').textContent = word.word;
  document.getElementById('vocabThai').textContent = word.thai;
  document.getElementById('vocabChunk').textContent = word.chunk;
  document.getElementById('vocabExample').textContent = word.sentence;

  // Update badge
  const learned = vs.words.filter((_, i) => state.vocabLearned.includes(`${currentVocabDay}_${i}`)).length;
  const badge = document.getElementById('vocabProgressBadge');
  if (badge) badge.textContent = `${learned}/${vs.words.length} คำ`;

  // Saved sentence
  const key = `vocab_sentence_${currentVocabDay}_${currentVocabIdx}`;
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

  // Dots
  const dotsEl = document.getElementById('vocabDots');
  if (dotsEl) {
    dotsEl.innerHTML = vs.words.map((_, i) => `
      <div onclick="goToVocab(${i})" style="width:8px;height:8px;border-radius:50%;cursor:pointer;background:${i === currentVocabIdx ? 'var(--indigo)' : 'var(--bg-glass)'};border:1px solid ${i === currentVocabIdx ? 'var(--indigo)' : 'var(--border)'}"></div>
    `).join('');
  }

  // Prev/Next buttons
  const prev = document.getElementById('prevVocabBtn');
  const next = document.getElementById('nextVocabBtn');
  if (prev) prev.disabled = currentVocabIdx === 0;
  if (next) next.disabled = currentVocabIdx === vs.words.length - 1;
}

function goToVocab(idx) { currentVocabIdx = idx; state.currentVocabIdx = idx; saveState(); loadVocabWord(); }
function prevVocab() { if (currentVocabIdx > 0) { currentVocabIdx--; state.currentVocabIdx = currentVocabIdx; saveState(); loadVocabWord(); } }
function nextVocab() {
  const vs = VOCAB_SETS.find(v => v.day === currentVocabDay);
  if (vs && currentVocabIdx < vs.words.length - 1) {
    currentVocabIdx++; state.currentVocabIdx = currentVocabIdx; saveState(); loadVocabWord();
  }
}

function saveVocabSentence() {
  const val = document.getElementById('myVocabSentence').value.trim();
  if (!val) { showToast('พิมพ์ประโยคก่อน', 'error'); return; }
  const key = `vocab_sentence_${currentVocabDay}_${currentVocabIdx}`;
  state.vocabSentences[key] = val;
  addXP(15);
  saveState();
  loadVocabWord();
  showToast('💾 บันทึกแล้ว! +15 XP', 'success');
}

function markVocabLearned() {
  const key = `${currentVocabDay}_${currentVocabIdx}`;
  if (!state.vocabLearned.includes(key)) {
    state.vocabLearned.push(key);
    addXP(20);
    showToast('✅ จำได้แล้ว! +20 XP', 'success');
    saveState();
  }
  loadVocabWord();
}

// ── GRAMMAR ──
let currentGrammarTopic = null;

function initGrammar() {
  renderGrammarGrid();
  const badge = document.getElementById('grammarProgressBadge');
  if (badge) badge.textContent = `${state.grammarDone.length} / ${GRAMMAR_TOPICS.length}`;
  const pct = Math.round((state.grammarDone.length / GRAMMAR_TOPICS.length) * 100);
  const bar = document.getElementById('grammarProgress');
  if (bar) bar.style.width = pct + '%';
}

function renderGrammarGrid() {
  const c = document.getElementById('grammarGrid');
  if (!c) return;
  c.innerHTML = GRAMMAR_TOPICS.map(t => `
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
  if (exEl) {
    exEl.innerHTML = topic.examples.map(ex =>
      `<div class="sentence-level-display" style="font-size:14px;padding:10px 14px">${ex}</div>`
    ).join('');
  }

  const appEl = document.getElementById('grammarAppSec');
  if (appEl) {
    appEl.innerHTML = topic.appSecExamples.map(ex =>
      `<div class="sentence-level-display" style="font-size:14px;padding:10px 14px;border-left-color:var(--indigo)">${ex}</div>`
    ).join('');
  }

  document.getElementById('grammarTip').textContent = topic.tip;

  // Restore saved practice
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

  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeGrammarDetail() {
  const detail = document.getElementById('grammarDetail');
  if (detail) detail.style.display = 'none';
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
  initGrammar();
  closeGrammarDetail();
}

// ── IELTS SKILLS ──
let activeIELTSSkill = 'reading';

function initIELTS() {
  showIELTSSkill('reading');
  renderReadingSkills();
  renderListeningSkills();
  renderTask1();
  renderTask2();
  renderSpeakingParts();
}

function showIELTSSkill(skill) {
  activeIELTSSkill = skill;
  document.querySelectorAll('.ielts-skill-panel').forEach(p => p.style.display = 'none');
  const panel = document.getElementById(`ielts-${skill}`);
  if (panel) panel.style.display = 'block';
  document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
  const tabs = document.querySelectorAll('.skill-tab');
  const skillOrder = ['reading','listening','task1','task2','speaking'];
  const idx = skillOrder.indexOf(skill);
  if (tabs[idx]) tabs[idx].classList.add('active');
}

function renderReadingSkills() {
  const c = document.getElementById('readingSkillCards');
  if (!c) return;
  c.innerHTML = READING_SKILLS.map(s => `
    <div class="card card-sm" style="border-left:3px solid var(--emerald)">
      <div class="flex gap-md items-center mb-md">
        <span style="font-size:24px">${s.icon}</span>
        <div><div class="fw-700">${s.skill}</div><div class="fs-xs text-muted">${s.description}</div></div>
      </div>
      <div class="card card-xs mb-sm" style="background:rgba(16,185,129,0.08);border-color:rgba(16,185,129,0.2)">
        <div class="fs-xs text-emerald fw-700 mb-sm">TECHNIQUE</div>
        <div class="fs-sm text-secondary">${s.technique}</div>
      </div>
      <div class="card card-xs" style="background:rgba(245,158,11,0.08);border-color:rgba(245,158,11,0.2)">
        <div class="fs-xs text-amber fw-700 mb-sm">⚡ PRO TIP</div>
        <div class="fs-sm text-secondary">${s.practice}</div>
      </div>
    </div>
  `).join('');
}

function renderListeningSkills() {
  const c = document.getElementById('listeningSkillCards');
  if (!c) return;
  c.innerHTML = LISTENING_SKILLS.map(s => `
    <div class="card card-sm" style="border-left:3px solid var(--indigo)">
      <div class="flex gap-md items-center mb-md">
        <span style="font-size:24px">${s.icon}</span>
        <div><div class="fw-700">${s.skill}</div><div class="fs-xs text-muted">${s.description}</div></div>
      </div>
      <div class="card card-xs mb-sm" style="background:rgba(99,102,241,0.08);border-color:rgba(99,102,241,0.2)">
        <div class="fs-xs text-indigo fw-700 mb-sm">TECHNIQUE</div>
        <div class="fs-sm text-secondary">${s.technique}</div>
      </div>
      <div class="card card-xs" style="background:rgba(245,158,11,0.08);border-color:rgba(245,158,11,0.2)">
        <div class="fs-xs text-amber fw-700 mb-sm">⚠️ WATCH OUT</div>
        <div class="fs-sm text-secondary">${s.tip}</div>
      </div>
    </div>
  `).join('');
}

let activeTask1Type = 0;

function renderTask1() {
  const t1 = WRITING_TASK1;

  // Type tabs
  const tabsEl = document.getElementById('task1TypeTabs');
  if (tabsEl) {
    tabsEl.innerHTML = t1.categories.map((cat, i) =>
      `<button class="tab ${i === activeTask1Type ? 'active' : ''}" onclick="setTask1Type(${i})">${cat.icon} ${cat.type}</button>`
    ).join('');
  }

  loadTask1Content();

  // Do not list
  const doNotEl = document.getElementById('task1DoNot');
  if (doNotEl) {
    doNotEl.innerHTML = t1.doNotDo.map(d => `<div class="do-not-item">${d}</div>`).join('');
  }

  // Structure
  const structEl = document.getElementById('task1Structure');
  if (structEl) {
    structEl.innerHTML = t1.structure.map((s, i) => `
      <div class="flex gap-md items-center" style="padding:12px;background:var(--bg-glass);border-radius:var(--r-md)">
        <div style="width:28px;height:28px;border-radius:50%;background:var(--indigo-dim);color:var(--indigo-light);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;flex-shrink:0">${i+1}</div>
        <div style="flex:1">
          <div class="fw-700 fs-sm">${s.part}</div>
          <div class="fs-xs text-muted">${s.desc}</div>
        </div>
        <div class="badge badge-indigo">${s.words} words</div>
      </div>
    `).join('');
  }
}

function setTask1Type(idx) {
  activeTask1Type = idx;
  document.querySelectorAll('#task1TypeTabs .tab').forEach((t, i) => t.classList.toggle('active', i === idx));
  loadTask1Content();
}

function loadTask1Content() {
  const cat = WRITING_TASK1.categories[activeTask1Type];
  const c = document.getElementById('task1Content');
  if (!c || !cat) return;

  const phraseSections = Object.entries(cat.phrases).map(([label, phrases]) => `
    <div class="mb-md">
      <div class="phrase-category">${label}</div>
      <div>${phrases.map(p => `<span class="phrase-chip">${p}</span>`).join('')}</div>
    </div>
  `).join('');

  const starterSection = cat.sentenceStarters ? `
    <div class="card card-sm mb-md" style="background:rgba(99,102,241,0.08);border-color:rgba(99,102,241,0.2)">
      <div class="fs-xs text-indigo fw-700 mb-md">SENTENCE STARTERS</div>
      ${cat.sentenceStarters.map(s => `<div class="sentence-level-display" style="font-size:13px;padding:8px 12px;margin-bottom:6px">${s}</div>`).join('')}
    </div>
  ` : '';

  const sampleSection = cat.sample ? `
    <div class="card card-sm" style="background:rgba(16,185,129,0.06);border-color:rgba(16,185,129,0.2)">
      <div class="fs-xs text-emerald fw-700 mb-md">SAMPLE PROMPT</div>
      <div class="fs-sm text-secondary mb-md" style="font-style:italic">${cat.sample.prompt}</div>
      <div class="fs-xs text-emerald fw-700 mb-md">SAMPLE RESPONSE</div>
      <div class="sample-response">${cat.sample.response}</div>
    </div>
  ` : '';

  c.innerHTML = `
    <div class="card mb-md">
      <div class="flex gap-md items-center mb-md">
        <span style="font-size:32px">${cat.icon}</span>
        <div>
          <div class="fw-800 font-display">${cat.type}</div>
          <div class="fs-sm text-muted">${cat.description}</div>
          ${cat.keyStructure ? `<div class="badge badge-indigo mt-md">${cat.keyStructure}</div>` : ''}
        </div>
      </div>
      ${phraseSections}
    </div>
    ${starterSection}
    ${sampleSection}
  `;
}

function renderTask2() {
  const t2 = WRITING_TASK2;

  const typesEl = document.getElementById('task2Types');
  if (typesEl) {
    typesEl.innerHTML = t2.types.map(t => `
      <div class="card card-sm" style="border-left:3px solid var(--indigo)">
        <div class="flex-between flex-wrap gap-md mb-sm">
          <div class="fw-700">${t.type}</div>
          <div class="badge badge-indigo">${t.pattern}</div>
        </div>
        <div class="fs-sm text-muted">${t.structure}</div>
      </div>
    `).join('');
  }

  const progEl = document.getElementById('task2Progression');
  if (progEl) {
    progEl.innerHTML = t2.progression.map(p => `
      <div class="flex gap-md items-center" style="padding:10px;background:var(--bg-glass);border-radius:var(--r-md)">
        <div style="width:24px;height:24px;border-radius:50%;background:var(--indigo-dim);color:var(--indigo-light);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px">${p.step}</div>
        <div style="flex:1">
          <div class="fw-700 fs-sm">${p.title}</div>
          <div class="fs-xs text-muted">${p.task}</div>
        </div>
      </div>
    `).join('');
  }

  const doNotEl = document.getElementById('task2DoNot');
  if (doNotEl) {
    doNotEl.innerHTML = t2.doNotDo.map(d => `<div class="do-not-item">${d}</div>`).join('');
  }
}

function renderSpeakingParts() {
  const c = document.getElementById('speakingPartsCards');
  if (!c) return;
  c.innerHTML = SPEAKING_PARTS.map(p => `
    <div class="card card-sm" style="border-left:3px solid var(--violet)">
      <div class="flex-between flex-wrap gap-md mb-md">
        <div>
          <div class="badge badge-violet mb-sm">${p.part}</div>
          <div class="fw-700">${p.title}</div>
          <div class="fs-xs text-muted">${p.duration}</div>
        </div>
      </div>
      <div class="fs-sm text-secondary mb-md">${p.description}</div>
      <div class="card card-xs mb-md" style="background:rgba(168,85,247,0.08);border-color:rgba(168,85,247,0.2)">
        <div class="fs-xs fw-700" style="color:var(--violet);margin-bottom:6px">TECHNIQUE</div>
        <div class="fs-sm text-secondary">${p.technique}</div>
      </div>
      <div class="card card-xs" style="background:var(--bg-glass)">
        <div class="fs-xs text-muted fw-700 mb-sm">EXAMPLE</div>
        <div class="fs-xs text-amber mb-sm" style="font-style:italic">Q: ${p.example.q}</div>
        ${p.example.short ? `<div class="fs-xs text-rose mb-sm">❌ Too short: "${p.example.short}"</div>` : ''}
        ${p.example.good ? `<div class="fs-xs text-emerald" style="font-style:italic">✅ ${p.example.good}</div>` : ''}
        ${p.example.response ? `<div class="fs-xs text-secondary" style="font-style:italic">→ ${p.example.response}</div>` : ''}
      </div>
    </div>
  `).join('');
}

// ── CHECKPOINTS ──
function initCheckpoints() {
  const c = document.getElementById('checkpointCards');
  if (!c) return;

  const phaseColors = ['#6366f1','#10b981','#f59e0b','#f43f5e'];

  c.innerHTML = ROADMAP.map((phase, pi) => {
    const cp = phase.checkpoint;
    const stateKey = `checkpoint_${pi}`;
    const savedTasks = state.checkpointTasks[stateKey] || {};
    const done = cp.tasks.filter((_, ti) => savedTasks[ti]).length;
    const allDone = done === cp.tasks.length;

    return `
      <div class="checkpoint-card" style="border:1px solid ${phaseColors[pi]}40;background:${phaseColors[pi]}08">
        <div class="flex-between flex-wrap gap-md mb-lg">
          <div>
            <div class="badge mb-sm" style="background:${phaseColors[pi]}20;color:${phaseColors[pi]}">${phase.icon} Month ${phase.month}</div>
            <h2 class="font-display">${cp.name}</h2>
          </div>
          <div style="text-align:right">
            <div class="font-display fw-800" style="font-size:28px;color:${phaseColors[pi]}">${done} / ${cp.tasks.length}</div>
            <div class="fs-xs text-muted">tasks done</div>
          </div>
        </div>
        <div class="progress-track mb-lg">
          <div class="progress-fill" style="width:${Math.round((done/cp.tasks.length)*100)}%;background:${phaseColors[pi]}"></div>
        </div>
        ${cp.tasks.map((task, ti) => `
          <div class="checkpoint-task" onclick="toggleCheckpointTask(${pi}, ${ti})">
            <div class="checkpoint-checkbox ${savedTasks[ti] ? 'checked' : ''}">${savedTasks[ti] ? '✓' : ''}</div>
            <div class="fs-sm ${savedTasks[ti] ? 'text-muted' : 'text-secondary'}" style="${savedTasks[ti] ? 'text-decoration:line-through' : ''}">${task}</div>
          </div>
        `).join('')}
        ${allDone ? `<div class="badge badge-emerald" style="margin-top:var(--sp-md)">✅ Checkpoint ${pi+1} สำเร็จ! +200 XP</div>` : ''}
      </div>
    `;
  }).join('');
}

function toggleCheckpointTask(phaseIdx, taskIdx) {
  const stateKey = `checkpoint_${phaseIdx}`;
  if (!state.checkpointTasks[stateKey]) state.checkpointTasks[stateKey] = {};
  const wasChecked = state.checkpointTasks[stateKey][taskIdx];
  state.checkpointTasks[stateKey][taskIdx] = !wasChecked;

  // Check if all done
  const cp = ROADMAP[phaseIdx].checkpoint;
  const allDone = cp.tasks.every((_, i) => state.checkpointTasks[stateKey][i]);
  if (allDone && !wasChecked) {
    addXP(200);
    showToast(`🏆 Checkpoint ${phaseIdx+1} สำเร็จ! +200 XP`, 'success');
  }
  saveState();
  initCheckpoints();
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
  ['errorWrong','errorCorrect','errorReason'].forEach(id => {
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

// ── EXAM DATE MODAL ──
function openExamBooking() {
  const modal = document.getElementById('examModal');
  if (modal) { modal.hidden = false; modal.style.display = 'flex'; }
  if (state.examDate) {
    const inp = document.getElementById('examDateInput');
    if (inp) inp.value = state.examDate;
  }
}

function closeExamModal() {
  const modal = document.getElementById('examModal');
  if (modal) { modal.hidden = true; modal.style.display = 'none'; }
}

function saveExamDate() {
  const val = document.getElementById('examDateInput').value;
  if (!val) { showToast('เลือกวันที่ก่อน', 'error'); return; }
  state.examDate = val;
  saveState();
  // Force immediate sync — don't wait 3s debounce for critical data
  if (typeof forceSyncToCloud === 'function') forceSyncToCloud();
  closeExamModal();
  showToast('📅 ตั้งวันสอบแล้ว! 💪', 'success');
  initDashboard();
  const examEl = document.getElementById('examDateDisplay');
  if (examEl) {
    const d = new Date(val);
    const days = Math.max(0, Math.ceil((d - new Date()) / 86400000));
    examEl.textContent = `📅 ${d.toLocaleDateString('th-TH')} (อีก ${days} วัน)`;
  }
}

// ── KEYBOARD SHORTCUTS ──
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'Escape') {
    closeGrammarDetail();
    closeExamModal();
  }
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

// ══════════════════════════════════════════════════
// GRAMMAR EXERCISES — Interactive MCQ
// ══════════════════════════════════════════════════
let currentExerciseTopic = null;
let exerciseAnswers = {};

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
  const appEl = document.getElementById('grammarAppSec');
  if (appEl) appEl.innerHTML = topic.appSecExamples.map(ex => `<div class="sentence-level-display" style="font-size:14px;padding:10px 14px;border-left-color:var(--indigo)">${ex}</div>`).join('');
  document.getElementById('grammarTip').textContent = topic.tip;
  const key = `grammar_practice_${id}`;
  const saved = state.grammarPractice[key];
  const savedBox = document.getElementById('grammarPracticeSaved');
  const savedText = document.getElementById('grammarPracticeText');
  const inp = document.getElementById('grammarPracticeInput');
  if (saved) { if (savedBox) savedBox.style.display = 'block'; if (savedText) savedText.textContent = saved; if (inp) inp.value = saved; }
  else { if (savedBox) savedBox.style.display = 'none'; if (inp) inp.value = ''; }
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Load exercises if available
  if (GRAMMAR_EXERCISES[id]) {
    showExercisePanel(id);
  }
}

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
  document.getElementById('exerciseScore').textContent = '0/5';
  const result = document.getElementById('exerciseResult');
  if (result) result.style.display = 'none';
  renderExerciseQuestions(exData.exercises);
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
          <span class="fs-xs text-muted">ข้อ ${i+1}</span>
        </div>
        <div class="fw-600 mb-md" style="font-size:15px">${ex.q}</div>
        ${ex.type === 'mcq' || ex.type === 'error' ? `
          <div style="display:flex;flex-direction:column;gap:8px">
            ${ex.options.map((opt, oi) => `
              <label style="display:flex;align-items:center;gap:10px;padding:10px;border-radius:var(--r-md);cursor:pointer;border:1px solid var(--border);transition:all 0.2s" 
                     class="ex-option" id="opt-${i}-${oi}"
                     onmouseover="this.style.borderColor='var(--indigo)'" 
                     onmouseout="if(!this.classList.contains('selected'))this.style.borderColor='var(--border)'">
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
  // Clear all options for this question
  document.querySelectorAll(`[id^="opt-${qIdx}-"]`).forEach(el => {
    el.classList.remove('selected');
    el.style.borderColor = 'var(--border)';
    el.style.background = '';
  });
  document.querySelectorAll(`[id^="radio-${qIdx}-"]`).forEach(el => el.textContent = '');
  // Mark selected
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
      if (isCorrect) {
        // Highlight correct option
        const correctOpt = document.getElementById(`opt-${i}-${ex.answer}`);
        if (correctOpt) { correctOpt.style.borderColor = 'var(--emerald)'; correctOpt.style.background = 'rgba(16,185,129,0.1)'; }
      } else {
        // Show correct, mark wrong
        if (userAnswer !== undefined) {
          const wrongOpt = document.getElementById(`opt-${i}-${userAnswer}`);
          if (wrongOpt) { wrongOpt.style.borderColor = 'var(--rose)'; wrongOpt.style.background = 'rgba(244,63,94,0.1)'; }
        }
        const correctOpt = document.getElementById(`opt-${i}-${ex.answer}`);
        if (correctOpt) { correctOpt.style.borderColor = 'var(--emerald)'; correctOpt.style.background = 'rgba(16,185,129,0.1)'; }
      }
    } else {
      // Text answer
      const inputEl = document.getElementById(`textEx-${i}`);
      const val = inputEl ? inputEl.value.trim().toLowerCase() : '';
      const ans = typeof ex.answer === 'string' ? ex.answer.toLowerCase() : '';
      isCorrect = val === ans || ans.includes(val.split(' ').filter(w=>w.length>3).join(' '));
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
        <div class="font-display fw-800" style="font-size:36px;color:${score>=80?'var(--emerald-light)':score>=60?'var(--amber-light)':'var(--rose-light)'}">${score}%</div>
        <div class="fw-600 mb-sm">${correct}/${exData.exercises.length} ข้อถูก</div>
        <div class="fs-sm text-muted">${score>=80?'🎉 ยอดเยี่ยม! เข้าใจดีมาก':score>=60?'👍 ดี! ลองทำใหม่ดูข้อที่ผิด':'💪 ยังไม่แม่น — อ่าน rule อีกครั้ง แล้วลองใหม่'}</div>
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
    document.getElementById('exerciseScore').textContent = '0/5';
  }
}

function closeExercisePanel() {
  const panel = document.getElementById('grammarExercisePanel');
  if (panel) panel.style.display = 'none';
  currentExerciseTopic = null;
}

// ══════════════════════════════════════════════════
// SPEAKING Q-BANK — Part 1, 2, 3
// ══════════════════════════════════════════════════
let activeSpeakTab = 'practice';

function setSpeakTab(tab) {
  activeSpeakTab = tab;
  ['practice','qbank','part2','part3'].forEach(t => {
    const panelEl = document.getElementById(`speakPanel-${t}`);
    const tabEl = document.getElementById(`speakTab-${t}`);
    if (panelEl) panelEl.style.display = t === tab ? 'block' : 'none';
    if (tabEl) tabEl.classList.toggle('active', t === tab);
  });
  if (tab === 'qbank') renderQBank();
  if (tab === 'part2') renderPart2Cards();
  if (tab === 'part3') renderPart3();
}

function renderQBank() {
  const c = document.getElementById('qbankContent');
  if (!c) return;
  c.innerHTML = SPEAKING_BANK.part1.map((topic, ti) => `
    <div class="card mb-lg">
      <div class="flex gap-md items-center mb-md">
        <span style="font-size:28px">${topic.icon}</span>
        <div>
          <div class="fw-700">${topic.topic}</div>
          <div class="fs-xs text-muted">${topic.questions.length} คำถาม</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${topic.questions.map((q, qi) => `
          <div class="card card-xs" style="cursor:pointer;transition:all 0.2s" onclick="toggleQAnswer(${ti},${qi})" id="qcard-${ti}-${qi}">
            <div class="flex-between">
              <div class="fs-sm fw-600">${q}</div>
              <span class="fs-xs text-muted" id="qToggle-${ti}-${qi}">▼ ดูตัวอย่าง</span>
            </div>
            ${q === topic.sampleQ ? `
              <div id="qanswer-${ti}-${qi}" style="display:none;margin-top:10px">
                <div class="divider" style="margin:8px 0"></div>
                <div class="fs-xs text-emerald fw-700 mb-sm">✅ SAMPLE ANSWER (Band ~6.5)</div>
                <div class="sentence-level-display" style="font-size:13px;padding:10px 14px;border-left-color:var(--emerald)">${topic.sampleA}</div>
                <div class="card card-xs mt-md" style="background:rgba(245,158,11,0.08);border-color:rgba(245,158,11,0.2)">
                  <div class="fs-xs text-amber fw-700 mb-sm">💡 ทำไม Answer นี้ถึงดี</div>
                  ${topic.whyGood.map(w => `<div class="fs-xs text-secondary">• ${w}</div>`).join('')}
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:8px">
                  ${topic.vocab.map(v => `<span class="phrase-chip">${v}</span>`).join('')}
                </div>
              </div>
            ` : `
              <div id="qanswer-${ti}-${qi}" style="display:none;margin-top:10px">
                <div class="divider" style="margin:8px 0"></div>
                <div class="fs-xs text-muted">💭 ลองพูดเองก่อน แล้วเปรียบเทียบกับหัวข้อ "<strong style="color:var(--amber-light)">${topic.sampleQ}</strong>" ด้านบน</div>
                <div class="card card-xs mt-sm" style="background:rgba(99,102,241,0.08)">
                  <div class="fs-xs text-indigo fw-700 mb-sm">Structure แนะนำ</div>
                  <div class="fs-xs text-secondary">Answer + Reason + Example/Detail + (if possible) Contrast or Extra info</div>
                </div>
              </div>
            `}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function toggleQAnswer(topicIdx, qIdx) {
  const el = document.getElementById(`qanswer-${topicIdx}-${qIdx}`);
  const toggle = document.getElementById(`qToggle-${topicIdx}-${qIdx}`);
  if (!el) return;
  const isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'block';
  if (toggle) toggle.textContent = isOpen ? '▼ ดูตัวอย่าง' : '▲ ซ่อน';
}

function renderPart2Cards() {
  const c = document.getElementById('part2Cards');
  if (!c) return;
  c.innerHTML = SPEAKING_BANK.part2.map((card, ci) => `
    <div class="card mb-lg" style="border-color:rgba(168,85,247,0.3)">
      <!-- Cue Card -->
      <div class="card mb-lg" style="background:rgba(168,85,247,0.1);border-color:rgba(168,85,247,0.3);text-align:center">
        <div class="fs-xs fw-700 mb-md" style="color:var(--violet);letter-spacing:1px">IELTS SPEAKING — PART 2</div>
        <div class="fw-800 font-display" style="font-size:20px;margin-bottom:var(--sp-lg)">${card.card}</div>
        <div style="text-align:left">
          <div class="fs-xs text-muted fw-700 mb-sm">You should say:</div>
          ${card.points.map(p => `<div class="fs-sm text-secondary" style="padding:4px 0;border-bottom:1px solid var(--border)">• ${p}</div>`).join('')}
        </div>
        <div class="flex gap-md mt-lg justify-center" style="justify-content:center">
          <div class="badge badge-indigo">⏱️ 1 min prep</div>
          <div class="badge badge-emerald">🗣️ 2 min speak</div>
        </div>
      </div>

      <!-- Tips -->
      <div class="card card-xs mb-md" style="background:rgba(245,158,11,0.08);border-color:rgba(245,158,11,0.2)">
        <div class="fs-xs text-amber fw-700 mb-sm">💡 Tips สำหรับบัตรนี้</div>
        ${card.tips.map(t => `<div class="fs-sm text-secondary">• ${t}</div>`).join('')}
      </div>

      <!-- Sample Answer (toggle) -->
      <button class="btn btn-ghost full-w" onclick="togglePart2Answer(${ci})">
        💬 ดู Sample Answer (Band 6.5)
      </button>
      <div id="p2answer-${ci}" style="display:none;margin-top:var(--sp-md)">
        <div class="card card-xs mb-md" style="background:rgba(16,185,129,0.08);border-color:rgba(16,185,129,0.2)">
          <div class="fs-xs text-emerald fw-700 mb-sm">✅ SAMPLE ANSWER</div>
          <div class="fs-sm text-secondary" style="white-space:pre-line;line-height:1.9">${card.sampleAnswer}</div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">
          ${card.keyVocab.map(v => `<span class="phrase-chip">${v}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function togglePart2Answer(idx) {
  const el = document.getElementById(`p2answer-${idx}`);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function renderPart3() {
  const c = document.getElementById('part3Content');
  if (!c) return;
  c.innerHTML = SPEAKING_BANK.part3.map((group, gi) => `
    <div class="card mb-lg">
      <div class="fw-700 mb-lg">${group.topic}</div>
      ${group.questions.map((item, qi) => `
        <div class="card card-xs mb-md">
          <div class="fs-sm fw-700 mb-md" style="color:var(--amber-light)">❓ ${item.q}</div>
          <div class="card card-xs mb-sm" style="background:rgba(99,102,241,0.08);border-color:rgba(99,102,241,0.2)">
            <div class="fs-xs text-indigo fw-700 mb-sm">💡 Approach</div>
            <div class="fs-xs text-secondary">${item.tip}</div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="toggleP3Answer(${gi},${qi})">ดู Sample Answer</button>
          <div id="p3answer-${gi}-${qi}" style="display:none;margin-top:10px">
            <div class="sentence-level-display" style="font-size:13px;padding:12px;border-left-color:var(--violet)">${item.sample}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function toggleP3Answer(gi, qi) {
  const el = document.getElementById(`p3answer-${gi}-${qi}`);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// ══════════════════════════════════════════════════
// READING PRACTICE — Interactive passages
// ══════════════════════════════════════════════════
let readingAnswers = {};

function renderReadingPractice() {
  const c = document.getElementById('readPracticeContent');
  if (!c) return;
  c.innerHTML = READING_PASSAGES.map((p, pi) => `
    <div class="card mb-xl" id="passage-${pi}">
      <!-- Header -->
      <div class="flex-between flex-wrap gap-md mb-lg">
        <div>
          <div class="badge badge-emerald mb-sm">${p.level}</div>
          <h2 class="font-display fw-800">${p.title}</h2>
        </div>
        <div class="flex gap-md">
          <div class="badge badge-indigo">📖 ${p.wordCount} words</div>
          <div class="badge badge-amber">⏱️ ${p.time} min</div>
        </div>
      </div>

      <!-- Passage -->
      <div class="card card-sm mb-xl" style="background:rgba(255,255,255,0.03);border-color:var(--border-strong)">
        <div class="fs-xs text-muted fw-700 mb-md" style="letter-spacing:1px">READING PASSAGE</div>
        <div style="font-size:15px;line-height:1.9;color:var(--text-secondary)">${p.passage.replace(/\n\n/g,'</p><p style="margin-top:12px">').replace(/^/,'<p>').replace(/$/, '</p>')}</div>
      </div>

      <!-- Strategy Tip -->
      <div class="card card-xs mb-xl" style="background:rgba(245,158,11,0.08);border-color:rgba(245,158,11,0.2)">
        <div class="fs-xs text-amber fw-700 mb-sm">⚡ Strategy</div>
        <div class="fs-sm text-secondary">T/F/NG: อ่าน statement → หาใน passage → ถ้าหาไม่เจอ = NOT GIVEN | ถ้าเจอแต่ขัดแย้ง = FALSE | ถ้าตรง = TRUE</div>
      </div>

      <!-- Questions -->
      <div class="fw-700 mb-md">📝 คำถาม</div>
      <div style="display:flex;flex-direction:column;gap:var(--sp-md)" id="readQs-${pi}">
        ${p.questions.map((q, qi) => `
          <div class="card card-xs" id="readQ-${pi}-${qi}">
            <div class="fs-sm fw-600 mb-md">${qi+1}. ${q.q}</div>
            ${q.type === 'tfng' ? `
              <div class="flex gap-sm flex-wrap">
                ${['TRUE','FALSE','NOT GIVEN'].map(opt => `
                  <label style="display:flex;align-items:center;gap:6px;cursor:pointer;padding:6px 14px;border-radius:var(--r-full);border:1px solid var(--border);font-size:13px;font-weight:600;transition:all 0.2s" 
                         class="tfng-opt" id="readOpt-${pi}-${qi}-${opt.replace(' ','_')}"
                         onmouseover="this.style.borderColor='var(--indigo)'"
                         onmouseout="checkTFNGHover(this,'${pi}','${qi}')">
                    <input type="radio" name="rq-${pi}-${qi}" value="${opt}" style="display:none"
                           onchange="selectReadAnswer('${pi}','${qi}','${opt}',this.closest('label'))">
                    ${opt}
                  </label>
                `).join('')}
              </div>
            ` : `
              <div style="display:flex;flex-direction:column;gap:6px">
                ${q.options.map((opt, oi) => `
                  <label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:8px 12px;border-radius:var(--r-md);border:1px solid var(--border);font-size:13px;transition:all 0.2s"
                         class="mcq-opt" id="readMCQ-${pi}-${qi}-${oi}">
                    <input type="radio" name="rmcq-${pi}-${qi}" value="${oi}" style="display:none"
                           onchange="selectReadAnswer('${pi}','${qi}','${oi}',this.closest('label'))">
                    <span class="fw-700" style="color:var(--indigo-light)">${String.fromCharCode(65+oi)}</span>
                    ${opt}
                  </label>
                `).join('')}
              </div>
            `}
            <div id="readFeedback-${pi}-${qi}" style="display:none;margin-top:8px"></div>
          </div>
        `).join('')}
      </div>

      <div class="flex gap-sm mt-lg">
        <button class="btn btn-primary" onclick="checkReadingAnswers(${pi})">✅ ตรวจคำตอบ</button>
        <button class="btn btn-ghost" onclick="resetReading(${pi})">🔄 ทำใหม่</button>
      </div>
      <div id="readResult-${pi}" style="display:none" class="card card-sm mt-md"></div>
    </div>
  `).join('');
}

function checkTFNGHover(el, pi, qi) {
  if (!readingAnswers[`${pi}-${qi}`]) el.style.borderColor = 'var(--border)';
}

function selectReadAnswer(pi, qi, val, labelEl) {
  readingAnswers[`${pi}-${qi}`] = val;
  // Clear siblings
  const name = `rq-${pi}-${qi}`;
  document.querySelectorAll(`input[name="${name}"], input[name="rmcq-${pi}-${qi}"]`)
    .forEach(inp => {
      const lbl = inp.closest('label');
      if (lbl) { lbl.style.background = ''; lbl.style.borderColor = 'var(--border)'; }
    });
  if (labelEl) { labelEl.style.background = 'var(--indigo-dim)'; labelEl.style.borderColor = 'var(--indigo)'; }
}

function checkReadingAnswers(pi) {
  const passage = READING_PASSAGES[pi];
  let correct = 0;
  passage.questions.forEach((q, qi) => {
    const userAns = readingAnswers[`${pi}-${qi}`];
    const feedbackEl = document.getElementById(`readFeedback-${pi}-${qi}`);
    const qCard = document.getElementById(`readQ-${pi}-${qi}`);
    let isCorrect = false;

    if (q.type === 'tfng') {
      isCorrect = userAns === q.answer;
      // Highlight correct/wrong
      ['TRUE','FALSE','NOT_GIVEN'].forEach(opt => {
        const el = document.getElementById(`readOpt-${pi}-${qi}-${opt}`);
        if (!el) return;
        const val = opt.replace('_',' ');
        if (val === q.answer) { el.style.background = 'rgba(16,185,129,0.15)'; el.style.borderColor = 'var(--emerald)'; el.style.color = 'var(--emerald-light)'; }
        else if (val === userAns && !isCorrect) { el.style.background = 'rgba(244,63,94,0.1)'; el.style.borderColor = 'var(--rose)'; el.style.color = 'var(--rose-light)'; }
      });
    } else {
      isCorrect = parseInt(userAns) === q.answer;
      q.options.forEach((_, oi) => {
        const el = document.getElementById(`readMCQ-${pi}-${qi}-${oi}`);
        if (!el) return;
        if (oi === q.answer) { el.style.background = 'rgba(16,185,129,0.15)'; el.style.borderColor = 'var(--emerald)'; }
        else if (oi === parseInt(userAns) && !isCorrect) { el.style.background = 'rgba(244,63,94,0.1)'; el.style.borderColor = 'var(--rose)'; }
      });
    }

    if (isCorrect) correct++;
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = `
        <div class="card card-xs" style="background:${isCorrect?'rgba(16,185,129,0.1)':'rgba(99,102,241,0.08)'};border-color:${isCorrect?'rgba(16,185,129,0.3)':'rgba(99,102,241,0.2)'}">
          <div class="fs-sm fw-700 mb-sm" style="color:${isCorrect?'var(--emerald-light)':'var(--indigo-light)'}">${isCorrect?'✅':'❌'} คำตอบ: <strong>${q.answer !== undefined && typeof q.answer === 'number' ? String.fromCharCode(65+q.answer) : q.answer}</strong></div>
          <div class="fs-sm text-secondary">${q.exp}</div>
        </div>
      `;
    }
    if (qCard) qCard.style.borderColor = isCorrect ? 'rgba(16,185,129,0.4)' : 'rgba(244,63,94,0.3)';
  });

  const score = Math.round((correct / passage.questions.length) * 100);
  const resultEl = document.getElementById(`readResult-${pi}`);
  if (resultEl) {
    resultEl.style.display = 'block';
    resultEl.innerHTML = `
      <div style="text-align:center">
        <div class="font-display fw-800" style="font-size:36px;color:${score>=80?'var(--emerald-light)':score>=60?'var(--amber-light)':'var(--rose-light)'}">${score}%</div>
        <div class="fw-600 mb-sm">${correct}/${passage.questions.length} ข้อถูก</div>
        <div class="fs-sm text-muted">${score>=80?'🎉 Reading ดีมาก!':score>=60?'👍 ดี — ลองอ่านอีกรอบ':score>=40?'💪 ยังต้องฝึก — อ่านช้าๆ แล้วหา keywords':'📖 เน้นอ่านทบทวน strategy ก่อน'}</div>
        <div class="fs-xs text-muted mt-sm">IELTS Reading: ถูก 30+/40 = Band 7+</div>
      </div>
    `;
    addXP(correct * 15);
  }
}

function resetReading(pi) {
  const passage = READING_PASSAGES[pi];
  passage.questions.forEach((_, qi) => {
    delete readingAnswers[`${pi}-${qi}`];
    const feedbackEl = document.getElementById(`readFeedback-${pi}-${qi}`);
    if (feedbackEl) feedbackEl.style.display = 'none';
    const qCard = document.getElementById(`readQ-${pi}-${qi}`);
    if (qCard) qCard.style.borderColor = 'var(--border)';
  });
  const resultEl = document.getElementById(`readResult-${pi}`);
  if (resultEl) resultEl.style.display = 'none';
  renderReadingPractice();
}

// ══════════════════════════════════════════════════
// WRITING PRACTICE — Prompts + Planning + Samples
// ══════════════════════════════════════════════════
let activeWriteTab = 'task1';
let activeWritingPrompt = null;

function setWritePracticeTab(tab) {
  activeWriteTab = tab;
  document.querySelectorAll('[id^="wpTab-"]').forEach(t => t.classList.remove('active'));
  const tabEl = document.getElementById(`wpTab-${tab}`);
  if (tabEl) tabEl.classList.add('active');
  renderWritePractice();
}

function renderWritePractice() {
  const c = document.getElementById('writePracticeContent');
  if (!c) return;

  if (activeWriteTab === 'task1') {
    c.innerHTML = WRITING_PROMPTS.task1.map((prompt, pi) => `
      <div class="card mb-lg" id="wp-t1-${pi}">
        <div class="flex-between flex-wrap gap-md mb-md">
          <div>
            <div class="badge badge-amber mb-sm">${prompt.icon} ${prompt.type}</div>
            <div class="fw-800 font-display">${prompt.title}</div>
          </div>
          <div class="flex gap-sm">
            <div class="badge badge-rose">⏱️ ${prompt.timeLimit} min</div>
            <div class="badge badge-indigo">${prompt.minWords}+ words</div>
          </div>
        </div>

        <!-- Task Prompt Box -->
        <div class="card card-sm mb-md" style="background:rgba(255,255,255,0.03);border:2px solid var(--border-strong)">
          <div class="fs-xs text-muted fw-700 mb-sm" style="letter-spacing:1px">TASK</div>
          <div class="fs-sm text-secondary" style="line-height:1.8">${prompt.prompt}</div>
          <div class="card card-xs mt-md" style="background:rgba(245,158,11,0.08);border-color:rgba(245,158,11,0.2)">
            <div class="fs-xs text-amber fw-700 mb-sm">📊 Data (จำลอง)</div>
            <div class="fs-sm text-secondary">${prompt.graphDesc}</div>
          </div>
        </div>

        <!-- Planning Guide -->
        <div class="card card-sm mb-md" style="background:rgba(99,102,241,0.06);border-color:rgba(99,102,241,0.2)">
          <div class="fs-xs text-indigo fw-700 mb-md">📋 Planning Guide (ใช้ 3-5 นาทีวางแผนก่อนเขียน)</div>
          ${prompt.planningGuide.map(g => `<div class="fs-sm text-secondary" style="padding:6px 0;border-bottom:1px solid var(--border)">${g}</div>`).join('')}
        </div>

        <!-- Writing Space -->
        <div class="mb-md">
          <div class="flex-between mb-sm">
            <label class="fs-sm fw-700">✍️ เขียน Response ของคุณ:</label>
            <span class="fs-xs text-muted" id="wc-t1-${pi}">0 words</span>
          </div>
          <textarea class="input-field" rows="10" id="writing-t1-${pi}" 
                    placeholder="Start writing here... (minimum ${prompt.minWords} words)"
                    oninput="countWords('t1-${pi}')" style="font-size:14px;line-height:1.8"></textarea>
        </div>

        <div class="flex gap-sm mb-md flex-wrap">
          <button class="btn btn-amber" onclick="showSampleAnswer('t1',${pi})">📖 ดู Sample Answer</button>
          <button class="btn btn-ghost" onclick="clearWriting('t1-${pi}')">🗑️ ล้าง</button>
        </div>

        <!-- Sample Answer (toggle) -->
        <div id="sample-t1-${pi}" style="display:none">
          <div class="divider"></div>
          <div class="fw-700 mb-md text-emerald">✅ Sample Answer (${prompt.sampleAnswer.bandEstimate})</div>
          <div class="sample-response mb-md">${prompt.sampleAnswer.text}</div>
          <div class="flex gap-sm mb-md">
            <span class="badge badge-emerald">${prompt.sampleAnswer.wordCount} words</span>
            <span class="badge badge-amber">${prompt.sampleAnswer.bandEstimate}</span>
          </div>
          <!-- Highlights -->
          <div class="grid grid-2 gap-sm mb-md">
            <div class="card card-xs" style="background:rgba(16,185,129,0.08)">
              <div class="fs-xs text-emerald fw-700 mb-sm">✅ Overview (สำคัญมาก!)</div>
              <div class="fs-xs text-secondary" style="font-style:italic">"${prompt.sampleAnswer.highlights.overview}"</div>
            </div>
            <div class="card card-xs" style="background:rgba(99,102,241,0.08)">
              <div class="fs-xs text-indigo fw-700 mb-sm">📊 Specific Data</div>
              <div class="fs-xs text-secondary" style="font-style:italic">"${prompt.sampleAnswer.highlights.specific}"</div>
            </div>
          </div>
          <div class="card card-xs" style="background:rgba(245,158,11,0.08);margin-bottom:10px">
            <div class="fs-xs text-amber fw-700 mb-sm">📚 Key Vocabulary ที่ควรจำ</div>
            <div>${prompt.sampleAnswer.highlights.vocabulary.map(v => `<span class="phrase-chip">${v}</span>`).join('')}</div>
          </div>
        </div>
      </div>
    `).join('');

  } else if (activeWriteTab === 'task2') {
    c.innerHTML = WRITING_PROMPTS.task2.map((prompt, pi) => `
      <div class="card mb-lg">
        <div class="flex-between flex-wrap gap-md mb-md">
          <div>
            <div class="badge badge-indigo mb-sm">${prompt.type}</div>
            <div class="fw-800 font-display">${prompt.title}</div>
          </div>
          <div class="flex gap-sm">
            <div class="badge badge-rose">⏱️ ${prompt.timeLimit} min</div>
            <div class="badge badge-emerald">${prompt.band}</div>
          </div>
        </div>

        <!-- Task Prompt -->
        <div class="card card-sm mb-md" style="background:rgba(255,255,255,0.03);border:2px solid var(--border-strong)">
          <div class="fs-xs text-muted fw-700 mb-sm">WRITING TASK 2</div>
          <div class="fw-600 mb-md" style="font-size:15px;line-height:1.7">${prompt.prompt}</div>
          <div class="fs-xs text-muted">Write at least ${prompt.minWords} words.</div>
        </div>

        <!-- Planning -->
        <div class="card card-sm mb-md" style="background:rgba(99,102,241,0.06);border-color:rgba(99,102,241,0.2)">
          <div class="fs-xs text-indigo fw-700 mb-md">📋 Planning (5 นาที)</div>
          ${prompt.planningGuide.map(g => `<div class="fs-sm text-secondary" style="padding:5px 0;border-bottom:1px solid var(--border)">${g}</div>`).join('')}
        </div>

        ${prompt.structure ? `
        <!-- Suggested Structure -->
        <div class="card card-sm mb-md" style="background:rgba(16,185,129,0.06);border-color:rgba(16,185,129,0.2)">
          <div class="fs-xs text-emerald fw-700 mb-md">🏗️ Suggested Structure</div>
          ${Object.entries(prompt.structure).map(([part, text]) => `
            <div style="padding:8px 0;border-bottom:1px solid var(--border)">
              <div class="fs-xs fw-700 text-emerald" style="text-transform:uppercase;margin-bottom:4px">${part}</div>
              <div class="fs-sm text-secondary">${text}</div>
            </div>
          `).join('')}
        </div>
        ` : ''}

        <!-- Writing Space -->
        <div class="mb-md">
          <div class="flex-between mb-sm">
            <label class="fs-sm fw-700">✍️ เขียน Essay ของคุณ:</label>
            <span class="fs-xs text-muted" id="wc-t2-${pi}">0 words</span>
          </div>
          <textarea class="input-field" rows="14" id="writing-t2-${pi}"
                    placeholder="Write your essay here..."
                    oninput="countWords('t2-${pi}')" style="font-size:14px;line-height:1.8"></textarea>
        </div>

        ${prompt.sampleAnswer && prompt.sampleAnswer.text && prompt.sampleAnswer.text !== '(ฝึกเขียนเอง — ใช้ structure ด้านบนเป็นแนวทาง)' ? `
        <button class="btn btn-emerald mb-lg" onclick="showSampleAnswer('t2',${pi})">📖 ดู Sample Answer + Analysis</button>
        <div id="sample-t2-${pi}" style="display:none">
          <div class="divider"></div>
          <div class="fw-700 mb-md text-emerald">✅ Sample Answer (${prompt.sampleAnswer.bandEstimate})</div>
          <div class="sample-response mb-md">${prompt.sampleAnswer.text}</div>
          <div class="flex gap-sm mb-md">
            <span class="badge badge-emerald">${prompt.sampleAnswer.wordCount} words</span>
            <span class="badge badge-amber">${prompt.sampleAnswer.bandEstimate}</span>
          </div>
          <div class="grid grid-2 gap-sm">
            ${Object.entries(prompt.sampleAnswer.analysis).map(([k,v]) => `
              <div class="card card-xs" style="background:rgba(16,185,129,0.08)">
                <div class="fs-xs text-emerald fw-700 mb-sm">${k.toUpperCase()}</div>
                <div class="fs-xs text-secondary">${v}</div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : `
        <div class="card card-xs" style="background:rgba(245,158,11,0.08)">
          <div class="fs-xs text-amber fw-700">💡 Practice Task</div>
          <div class="fs-xs text-secondary mt-sm">ฝึกเขียนเองโดยใช้ structure ด้านบน — เปรียบเทียบกับ Band Descriptors ในแท็บ "Band Scores"</div>
        </div>
        `}
      </div>
    `).join('');

  } else if (activeWriteTab === 'band') {
    c.innerHTML = `
      <div class="card mb-lg">
        <div class="fw-700 mb-lg">📊 Writing Band Score Descriptors</div>
        <div class="fs-sm text-muted mb-lg">เปรียบเทียบ essay ของตัวเองกับ descriptor นี้เพื่อประเมิน band ที่น่าจะได้</div>
        ${Object.entries(BAND_DESCRIPTORS.writing).map(([band, desc]) => `
          <div class="card card-sm mb-md" style="border-left:4px solid ${band==='7.0'?'var(--emerald)':band==='6.5'?'var(--indigo)':band==='6.0'?'var(--amber)':'var(--rose)'}">
            <div class="font-display fw-800 mb-md" style="font-size:22px;color:${band==='7.0'?'var(--emerald-light)':band==='6.5'?'var(--indigo-light)':band==='6.0'?'var(--amber-light)':'var(--rose-light)'}">Band ${band}</div>
            <div class="grid grid-2 gap-sm">
              <div><div class="fs-xs text-muted fw-700 mb-sm">Task Achievement</div><div class="fs-sm text-secondary">${desc.ta}</div></div>
              <div><div class="fs-xs text-muted fw-700 mb-sm">Coherence</div><div class="fs-sm text-secondary">${desc.cc}</div></div>
              <div><div class="fs-xs text-muted fw-700 mb-sm">Vocabulary</div><div class="fs-sm text-secondary">${desc.lr}</div></div>
              <div><div class="fs-xs text-muted fw-700 mb-sm">Grammar</div><div class="fs-sm text-secondary">${desc.gr}</div></div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="card card-sm">
        <div class="fw-700 mb-md" style="color:var(--amber-light)">🎯 เป้าหมายของคุณ: Band 6.0</div>
        <div class="fs-sm text-secondary mb-md">เพื่อ IELTS Overall 6.0-6.5 → Writing ต้องได้อย่างน้อย Band 5.5-6.0</div>
        <div class="fw-700 mb-sm">Speaking Band Descriptors</div>
        ${Object.entries(BAND_DESCRIPTORS.speaking).map(([band, desc]) => `
          <div style="padding:8px 0;border-bottom:1px solid var(--border);display:flex;gap:12px;align-items:center">
            <div class="font-display fw-800" style="font-size:18px;min-width:50px;color:var(--indigo-light)">B${band}</div>
            <div class="fs-sm text-secondary">${desc}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function countWords(id) {
  const el = document.getElementById(`writing-${id}`);
  const countEl = document.getElementById(`wc-${id}`);
  if (!el || !countEl) return;
  const words = el.value.trim().split(/\s+/).filter(w => w.length > 0).length;
  const min = id.startsWith('t1') ? 150 : 250;
  countEl.textContent = `${words} words`;
  countEl.style.color = words >= min ? 'var(--emerald-light)' : words >= min * 0.8 ? 'var(--amber-light)' : 'var(--rose-light)';
}

function showSampleAnswer(type, idx) {
  const el = document.getElementById(`sample-${type}-${idx}`);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function clearWriting(id) {
  const el = document.getElementById(`writing-${id}`);
  if (el) { el.value = ''; countWords(id); }
}

// ── OVERRIDE showIELTSSkill to handle new panels ──
function showIELTSSkill(skill) {
  activeIELTSSkill = skill;
  document.querySelectorAll('.ielts-skill-panel').forEach(p => p.style.display = 'none');
  const panel = document.getElementById(`ielts-${skill}`);
  if (panel) panel.style.display = 'block';
  document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
  const skillOrder = ['reading','listening','task1','task2','speaking','readpractice','writepractice'];
  const idx = skillOrder.indexOf(skill);
  const tabs = document.querySelectorAll('.skill-tab');
  if (tabs[idx]) tabs[idx].classList.add('active');

  // Lazy-load content
  if (skill === 'readpractice') renderReadingPractice();
  if (skill === 'writepractice') renderWritePractice();
  if (skill === 'reading') renderReadingSkills();
  if (skill === 'listening') renderListeningSkills();
  if (skill === 'task1') renderTask1();
  if (skill === 'task2') renderTask2();
  if (skill === 'speaking') renderSpeakingParts();
}

// ── INIT ──
function init() {
  checkStreak();
  updateXPBar();
  navigate(state.activeSection || 'dashboard');
  // Try to connect Firebase if config exists
  if (typeof tryAutoInitFirebase === 'function') tryAutoInitFirebase();
  setTimeout(() => showToast('🚀 ยินดีต้อนรับสู่ IELTS Journey! เริ่ม Day 1 เลย', 'info'), 1000);
}

init();

