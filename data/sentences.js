// ── IELTS Journey — Sentence Pattern Data ──
// Context Packs + Expansion Exercises + Vocabulary Chunks

// ── CONTEXT PACKS ──
const CONTEXT_PACKS = {
  appsec: {
    id: 'appsec',
    name: 'AppSec 💻',
    color: '#6366f1',
    description: 'Application Security — งานของคุณ',
    coreVocab: [
      { word: 'assess', thai: 'ประเมิน/ตรวจสอบ', chunk: 'assess [something] for [problem]', example: 'I assess applications for security vulnerabilities.' },
      { word: 'vulnerability', thai: 'ช่องโหว่', chunk: 'security vulnerability / critical vulnerability', example: 'I found a critical vulnerability in the login page.' },
      { word: 'coordinate', thai: 'ประสานงาน', chunk: 'coordinate [something] with [someone]', example: 'I coordinate penetration testing with external vendors.' },
      { word: 'release', thai: 'ปล่อย/ออก (สินค้า)', chunk: 'before [something] is released / release an update', example: 'I check applications before they are released.' },
      { word: 'developer', thai: 'นักพัฒนา', chunk: 'work with developers / tell developers', example: 'I work with developers to fix security issues.' },
      { word: 'penetration testing', thai: 'ทดสอบเจาะระบบ', chunk: 'conduct/coordinate penetration testing', example: 'Our team conducts penetration testing every quarter.' },
      { word: 'report', thai: 'รายงาน', chunk: 'report [issue] to [person]', example: 'I report critical vulnerabilities to the security team immediately.' },
      { word: 'patch', thai: 'แก้ไข/อัปเดต', chunk: 'release a patch / apply a patch', example: 'Developers release a patch to fix the vulnerability.' },
      { word: 'vendor', thai: 'บริษัทภายนอก', chunk: 'external vendors / work with vendors', example: 'We coordinate with external vendors for penetration testing.' },
      { word: 'application security', thai: 'ความปลอดภัยของแอปพลิเคชัน', chunk: 'work in application security', example: 'I work in application security for a tech company.' }
    ]
  },
  taiwan: {
    id: 'taiwan',
    name: 'Taiwan 🇹🇼',
    color: '#10b981',
    description: 'เป้าหมายเรียนต่อไต้หวัน',
    coreVocab: [
      { word: 'study abroad', thai: 'เรียนต่อต่างประเทศ', chunk: 'study abroad in [country]', example: 'I want to study abroad in Taiwan.' },
      { word: "master's degree", thai: 'ปริญญาโท', chunk: "get/apply for a master's degree in [field]", example: "I am applying for a master's degree in cybersecurity." },
      { word: 'cybersecurity', thai: 'ความมั่นคงไซเบอร์', chunk: 'study/work in cybersecurity', example: 'I want to study cybersecurity at a Taiwanese university.' },
      { word: 'scholarship', thai: 'ทุนการศึกษา', chunk: 'apply for a scholarship', example: 'I am applying for a scholarship to study in Taiwan.' },
      { word: 'improve', thai: 'พัฒนา/ปรับปรุง', chunk: 'improve [skills/English/knowledge]', example: 'I want to improve my cybersecurity skills by studying in Taiwan.' },
      { word: 'opportunity', thai: 'โอกาส', chunk: 'an opportunity to [do something]', example: 'Studying in Taiwan is a great opportunity to develop my career.' },
      { word: 'career', thai: 'อาชีพ/เส้นทางอาชีพ', chunk: 'career in [field] / career goal', example: 'My career goal is to work in cybersecurity internationally.' },
      { word: 'culture', thai: 'วัฒนธรรม', chunk: 'experience the culture / cultural differences', example: 'I am excited to experience Taiwanese culture.' }
    ]
  },
  daily: {
    id: 'daily',
    name: 'Daily Life 🏠',
    color: '#f59e0b',
    description: 'ชีวิตประจำวัน',
    coreVocab: [
      { word: 'commute', thai: 'เดินทางไปทำงาน', chunk: 'commute to work by [transport]', example: 'I commute to work by BTS every morning.' },
      { word: 'routine', thai: 'กิจวัตร', chunk: 'daily routine / morning routine', example: 'My daily routine starts at 7 AM.' },
      { word: 'coworker', thai: 'เพื่อนร่วมงาน', chunk: 'go out with coworkers / work with coworkers', example: 'Sometimes I go out with my coworkers after work.' },
      { word: 'unwind', thai: 'ผ่อนคลาย', chunk: 'unwind by doing [activity]', example: 'I usually unwind by watching videos before bed.' },
      { word: 'exercise', thai: 'ออกกำลังกาย', chunk: 'do some exercise / go for a walk', example: 'I try to do some exercise in the evening.' },
      { word: 'weekend', thai: 'วันหยุดสุดสัปดาห์', chunk: 'on weekends, I / spend the weekend', example: 'On weekends, I usually stay home and study English.' }
    ]
  }
};

// ── SENTENCE EXPANSION EXERCISES ──
const EXPANSION_SETS = [
  // AppSec context
  {
    id: 'exp-assess',
    context: 'appsec',
    starterWord: 'assess',
    grammarFocus: 'Present Simple + Object + Time/Purpose',
    steps: [
      { level: 1, prompt: 'ประโยคพื้นฐาน — ใครทำอะไร?', hint: 'I + verb + object', model: 'I assess applications.' },
      { level: 2, prompt: 'เพิ่มวัตถุประสงค์ — เพื่ออะไร / ตรวจหาอะไร?', hint: 'for + [what you\'re looking for]', model: 'I assess applications for security problems.' },
      { level: 3, prompt: 'เพิ่มเวลา — เมื่อไหร่?', hint: 'before/after + [event]', model: 'I assess applications for security problems before they are released.' },
      { level: 4, prompt: 'เพิ่ม frequency + ขยายให้สมบูรณ์', hint: 'usually/always + more detail', model: 'I usually assess new applications for security vulnerabilities before they are released to the public.' }
    ]
  },
  {
    id: 'exp-coordinate',
    context: 'appsec',
    starterWord: 'coordinate',
    grammarFocus: 'Present Simple + with + Object',
    steps: [
      { level: 1, prompt: 'ประโยคพื้นฐาน', hint: 'I + coordinate + what?', model: 'I coordinate penetration testing.' },
      { level: 2, prompt: 'กับใคร?', hint: 'with + [who]', model: 'I coordinate penetration testing with external vendors.' },
      { level: 3, prompt: 'เมื่อไหร่ / บ่อยแค่ไหน?', hint: 'Add time expression', model: 'I coordinate penetration testing with external vendors every quarter.' },
      { level: 4, prompt: 'เพิ่มจุดประสงค์หรือผลลัพธ์', hint: 'to find... / to ensure...', model: 'I regularly coordinate penetration testing with external vendors to ensure our applications are secure before major releases.' }
    ]
  },
  {
    id: 'exp-vulnerability',
    context: 'appsec',
    starterWord: 'vulnerability',
    grammarFocus: 'Past Simple (finding/reporting)',
    steps: [
      { level: 1, prompt: 'ประโยคพื้นฐาน — พบอะไร?', hint: 'I + found + what', model: 'I found a vulnerability.' },
      { level: 2, prompt: 'อธิบายประเภท', hint: 'a [type] vulnerability in [where]', model: 'I found a critical vulnerability in the login page.' },
      { level: 3, prompt: 'แล้วทำอะไรต่อ?', hint: 'and + [what happened next]', model: 'I found a critical vulnerability in the login page and reported it to the team immediately.' },
      { level: 4, prompt: 'เพิ่มผลลัพธ์สุดท้าย', hint: 'The team... / As a result,...', model: 'I found a critical vulnerability in the login page and reported it to the team immediately. As a result, developers fixed it before the product launch.' }
    ]
  },
  // Taiwan context
  {
    id: 'exp-taiwan',
    context: 'taiwan',
    starterWord: 'study',
    grammarFocus: 'Future (going to + will) + Purpose',
    steps: [
      { level: 1, prompt: 'ประโยคพื้นฐาน — อยากทำอะไร?', hint: 'I want to + verb', model: 'I want to study in Taiwan.' },
      { level: 2, prompt: 'เรียนอะไร?', hint: 'study + [subject] / get a [degree]', model: 'I want to study cybersecurity in Taiwan.' },
      { level: 3, prompt: 'เพื่ออะไร?', hint: 'to + [purpose/goal]', model: 'I want to study cybersecurity in Taiwan to improve my skills.' },
      { level: 4, prompt: 'เชื่อมกับเป้าหมายอาชีพ', hint: 'so that / and in the future...', model: 'I am planning to study cybersecurity in Taiwan to improve my skills, and in the future, I hope to work as a security expert internationally.' }
    ]
  },
  {
    id: 'exp-improve',
    context: 'taiwan',
    starterWord: 'improve',
    grammarFocus: 'Infinitive of Purpose',
    steps: [
      { level: 1, prompt: 'ประโยคพื้นฐาน', hint: 'I want to improve + [what]', model: 'I want to improve my English.' },
      { level: 2, prompt: 'เพื่ออะไร?', hint: 'to + [goal]', model: 'I want to improve my English to study in Taiwan.' },
      { level: 3, prompt: 'กำลังทำอะไรอยู่ตอนนี้?', hint: 'I am currently + V-ing', model: 'I want to improve my English to study in Taiwan, so I am currently practicing every day.' },
      { level: 4, prompt: 'เป็นประโยคที่สมบูรณ์ที่สุด', hint: 'Combine cause, current action, future goal', model: 'I am working hard to improve my English because I want to apply for a master\'s degree in cybersecurity in Taiwan and eventually work in the international security field.' }
    ]
  },
  // Daily life context
  {
    id: 'exp-routine',
    context: 'daily',
    starterWord: 'go',
    grammarFocus: 'Present Simple + Time + Frequency',
    steps: [
      { level: 1, prompt: 'ประโยคพื้นฐาน', hint: 'I + go + where', model: 'I go home after work.' },
      { level: 2, prompt: 'เพิ่มเวลา', hint: 'at + time / around + time', model: 'I usually go home after work at around 6 PM.' },
      { level: 3, prompt: 'แล้วทำอะไรหลังจากนั้น?', hint: 'Then / After that, I...', model: 'I usually go home after work at around 6 PM. Then, I watch videos before going to bed.' },
      { level: 4, prompt: 'สร้างเป็น description of a routine', hint: 'Use: first, then, after that, finally', model: 'After work, I usually get home around 6 PM. I eat dinner, then relax by watching videos. Sometimes I go out with my coworkers. I usually go to bed by 11 PM.' }
    ]
  },
  // Pattern practice sets
  {
    id: 'exp-security',
    context: 'appsec',
    starterWord: 'security',
    grammarFocus: 'S+V+O: Using the starter word as object/concept',
    steps: [
      { level: 1, prompt: 'ประโยคสั้นที่สุด', hint: 'I work in + [field]', model: 'I work in security.' },
      { level: 2, prompt: 'เฉพาะขึ้น', hint: 'application security / web security', model: 'I work in application security.' },
      { level: 3, prompt: 'บอกว่าทำอะไรในงาน', hint: 'and + [what you do]', model: 'I work in application security and check applications for security problems.' },
      { level: 4, prompt: 'ประโยคสมบูรณ์ที่สุด', hint: 'frequency + detail + time context', model: 'I work in application security, and I usually check new applications for security problems before they are released to the public.' }
    ]
  },
  {
    id: 'exp-career',
    context: 'taiwan',
    starterWord: 'career',
    grammarFocus: 'Future + Purpose + Condition (if)',
    steps: [
      { level: 1, prompt: 'ประโยคพื้นฐาน', hint: 'My career [is/goal is...]', model: 'My career goal is to work abroad.' },
      { level: 2, prompt: 'ที่ไหน / ด้านไหน?', hint: 'in [field] / in [country]', model: 'My career goal is to work in cybersecurity in Taiwan.' },
      { level: 3, prompt: 'ทำไม?', hint: 'because + reason', model: 'My career goal is to work in cybersecurity in Taiwan because I want to grow in an international environment.' },
      { level: 4, prompt: 'เชื่อมกับสิ่งที่กำลังทำ', hint: 'That is why I am currently...', model: 'My long-term career goal is to become a cybersecurity expert working in Taiwan. That is why I am currently studying for IELTS and preparing my master\'s degree application.' }
    ]
  }
];

// ── DAILY VOCABULARY SETS (5 words/day) ──
const VOCAB_SETS = [
  {
    day: 1, week: 1,
    theme: 'AppSec Core',
    words: [
      { word: 'assess', thai: 'ประเมิน', chunk: 'assess [X] for [problem]', sentence: 'I assess applications for security vulnerabilities.' },
      { word: 'improve', thai: 'พัฒนา', chunk: 'improve [skill/situation]', sentence: 'I am improving my English every day.' },
      { word: 'release', thai: 'ปล่อย/เผยแพร่', chunk: 'release [product] / before release', sentence: 'We check for bugs before releasing the application.' },
      { word: 'report', thai: 'รายงาน', chunk: 'report [issue] to [person]', sentence: 'I report security problems to my team immediately.' },
      { word: 'experience', thai: 'ประสบการณ์', chunk: 'have experience in/with [X]', sentence: 'I have three years of experience in application security.' }
    ]
  },
  {
    day: 2, week: 1,
    theme: 'Work Verbs',
    words: [
      { word: 'coordinate', thai: 'ประสานงาน', chunk: 'coordinate [X] with [person]', sentence: 'I coordinate security testing with external vendors.' },
      { word: 'develop', thai: 'พัฒนา/สร้าง', chunk: 'develop [skill/product/plan]', sentence: 'I want to develop my English and cybersecurity skills.' },
      { word: 'challenge', thai: 'ความท้าทาย', chunk: 'face a challenge / challenging work', sentence: 'My work is challenging, but I enjoy it.' },
      { word: 'opportunity', thai: 'โอกาส', chunk: 'an opportunity to [do X]', sentence: 'Studying in Taiwan is a great opportunity for my career.' },
      { word: 'achieve', thai: 'บรรลุ/ทำสำเร็จ', chunk: 'achieve [goal/result]', sentence: 'I want to achieve IELTS 6.5 in four months.' }
    ]
  },
  {
    day: 3, week: 1,
    theme: 'Taiwan & Study',
    words: [
      { word: 'apply', thai: 'สมัคร', chunk: 'apply for [program/scholarship]', sentence: 'I am applying for a master\'s program in Taiwan.' },
      { word: 'graduate', thai: 'จบการศึกษา', chunk: 'graduate from [school] / graduate with [degree]', sentence: 'I graduated with a degree in computer science.' },
      { word: 'specialize', thai: 'เชี่ยวชาญ/เน้น', chunk: 'specialize in [field]', sentence: 'I want to specialize in application security.' },
      { word: 'network', thai: 'สร้างเครือข่าย', chunk: 'network with [people] / professional network', sentence: 'Studying abroad helps me network with international professionals.' },
      { word: 'advance', thai: 'ก้าวหน้า', chunk: 'advance in [career/skills]', sentence: 'I want to advance in my cybersecurity career.' }
    ]
  },
  {
    day: 4, week: 1,
    theme: 'Daily Life',
    words: [
      { word: 'routine', thai: 'กิจวัตร', chunk: 'daily routine / part of my routine', sentence: 'Studying English is part of my daily routine.' },
      { word: 'manage', thai: 'จัดการ', chunk: 'manage [time/tasks/team]', sentence: 'I manage my time carefully to study and work.' },
      { word: 'balance', thai: 'สมดุล', chunk: 'balance [X] and [Y] / work-life balance', sentence: 'I try to balance work and studying English.' },
      { word: 'consistent', thai: 'สม่ำเสมอ', chunk: 'be consistent / stay consistent', sentence: 'The key to improving English is being consistent.' },
      { word: 'progress', thai: 'ความคืบหน้า', chunk: 'make progress / track progress', sentence: 'I can see my progress after studying every day.' }
    ]
  },
  {
    day: 5, week: 1,
    theme: 'IELTS Key Words',
    words: [
      { word: 'significant', thai: 'สำคัญ/มาก', chunk: 'a significant [increase/difference/impact]', sentence: 'There was a significant increase in security incidents last year.' },
      { word: 'whereas', thai: 'ในขณะที่ (contrast)', chunk: '[A], whereas [B]', sentence: 'I enjoy technical work, whereas my colleague prefers management.' },
      { word: 'therefore', thai: 'ดังนั้น', chunk: '[reason], therefore [result]', sentence: 'I want to work abroad; therefore, I am studying English seriously.' },
      { word: 'despite', thai: 'แม้ว่า (ตาม noun)', chunk: 'despite [noun/V-ing]', sentence: 'Despite working full-time, I study English every evening.' },
      { word: 'furthermore', thai: 'นอกจากนี้', chunk: 'Furthermore, [additional point]', sentence: 'The job is challenging. Furthermore, it helps me grow as a professional.' }
    ]
  }
];

// ── NO-STOP SUBSTITUTIONS (สำหรับ Speaking) ──
const NO_STOP_SUBS = [
  { difficult: 'ประสานงาน', simple: 'work with', example: 'I work with other companies to check security.' },
  { difficult: 'ผู้เชี่ยวชาญ', simple: 'someone who is very skilled in', example: 'I want to become someone who is very skilled in cybersecurity.' },
  { difficult: 'ทุนการศึกษา', simple: 'financial support for studying', example: 'I am looking for financial support for studying abroad.' },
  { difficult: 'คลายเครียด', simple: 'help me feel more relaxed', example: 'Watching videos helps me feel more relaxed after work.' },
  { difficult: 'ขยายมุมมอง', simple: 'see new ways of thinking', example: 'Living abroad will help me see new ways of thinking.' },
  { difficult: 'รถติดมาก', simple: 'the traffic is very bad', example: 'The traffic in Bangkok is very bad during rush hour.' },
  { difficult: 'ละเอียดรอบคอบ', simple: 'I pay close attention to details', example: 'In my work, I pay close attention to details.' },
  { difficult: 'กำลังพัฒนา', simple: 'I am working on improving this', example: 'I know I need to speak faster, and I am working on improving this.' },
  { difficult: 'เป็นห่วง', simple: 'takes care of / worries about', example: 'My mother always takes care of me when I am stressed.' },
  { difficult: 'ซุกซน', simple: 'very active and playful', example: 'My cat is very active and playful, especially at night.' }
];
