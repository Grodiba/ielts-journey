// ── English Journey — Sentence Builder Data ──
// Expansion exercises grouped by CEFR level (1 word → 4-step sentence expansion)

const EXPANSION_SETS = [
  // ══════════════════ A2 ══════════════════
  {
    id: 'a2-intro', level: 'A2', starterWord: 'name',
    grammarFocus: 'Present Simple — Personal Info',
    steps: [
      { prompt: 'ประโยคพื้นฐาน — คุณชื่ออะไร?', hint: 'My name is...', model: 'My name is Anong.' },
      { prompt: 'เพิ่มที่มา', hint: 'I am from...', model: 'My name is Anong, and I am from Thailand.' },
      { prompt: 'เพิ่มอาชีพ/สถานะ', hint: 'I work as... / I am a student', model: 'My name is Anong, I am from Thailand, and I work as a nurse.' },
      { prompt: 'เพิ่มสิ่งที่ชอบ', hint: 'In my free time, I like...', model: 'My name is Anong, I am from Thailand, I work as a nurse, and in my free time, I like reading books.' }
    ]
  },
  {
    id: 'a2-routine', level: 'A2', starterWord: 'wake up',
    grammarFocus: 'Present Simple — Time & Sequence',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'I + verb + time', model: 'I wake up at 7 AM.' },
      { prompt: 'เพิ่มสิ่งที่ทำต่อ', hint: 'Then, I...', model: 'I wake up at 7 AM. Then, I have breakfast.' },
      { prompt: 'เพิ่มการเดินทาง', hint: 'After that, I go to...', model: 'I wake up at 7 AM, have breakfast, and then go to work.' },
      { prompt: 'สร้างเป็นย่อหน้าสั้น', hint: 'first, then, after that, finally', model: 'I usually wake up at 7 AM. First, I have breakfast, then I go to work. After that, I come home and relax. Finally, I go to bed around 11 PM.' }
    ]
  },
  {
    id: 'a2-family', level: 'A2', starterWord: 'family',
    grammarFocus: 'Present Simple — Possessives',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'I have a... family', model: 'I have a small family.' },
      { prompt: 'เพิ่มจำนวนคน', hint: 'There are ... people in my family', model: 'There are four people in my family.' },
      { prompt: 'บอกว่าใครบ้าง', hint: 'my parents, my brother...', model: 'There are four people in my family: my parents, my brother, and me.' },
      { prompt: 'เพิ่มรายละเอียด/ความรู้สึก', hint: 'add what they do or how close you are', model: 'There are four people in my family, and we are very close. My father is a teacher, and my mother works at a bank.' }
    ]
  },
  {
    id: 'a2-food', level: 'A2', starterWord: 'food',
    grammarFocus: 'Present Simple — Likes & Reasons',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'I like...', model: 'I like Thai food.' },
      { prompt: 'เจาะจงมากขึ้น', hint: 'especially...', model: 'I like Thai food, especially spicy soup.' },
      { prompt: 'เพิ่มเหตุผล', hint: 'because...', model: 'I like Thai food, especially spicy soup, because it is delicious.' },
      { prompt: 'เพิ่มความถี่/รายละเอียด', hint: 'add how often you eat it', model: 'I really like Thai food, especially spicy soup, because it is delicious. I usually cook it at home twice a week.' }
    ]
  },
  {
    id: 'a2-weather', level: 'A2', starterWord: 'weather',
    grammarFocus: 'Present Simple — Description',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'The weather is...', model: 'The weather is hot today.' },
      { prompt: 'เพิ่มรายละเอียด', hint: 'add another adjective', model: 'The weather is hot and humid today.' },
      { prompt: 'เพิ่มผลที่ตามมา', hint: 'so, I am...', model: 'The weather is hot and humid today, so I am staying indoors.' },
      { prompt: 'เพิ่มบริบทฤดูกาล', hint: 'because it is [season]...', model: 'The weather is hot and humid today because it is summer. I usually stay indoors and drink a lot of water.' }
    ]
  },
  {
    id: 'a2-shopping', level: 'A2', starterWord: 'buy',
    grammarFocus: 'Past Simple — Object & Reason',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'I bought...', model: 'I bought a new bag.' },
      { prompt: 'เพิ่มสถานที่', hint: 'at [place]', model: 'I bought a new bag at the mall.' },
      { prompt: 'เพิ่มเวลา', hint: 'yesterday / last week', model: 'I bought a new bag at the mall yesterday.' },
      { prompt: 'เพิ่มเหตุผล', hint: 'because...', model: 'I bought a new bag at the mall yesterday because my old one was broken.' }
    ]
  },

  // ══════════════════ B1 ══════════════════
  {
    id: 'b1-work', level: 'B1', starterWord: 'job',
    grammarFocus: 'Present Simple + Present Perfect',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'My job is...', model: 'My job is quite challenging.' },
      { prompt: 'เพิ่มเหตุผล', hint: 'because...', model: 'My job is quite challenging because I have to manage many tasks.' },
      { prompt: 'เพิ่มประสบการณ์', hint: 'but I have learned...', model: 'My job is quite challenging, but I have learned a lot since I started.' },
      { prompt: 'เพิ่มเป้าหมายอนาคต', hint: 'and I hope to...', model: 'My job is quite challenging, but I have learned a lot since I started, and I hope to get a promotion next year.' }
    ]
  },
  {
    id: 'b1-travel', level: 'B1', starterWord: 'travel',
    grammarFocus: 'Past Simple + Past Continuous',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'Last year, I traveled to...', model: 'Last year, I traveled to Chiang Mai.' },
      { prompt: 'เพิ่มสิ่งที่เกิดขึ้น', hint: 'and + [what happened]', model: 'Last year, I traveled to Chiang Mai and visited many temples.' },
      { prompt: 'เพิ่ม Past Continuous', hint: 'While I was...', model: 'While I was traveling in Chiang Mai, I met some interesting people.' },
      { prompt: 'รวมเป็นเรื่องเล่า', hint: 'combine both ideas', model: 'Last year, I traveled to Chiang Mai and visited many temples. While I was exploring the old city, I met some interesting people who showed me a hidden café.' }
    ]
  },
  {
    id: 'b1-feelings', level: 'B1', starterWord: 'feel',
    grammarFocus: 'Present Simple + Linking Words',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'I feel...', model: 'I feel nervous.' },
      { prompt: 'เพิ่มเหตุผล', hint: 'because...', model: 'I feel nervous because I have a job interview tomorrow.' },
      { prompt: 'เพิ่ม contrast', hint: 'but...', model: 'I feel nervous because I have a job interview tomorrow, but I have prepared well.' },
      { prompt: 'ขยายให้สมบูรณ์', hint: 'combine with although', model: 'I feel a bit nervous because I have a job interview tomorrow, although I have prepared well and I am confident in my skills.' }
    ]
  },
  {
    id: 'b1-technology', level: 'B1', starterWord: 'technology',
    grammarFocus: 'Present Perfect + Opinion Language',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'Technology has...', model: 'Technology has changed the way we live.' },
      { prompt: 'เพิ่มตัวอย่าง', hint: 'especially how we...', model: 'Technology has changed the way we live, especially how we communicate.' },
      { prompt: 'เพิ่มความเห็น', hint: 'and I think...', model: 'Technology has changed the way we live, especially how we communicate, and I think this is mostly positive.' },
      { prompt: 'เพิ่มมุมมองตรงข้าม', hint: 'although it can also...', model: 'Technology has changed the way we live, especially how we communicate, and I think this is mostly positive, although it can also make us less focused.' }
    ]
  },
  {
    id: 'b1-future-plans', level: 'B1', starterWord: 'plan',
    grammarFocus: 'Future Forms + Purpose',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'I am planning to...', model: 'I am planning to improve my English.' },
      { prompt: 'เพิ่มวิธีการ', hint: 'by + V-ing', model: 'I am planning to improve my English by practicing every day.' },
      { prompt: 'เพิ่มจุดประสงค์', hint: 'so that...', model: 'I am planning to improve my English by practicing every day so that I can communicate more confidently.' },
      { prompt: 'เพิ่ม timeline', hint: 'and I hope that within...', model: 'I am planning to improve my English by practicing every day, and I hope that within a year, I will be able to communicate confidently at work.' }
    ]
  },
  {
    id: 'b1-environment', level: 'B1', starterWord: 'environment',
    grammarFocus: 'Modals + Linking Words',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'We should...', model: 'We should protect the environment.' },
      { prompt: 'เพิ่มเหตุผล', hint: 'because...', model: 'We should protect the environment because pollution is getting worse.' },
      { prompt: 'เพิ่มตัวอย่างการกระทำ', hint: 'so we need to...', model: 'We should protect the environment because pollution is getting worse, so we need to reduce plastic waste.' },
      { prompt: 'ขยายให้สมบูรณ์', hint: 'add "For example"', model: 'We should protect the environment because pollution is getting worse. For example, we can reduce plastic waste and use public transport more often.' }
    ]
  },

  // ══════════════════ B2 (seed) ══════════════════
  {
    id: 'b2-opinion', level: 'B2', starterWord: 'opinion',
    grammarFocus: 'Second Conditional + Hedging',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'In my opinion,...', model: 'In my opinion, remote work has more advantages than disadvantages.' },
      { prompt: 'เพิ่มเหตุผล', hint: 'because...', model: 'In my opinion, remote work has more advantages than disadvantages because it gives employees more flexibility.' },
      { prompt: 'เพิ่มข้อโต้แย้ง', hint: 'although it can...', model: 'In my opinion, remote work has more advantages than disadvantages, although it can sometimes reduce team communication.' },
      { prompt: 'เพิ่ม conditional', hint: 'If companies... would...', model: 'If companies managed remote teams more effectively, the disadvantages of remote work would be far less significant.' }
    ]
  },
  {
    id: 'b2-compare', level: 'B2', starterWord: 'compare',
    grammarFocus: 'Comparatives + Reported Opinion',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'Compared to...', model: 'Compared to ten years ago, our lives are far more connected.' },
      { prompt: 'เพิ่มรายละเอียด', hint: 'thanks to...', model: 'Compared to ten years ago, our lives are far more connected thanks to smartphones and social media.' },
      { prompt: 'เพิ่มมุมมองต่าง', hint: 'although some argue...', model: 'Compared to ten years ago, our lives are far more connected, although some argue that this connection is often superficial.' },
      { prompt: 'ขยายด้วย reported opinion', hint: 'experts argue that...', model: 'Compared to ten years ago, our lives are far more connected, although some experts argue that this connection is often quite superficial.' }
    ]
  },

  // ══════════════════ C1 (seed) ══════════════════
  {
    id: 'c1-abstract', level: 'C1', starterWord: 'balance',
    grammarFocus: 'Inversion + Advanced Linking',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'Striking a balance between...', model: 'Striking a balance between work and personal life is essential.' },
      { prompt: 'เพิ่มความละเอียดอ่อน', hint: 'yet increasingly...', model: 'Striking a balance between work and personal life is essential, yet increasingly difficult in a connected world.' },
      { prompt: 'ใช้ Inversion เพื่อเน้น', hint: 'Rarely do...', model: 'Rarely do people achieve this balance without making deliberate lifestyle changes.' },
      { prompt: 'รวมเป็นข้อโต้แย้งที่สมบูรณ์', hint: 'combine both sentences', model: 'Striking a balance between work and personal life is essential, yet increasingly difficult in a connected world. Rarely do people achieve this balance without making deliberate, conscious changes.' }
    ]
  },
  {
    id: 'c1-hypothetical', level: 'C1', starterWord: 'imagine',
    grammarFocus: 'Mixed Conditional + Causative',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'Imagine if...', model: 'Imagine if cities had been designed around pedestrians rather than cars.' },
      { prompt: 'เพิ่มผลลัพธ์สมมติ', hint: 'pollution levels would...', model: 'Imagine if cities had been designed around pedestrians rather than cars — pollution levels would be dramatically lower today.' },
      { prompt: 'เพิ่ม causative structure', hint: 'have their designs reviewed...', model: 'Many urban planners now have their designs reviewed with pedestrian safety as the top priority.' },
      { prompt: 'รวมเป็นบทสะท้อนความคิด', hint: 'combine into a full reflection', model: 'Imagine if cities had been designed around pedestrians rather than cars — pollution levels would be dramatically lower today. That is why many urban planners now have their designs reviewed with sustainability as the top priority.' }
    ]
  },

  // ══════════════════ C2 (seed) ══════════════════
  {
    id: 'c2-nuance', level: 'C2', starterWord: 'nuance',
    grammarFocus: 'Hedging + Cleft Sentences',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'It could be argued that...', model: 'It could be argued that modern education overemphasizes standardized testing.' },
      { prompt: 'เพิ่มความละเอียดอ่อน', hint: 'though this varies...', model: 'It could be argued that modern education overemphasizes standardized testing, though this varies significantly across countries.' },
      { prompt: 'ใช้ Cleft sentence เพื่อเน้น', hint: 'What is often overlooked...', model: 'What is often overlooked, however, is the impact this has on students\' creativity.' },
      { prompt: 'รวมเป็นข้อโต้แย้งขั้นสูง', hint: 'combine into one sophisticated paragraph', model: 'It could be argued that modern education overemphasizes standardized testing, though this varies across countries. What is often overlooked, however, is the impact this has on students\' long-term creativity and motivation.' }
    ]
  },
  {
    id: 'c2-academic', level: 'C2', starterWord: 'evidence',
    grammarFocus: 'Advanced Passive + Discourse Markers',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'The evidence suggests that...', model: 'The evidence suggests that early intervention significantly improves outcomes.' },
      { prompt: 'เพิ่ม hedge', hint: 'although the underlying...', model: 'The evidence suggests that early intervention significantly improves outcomes, although the underlying mechanisms remain unclear.' },
      { prompt: 'เพิ่ม discourse marker', hint: 'Notwithstanding these limitations...', model: 'Notwithstanding these limitations, the findings have important implications for policy.' },
      { prompt: 'รวมเป็นบทสรุปเชิงวิชาการ', hint: 'combine into an academic summary', model: 'The evidence suggests that early intervention significantly improves outcomes, although the underlying mechanisms remain unclear. Notwithstanding these limitations, the findings carry important implications for future policy.' }
    ]
  }
];
