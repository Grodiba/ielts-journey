// ── IELTS Journey — Curriculum Data ──
// 4-Month Plan: Sentence Building → Speaking → IELTS → Intensive

// ── GRAMMAR TOPICS (Month 1) ──
const GRAMMAR_TOPICS = [
  {
    id: 'svo', order: 1,
    title: 'S + V + O — โครงสร้างพื้นฐาน',
    icon: '🧱',
    rule: 'Subject + Verb + Object เป็นโครงสร้างหลักของประโยคอังกฤษ\nทุกประโยคต้องมี Subject และ Verb อย่างน้อย',
    examples: [
      'I assess applications.',
      'I check security problems.',
      'I work with developers.',
      'My team fixes vulnerabilities.'
    ],
    appSecExamples: [
      'I assess applications before release.',
      'I report security vulnerabilities to the team.',
      'Developers fix the bugs that I find.'
    ],
    tip: '💡 ตรวจสอบทุกประโยคว่ามี Subject (ใคร) และ Verb (ทำอะไร) เสมอ'
  },
  {
    id: 'be-do-have', order: 2,
    title: 'be / do / have — กริยาหลัก 3 ตัว',
    icon: '🔑',
    rule: 'be = เป็น/อยู่/คือ | do = ทำ | have = มี\nเป็นกริยาที่ใช้บ่อยที่สุดและมีรูปแบบเฉพาะ',
    examples: [
      'I am a security engineer. (be)',
      'She does penetration testing. (do)',
      'We have a security team. (have)',
      'The application is vulnerable. (be)'
    ],
    appSecExamples: [
      'I am responsible for application security.',
      'My company has a bug bounty program.',
      'We do security assessments every quarter.'
    ],
    tip: '💡 be/do/have เปลี่ยนรูปตาม subject: I am / she is / they are'
  },
  {
    id: 'present-simple', order: 3,
    title: 'Present Simple — ความจริง & นิสัย',
    icon: '🔄',
    rule: 'ใช้กับ: นิสัย, ความจริง, สิ่งที่เกิดประจำ\nรูป: I/you/we/they + V | he/she/it + V+s',
    examples: [
      'I work in application security.',
      'She reviews code every week.',
      'The team releases updates on Fridays.',
      'Security problems happen all the time.'
    ],
    appSecExamples: [
      'I assess applications before they are released.',
      'Our team coordinates penetration testing with external vendors.',
      'Developers fix vulnerabilities that I report.'
    ],
    tip: '💡 Signal words: always, usually, often, sometimes, never, every day/week'
  },
  {
    id: 'present-continuous', order: 4,
    title: 'Present Continuous — กำลังทำตอนนี้',
    icon: '▶️',
    rule: 'ใช้กับ: กำลังทำอยู่ตอนนี้ หรือ ช่วงนี้\nรูป: am/is/are + V-ing',
    examples: [
      'I am learning English.',
      'We are working on a new project.',
      'She is studying for IELTS.',
      'The team is testing the application.'
    ],
    appSecExamples: [
      'I am currently assessing a new mobile application.',
      'Our team is working with developers to fix critical vulnerabilities.',
      'I am preparing for my IELTS exam in Taiwan.'
    ],
    tip: '💡 Signal words: now, at the moment, currently, these days, this week'
  },
  {
    id: 'past-simple', order: 5,
    title: 'Past Simple — เกิดขึ้นในอดีต',
    icon: '⏪',
    rule: 'ใช้กับ: เหตุการณ์ที่เสร็จสิ้นในอดีต\nรูป: V2 (worked, found, went) หรือ irregular verbs',
    examples: [
      'I found a critical vulnerability last week.',
      'We released the application yesterday.',
      'She studied at Chulalongkorn University.',
      'I decided to study abroad.'
    ],
    appSecExamples: [
      'I discovered a SQL injection vulnerability in the login page.',
      'The team fixed all issues before the product launch.',
      'I started working in cybersecurity three years ago.'
    ],
    tip: '💡 Signal words: yesterday, last week/year, ago, in 2022, when I was young'
  },
  {
    id: 'future', order: 6,
    title: 'Future — will & going to',
    icon: '🔮',
    rule: 'will = ตัดสินใจทันที หรือ ทำนาย\ngoing to = มีแผนอยู่แล้ว หรือ แน่ใจว่าจะเกิด',
    examples: [
      'I will study in Taiwan next year. (plan/decision)',
      'I am going to take IELTS in December. (planned)',
      'This will help my career. (prediction)',
      'She is going to become a security expert. (planned future)'
    ],
    appSecExamples: [
      'I am going to apply for a master\'s program in Taiwan.',
      'This experience will help me become a better security engineer.',
      'We will release the patch next week.'
    ],
    tip: '💡 going to ใช้เมื่อมีแผนชัดเจน | will ใช้เมื่อตัดสินใจตอนนั้น หรือทำนาย'
  },
  {
    id: 'present-perfect', order: 7,
    title: 'Present Perfect — ประสบการณ์ & ผล',
    icon: '✨',
    rule: 'ใช้กับ: ประสบการณ์ที่มี / เหตุการณ์ที่มีผลถึงตอนนี้\nรูป: have/has + V3 (past participle)',
    examples: [
      'I have worked in security for 3 years.',
      'She has never been to Taiwan.',
      'We have already fixed the vulnerability.',
      'I have decided to apply for IELTS.'
    ],
    appSecExamples: [
      'I have assessed over 50 applications in my career.',
      'Our team has never had a major security breach.',
      'I have already prepared my application for the master\'s program.'
    ],
    tip: '💡 Signal words: already, yet, just, ever, never, for, since, so far, recently'
  },
  {
    id: 'to-verb', order: 8,
    title: 'to + verb — infinitive',
    icon: '➡️',
    rule: 'to + base verb ใช้หลัง: want, need, plan, decide, hope, try, expect, would like\nหรือใช้แสดงจุดประสงค์ (เพื่อ...)',
    examples: [
      'I want to study in Taiwan.',
      'I need to improve my English.',
      'She decided to take IELTS.',
      'I went abroad to get a master\'s degree.'
    ],
    appSecExamples: [
      'I plan to apply for a cybersecurity program in Taiwan.',
      'I need to improve my English to study abroad.',
      'My goal is to work in cybersecurity internationally.',
      'I assessed the app to find security vulnerabilities.'
    ],
    tip: '💡 want to / need to / plan to / hope to / decide to / would like to'
  },
  {
    id: 'verb-ing', order: 9,
    title: 'verb + -ing — gerund',
    icon: '🔃',
    rule: 'V-ing ใช้หลัง: enjoy, avoid, consider, keep, finish, practice, suggest\nหรือใช้เป็น subject ของประโยค',
    examples: [
      'I enjoy working in security.',
      'Learning English takes time.',
      'I practice speaking every day.',
      'I avoid using simple passwords.'
    ],
    appSecExamples: [
      'I enjoy finding security vulnerabilities.',
      'Coordinating with vendors takes a lot of communication.',
      'I practice writing security reports regularly.',
      'Studying cybersecurity in Taiwan is my goal.'
    ],
    tip: '💡 enjoy/avoid/consider/keep/finish/practice/suggest + V-ing'
  },
  {
    id: 'conjunctions', order: 10,
    title: 'because / so / but / although',
    icon: '🔗',
    rule: 'because = เพราะ | so = ดังนั้น | but = แต่ | although = แม้ว่า\nใช้เชื่อมสองประโยคให้เป็นประโยคซับซ้อน',
    examples: [
      'I study English because I want to work abroad.',
      'I was tired, but I still studied.',
      'She works hard, so she is improving fast.',
      'Although it is difficult, I will not give up.'
    ],
    appSecExamples: [
      'I work in security because I enjoy solving complex problems.',
      'The app had vulnerabilities, but the team fixed them quickly.',
      'I assessed the code carefully, so I found all the issues.',
      'Although my English is not perfect yet, I can communicate well.'
    ],
    tip: '💡 because/so เชื่อม cause-effect | but/although เชื่อม contrast'
  },
  {
    id: 'if-when', order: 11,
    title: 'if / when — conditionals & time',
    icon: '⚡',
    rule: 'if = ถ้า (condition) | when = เมื่อ/ตอนที่ (time)\nType 1: If + present, will + base (real condition)',
    examples: [
      'If I get IELTS 6.5, I will apply to Taiwan.',
      'When I finish studying, I will work abroad.',
      'If you study hard, you will improve.',
      'When I have time, I practice speaking.'
    ],
    appSecExamples: [
      'If I find a critical vulnerability, I report it immediately.',
      'When developers release an update, I assess it for security issues.',
      'If I get accepted, I will study cybersecurity in Taiwan.',
      'When I move to Taiwan, I will use English every day.'
    ],
    tip: '💡 if (ยังไม่แน่) → when (แน่ว่าจะเกิด) | ลำดับ clause สลับได้'
  }
];

// ── SPEAKING TOPICS (Month 2) ──
const SPEAKING_TOPICS = [
  {
    id: 'my-job',
    title: 'My Job',
    icon: '💻',
    month: 2,
    timerMin: 15,
    prompt: 'Talk about your job. What do you do? What does your daily work look like?',
    starters: [
      'I work in application security.',
      'My job is to assess applications for security problems.',
      'I usually work with developers to fix vulnerabilities.',
      'My team is responsible for...',
      'One of my main tasks is...'
    ],
    vocabulary: ['assess', 'vulnerability', 'coordinate', 'release', 'penetration testing', 'developers', 'security problems', 'fix', 'report', 'check'],
    tips: [
      'Describe what you do every day',
      'Talk about who you work with',
      'Mention what tools or skills you use',
      'Share what you enjoy about the job'
    ],
    noStopRule: 'ถ้าไม่รู้คำว่า "ประสานงาน" → พูดว่า "I work with other companies" แล้วต่อเลย'
  },
  {
    id: 'my-family',
    title: 'My Family',
    icon: '👨‍👩‍👧',
    month: 2,
    timerMin: 15,
    prompt: 'Describe your family. Who is in your family? What are they like?',
    starters: [
      'I have a small/big family.',
      'I live with my parents.',
      'My family is very important to me.',
      'My mother/father works as...',
      'We usually spend time together by...'
    ],
    vocabulary: ['support', 'close', 'relationship', 'live together', 'spend time', 'understand', 'encourage'],
    tips: [
      'Describe family members',
      'Talk about your relationship with them',
      'Share what you do together',
      'Say how they support your goals'
    ],
    noStopRule: 'ถ้าไม่รู้คำว่า "เป็นห่วง" → พูดว่า "She always takes care of me" แล้วต่อเลย'
  },
  {
    id: 'my-cat',
    title: 'My Cat',
    icon: '🐱',
    month: 2,
    timerMin: 15,
    prompt: 'Tell me about your cat. What is it like? What do you do together?',
    starters: [
      'I have a cat.',
      'My cat is very...',
      'I got my cat about... years ago.',
      'Every day, my cat...',
      'Taking care of my cat makes me feel...'
    ],
    vocabulary: ['take care of', 'playful', 'independent', 'feed', 'spend time with', 'companion', 'relax'],
    tips: [
      'Describe your cat\'s personality',
      'Talk about your daily routine with the cat',
      'Share a funny/cute story',
      'Explain why you love your cat'
    ],
    noStopRule: 'ถ้าไม่รู้คำว่า "ซุกซน" → พูดว่า "She is very active and playful"'
  },
  {
    id: 'my-hobbies',
    title: 'My Hobbies',
    icon: '🎮',
    month: 2,
    timerMin: 15,
    prompt: 'What do you do in your free time? What are your hobbies and why do you enjoy them?',
    starters: [
      'In my free time, I usually...',
      'One of my hobbies is...',
      'I really enjoy... because...',
      'I started... about... years ago.',
      'When I have a day off, I...'
    ],
    vocabulary: ['free time', 'relaxing', 'enjoyable', 'passionate about', 'spend time', 'interested in', 'since I was young'],
    tips: [
      'Name 2-3 hobbies',
      'Explain why you enjoy each one',
      'Share when you started',
      'Talk about what you gain from it'
    ],
    noStopRule: 'ถ้าไม่รู้คำว่า "คลายเครียด" → พูดว่า "It helps me feel more relaxed after work"'
  },
  {
    id: 'daily-routine',
    title: 'My Daily Routine',
    icon: '⏰',
    month: 2,
    timerMin: 15,
    prompt: 'Describe your typical day from morning to night.',
    starters: [
      'I usually wake up at...',
      'In the morning, I...',
      'I go to work by...',
      'After work, I usually...',
      'Before going to bed, I...'
    ],
    vocabulary: ['wake up', 'commute', 'have a meeting', 'have lunch', 'go home', 'exercise', 'watch videos', 'go to bed'],
    tips: [
      'Use time words: first, then, after that, finally',
      'Use Present Simple for routine',
      'Be specific about times',
      'Share what you enjoy in your day'
    ],
    noStopRule: 'ถ้าไม่รู้คำว่า "ออกกำลังกาย" → พูดว่า "I do some exercise" หรือ "I go for a walk"'
  },
  {
    id: 'my-city',
    title: 'My City',
    icon: '🏙️',
    month: 2,
    timerMin: 15,
    prompt: 'Describe the city you live in. What is it like? What do you like or dislike about it?',
    starters: [
      'I live in Bangkok.',
      'Bangkok is a very busy/modern city.',
      'One thing I love about Bangkok is...',
      'The food/transport/nightlife in Bangkok is...',
      'If I could change one thing about my city, it would be...'
    ],
    vocabulary: ['crowded', 'convenient', 'traffic jam', 'nightlife', 'street food', 'modern', 'pollution', 'public transport'],
    tips: [
      'Describe the general feeling of the city',
      'Talk about what you like AND dislike',
      'Compare it to other places if possible',
      'Share a specific experience there'
    ],
    noStopRule: 'ถ้าไม่รู้คำว่า "รถติดมาก" → พูดว่า "The traffic is very bad" แล้วต่อ'
  },
  {
    id: 'taiwan',
    title: 'Taiwan',
    icon: '🇹🇼',
    month: 2,
    timerMin: 15,
    prompt: 'Why do you want to study in Taiwan? What do you know about Taiwan?',
    starters: [
      'I want to study in Taiwan because...',
      'Taiwan is known for...',
      'I am interested in Taiwan because of its...',
      'My goal is to get a master\'s degree in...',
      'In Taiwan, I hope to...'
    ],
    vocabulary: ['study abroad', 'master\'s degree', 'cybersecurity', 'improve skills', 'scholarship', 'culture', 'opportunity', 'career'],
    tips: [
      'Explain why Taiwan specifically',
      'Talk about what you want to study',
      'Share what you know about Taiwanese culture/tech',
      'Connect it to your career goals'
    ],
    noStopRule: 'ถ้าไม่รู้คำว่า "ทุนการศึกษา" → พูดว่า "financial support for international students"'
  },
  {
    id: 'study-abroad',
    title: 'Why I Want to Study Abroad',
    icon: '✈️',
    month: 2,
    timerMin: 15,
    prompt: 'Why did you decide to study abroad? What are your motivations?',
    starters: [
      'I want to study abroad because...',
      'Studying in another country will help me...',
      'One of my main reasons is...',
      'I believe that going abroad will...',
      'My career goal is to..., and studying abroad is the first step.'
    ],
    vocabulary: ['international experience', 'broaden perspective', 'career opportunity', 'independence', 'network', 'exposure', 'challenge myself'],
    tips: [
      'Give 2-3 clear reasons',
      'Connect to your career goals',
      'Mention personal growth',
      'Be specific about what you want to gain'
    ],
    noStopRule: 'ถ้าไม่รู้คำว่า "ขยายมุมมอง" → พูดว่า "I want to see new ways of thinking"'
  },
  {
    id: 'future-career',
    title: 'My Future Career',
    icon: '🚀',
    month: 2,
    timerMin: 15,
    prompt: 'What are your career goals? Where do you see yourself in 5-10 years?',
    starters: [
      'In the future, I want to work in...',
      'My career goal is to become...',
      'In 5 years, I hope to...',
      'After finishing my master\'s degree, I plan to...',
      'I am passionate about cybersecurity because...'
    ],
    vocabulary: ['career goal', 'expert', 'specialize in', 'international company', 'contribute to', 'advance in', 'cybersecurity field'],
    tips: [
      'Talk about short and long-term goals',
      'Explain WHY you want this career',
      'Connect education to career',
      'Show passion and motivation'
    ],
    noStopRule: 'ถ้าไม่รู้คำว่า "ผู้เชี่ยวชาญ" → พูดว่า "someone who is very skilled in"'
  },
  {
    id: 'strengths',
    title: 'My Strengths',
    icon: '💪',
    month: 2,
    timerMin: 15,
    prompt: 'What are your personal strengths? Give examples to support your answer.',
    starters: [
      'One of my main strengths is...',
      'I am good at... because...',
      'I think my strength is my ability to...',
      'In my work, I have shown that I can...',
      'For example, when I...'
    ],
    vocabulary: ['analytical', 'detail-oriented', 'problem-solving', 'communication', 'adaptable', 'dedicated', 'self-motivated'],
    tips: [
      'Name 2-3 strengths',
      'Give a real example for each',
      'Connect strengths to your work/study',
      'Don\'t be too modest'
    ],
    noStopRule: 'ถ้าไม่รู้คำว่า "ละเอียดรอบคอบ" → พูดว่า "I pay close attention to details"'
  },
  {
    id: 'weaknesses',
    title: 'My Weaknesses',
    icon: '🌱',
    month: 2,
    timerMin: 15,
    prompt: 'What are your weaknesses? How do you deal with them?',
    starters: [
      'One of my weaknesses is...',
      'I sometimes struggle with...',
      'I know that I need to improve my...',
      'In the past, I had difficulty with..., but now I...',
      'I am working on improving my... by...'
    ],
    vocabulary: ['work in progress', 'tend to', 'overcome', 'improve', 'develop', 'challenge', 'aware of'],
    tips: [
      'Be honest but strategic',
      'Always follow weakness with what you are doing to improve',
      'Show self-awareness',
      'Show growth mindset'
    ],
    noStopRule: 'ถ้าไม่รู้คำว่า "กำลังพัฒนา" → พูดว่า "I am working on improving this"'
  }
];

// ── 4-MONTH ROADMAP ──
const ROADMAP = [
  {
    month: 1,
    title: 'Sentence Building',
    subtitle: '"ฉันจะแต่งประโยคให้ได้"',
    color: '#6366f1',
    icon: '🧱',
    goal: 'จากรู้คำ → เอาคำมาเรียงเป็นประโยค → ขยายได้ 4 steps',
    focus: ['S+V+O structure', 'Tenses ทั้ง 7', 'Conjunctions', 'Pattern Training ทุกวัน'],
    daily: '20min Grammar + 30min Sentence Building + 20min Vocab',
    checkpoint: {
      name: 'Checkpoint 1 — End of Month 1',
      tasks: [
        'แต่งประโยคจากคำ 1 คำได้ 4 steps โดยไม่ต้องคิดนาน',
        'บอกความแตกต่าง Present Simple / Perfect / Continuous ได้',
        'ใช้ because, although, so, but เชื่อมประโยคได้',
        'Error Notebook มีอย่างน้อย 20 รายการ'
      ]
    }
  },
  {
    month: 2,
    title: 'Speaking & Output',
    subtitle: '"ฉันต้องพูดออกมา"',
    color: '#10b981',
    icon: '🗣️',
    goal: 'พูด/เขียนเรื่องทั่วไปได้ต่อเนื่อง ไม่หยุดเพราะนึกศัพท์ไม่ออก',
    focus: ['Speaking 15-20 min/day', 'No-Stop Rule', '11 หัวข้อ personal topics', 'Paragraph writing เริ่ม'],
    daily: '20min Grammar Review + 20min Sentence Building + 20min Vocab + 20min Speaking + 20min Writing',
    checkpoint: {
      name: 'Checkpoint 2 — End of Month 2 ⭐ สำคัญมาก',
      tasks: [
        'Mini IELTS Speaking Mock — พูด 10 นาที Part 1 style',
        'เขียน paragraph 100-150 words เรื่องที่คุ้น',
        'พูดเรื่องงาน/ไต้หวัน 3 นาทีโดยไม่หยุด',
        'ทำ IELTS Reading ย่อ 1 ชุด (30 นาที) เพื่อวัด baseline ก่อนเดือน 3',
        'ถ้าผล checkpoint นี้ยังไม่แน่น → พิจารณาขยับแผนเป็น 5 เดือน'
      ]
    }
  },
  {
    month: 3,
    title: 'IELTS Mode',
    subtitle: '"IELTS Mode เริ่มแล้ว"',
    color: '#f59e0b',
    icon: '🔥',
    goal: 'เข้า IELTS skill แต่ละด้านอย่างจริงจัง',
    focus: ['Reading 30min/day', 'Listening 30min/day', 'Speaking Part 1→2→3', 'Writing Task 1 + Task 2 แยก'],
    daily: '30min Reading + 30min Listening + 20min Speaking + 30min Writing + 10min Vocab',
    checkpoint: {
      name: 'Checkpoint 3 — End of Month 3',
      tasks: [
        'Full IELTS Mock Test (Reading + Listening)',
        'Writing Task 1 — บรรยายกราฟ 1 ชุด',
        'Writing Task 2 — essay 250 words',
        'Speaking Part 1 + 2 recorded',
        '⚠️ เดือนนี้ควร Book วันสอบ IELTS จริง'
      ]
    }
  },
  {
    month: 4,
    title: 'IELTS 6.5 Mode',
    subtitle: '"ตะลุยข้อสอบ + ปรับ"',
    color: '#f43f5e',
    icon: '🏆',
    goal: 'เป้าหมาย IELTS 6.0–6.5 | ทำ mock ทุกสัปดาห์ + Error Analysis',
    focus: ['Weekly Mock Tests', 'Error Notebook review ทุกวัน', 'Writing/Speaking intensive', 'Exam simulation'],
    daily: 'ตามตาราง Monday-Sunday schedule',
    checkpoint: {
      name: 'Checkpoint 4 — Week 3 of Month 4 (Pre-Exam)',
      tasks: [
        'Full IELTS Mock ครั้งสุดท้าย',
        'Error Notebook review ครบทุกรายการ',
        'Speaking Mock กับ partner หรือ tutor',
        'Ready to sit the actual exam!'
      ]
    }
  }
];

// ── DAILY SCHEDULE ──
const DAILY_SCHEDULE = {
  base: [
    { time: '20 min', activity: 'Grammar', icon: '📝', color: '#6366f1', desc: 'เรียน/ทบทวน 1 topic จาก Grammar Clinic' },
    { time: '30 min', activity: 'Sentence Building', icon: '🔤', color: '#10b981', desc: 'Pattern Training — expand 1 คำเป็น 4 ประโยค' },
    { time: '20 min', activity: 'Vocabulary', icon: '📚', color: '#f59e0b', desc: 'เรียน 5 คำ — แต่งประโยคเอง ไม่ท่องเปล่า' },
    { time: '20 min', activity: 'Speaking', icon: '🗣️', color: '#a855f7', desc: 'พูด 1 topic 15-20 นาที ห้ามหยุด' },
    { time: '30 min', activity: 'IELTS Reading/Listening', icon: '📖', color: '#f43f5e', desc: 'ฝึก IELTS skill ตามเดือน' }
  ],
  bonus: { time: '+60 min', activity: 'Writing', icon: '✍️', color: '#06b6d4', desc: 'ถ้ามีแรง 3 ชั่วโมง — เพิ่ม Writing 1 ชั่วโมง' },
  month4Weekly: [
    { day: 'Monday', activity: 'Reading Practice', icon: '📖', color: '#6366f1' },
    { day: 'Tuesday', activity: 'Listening Practice', icon: '👂', color: '#10b981' },
    { day: 'Wednesday', activity: 'Writing (Task 1+2)', icon: '✍️', color: '#f59e0b' },
    { day: 'Thursday', activity: 'Speaking Practice', icon: '🗣️', color: '#a855f7' },
    { day: 'Friday', activity: 'Grammar + Vocabulary', icon: '📝', color: '#06b6d4' },
    { day: 'Saturday', activity: 'Full Mock Test', icon: '📋', color: '#f43f5e' },
    { day: 'Sunday', activity: 'Error Analysis Day', icon: '🔍', color: '#84cc16' }
  ]
};

// ── IELTS WRITING — TASK 1 ──
const WRITING_TASK1 = {
  intro: 'Task 1 คือการบรรยายกราฟ/แผนภูมิ/ข้อมูล — ต่างจาก Task 2 (essay) โดยสิ้นเชิง\nเขียน 150+ words ใน 20 นาที เน้น factual, no opinion',
  categories: [
    {
      type: 'Line Graph',
      icon: '📈',
      description: 'แสดง trend ตามเวลา',
      keyStructure: 'Overall trend → Specific points → Comparisons',
      phrases: {
        'Rising Trend': ['rose significantly', 'increased sharply', 'grew steadily', 'climbed to', 'surged to'],
        'Falling Trend': ['fell sharply', 'decreased significantly', 'dropped to', 'declined steadily', 'plummeted to'],
        'Stable': ['remained stable', 'stayed constant', 'levelled off at', 'plateaued at'],
        'Fluctuating': ['fluctuated between', 'varied considerably', 'was volatile'],
        'Approximate': ['approximately', 'roughly', 'just over', 'just under', 'around']
      },
      sentenceStarters: [
        'The graph shows the changes in [X] between [year] and [year].',
        'Overall, [X] showed an upward/downward trend over the period.',
        '[X] rose sharply from [number] in [year] to [number] in [year].',
        'By contrast, [Y] remained relatively stable throughout the period.',
        'There was a significant increase/decrease in [X] during [period].'
      ],
      sample: {
        prompt: 'The graph below shows the number of cybersecurity incidents reported in Thailand from 2020 to 2025.',
        response: 'The line graph illustrates the number of cybersecurity incidents in Thailand over a five-year period from 2020 to 2025.\n\nOverall, there was a significant upward trend in reported incidents throughout the period, with a particularly sharp rise from 2022 onwards.\n\nIn 2020, approximately 1,200 incidents were reported. This figure rose steadily to around 1,800 in 2021 before increasing more sharply to 2,500 in 2022. The most dramatic growth occurred between 2022 and 2024, when incidents surged from 2,500 to 4,100. By 2025, the number had reached its peak at just over 5,000 incidents.\n\nThe data suggests that cybersecurity threats have become increasingly common in Thailand, possibly due to greater digital adoption and more sophisticated attack methods.'
      }
    },
    {
      type: 'Bar Chart',
      icon: '📊',
      description: 'เปรียบเทียบข้อมูลหลายกลุ่ม',
      keyStructure: 'Overview comparison → Highest/Lowest → Notable differences',
      phrases: {
        'Comparison': ['compared to', 'in comparison with', 'whereas', 'while', 'in contrast'],
        'Ranking': ['the highest', 'the lowest', 'the most', 'the least', 'second only to'],
        'Difference': ['significantly higher than', 'slightly lower than', 'more than double', 'roughly similar to'],
        'Proportion': ['accounted for', 'made up', 'represented', 'comprised']
      },
      sentenceStarters: [
        'The bar chart compares [X] across [categories].',
        'Overall, [X] had the highest/lowest [Y] among all categories.',
        '[A] significantly outperformed [B], with [number] compared to [number].',
        'The most notable difference was between [X] and [Y].',
        'While [A] scored highest, [B] recorded the lowest figure.'
      ]
    },
    {
      type: 'Pie Chart',
      icon: '🥧',
      description: 'แสดงสัดส่วนและเปอร์เซ็นต์',
      keyStructure: 'Largest segment → Smallest → Comparisons',
      phrases: {
        'Proportion': ['accounted for', 'made up', 'comprised', 'represented'],
        'Comparison': ['more than', 'almost double', 'twice as much as', 'a quarter of'],
        'Size': ['the largest proportion', 'the smallest share', 'a significant portion', 'a minor fraction']
      },
      sentenceStarters: [
        'The pie chart illustrates the proportion of [X] in [Y].',
        '[Category] accounted for the largest share at [%].',
        'Together, [A] and [B] made up over half of the total.',
        'By contrast, [C] represented only [%] of the total.',
        'The smallest proportion belonged to [X] at just [%].'
      ]
    }
  ],
  doNotDo: [
    '❌ อย่าแสดงความเห็นส่วนตัว (Task 1 ต้องเป็น factual เท่านั้น)',
    '❌ อย่าใช้ "I think" หรือ "In my opinion"',
    '❌ อย่า copy ตัวเลขจากกราฟโดยไม่อธิบาย',
    '❌ อย่าเขียนน้อยกว่า 150 words',
    '❌ อย่าใช้ "show" ซ้ำๆ ใช้ illustrate, demonstrate, reveal แทน'
  ],
  structure: [
    { part: 'Introduction', words: '20-30', desc: 'Paraphrase the task — บอกว่ากราฟแสดงอะไร' },
    { part: 'Overview', words: '30-40', desc: 'Overall trend — บอกภาพรวมใหญ่ 1-2 ประโยค' },
    { part: 'Detail 1', words: '40-50', desc: 'Specific data — รายละเอียดส่วนที่ 1 พร้อมตัวเลข' },
    { part: 'Detail 2', words: '40-50', desc: 'Specific data — รายละเอียดส่วนที่ 2 เปรียบเทียบ' }
  ]
};

// ── IELTS WRITING TASK 2 ──
const WRITING_TASK2 = {
  intro: 'Task 2 คือ Essay แสดงความเห็น/วิเคราะห์ประเด็น — เขียน 250+ words ใน 40 นาที',
  types: [
    { type: 'Opinion Essay', pattern: 'Do you agree or disagree?', structure: 'Intro → Your opinion → Reason 1 → Reason 2 → Counter + rebut → Conclusion' },
    { type: 'Discussion Essay', pattern: 'Discuss both views', structure: 'Intro → View 1 → View 2 → Your opinion → Conclusion' },
    { type: 'Problem/Solution', pattern: 'What are problems? Suggest solutions', structure: 'Intro → Problems → Solutions → Conclusion' },
    { type: 'Advantages/Disadvantages', pattern: 'Discuss advantages and disadvantages', structure: 'Intro → Advantages → Disadvantages → Conclusion' }
  ],
  doNotDo: [
    '❌ อย่าโดดจาก "I like Taiwan." ไป "Discuss the extent to which globalization…" — เดี๋ยวสมองลาออก 😂',
    '❌ อย่าใช้ศัพท์ยากโดยไม่รู้ความหมาย',
    '❌ อย่าเขียนน้อยกว่า 250 words',
    '❌ อย่าลืม thesis statement ใน Introduction'
  ],
  progression: [
    { step: 1, title: 'Sentence level', task: 'แต่งประโยคที่มีเนื้อหา argument ได้' },
    { step: 2, title: 'Paragraph level', task: 'เขียน topic sentence + support + example (100 words)' },
    { step: 3, title: 'Short essay', task: 'เขียน 3 paragraph essay (200 words)' },
    { step: 4, title: 'Full Task 2', task: 'เขียน 250-300 words ใน 40 นาที' }
  ]
};

// ── IELTS READING SKILLS ──
const READING_SKILLS = [
  {
    skill: 'Skimming',
    icon: '⚡',
    description: 'อ่านเร็วเพื่อจับใจความหลัก — ไม่ต้องอ่านทุกคำ',
    technique: 'อ่าน: หัวเรื่อง → ย่อหน้าแรก → ประโยคแรกของแต่ละย่อหน้า → ย่อหน้าสุดท้าย',
    practice: 'ให้เวลา 3 นาที อ่านบทความ 600 words แล้วตอบว่า main topic คืออะไร'
  },
  {
    skill: 'Scanning',
    icon: '🔍',
    description: 'หาข้อมูลเฉพาะเจาะจง — ตัวเลข, ชื่อ, วันที่',
    technique: 'รู้ว่าต้องหาอะไร → วิ่งตาหาคำนั้น → หยุดอ่านรอบนั้นเฉพาะส่วน',
    practice: 'ให้ 30 วินาที หาตัวเลขทั้งหมดในบทความ'
  },
  {
    skill: 'True / False / Not Given',
    icon: '✅',
    description: 'TFNG — ต่างจาก Yes/No/Not Given (Listening)',
    technique: 'True = ข้อมูลตรงกับบทความ | False = ข้อมูลขัดแย้ง | Not Given = ไม่พูดถึงเลย',
    practice: 'กับดัก: NG ≠ False — ถ้าบทความไม่พูดถึง คือ NG ไม่ใช่ False'
  },
  {
    skill: 'Matching Headings',
    icon: '🏷️',
    description: 'จับคู่หัวข้อกับย่อหน้า',
    technique: 'อ่านประโยคแรก + สุดท้ายของแต่ละย่อหน้า → หา heading ที่ครอบคลุมทั้งย่อหน้า',
    practice: 'อย่า match จาก keyword เดียว — ต้องดู main idea ทั้งย่อหน้า'
  },
  {
    skill: 'Multiple Choice',
    icon: '🔘',
    description: 'เลือกคำตอบที่ถูกต้องที่สุด',
    technique: 'อ่านคำถามก่อน → ไป scan หาใน passage → อ่านรอบนั้นอย่างละเอียด → เลือก',
    practice: 'ระวัง: ตัวเลือกที่ "ถูกบางส่วน" มักเป็นกับดัก'
  }
];

// ── IELTS LISTENING SKILLS ──
const LISTENING_SKILLS = [
  {
    skill: 'Keyword Catching',
    icon: '🎯',
    description: 'จับคำสำคัญจากเสียง',
    technique: 'อ่านคำถามก่อน → ขีดเส้นใต้ keywords → รอฟัง keywords หรือ synonyms',
    tip: 'คำในคำถาม อาจไม่ตรงกับที่ได้ยิน — ฟัง paraphrase'
  },
  {
    skill: 'Spelling',
    icon: '🔤',
    description: 'สะกดชื่อ/คำ',
    technique: 'ฝึก NATO alphabet (A for Alpha, B for Bravo...) | ฝึกเขียนตาม spelling ที่ได้ยิน',
    tip: 'ระวังตัวอักษรที่ออกเสียงคล้ายกัน: B/D/E/G/P/T/V'
  },
  {
    skill: 'Numbers & Dates',
    icon: '🔢',
    description: 'จับตัวเลข วันที่ เวลา',
    technique: 'ฝึกเขียนตัวเลขเร็ว | ระวัง: thirty vs thirteen, fourteen vs forty',
    tip: '£15 vs £50 vs £15,000 — ฟังให้ดีว่าหน่วยอะไร'
  },
  {
    skill: 'Names & Places',
    icon: '👤',
    description: 'จับชื่อคนและสถานที่',
    technique: 'รอฟัง spelling หลังชื่อ | จด initials ไว้ก่อนแล้วค่อยเติม',
    tip: 'อาจมีการ repeat หรือ confirm ชื่อ — ฟังรอบที่ 2'
  },
  {
    skill: 'Paraphrasing',
    icon: '🔄',
    description: 'เข้าใจคำที่ถูก paraphrase',
    technique: 'คำในเสียงอาจต่างจากคำถาม เช่น "cheap" → "affordable" → "low cost"',
    tip: 'อย่า match คำต่อคำ — ฟัง meaning'
  }
];

// ── IELTS SPEAKING STRUCTURE ──
const SPEAKING_PARTS = [
  {
    part: 'Part 1',
    title: 'Introduction & Interview',
    duration: '4-5 minutes',
    description: 'คำถามทั่วไปเกี่ยวกับตัวเอง — ง่าย แต่ต้องตอบให้ขยาย',
    technique: 'ตอบ 2-3 ประโยค | ใช้ because, so, and | ให้ example',
    example: {
      q: 'Do you enjoy your work?',
      short: 'Yes, I do.',
      good: 'Yes, I really enjoy my work. I work in application security, and I love finding and fixing security problems. It\'s challenging, but very rewarding because I feel like I\'m protecting people\'s data.'
    }
  },
  {
    part: 'Part 2',
    title: 'Long Turn / Cue Card',
    duration: '3-4 minutes',
    description: 'พูดคนเดียว 2 นาทีเกี่ยวกับหัวข้อที่ได้ มีเวลาเตรียม 1 นาที',
    technique: 'ใช้ 1 นาทีเตรียม notes | พูดให้ครบ WHAT, WHERE, WHEN, HOW/WHY | อย่าหยุด',
    example: {
      q: 'Describe a goal you have for the future. You should say: what the goal is, when you want to achieve it, why this goal is important to you.',
      response: 'One of my main goals for the future is to get a master\'s degree in cybersecurity in Taiwan...'
    }
  },
  {
    part: 'Part 3',
    title: 'Discussion',
    duration: '4-5 minutes',
    description: 'คำถาม abstract มากขึ้น — ต้องแสดงความเห็น อธิบาย เปรียบเทียบ',
    technique: 'ใช้: I believe..., It depends on..., On the other hand... | ขอเวลาคิดได้: "That\'s an interesting question..."',
    example: {
      q: 'Why do you think cybersecurity has become more important in recent years?',
      response: 'I think cybersecurity has become more critical because... (give 2-3 reasons with examples)'
    }
  }
];

const EXAM_BOOKING_REMINDER = {
  title: '⚠️ Book วันสอบ IELTS จริง',
  description: 'เป้าหมายที่ไม่มี deadline คมชัด มักจะหลุดง่าย',
  when: 'ควร book ตอนเริ่มเดือน 3 เพื่อสร้างแรงกดดันจริงให้ตัวเอง',
  tip: 'มีวันสอบจริงแปะไว้ในแอปทำให้เห็น countdown ชัดเจน',
  sites: [
    { name: 'IDP IELTS Thailand', url: 'https://www.idp.com/thailand/ielts/' },
    { name: 'British Council Thailand', url: 'https://www.britishcouncil.or.th/exam/ielts' }
  ]
};

const SPEAKING_PARTNER_REMINDER = {
  title: '👥 หา Speaking Partner',
  description: 'IELTS Speaking วัด real interaction — ฝึกคนเดียวอย่างเดียวอาจ shock ตอนเข้าห้องสอบ',
  when: 'เริ่มตั้งแต่เดือน 2 — อย่างน้อยสัปดาห์ละ 1-2 ครั้ง',
  options: [
    'iTalki / Preply — หา IELTS tutor ออนไลน์',
    'Tandem / HelloTalk — แลกภาษากับ native speaker',
    'เพื่อนหรือเพื่อนร่วมงานที่เก่งอังกฤษ',
    'IELTS preparation group ใน Facebook'
  ]
};

const BACKUP_PLAN = {
  title: '🔄 แผนสำรอง — 5 เดือน',
  trigger: 'ถ้าพลาดเรียนหลายวันติดกันในเดือน 1-2 อย่าฝืนกดดันตัวเอง',
  adjustment: 'ขยับ Month 3 (IELTS Mode) ออกไป 1 เดือน แล้วปรับ checkpoint ตาม'
};
