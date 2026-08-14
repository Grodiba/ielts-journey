// ── IELTS Journey — Practice Content ──
// Real exercises: Grammar MCQ, Reading Passages, Speaking Q-Bank, Writing Prompts

// ══════════════════════════════════════════════════
// GRAMMAR EXERCISES — Interactive MCQ + Gap Fill
// 5 questions per topic with explanations
// ══════════════════════════════════════════════════
const GRAMMAR_EXERCISES = {
  'svo': {
    intro: 'S+V+O คือโครงสร้างหลักของประโยคภาษาอังกฤษ ทุกประโยคต้องมี Subject (ใคร) + Verb (ทำอะไร) + Object (กับอะไร/ใคร)',
    exercises: [
      { type: 'mcq', q: 'Which sentence has the correct S+V+O structure?', options: ['Security check I the app.', 'I check the app for security.', 'The app security I check.', 'Check I security the app.'], answer: 1, exp: '✅ I (S) + check (V) + the app for security (O) — Subject มาก่อน Verb เสมอ' },
      { type: 'gap', q: 'I _____ security vulnerabilities every week.', answer: 'report', options: ['report', 'reporting', 'reported', 'reports to'], exp: '✅ report — หลัง I ใช้ base verb ไม่เติม -s' },
      { type: 'mcq', q: 'My team _____ applications before release.', options: ['check it the', 'checks the', 'the checks', 'checking'], answer: 1, exp: '✅ checks the — My team = 3rd person singular → ต้องเติม -s ที่ verb' },
      { type: 'error', q: 'Find the error: "Developers the fix vulnerabilities that I find."', answer: 'ลำดับผิด — Verb (fix) ต้องอยู่หลัง Subject (Developers) ไม่ใช่ตรงกลาง', options: ['ลำดับผิด — Verb ต้องอยู่หลัง Subject', '"the" เกิน', 'ใช้ fix ผิด', 'ไม่มีข้อผิดพลาด'], exp: '✅ ประโยคที่ถูก: "Developers fix the vulnerabilities that I find." (S+V+O)' },
      { type: 'build', q: 'เรียงคำให้ถูก: [the team / reports / I / to / vulnerabilities]', answer: 'I report vulnerabilities to the team.', exp: '✅ I (S) + report (V) + vulnerabilities (O) + to the team (Prepositional phrase)' }
    ]
  },
  'be-do-have': {
    intro: 'be/do/have เป็นกริยา 3 ตัวที่ใช้บ่อยที่สุด และแต่ละตัวมีรูปแบบเฉพาะตาม Subject',
    exercises: [
      { type: 'mcq', q: 'I _____ responsible for application security.', options: ['am', 'is', 'are', 'be'], answer: 0, exp: '✅ am — I + am (be verb สำหรับ I)' },
      { type: 'mcq', q: 'She _____ penetration testing every quarter.', options: ['do', 'does', 'doing', 'have done'], answer: 1, exp: '✅ does — she/he/it + does (3rd person singular ของ do)' },
      { type: 'gap', q: 'Our team _____ a bug bounty program.', answer: 'has', options: ['have', 'has', 'is', 'are'], exp: '✅ has — Our team = 3rd person singular → have → has' },
      { type: 'error', q: 'Find the error: "They is working on the new security patch."', answer: 'is → are (They = plural)', options: ['is → are (They = plural)', 'working → work', 'on → in', 'ไม่มีข้อผิดพลาด'], exp: '✅ They are working on the new security patch. — They ต้องใช้ are ไม่ใช่ is' },
      { type: 'mcq', q: 'The company _____ not have a security policy yet.', options: ['do', 'does', 'is', 'are'], answer: 1, exp: '✅ does — The company (singular) → does not have (ไม่ใช่ do not)' }
    ]
  },
  'present-simple': {
    intro: 'Present Simple ใช้กับ: นิสัย ความจริง สิ่งที่ทำประจำ Signal words: always, usually, often, sometimes, never, every day/week',
    exercises: [
      { type: 'mcq', q: 'She _____ applications before they are released. (routine)', options: ['assess', 'assesses', 'is assessing', 'assessed'], answer: 1, exp: '✅ assesses — 3rd person singular ใน Present Simple เติม -s ที่ verb' },
      { type: 'gap', q: 'I usually _____ (work) from home on Fridays.', answer: 'work', options: ['work', 'works', 'working', 'am work'], exp: '✅ work — I + base verb (ไม่เติม -s สำหรับ I)' },
      { type: 'mcq', q: 'ประโยคไหนเป็น Present Simple ที่ถูกต้อง?', options: ['I am checking security every day.', 'I checks security every day.', 'I check security every day.', 'I checking security every day.'], answer: 2, exp: '✅ I check — Present Simple: I + base verb | "every day" = signal word ของ routine' },
      { type: 'error', q: 'Find the error: "The team release an update every Friday."', answer: 'release → releases (The team = singular)', options: ['release → releases', 'every → each', 'update → updates', 'ไม่มีข้อผิดพลาด'], exp: '✅ The team releases — The team = singular → ต้องเติม -s' },
      { type: 'mcq', q: 'Signal word ไหนที่ใช้คู่กับ Present Simple?', options: ['now', 'yesterday', 'usually', 'at the moment'], answer: 2, exp: '✅ usually = signal word ของ Present Simple (routine) | now/at the moment = Present Continuous | yesterday = Past Simple' }
    ]
  },
  'present-continuous': {
    intro: 'Present Continuous ใช้กับสิ่งที่กำลังเกิดขึ้น ตอนนี้ หรือช่วงนี้ รูป: am/is/are + V-ing',
    exercises: [
      { type: 'mcq', q: 'I _____ for IELTS at the moment. (currently)', options: ['study', 'studies', 'am studying', 'studied'], answer: 2, exp: '✅ am studying — at the moment = signal word ของ Present Continuous → am + V-ing' },
      { type: 'gap', q: 'The developers _____ (fix) the vulnerability right now.', answer: 'are fixing', options: ['fix', 'fixes', 'are fixing', 'is fixing'], exp: '✅ are fixing — The developers (plural) + are + V-ing' },
      { type: 'mcq', q: 'ประโยคไหนผิด?', options: ['I am learning English.', 'She is studying cybersecurity.', 'We are preparing for the exam.', 'He am working on a new project.'], answer: 3, exp: '✅ ผิดตรง "He am" — He ต้องใช้ is → He is working on a new project.' },
      { type: 'error', q: 'Find the error: "Our company are developing a new security tool these days."', answer: 'ถูกต้อง — Our company = singular ควรใช้ is, ไม่ใช่ are', options: ['Our company is developing... (company = singular)', 'these days → this day', 'developing → develop', 'ไม่มีข้อผิดพลาด'], exp: '✅ Our company IS developing — company เป็น singular noun → is' },
      { type: 'mcq', q: '"These days" เป็น signal word ของ tense ไหน?', options: ['Past Simple', 'Present Simple', 'Present Continuous', 'Present Perfect'], answer: 2, exp: '✅ Present Continuous — these days, currently, at the moment, right now → am/is/are + V-ing' }
    ]
  },
  'past-simple': {
    intro: 'Past Simple ใช้กับเหตุการณ์ที่เสร็จสิ้นในอดีต รูป: V2 หรือ irregular verbs Signal words: yesterday, ago, last week/year, in 2020, when I was...',
    exercises: [
      { type: 'mcq', q: 'I _____ a critical vulnerability last week.', options: ['find', 'found', 'have found', 'finding'], answer: 1, exp: '✅ found — Past Simple ของ find คือ found (irregular verb) | last week = signal word' },
      { type: 'gap', q: 'She _____ (decide) to study abroad two years ago.', answer: 'decided', options: ['decide', 'decided', 'has decided', 'deciding'], exp: '✅ decided — two years ago = Past Simple | regular verb: decide + -d' },
      { type: 'mcq', q: 'Irregular verb ของ "go" คืออะไร?', options: ['goed', 'gone', 'went', 'was go'], answer: 2, exp: '✅ went — go → went (irregular) | gone ใช้กับ Present Perfect เท่านั้น' },
      { type: 'error', q: 'Find the error: "The team fix all the security issues before the launch last month."', answer: 'fix → fixed (Past Simple)', options: ['fix → fixed', 'all → every', 'before → prior', 'ไม่มีข้อผิดพลาด'], exp: '✅ The team fixed — last month = Past Simple signal → ต้องใช้ V2 (fixed)' },
      { type: 'mcq', q: '"When I was in university" บอกว่าใช้ tense อะไร?', options: ['Present Simple', 'Past Simple', 'Present Perfect', 'Future'], answer: 1, exp: '✅ Past Simple — "when I was young/in university" = อดีตที่เสร็จสิ้นแล้ว' }
    ]
  },
  'future': {
    intro: 'will = ตัดสินใจทันที หรือทำนาย | going to = มีแผนอยู่แล้ว หรือแน่ใจว่าจะเกิด',
    exercises: [
      { type: 'mcq', q: 'I _____ apply for IELTS next month. (I already have a plan)', options: ["will apply", "am going to apply", "apply", "applied"], answer: 1, exp: '✅ am going to apply — มีแผนอยู่แล้ว → going to | will ใช้เมื่อตัดสินใจตอนนั้น หรือทำนาย' },
      { type: 'mcq', q: 'A: "The laptop is broken." B: "Don\'t worry, I _____ fix it." (spontaneous decision)', options: ["am going to", "will", "am", "was going to"], answer: 1, exp: '✅ will fix — ตัดสินใจทันทีตอนนั้น → will | ถ้ามีแผนก่อนแล้ว → going to' },
      { type: 'gap', q: 'Look at those dark clouds! It _____ (rain).', answer: 'is going to rain', options: ['will rain', 'is going to rain', 'rains', 'rained'], exp: '✅ is going to rain — เห็นหลักฐานชัดเจน (dark clouds) = going to สำหรับ near future certainty' },
      { type: 'error', q: 'Find the error: "I will to study in Taiwan next year."', answer: '"will to" ผิด — will + base verb (ไม่มี to)', options: ['will to → will (ไม่มี to หลัง will)', '"study" → "studying"', '"next year" → "the next year"', 'ไม่มีข้อผิดพลาด'], exp: '✅ I will study — will + base verb (ไม่มี to) เช่น will go, will study, will apply' },
      { type: 'mcq', q: 'ประโยคไหนแสดงถึง "แผนที่วางไว้แล้ว"?', options: ["I'll call you later.", "It will snow tomorrow.", "She is going to present her findings next week.", "Maybe it will be difficult."], answer: 2, exp: '✅ is going to present — แผนชัดเจน (next week, specific event) = going to | I\'ll call / maybe = will' }
    ]
  },
  'present-perfect': {
    intro: 'Present Perfect ใช้กับ: ประสบการณ์ที่มี / เหตุการณ์ที่มีผลถึงตอนนี้ รูป: have/has + V3 Signal: already, yet, just, ever, never, for, since',
    exercises: [
      { type: 'mcq', q: 'I _____ in cybersecurity for 3 years. (still working there)', options: ['work', 'worked', 'have worked', 'am working'], answer: 2, exp: '✅ have worked — for + period of time + still ongoing = Present Perfect | "for 3 years" = signal' },
      { type: 'gap', q: 'She _____ (never / be) to Taiwan.', answer: 'has never been', options: ['never went', 'has never been', 'never goes', 'has never go'], exp: '✅ has never been — never + experience = Present Perfect | be → been (V3)' },
      { type: 'mcq', q: '"Since 2022" เป็น signal ของ tense ไหน?', options: ['Past Simple', 'Present Simple', 'Present Perfect', 'Future'], answer: 2, exp: '✅ Present Perfect — since + point of time = เริ่มตั้งแต่นั้นจนถึงตอนนี้ = have/has + V3' },
      { type: 'error', q: 'Find the error: "I have submitted my IELTS application yesterday."', answer: 'yesterday ใช้กับ Past Simple ไม่ใช่ Present Perfect', options: ['yesterday → ควรตัดออก หรือเปลี่ยนเป็น Past Simple', '"have submitted" → "submitted"', 'ทั้ง a และ b ถูก', 'ไม่มีข้อผิดพลาด'], exp: '✅ yesterday = past specific time = Past Simple → "I submitted my IELTS application yesterday." | หรือ "I have already submitted my application." (ไม่ระบุเวลา)' },
      { type: 'mcq', q: 'ประโยคไหนถูกต้อง?', options: ['I have gone there last year.', 'She has just finished the exam.', 'We have met him yesterday.', 'They have worked there in 2019.'], answer: 1, exp: '✅ She has just finished — just = signal ของ Present Perfect | last year/yesterday/in 2019 = Past Simple' }
    ]
  },
  'to-verb': {
    intro: 'to + base verb ใช้หลัง: want, need, plan, decide, hope, try, expect, would like, refuse, manage ฯลฯ หรือแสดงจุดประสงค์',
    exercises: [
      { type: 'mcq', q: 'I want _____ study in Taiwan.', options: ['study', 'to study', 'studying', 'studied'], answer: 1, exp: '✅ to study — want + to + verb | กริยาที่ตามด้วย to-infinitive: want, need, plan, decide, hope' },
      { type: 'gap', q: 'I need _____ (improve) my English to work internationally.', answer: 'to improve', options: ['improve', 'improving', 'to improve', 'improved'], exp: '✅ to improve — need + to + base verb' },
      { type: 'mcq', q: 'ประโยคไหนแสดงจุดประสงค์ (purpose) ถูกต้อง?', options: ['I study English for to get IELTS.', 'I study English to get IELTS.', 'I study English for getting IELTS.', 'I study English for get IELTS.'], answer: 1, exp: '✅ to get — แสดงจุดประสงค์ใช้ to + base verb ไม่มี "for to" ในภาษาอังกฤษ' },
      { type: 'error', q: 'Find the error: "She decided studying abroad next year."', answer: '"decided studying" ผิด — decide + to + verb', options: ['decided studying → decided to study', '"abroad" → "for abroad"', '"next year" → "the next year"', 'ไม่มีข้อผิดพลาด'], exp: '✅ decided to study — decide + to + base verb (ไม่ใช่ V-ing)' },
      { type: 'mcq', q: 'กริยาไหนตามด้วย to + verb?', options: ['enjoy', 'avoid', 'hope', 'finish'], answer: 2, exp: '✅ hope + to + verb | enjoy/avoid/finish ตามด้วย V-ing' }
    ]
  },
  'verb-ing': {
    intro: 'V-ing (Gerund) ใช้หลัง: enjoy, avoid, consider, keep, finish, practice, suggest, mind, miss ฯลฯ หรือเป็น subject ของประโยค',
    exercises: [
      { type: 'mcq', q: 'I enjoy _____ security vulnerabilities.', options: ['find', 'to find', 'finding', 'found'], answer: 2, exp: '✅ finding — enjoy + V-ing (ไม่ใช่ to + verb)' },
      { type: 'gap', q: '_____ (Study) English every day is important.', answer: 'Studying', options: ['Study', 'Studying', 'To study', 'Studied'], exp: '✅ Studying — V-ing ใช้เป็น Subject ของประโยค ได้ (หรือ To study ก็ได้ในกรณีนี้)' },
      { type: 'mcq', q: 'ประโยคไหนถูกต้อง?', options: ['I avoid to use simple passwords.', 'I avoid using simple passwords.', 'I avoid use simple passwords.', 'I avoiding simple passwords.'], answer: 1, exp: '✅ avoid using — avoid + V-ing | คำกลุ่ม avoid/enjoy/mind/keep/finish + V-ing' },
      { type: 'error', q: 'Find the error: "She keeps to practice speaking every day."', answer: '"to practice" ผิด — keep + V-ing', options: ['to practice → practicing', '"every day" → "everyday"', '"She" → "Her"', 'ไม่มีข้อผิดพลาด'], exp: '✅ keeps practicing — keep + V-ing | She keeps practicing speaking every day.' },
      { type: 'mcq', q: 'กริยาไหนตามด้วย V-ing?', options: ['decide', 'want', 'plan', 'practice'], answer: 3, exp: '✅ practice + V-ing | decide/want/plan + to + verb' }
    ]
  },
  'conjunctions': {
    intro: 'because = เพราะ | so = ดังนั้น | but = แต่ | although = แม้ว่า\nใช้เชื่อมประโยคให้มีความหมายซับซ้อนขึ้น',
    exercises: [
      { type: 'mcq', q: 'I study English _____ I want to work in Taiwan.', options: ['so', 'but', 'because', 'although'], answer: 2, exp: '✅ because — เหตุผล (reason) ใช้ because | so = ผลลัพธ์' },
      { type: 'mcq', q: 'The exam was difficult, _____ I passed it.', options: ['because', 'so', 'although', 'but'], answer: 3, exp: '✅ but — contrast (ขัดแย้ง) แต่อยู่กลางประโยค ใช้ but | although อยู่ต้นประโยค' },
      { type: 'gap', q: '_____ English is hard, I enjoy learning it.', answer: 'Although', options: ['But', 'Because', 'Although', 'So'], exp: '✅ Although — แม้ว่า (contrast ที่ต้นประโยค) | But ใช้กลางประโยคเท่านั้น' },
      { type: 'error', q: 'Find the error: "Although she studied hard, but she failed."', answer: 'ใช้ Although และ but ด้วยกันไม่ได้ — เลือกอันเดียว', options: ['ตัด but ออก หรือ ตัด Although ออก', '"studied" → "was studying"', '"failed" → "was failed"', 'ไม่มีข้อผิดพลาด'], exp: '✅ เลือกอันใดอันหนึ่ง: "Although she studied hard, she failed." หรือ "She studied hard, but she failed."' },
      { type: 'mcq', q: 'ประโยคไหนใช้ "so" ถูกต้อง?', options: ['So I was tired, I went to bed.', 'I was tired so I went to bed.', 'I was tired, so, I went to bed.', 'I so tired went to bed.'], answer: 1, exp: '✅ I was tired so I went to bed. — [Cause], so [Result] | so อยู่กลางประโยค เชื่อม cause → result' }
    ]
  },
  'if-when': {
    intro: 'if = ถ้า (ยังไม่แน่ว่าจะเกิด) | when = เมื่อ/ตอนที่ (แน่ใจว่าจะเกิด)\nType 1 Conditional: If + present, will + base verb (real/possible condition)',
    exercises: [
      { type: 'mcq', q: 'If I get IELTS 6.5, I _____ apply to Taiwan.', options: ['apply', 'will apply', 'would apply', 'applied'], answer: 1, exp: '✅ will apply — Type 1 Conditional: If + present simple, will + base verb (real condition)' },
      { type: 'gap', q: '_____ I finish studying, I will work abroad.', answer: 'When', options: ['If', 'When', 'Although', 'Because'], exp: '✅ When — แน่ว่าจะจบเรียน (เป็นแผน ไม่ใช่ condition) → When | If ใช้เมื่อไม่แน่' },
      { type: 'mcq', q: 'If you _____ hard, you will improve your English.', options: ['study', 'will study', 'studied', 'studies'], answer: 0, exp: '✅ study — Type 1: If + present simple (ไม่ใช่ will ใน If-clause)' },
      { type: 'error', q: 'Find the error: "If I will pass the exam, I will celebrate."', answer: '"will pass" ผิด — If-clause ใช้ Present Simple', options: ['will pass → pass (ไม่ใช้ will ใน If-clause)', '"will celebrate" → "celebrate"', '"the exam" → "an exam"', 'ไม่มีข้อผิดพลาด'], exp: '✅ If I pass the exam, I will celebrate. — If-clause: present simple | Main clause: will + base verb' },
      { type: 'mcq', q: 'ประโยคไหนถูกต้อง?', options: ['When will you finish, tell me.', 'When you finish, tell me.', 'When you will finish, tell me.', 'When finishing, you tell me.'], answer: 1, exp: '✅ When you finish, tell me. — Time clause (when/if): ใช้ Present Simple เสมอ ไม่ใช้ will' }
    ]
  }
};

// ══════════════════════════════════════════════════
// READING PASSAGES — IELTS Academic Style
// ══════════════════════════════════════════════════
const READING_PASSAGES = [
  {
    id: 'cybersecurity-career',
    title: 'Cybersecurity: A Growing Global Career',
    level: 'B1-B2',
    wordCount: 320,
    time: 15,
    passage: `The field of cybersecurity has transformed from a niche technical discipline into one of the most in-demand career paths of the 21st century. As organisations worldwide digitise their operations, the need to protect sensitive data and digital infrastructure has grown exponentially.

According to the International Information System Security Certification Consortium (ISC²), there is currently a global shortage of nearly 3.4 million cybersecurity professionals. This gap between supply and demand has driven salaries significantly higher than in comparable technology fields. Entry-level positions in cybersecurity now often command salaries that would take five or more years to reach in other sectors.

The appeal of cybersecurity extends beyond financial rewards. Professionals in this field frequently cite intellectual stimulation as a primary motivator. Unlike many technology roles, cybersecurity requires constant adaptation — attackers continuously develop new techniques, which means defenders must always be learning. This creates an environment where complacency is not an option.

However, entering the cybersecurity field is not without challenges. Many roles require specialised certifications such as the Certified Information Systems Security Professional (CISSP) or Certified Ethical Hacker (CEH). Universities have also begun offering dedicated cybersecurity programmes at both undergraduate and postgraduate levels, with institutions in Taiwan, Singapore, and the United States particularly noted for their academic excellence in this domain.

For professionals seeking international career opportunities, a strong command of English is increasingly essential. Most cutting-edge research, technical documentation, and industry certifications are published exclusively in English. Therefore, investing in English language proficiency — particularly through qualifications such as IELTS — is now considered a strategic career move for cybersecurity professionals in non-English-speaking countries.`,
    questions: [
      { type: 'tfng', id: 'rq1', q: 'There are more cybersecurity jobs available than qualified professionals to fill them.', answer: 'TRUE', exp: '✅ TRUE — "a global shortage of nearly 3.4 million cybersecurity professionals" = อุปสงค์มากกว่าอุปทาน' },
      { type: 'tfng', id: 'rq2', q: 'Cybersecurity salaries are generally lower than salaries in comparable technology fields.', answer: 'FALSE', exp: '✅ FALSE — "salaries significantly higher than in comparable technology fields" ซึ่งขัดแย้งกับคำถาม' },
      { type: 'tfng', id: 'rq3', q: 'Taiwan is specifically mentioned as a location with strong cybersecurity academic programmes.', answer: 'TRUE', exp: '✅ TRUE — "institutions in Taiwan, Singapore, and the United States particularly noted for academic excellence"' },
      { type: 'tfng', id: 'rq4', q: 'IELTS is the only English qualification mentioned in the passage.', answer: 'NOT GIVEN', exp: '✅ NOT GIVEN — บทความพูดถึง IELTS แต่ไม่ได้บอกว่าเป็น "only" qualification' },
      { type: 'mcq', id: 'rq5', q: 'According to the passage, why do cybersecurity professionals find their work intellectually stimulating?', options: ['Because salaries are very high', 'Because attackers constantly develop new techniques, requiring constant learning', 'Because the work involves little repetition', 'Because certifications are easy to obtain'], answer: 1, exp: '✅ B — "attackers continuously develop new techniques, which means defenders must always be learning" = intellectual stimulation' },
      { type: 'mcq', id: 'rq6', q: 'What does the passage suggest about English language skills for cybersecurity professionals?', options: ['They are optional for international careers', 'They are only needed for academic research', 'They are increasingly essential for international careers', 'They are less important than technical certifications'], answer: 2, exp: '✅ C — "a strong command of English is increasingly essential" and "investing in English language proficiency is a strategic career move"' }
    ]
  },
  {
    id: 'taiwan-education',
    title: 'Studying Abroad in Taiwan: Opportunities and Challenges',
    level: 'B2',
    wordCount: 280,
    time: 12,
    passage: `Taiwan has emerged as an increasingly popular destination for international postgraduate students, particularly those pursuing degrees in technology, engineering, and computer science. The island's universities have risen significantly in global rankings over the past decade, with institutions such as National Taiwan University and National Tsing Hua University now competing with universities in neighbouring Japan and South Korea for top talent.

One of the primary attractions is cost. Tuition fees at Taiwanese universities are considerably lower than at comparable institutions in the United States, the United Kingdom, or Australia. Furthermore, the Taiwanese government offers a range of scholarship programmes specifically designed to attract international students, including the Taiwan Scholarship Program administered by the Ministry of Education.

The medium of instruction presents both a challenge and an opportunity. While most postgraduate programmes at top Taiwanese universities are now offered in English, students who make an effort to learn Mandarin Chinese often find that doing so opens additional doors — both socially and professionally. Many international students report that their time in Taiwan not only enhanced their academic knowledge but also significantly improved their cross-cultural communication skills.

However, prospective students should be aware of certain challenges. Competition for scholarship places is fierce, and universities typically require strong academic records alongside demonstrated English language proficiency through internationally recognised tests such as IELTS or TOEFL. Applicants who begin preparing early — ideally 12 to 18 months before their intended start date — tend to have significantly higher success rates.`,
    questions: [
      { type: 'tfng', id: 'rq7', q: 'National Taiwan University is mentioned as competing with universities in Japan and South Korea.', answer: 'TRUE', exp: '✅ TRUE — "competing with universities in neighbouring Japan and South Korea"' },
      { type: 'tfng', id: 'rq8', q: 'Taiwan offers lower tuition fees than universities in the United States and Australia.', answer: 'TRUE', exp: '✅ TRUE — "Tuition fees at Taiwanese universities are considerably lower than at comparable institutions in the United States...or Australia"' },
      { type: 'tfng', id: 'rq9', q: 'All postgraduate programmes in Taiwan are taught in Mandarin Chinese.', answer: 'FALSE', exp: '✅ FALSE — "most postgraduate programmes at top Taiwanese universities are now offered in English"' },
      { type: 'tfng', id: 'rq10', q: 'The passage states that IELTS is the only acceptable English test for Taiwan scholarship applications.', answer: 'NOT GIVEN', exp: '✅ NOT GIVEN — บทความพูดถึง "IELTS or TOEFL" ไม่ได้บอกว่า IELTS เป็นแค่อย่างเดียว' },
      { type: 'mcq', id: 'rq11', q: 'What advice does the passage give to prospective students?', options: ['Apply to multiple countries simultaneously', 'Learn Mandarin before applying', 'Begin preparation 12-18 months before the start date', 'Only apply to National Taiwan University'], answer: 2, exp: '✅ C — "Applicants who begin preparing early — ideally 12 to 18 months before their intended start date — tend to have significantly higher success rates"' }
    ]
  }
];

// ══════════════════════════════════════════════════
// SPEAKING QUESTION BANK — Part 1, 2, 3
// ══════════════════════════════════════════════════
const SPEAKING_BANK = {
  part1: [
    {
      topic: 'Work & Career',
      icon: '💼',
      questions: [
        'What do you do for a living?',
        'Do you enjoy your work? Why or why not?',
        'What is the most challenging part of your job?',
        'How long have you been doing this job?',
        'Would you like to change your career in the future?'
      ],
      sampleQ: 'Do you enjoy your work?',
      sampleA: 'Yes, I really enjoy my work. I work in application security, and I love the challenge of finding and fixing security vulnerabilities. Every application is different, so the work is always interesting. What I find most rewarding is knowing that my work helps protect people\'s data. Although the job can be stressful sometimes, especially before a product release, I wouldn\'t change it.',
      whyGood: ['ตอบ Yes/No + reason ชัดเจน', 'ใช้ although เชื่อมความ contrast', 'มี specific detail (application security)', 'ไม่สั้นเกินไป — ประมาณ 3-4 ประโยค'],
      vocab: ['challenging', 'rewarding', 'stressful', 'vulnerable', 'protect']
    },
    {
      topic: 'Hobbies & Free Time',
      icon: '🎮',
      questions: [
        'What do you do in your free time?',
        'Have your hobbies changed since you were a child?',
        'Do you prefer indoor or outdoor activities?',
        'How much free time do you have?',
        'Is it important to have hobbies? Why?'
      ],
      sampleQ: 'What do you do in your free time?',
      sampleA: 'In my free time, I usually watch videos online or spend time with my cat. I find that after a long day of work, these activities help me relax and recharge. I also try to spend some time studying English, which is something I\'ve been doing seriously lately. On weekends, I sometimes go out with my coworkers for dinner or explore different parts of the city.',
      whyGood: ['ใช้ usually + V (Present Simple)', 'ให้เหตุผลทุกกิจกรรม', 'มีการขยายด้วย lately, sometimes', 'ครอบคลุมทั้งวันธรรมดาและวันหยุด'],
      vocab: ['recharge', 'explore', 'leisure', 'unwind', 'occasionally']
    },
    {
      topic: 'Daily Routine',
      icon: '⏰',
      questions: [
        'Can you describe your typical day?',
        'Are you a morning person or a night person?',
        'Do you have a strict daily routine?',
        'What is the first thing you do in the morning?',
        'How do you get to work?'
      ],
      sampleQ: 'Can you describe your typical day?',
      sampleA: 'My day usually starts around 7 in the morning. I get ready, have breakfast, and then commute to work. I usually take the BTS because it is faster than driving, especially during rush hour. At work, I spend most of my time reviewing code and assessing applications for security issues. I usually finish around 6 PM and head home. In the evening, I have dinner, watch some videos, and try to study English before bed.',
      whyGood: ['ใช้ time markers: in the morning, at work, in the evening', 'มี specific detail (BTS, 7AM, 6PM)', 'ใช้ Present Simple ตลอด (routine)', 'ใช้ reason: "because it is faster"'],
      vocab: ['commute', 'rush hour', 'reviewing', 'head home', 'routine']
    },
    {
      topic: 'Study & Learning',
      icon: '📚',
      questions: [
        'Do you enjoy studying?',
        'What subjects did you study at university?',
        'Do you think it is important to keep learning after graduation?',
        'What is the best way to learn English, in your opinion?',
        'Are you studying anything now?'
      ],
      sampleQ: 'Are you studying anything now?',
      sampleA: 'Yes, I am currently studying English seriously because I want to apply for a master\'s degree in cybersecurity in Taiwan. I practice every day — I work on grammar, build sentences, and try to speak for at least 15 minutes without stopping. It is challenging, but I can already see some improvement. I am hoping to take the IELTS exam in a few months.',
      whyGood: ['ใช้ am currently studying (Present Continuous)', 'ให้เหตุผลชัด: because I want to...', 'มีรายละเอียดกิจกรรม', 'ปิดท้ายด้วยเป้าหมาย'],
      vocab: ['currently', 'improvement', 'challenging', 'apply for', 'specifically']
    }
  ],
  part2: [
    {
      id: 'p2-skill',
      card: 'Describe a skill you would like to learn.',
      points: ['What the skill is', 'Why you want to learn it', 'How you plan to learn it', 'Explain how this skill will help you in the future'],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer: 'The skill I would most like to develop is English communication, particularly speaking fluently and writing clearly. Although I understand English reasonably well, I find it difficult to express my ideas smoothly, especially when I have to think quickly.\n\nI want to improve this skill mainly because of my career goals. I work in application security, and I am planning to study for a master\'s degree in Taiwan. For both of these goals, strong English is essential — almost all technical research, certifications, and academic programmes are in English.\n\nI am planning to learn by studying every day for about two hours. I focus on building sentences, practicing speaking without stopping, and recording my mistakes in a notebook. I also plan to find a speaking partner to practice real conversation.\n\nIn the future, this skill will open many doors for me. It will allow me to work internationally, collaborate with global teams, and continue learning in a global environment. I believe that English is not just a language — it is a tool that can transform my career.',
      keyVocab: ['develop', 'fluently', 'smoothly', 'essential', 'collaborate', 'transform'],
      tips: ['ใช้เวลา 1 นาทีเตรียม notes — เขียน bullet points สั้นๆ ไม่ต้องเต็มประโยค', 'พูดให้ครบ 4 bullet points ในบัตร', 'ใช้ past examples + future plans เพื่อขยายเนื้อหา', 'อย่าหยุดกลางคัน — ถ้าลืมคำ ใช้ "what I mean is..." หรือ "in other words..."']
    },
    {
      id: 'p2-place',
      card: 'Describe a place you would like to visit.',
      points: ['Where it is', 'What it is like', 'Why you want to visit it', 'Explain what you would do there'],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer: 'The place I would most like to visit — and actually live in — is Taiwan. I have been interested in Taiwan for several years, mainly because of its reputation for technological innovation and high-quality education.\n\nTaiwan is an island in East Asia with a population of about 23 million people. It is known for its excellent food, friendly people, and world-class universities. The capital, Taipei, is a modern city with efficient public transport and a vibrant culture.\n\nI want to visit Taiwan because I am planning to apply for a master\'s degree in cybersecurity at one of its leading universities. I believe that studying there will not only improve my academic knowledge but also help me develop professionally and personally.\n\nIf I were there, I would visit the university campuses to understand the environment, explore the city, try the famous night markets, and practice speaking English and possibly Mandarin with local people. I think living in Taiwan would be a life-changing experience.',
      keyVocab: ['reputation', 'innovation', 'vibrant', 'efficient', 'life-changing', 'campus'],
      tips: ['เริ่มด้วยประโยคที่แสดงความรู้สึก: "The place I would most like to..."', 'ให้ข้อมูล factual ก่อน แล้วค่อยพูดถึงความรู้สึก', 'เชื่อมกับชีวิตจริง/แผนอนาคต', 'ใช้ conditional: "If I were there, I would..."']
    },
    {
      id: 'p2-challenge',
      card: 'Describe a challenge you have overcome.',
      points: ['What the challenge was', 'When it happened', 'How you dealt with it', 'Explain how you felt after overcoming it'],
      prepTime: 60,
      speakTime: 120,
      sampleAnswer: 'A significant challenge I have overcome is learning to work in a high-pressure environment in my job as an application security professional.\n\nThis happened about two years ago when I joined my current company. At first, I found it extremely difficult to manage multiple projects simultaneously, especially when critical security vulnerabilities needed to be addressed urgently before product launches.\n\nI dealt with this challenge by developing a systematic approach to my work. I started prioritising tasks by severity and deadline, and I learned to communicate more clearly with developers and project managers. I also improved my technical skills by studying security frameworks in my own time.\n\nAfter overcoming this challenge, I felt a great sense of achievement and confidence. I realised that pressure can actually help you grow, if you approach it with the right mindset. This experience also taught me that clear communication and organisation are just as important as technical expertise in my field.',
      keyVocab: ['overcome', 'simultaneously', 'urgently', 'systematic', 'prioritising', 'expertise'],
      tips: ['ใช้ Past Simple สำหรับเหตุการณ์ที่เล่า', 'ใช้ Present Perfect สำหรับประสบการณ์ที่มีผลถึงปัจจุบัน', 'เพิ่ม emotional language: I felt... I realised...', 'สรุปด้วย lesson learned']
    }
  ],
  part3: [
    {
      topic: 'Technology & Society',
      questions: [
        { q: 'Do you think technology has made our lives better or worse overall?', tip: 'ใช้ "On the one hand... On the other hand..." หรือ "It depends on..."', sample: 'I think technology has generally made life better, although there are some drawbacks. On the one hand, it has made communication faster, information more accessible, and many tasks more efficient. In the field of cybersecurity, for example, technology allows us to protect vast amounts of data that would be impossible to secure manually. On the other hand, it has also created new problems such as privacy concerns and cybercrime. So I think the impact depends largely on how we use technology and what regulations are in place to manage it.' },
        { q: 'How important is cybersecurity in the modern world?', tip: 'ใช้ specific examples + statistics ถ้าจำได้', sample: 'Cybersecurity is critically important today because almost every aspect of modern life involves digital data. From banking and healthcare to government systems and personal communications — all of these are vulnerable to cyber attacks. When security is compromised, the consequences can be severe: financial loss, identity theft, or even threats to national security. So investing in cybersecurity is not optional — it is a fundamental necessity.' },
        { q: 'Do you think young people are spending too much time on technology?', tip: 'แสดงความเห็นชัดเจน + acknowledge the other side', sample: 'I think it depends on how they use technology. If young people are using it to learn, create, or connect meaningfully, then the time is well spent. However, if they are passively consuming entertainment for hours without any purpose, that can be harmful — both to their mental health and their development. I believe the key is balance and purpose.' }
      ]
    },
    {
      topic: 'Education & Learning',
      questions: [
        { q: 'What is more important: formal education or practical experience?', tip: 'ไม่จำเป็นต้องเลือกข้างเดียว — อธิบายว่าทั้งคู่สำคัญอย่างไร', sample: 'I think both are valuable, but in different ways. Formal education gives you the theoretical foundation — it teaches you how to think systematically and understand core concepts. But practical experience is what makes that knowledge useful in the real world. In my field of cybersecurity, a degree gives you credibility and theoretical depth, but you also need hands-on experience to deal with real threats. Ideally, the best professionals have both.' },
        { q: 'How has the internet changed the way people learn?', tip: 'ใช้ Past Perfect / Present Perfect เพื่อแสดง change over time', sample: 'The internet has completely transformed education. Before the internet, learning was largely confined to classrooms and textbooks. Now, anyone with a connection can access courses, lectures, and resources from top universities around the world — often for free. This has democratised education significantly. However, it has also created a problem of information overload, where people have access to so much content that it becomes difficult to know what is reliable or what to focus on.' },
        { q: 'Is studying abroad beneficial? What are the advantages and disadvantages?', tip: 'Part 3 ต้องการ balanced answer ที่มี depth', sample: 'Studying abroad has significant advantages. It exposes you to different ways of thinking, improves language skills through real immersion, and builds independence. From a career perspective, an international degree often carries prestige and demonstrates adaptability. However, the disadvantages should not be overlooked — it can be expensive, emotionally challenging, and students may experience culture shock or feel isolated from family. In my view, the benefits outweigh the costs for most people, provided they prepare thoroughly and have a clear purpose for going.' }
      ]
    }
  ]
};

// ══════════════════════════════════════════════════
// WRITING PROMPTS — Task 1 + Task 2 with Sample Answers
// ══════════════════════════════════════════════════
const WRITING_PROMPTS = {
  task1: [
    {
      id: 'wt1-line',
      title: 'Internet Users in Asia (Line Graph)',
      type: 'Line Graph',
      icon: '📈',
      prompt: 'The graph below shows the number of internet users (in millions) in three Asian countries between 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      graphDesc: 'Thailand: 10M (2010) → 45M (2020) | Taiwan: 15M (2010) → 20M (2020) | Vietnam: 5M (2010) → 50M (2020)',
      timeLimit: 20,
      minWords: 150,
      planningGuide: [
        '1️⃣ Introduction: Paraphrase the task (อย่า copy โดยตรง)',
        '2️⃣ Overview: What is the main trend? Which country grew most?',
        '3️⃣ Detail 1: Thailand and Taiwan — compare specific data points',
        '4️⃣ Detail 2: Vietnam — dramatic growth, overtook Thailand'
      ],
      sampleAnswer: {
        text: `The line graph illustrates the number of internet users in Thailand, Taiwan, and Vietnam over a ten-year period from 2010 to 2020.

Overall, all three countries experienced growth in internet usage during this period. Vietnam showed the most dramatic increase, overtaking Thailand by the end of the period, while Taiwan's growth was considerably more gradual.

In 2010, Taiwan had the highest number of internet users at approximately 15 million, compared to 10 million in Thailand and just 5 million in Vietnam. Over the following decade, Thailand's figures rose steadily, reaching around 45 million by 2020 — a substantial increase of 35 million users.

Vietnam's growth was even more remarkable. Starting from the lowest base of 5 million in 2010, the number of internet users surged to 50 million by 2020, surpassing Thailand in the final years of the period. In contrast, Taiwan's internet penetration grew only modestly, from 15 million to approximately 20 million, reflecting its already high level of digital adoption at the start of the period.`,
        wordCount: 158,
        bandEstimate: 'Band 6.5–7',
        highlights: {
          overview: 'Overall, all three countries experienced growth...Vietnam showed the most dramatic increase',
          specific: 'Starting from the lowest base of 5 million...surged to 50 million',
          comparison: 'surpassing Thailand in the final years...In contrast, Taiwan\'s...',
          vocabulary: ['illustrates', 'dramatic increase', 'overtaking', 'rose steadily', 'surged', 'modestly']
        }
      }
    },
    {
      id: 'wt1-bar',
      title: 'Reasons for Studying Abroad (Bar Chart)',
      type: 'Bar Chart',
      icon: '📊',
      prompt: 'The bar chart shows the main reasons why students from Thailand chose to study abroad in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      graphDesc: 'Career opportunities: 65% | Better education quality: 52% | Language improvement: 48% | Cultural experience: 38% | Scholarship availability: 25%',
      timeLimit: 20,
      minWords: 150,
      planningGuide: [
        '1️⃣ Introduction: Paraphrase — bar chart, Thai students, reasons, 2023',
        '2️⃣ Overview: Most common = career | Least common = scholarship',
        '3️⃣ Detail 1: Top 2 reasons (career + education) with percentages',
        '4️⃣ Detail 2: Remaining 3 reasons — note language vs cultural vs scholarship'
      ],
      sampleAnswer: {
        text: `The bar chart illustrates the primary motivations for Thai students who chose to pursue their education abroad in 2023.

Overall, career-related reasons were the most significant factor, while scholarship availability was cited least frequently among the options given.

Career opportunities was by far the most common reason, with 65% of respondents selecting this option. This was followed by better education quality at 52%, suggesting that the majority of students were primarily motivated by professional and academic advancement.

Language improvement was selected by 48% of students — almost half of all respondents — making it the third most popular reason. Cultural experience attracted 38%, while scholarship availability was the least cited reason at only 25%. Notably, despite scholarships being a practical financial consideration, they ranked lowest, which may indicate that students prioritise long-term career and educational benefits over immediate financial support.`,
        wordCount: 152,
        bandEstimate: 'Band 6.5–7',
        highlights: {
          overview: 'career-related reasons were the most significant...scholarship availability was cited least',
          specific: '65% of respondents...followed by...at 52%',
          comparison: 'despite scholarships being...they ranked lowest',
          vocabulary: ['primary motivations', 'cited', 'by far', 'advancement', 'notably', 'indicate']
        }
      }
    }
  ],
  task2: [
    {
      id: 'wt2-tech',
      title: 'Technology & Privacy',
      type: 'Opinion Essay',
      band: '6.5 Target',
      prompt: 'Some people believe that the development of technology has made our personal information less secure. To what extent do you agree or disagree?',
      timeLimit: 40,
      minWords: 250,
      planningGuide: [
        '⏱️ 5 min: Plan — decide your position (agree/partially agree/disagree)',
        '✍️ 10 min: Introduction — background + thesis statement',
        '✍️ 10 min: Body 1 — main reason to support your view + example',
        '✍️ 10 min: Body 2 — another reason OR counter-argument + rebuttal',
        '✍️ 5 min: Conclusion — summarise + restate position'
      ],
      structure: {
        intro: 'General statement about technology + data privacy → Thesis: "I agree that technology has made personal data more vulnerable, although the situation can be improved through better regulation and user awareness."',
        body1: 'Point: Massive amounts of data are now stored digitally = bigger target\nExample: Data breaches at major companies (Facebook, Yahoo) affecting millions',
        body2: 'Counter: Technology also provides security tools (encryption, 2FA)\nRebuttal: However, these tools are often underused, and the sophistication of attacks has outpaced defences',
        conclusion: 'Restate: Technology creates both risks and solutions | Final thought: Education + regulation are key'
      },
      sampleAnswer: {
        text: `The digital revolution has transformed the way personal information is stored and shared. While technology brings enormous benefits, I strongly agree that it has also made personal data significantly more vulnerable to theft and misuse.

One of the most significant reasons is the sheer volume of personal data now stored online. Companies collect detailed information about their users — from financial records to location data and browsing habits. This vast concentration of sensitive information makes digital systems an extremely attractive target for cybercriminals. High-profile data breaches at companies such as Yahoo and Facebook, which affected hundreds of millions of users, demonstrate just how catastrophic these vulnerabilities can be.

Furthermore, the sophistication of cyber attacks has grown considerably faster than most individuals' ability to protect themselves. While security tools such as encryption and two-factor authentication exist, many users either do not know how to use them or do not consider them necessary until it is too late. This creates a persistent gap between the threat level and the average user's level of protection.

However, it would be unfair to suggest that technology is entirely to blame. In many ways, technology also provides the solutions — stronger authentication systems, advanced monitoring software, and cybersecurity legislation have all emerged in response to these threats. The key issue is that adoption has been too slow.

In conclusion, while technology has undoubtedly created new risks for personal information security, the problem is not insurmountable. Greater investment in cybersecurity education and stronger regulatory frameworks would go a long way towards addressing these vulnerabilities.`,
        wordCount: 263,
        bandEstimate: 'Band 6.5',
        analysis: {
          taskAchievement: 'ตอบตรง prompt, มี clear position, มี main ideas ที่สนับสนุนชัดเจน',
          coherence: 'มี topic sentences ทุก paragraph, ใช้ linking words ดี (furthermore, however, in conclusion)',
          vocabulary: 'ใช้คำหลากหลาย: sheer volume, catastrophic, sophistication, persistent, insurmountable',
          grammar: 'ใช้ complex sentences, passive voice, conditionals ถูกต้อง'
        }
      }
    },
    {
      id: 'wt2-education',
      title: 'Online vs. Traditional Learning',
      type: 'Discussion Essay',
      band: '6.0 Target',
      prompt: 'Some people think that online learning is more effective than traditional classroom learning. Others disagree. Discuss both views and give your own opinion.',
      timeLimit: 40,
      minWords: 250,
      planningGuide: [
        '⏱️ 5 min: Plan — list 2 points FOR online, 2 points FOR traditional',
        '✍️ Intro: Introduce the debate + your position',
        '✍️ Body 1: Arguments for online learning',
        '✍️ Body 2: Arguments for traditional learning',
        '✍️ Body 3 (optional): Your opinion if not stated in intro',
        '✍️ Conclusion: Balanced summary + your view'
      ],
      structure: {
        intro: 'Online learning has grown dramatically. → "While online learning offers significant advantages in flexibility, I believe traditional classroom environments still provide an irreplaceable social and interactive dimension."',
        body1: 'Online: flexible, accessible, affordable, self-paced',
        body2: 'Traditional: interaction, immediate feedback, discipline, lab/practical work',
        conclusion: 'Both have merits → best approach combines both (blended learning)'
      },
      sampleAnswer: { text: '(ฝึกเขียนเอง — ใช้ structure ด้านบนเป็นแนวทาง)', wordCount: 0, bandEstimate: 'Practice', analysis: {} }
    }
  ]
};

// ══════════════════════════════════════════════════
// BAND SCORE DESCRIPTORS
// ══════════════════════════════════════════════════
const BAND_DESCRIPTORS = {
  writing: {
    '5.0': { ta: 'ตอบ task บางส่วน ข้อมูลไม่ครบ', cc: 'ความเชื่อมโยงอ่อน', lr: 'ศัพท์จำกัด มีข้อผิดพลาดมาก', gr: 'โครงสร้างง่าย มีข้อผิดพลาดบ่อย' },
    '6.0': { ta: 'ตอบ task ได้ มีข้อมูลสำคัญ', cc: 'ใช้ linking words แต่ไม่ flexible', lr: 'ศัพท์พอใช้ได้ มีข้อผิดพลาดบางส่วน', gr: 'ใช้ complex structures บ้าง มีข้อผิดพลาด' },
    '6.5': { ta: 'ตอบ task ชัดเจน มี main features', cc: 'ใช้ cohesive devices ดี', lr: 'ศัพท์หลากหลาย ข้อผิดพลาดไม่กระทบ', gr: 'ใช้ complex sentences ถูกต้องส่วนใหญ่' },
    '7.0': { ta: 'ครอบคลุม task ได้ดี มี extension ของ ideas', cc: 'ใช้ paragraphing ดี ไหลลื่น', lr: 'ใช้ less common vocab อย่างตั้งใจ', gr: 'ข้อผิดพลาดน้อย มีความหลากหลาย' }
  },
  speaking: {
    '5.0': 'พูดได้แต่ hesitation มาก เข้าใจได้ส่วนใหญ่',
    '6.0': 'พูดต่อเนื่อง มีบาง hesitation ใช้ vocabulary พอใช้',
    '6.5': 'พูดลื่น มี minor hesitation ศัพท์หลากหลาย accuracy ดี',
    '7.0': 'พูดลื่นมาก ใช้ discourse markers ดี ข้อผิดพลาดน้อย'
  }
};
