// ── English Journey — Speaking Topics & Level Checkpoints ──

const SPEAKING_TOPICS = [
  // ══════════════════ A2 (short, simple) ══════════════════
  {
    id: 'a2-myself', level: 'A2', title: 'About Myself', icon: '🙋',
    timerMin: 5,
    prompt: 'Introduce yourself. Who are you? Where are you from? What do you do?',
    starters: ['My name is...', 'I am from...', 'I work as... / I study...', 'In my free time, I like...'],
    vocabulary: ['introduce', 'from', 'work as', 'live in', 'free time'],
    tips: ['พูด 3-4 ประโยคง่ายๆ', 'ใช้ Present Simple', 'ไม่ต้องรีบ พูดชัดๆ ทีละประโยค', 'จบด้วยสิ่งที่คุณชอบทำ']
  },
  {
    id: 'a2-family', level: 'A2', title: 'My Family', icon: '👨‍👩‍👧',
    timerMin: 5,
    prompt: 'Describe your family. Who is in your family? What are they like?',
    starters: ['I have a... family.', 'There are ... people in my family.', 'My mother/father is...', 'We usually...'],
    vocabulary: ['parents', 'sibling', 'close', 'live together', 'get along'],
    tips: ['บอกจำนวนคนในครอบครัว', 'บอกว่าแต่ละคนทำอาชีพอะไร', 'บอกว่าสนิทกันแค่ไหน', 'ยกตัวอย่างกิจกรรมที่ทำร่วมกัน']
  },
  {
    id: 'a2-routine', level: 'A2', title: 'My Daily Routine', icon: '⏰',
    timerMin: 6,
    prompt: 'Describe your typical day from morning to night.',
    starters: ['I usually wake up at...', 'In the morning, I...', 'After that, I...', 'Before bed, I...'],
    vocabulary: ['wake up', 'commute', 'routine', 'go to bed', 'usually'],
    tips: ['ใช้ time words: first, then, after that, finally', 'ใช้ Present Simple ตลอด', 'บอกเวลาให้ชัดเจน', 'จบด้วยกิจวัตรก่อนนอน']
  },
  {
    id: 'a2-home', level: 'A2', title: 'My Home', icon: '🏠',
    timerMin: 5,
    prompt: 'Describe the place where you live. What is it like?',
    starters: ['I live in a/an...', 'It has... rooms.', 'My favorite room is...', 'I like living there because...'],
    vocabulary: ['apartment', 'furniture', 'comfortable', 'neighborhood', 'tidy'],
    tips: ['บอกประเภทที่อยู่ (บ้าน/apartment)', 'บอกจำนวนห้อง', 'บอกห้องที่ชอบที่สุด', 'ให้เหตุผลว่าทำไมชอบที่นี่']
  },
  {
    id: 'a2-food', level: 'A2', title: 'Food I Like', icon: '🍜',
    timerMin: 5,
    prompt: 'What food do you like? Describe your favorite dish.',
    starters: ['My favorite food is...', 'It usually has...', 'I like it because...', 'I eat it... times a week.'],
    vocabulary: ['delicious', 'spicy', 'ingredient', 'recipe', 'order'],
    tips: ['บอกชื่ออาหาร', 'บอกว่าทำจากอะไร', 'ให้เหตุผลว่าทำไมชอบ', 'บอกความถี่ที่กิน']
  },

  // ══════════════════ B1 (longer, more reasoning) ══════════════════
  {
    id: 'b1-job-study', level: 'B1', title: 'My Job or Studies', icon: '💼',
    timerMin: 10,
    prompt: 'Talk about your job or studies. What do you do? What do you enjoy or find difficult about it?',
    starters: ['I work as... / I am studying...', 'My main responsibility is...', 'One thing I enjoy is...', 'A challenge I face is...'],
    vocabulary: ['responsible for', 'colleague', 'deadline', 'challenging', 'improve'],
    tips: ['อธิบายว่าทำงาน/เรียนอะไร', 'ยกตัวอย่างงานที่ทำในแต่ละวัน', 'บอกสิ่งที่ชอบและสิ่งที่ท้าทาย', 'เชื่อมกับเป้าหมายในอนาคต']
  },
  {
    id: 'b1-hobbies', level: 'B1', title: 'My Hobbies', icon: '🎮',
    timerMin: 10,
    prompt: 'What are your hobbies? How did you start, and why do you enjoy them?',
    starters: ['One of my hobbies is...', 'I started... about... years ago.', 'I enjoy it because...', 'It helps me...'],
    vocabulary: ['hobby', 'passionate about', 'relax', 'improve', 'consistent'],
    tips: ['บอกงานอดิเรก 2-3 อย่าง', 'บอกว่าเริ่มเมื่อไหร่', 'อธิบายว่าทำไมชอบ', 'บอกว่ามันช่วยอะไรในชีวิต']
  },
  {
    id: 'b1-trip', level: 'B1', title: 'A Trip I Remember', icon: '✈️',
    timerMin: 12,
    prompt: 'Describe a memorable trip. Where did you go, and what happened?',
    starters: ['Last year, I traveled to...', 'While I was there, I...', 'One thing I remember most is...', 'Overall, it was...'],
    vocabulary: ['destination', 'itinerary', 'explore', 'memorable', 'accommodation'],
    tips: ['ใช้ Past Simple เล่าเรื่อง', 'ใช้ Past Continuous สำหรับเหตุการณ์ระหว่างทาง', 'ยกตัวอย่างที่เจาะจง', 'สรุปความรู้สึกตอนท้าย']
  },
  {
    id: 'b1-city', level: 'B1', title: 'My City', icon: '🏙️',
    timerMin: 10,
    prompt: 'Describe the city you live in. What do you like or dislike about it?',
    starters: ['I live in...', 'One thing I love about my city is...', 'However, one problem is...', 'Compared to other cities,...'],
    vocabulary: ['crowded', 'convenient', 'traffic', 'community', 'pollution'],
    tips: ['อธิบายบรรยากาศทั่วไป', 'บอกทั้งข้อดีและข้อเสีย', 'เปรียบเทียบกับที่อื่นถ้าทำได้', 'ยกตัวอย่างประสบการณ์จริง']
  },
  {
    id: 'b1-future', level: 'B1', title: 'My Future Plans', icon: '🚀',
    timerMin: 12,
    prompt: 'What are your plans for the future? What do you hope to achieve?',
    starters: ['In the future, I plan to...', 'My main goal is to...', 'I am currently working on...', 'I hope that within... years,...'],
    vocabulary: ['achieve', 'goal', 'improve', 'progress', 'motivated'],
    tips: ['พูดถึงเป้าหมายระยะสั้นและระยะยาว', 'อธิบายว่ากำลังทำอะไรอยู่ตอนนี้เพื่อไปถึงเป้าหมาย', 'ใช้ future forms ให้หลากหลาย', 'แสดงความมุ่งมั่น']
  },

  // ══════════════════ B2 ══════════════════
  {
    id: 'b2-technology', level: 'B2', title: 'Technology in Society', icon: '💻',
    timerMin: 15,
    prompt: 'Do you think technology has made life better or worse overall? Discuss both sides.',
    starters: ['On the one hand,...', 'On the other hand,...', 'In my view,...', 'It could be argued that...'],
    vocabulary: ['perspective', 'outweigh', 'controversial', 'rely on', 'connection'],
    tips: ['พูดทั้งสองมุมมองก่อนสรุป', 'ยกตัวอย่างที่ชัดเจน', 'ใช้ hedging language เมื่อไม่ฟันธง', 'สรุปด้วยความเห็นส่วนตัว']
  },
  {
    id: 'b2-worklife', level: 'B2', title: 'Work-Life Balance', icon: '⚖️',
    timerMin: 15,
    prompt: 'How important is work-life balance? What can people do to achieve it?',
    starters: ['I believe that...', 'One reason for this is...', 'For example,...', 'Overall, I would argue that...'],
    vocabulary: ['balance', 'workload', 'overwhelmed', 'sustainable', 'prioritize'],
    tips: ['ให้เหตุผลรอบด้าน', 'ยกตัวอย่างที่เป็นรูปธรรม', 'เสนอวิธีแก้ปัญหา', 'ใช้ linking words ขั้นสูง']
  },
  {
    id: 'b2-media', level: 'B2', title: 'Media & News Consumption', icon: '📰',
    timerMin: 15,
    prompt: 'How do you consume news and media? Do you think people can trust what they read online?',
    starters: ['I usually get my news from...', 'One issue I\'ve noticed is...', 'I think it\'s important to...', 'Overall, I would say...'],
    vocabulary: ['credible', 'bias', 'misinformation', 'coverage', 'objective'],
    tips: ['พูดถึงแหล่งข่าวที่ใช้ประจำ', 'ยกตัวอย่างปัญหาความน่าเชื่อถือ', 'เสนอวิธีตรวจสอบข้อมูล', 'สรุปด้วยความเห็นส่วนตัว']
  },
  {
    id: 'b2-health', level: 'B2', title: 'Health & Wellbeing', icon: '🧘',
    timerMin: 15,
    prompt: 'What does a healthy lifestyle mean to you? What changes have you made or would like to make?',
    starters: ['To me, a healthy lifestyle means...', 'I\'ve tried to improve...', 'One challenge I face is...', 'In the future, I hope to...'],
    vocabulary: ['wellbeing', 'sedentary', 'nutrient', 'resilience', 'holistic'],
    tips: ['อธิบายความหมายของสุขภาพดีในมุมมองตัวเอง', 'ยกตัวอย่างสิ่งที่ทำอยู่/อยากทำ', 'พูดถึงอุปสรรค', 'จบด้วยเป้าหมาย']
  },
  {
    id: 'b2-science', level: 'B2', title: 'Science & Innovation', icon: '🔬',
    timerMin: 15,
    prompt: 'What recent scientific development do you find most interesting? Why?',
    starters: ['A development that interests me is...', 'What makes it significant is...', 'It could potentially...', 'On the other hand,...'],
    vocabulary: ['breakthrough', 'innovative', 'artificial intelligence', 'automation', 'ethical'],
    tips: ['เลือกหัวข้อวิทยาศาสตร์ที่สนใจจริง', 'อธิบายว่าทำไมสำคัญ', 'พูดถึงผลกระทบที่อาจเกิดขึ้น', 'พิจารณาข้อกังวลเชิงจริยธรรมถ้ามี']
  },

  // ══════════════════ C1 ══════════════════
  {
    id: 'c1-decision', level: 'C1', title: 'A Difficult Decision', icon: '🧭',
    timerMin: 15,
    prompt: 'Describe a difficult decision you had to make. How did you approach it, and what did you learn?',
    starters: ['One of the most difficult decisions I have faced was...', 'What made it particularly challenging was...', 'In hindsight,...', 'This experience taught me...'],
    vocabulary: ['inherent', 'implication', 'weigh up', 'overcome', 'reflect on'],
    tips: ['เล่าบริบทให้ชัดเจน', 'อธิบายกระบวนการคิด/ตัดสินใจ', 'สะท้อนบทเรียนที่ได้', 'ใช้โครงสร้างประโยคที่หลากหลาย']
  },
  {
    id: 'c1-education', level: 'C1', title: 'The Value of Education', icon: '🎓',
    timerMin: 15,
    prompt: 'What is the real value of education in today\'s world? Is it more about knowledge or skills?',
    starters: ['Arguably, the true value of education lies in...', 'Rarely do we consider...', 'That being said,...', 'Ultimately, I would contend that...'],
    vocabulary: ['multifaceted', 'underlying', 'substantiate', 'coherent', 'nuance'],
    tips: ['ใช้ inversion เพื่อเน้นประเด็นสำคัญ', 'อ้างอิงมุมมองที่หลากหลาย', 'สรุปด้วยจุดยืนที่ชัดเจน', 'ใช้คำศัพท์เชิงวิชาการ']
  },
  {
    id: 'c1-business', level: 'C1', title: 'Business Ethics', icon: '💼',
    timerMin: 15,
    prompt: 'Should companies prioritize profit or social responsibility? Discuss with reasoning.',
    starters: ['Arguably, the most important factor is...', 'One could argue that...', 'That said,...', 'Ultimately, I believe...'],
    vocabulary: ['stakeholder', 'accountability', 'volatile', 'diversify', 'competent'],
    tips: ['นำเสนอทั้งสองมุมมองก่อนสรุป', 'ยกตัวอย่างบริษัทจริงถ้าทำได้', 'ใช้ hedging language เมื่อไม่ฟันธง', 'ใช้ linking words ขั้นสูง']
  },
  {
    id: 'c1-politics', level: 'C1', title: 'Politics & Society', icon: '🏛️',
    timerMin: 15,
    prompt: 'How much influence should citizens have over government decisions? Discuss the balance between representation and expertise.',
    starters: ['It could be argued that...', 'On the one hand,...', 'On the other hand,...', 'In my view,...'],
    vocabulary: ['legislation', 'accountability', 'referendum', 'bureaucracy', 'advocate'],
    tips: ['ใช้ inversion เพื่อเน้นประเด็นสำคัญ', 'ยกตัวอย่างเชิงระบบการเมืองที่หลากหลาย', 'รักษาความเป็นกลาง', 'สรุปด้วยจุดยืนที่ชัดเจน']
  },
  {
    id: 'c1-arts', level: 'C1', title: 'Arts & Creativity', icon: '🎨',
    timerMin: 15,
    prompt: 'What role does art play in society? Can art change how people think?',
    starters: ['Art has always played a role in...', 'A striking example is...', 'Some might argue that...', 'Nevertheless,...'],
    vocabulary: ['narrative', 'aesthetic', 'symbolism', 'evoke', 'contemporary'],
    tips: ['ยกตัวอย่างงานศิลปะที่เจาะจง', 'อธิบายผลกระทบทางความคิด/สังคม', 'ใช้คำศัพท์เชิงวิเคราะห์', 'เชื่อมโยงกับประสบการณ์ส่วนตัวถ้าเป็นไปได้']
  },

  // ══════════════════ C2 ══════════════════
  {
    id: 'c2-ai-ethics', level: 'C2', title: 'The Ethics of Artificial Intelligence', icon: '🤖',
    timerMin: 20,
    prompt: 'What are the ethical implications of artificial intelligence? How should society respond?',
    starters: ['It is widely acknowledged that...', 'A case in point is...', 'Notwithstanding these concerns,...', 'The crux of the matter is...'],
    vocabulary: ['dichotomy', 'ostensibly', 'juxtapose', 'pragmatic', 'lend credence to'],
    tips: ['ใช้คำศัพท์และสำนวนขั้นสูงอย่างเป็นธรรมชาติ', 'นำเสนอข้อโต้แย้งหลายชั้น', 'ใช้ discourse markers เชื่อมความคิดอย่างลื่นไหล', 'รักษาความเป็นกลางและรอบคอบ']
  },
  {
    id: 'c2-cultural-identity', level: 'C2', title: 'Cultural Identity in a Globalized World', icon: '🌏',
    timerMin: 20,
    prompt: 'How is cultural identity changing in an increasingly globalized world? Is this a positive or negative trend?',
    starters: ['In an era of unprecedented interconnectedness,...', 'What is often overlooked is...', 'This is, in many ways, a double-edged sword.', 'In the same vein,...'],
    vocabulary: ['multifaceted', 'integration', 'paradox', 'discern', 'a far cry from'],
    tips: ['สร้างข้อโต้แย้งที่มีหลายชั้นความคิด', 'ใช้ cleft sentences เพื่อเน้นประเด็น', 'อ้างอิงตัวอย่างเชิงวัฒนธรรมที่หลากหลาย', 'ปิดท้ายด้วยมุมมองที่ลึกซึ้ง']
  },
  {
    id: 'c2-philosophy', level: 'C2', title: 'Philosophical Dilemmas', icon: '🧠',
    timerMin: 20,
    prompt: 'Is it ever justifiable to sacrifice individual rights for the greater good? Explore this dilemma.',
    starters: ['This dilemma sits at the heart of...', 'A utilitarian would argue that...', 'Conversely,...', 'What is often overlooked is...'],
    vocabulary: ['utilitarian', 'autonomy', 'intrinsic value', 'discourse', 'paradigm'],
    tips: ['สร้างข้อโต้แย้งหลายชั้นความคิด', 'อ้างอิงแนวคิดปรัชญาที่เกี่ยวข้อง', 'ใช้ cleft sentences เพื่อเน้นประเด็น', 'หลีกเลี่ยงข้อสรุปที่ง่ายเกินไป']
  },
  {
    id: 'c2-language', level: 'C2', title: 'The Evolution of Language', icon: '🗣️',
    timerMin: 20,
    prompt: 'How is language evolving in the digital age? Is this evolution enriching or degrading communication?',
    starters: ['Language has always evolved, but...', 'It is arguably the case that...', 'That being said,...', 'The crux of the matter is...'],
    vocabulary: ['discourse', 'connotation', 'rhetoric', 'nuance', 'paradigm'],
    tips: ['ยกตัวอย่างการเปลี่ยนแปลงภาษาจริง (slang, emoji, ฯลฯ)', 'มองทั้งมุมบวกและลบ', 'ใช้ discourse markers ขั้นสูง', 'ปิดท้ายด้วยมุมมองที่ลึกซึ้ง']
  },
  {
    id: 'c2-rhetoric', level: 'C2', title: 'The Art of Persuasion', icon: '🎙️',
    timerMin: 20,
    prompt: 'What makes an argument truly persuasive? Discuss techniques and their ethical implications.',
    starters: ['At its core, persuasion relies on...', 'A case in point is...', 'Notwithstanding its power,...', 'Ultimately,...'],
    vocabulary: ['rhetoric', 'satire', 'irony', 'juxtaposition', 'discourse'],
    tips: ['ยกตัวอย่างเทคนิคทางวาทศิลป์ที่เจาะจง', 'พิจารณาข้อกังวลเชิงจริยธรรมของการโน้มน้าวใจ', 'ใช้ rhetorical devices ในการพูดจริง', 'สรุปด้วยมุมมองที่สมดุล']
  }
];

// ── No-Stop Substitutions — everyday alternatives when you don't know a word ──
const NO_STOP_SUBS = [
  { difficult: 'ประสานงาน', simple: 'work together with', example: 'I work together with my team to finish the project.' },
  { difficult: 'ผู้เชี่ยวชาญ', simple: 'someone who is very skilled in', example: 'She is someone who is very skilled in cooking.' },
  { difficult: 'คลายเครียด', simple: 'help me feel more relaxed', example: 'Listening to music helps me feel more relaxed.' },
  { difficult: 'ขยายมุมมอง', simple: 'see new ways of thinking', example: 'Traveling helps me see new ways of thinking.' },
  { difficult: 'รถติดมาก', simple: 'the traffic is very bad', example: 'The traffic in Bangkok is very bad in the evening.' },
  { difficult: 'ละเอียดรอบคอบ', simple: 'I pay close attention to details', example: 'In my work, I pay close attention to details.' },
  { difficult: 'กำลังพัฒนา', simple: 'I am working on improving this', example: 'I know my speaking is slow, and I am working on improving this.' },
  { difficult: 'เป็นห่วง', simple: 'takes care of / worries about', example: 'My mother always takes care of me when I am tired.' },
  { difficult: 'สนุกสนาน', simple: 'a lot of fun', example: 'The trip was a lot of fun.' },
  { difficult: 'ใจเย็น', simple: 'stay calm', example: 'I try to stay calm when things go wrong.' }
];

// ── Level-Up Checklists — self-assessed tasks to complete a CEFR level ──
const LEVEL_CHECKPOINTS = {
  A2: {
    name: 'Level Up: A2 → B1',
    tasks: [
      'เรียน Grammar Clinic ครบทั้ง 10 หัวข้อของ A2',
      'เรียนคำศัพท์ A2 ครบทุกวัน (7 วัน)',
      'ทำ Sentence Builder ครบทุก exercise ของ A2',
      'ฝึก Speaking practice อย่างน้อย 3 หัวข้อ',
      'บันทึก Error Notebook อย่างน้อย 10 รายการ'
    ]
  },
  B1: {
    name: 'Level Up: B1 → B2',
    tasks: [
      'เรียน Grammar Clinic ครบทั้ง 10 หัวข้อของ B1',
      'เรียนคำศัพท์ B1 ครบทุกวัน (6 วัน)',
      'ทำ Sentence Builder ครบทุก exercise ของ B1',
      'ฝึก Speaking practice อย่างน้อย 4 หัวข้อ (พูดต่อเนื่อง 10+ นาที)',
      'บันทึก Error Notebook สะสมอย่างน้อย 25 รายการ'
    ]
  },
  B2: {
    name: 'Level Up: B2 → C1',
    tasks: [
      'เรียน Grammar Clinic ครบทั้ง 10 หัวข้อของ B2',
      'เรียนคำศัพท์ B2 ครบทุกวัน (6 วัน)',
      'ทำ Sentence Builder ครบทุก exercise ของ B2',
      'ฝึก Speaking practice อย่างน้อย 4 หัวข้อของ B2',
      'บันทึก Error Notebook สะสมอย่างน้อย 35 รายการ'
    ]
  },
  C1: {
    name: 'Level Up: C1 → C2',
    tasks: [
      'เรียน Grammar Clinic ครบทั้ง 10 หัวข้อของ C1',
      'เรียนคำศัพท์ C1 ครบทุกวัน (6 วัน)',
      'ทำ Sentence Builder ครบทุก exercise ของ C1',
      'ฝึก Speaking practice อย่างน้อย 4 หัวข้อของ C1',
      'บันทึก Error Notebook สะสมอย่างน้อย 45 รายการ'
    ]
  },
  C2: {
    name: 'Mastery — C2 Complete',
    tasks: [
      'เรียน Grammar Clinic ครบทั้ง 10 หัวข้อของ C2',
      'เรียนคำศัพท์ C2 ครบทุกวัน (6 วัน)',
      'ทำ Sentence Builder ครบทุก exercise ของ C2',
      'ฝึก Speaking practice ครบทั้ง 5 หัวข้อของ C2',
      'บันทึก Error Notebook สะสมอย่างน้อย 60 รายการ — ยินดีด้วย คุณมาถึงจุดสูงสุดแล้ว! 🎉'
    ]
  }
};
