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

  // ══════════════════ B2 ══════════════════
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
  {
    id: 'b2-habit', level: 'B2', starterWord: 'habit',
    grammarFocus: 'Used to / Would — Past Habits',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'I used to...', model: 'I used to eat fast food every day.' },
      { prompt: 'เพิ่มสิ่งที่เปลี่ยนไป', hint: 'but now...', model: 'I used to eat fast food every day, but now I cook at home.' },
      { prompt: 'เพิ่มเหตุผลของการเปลี่ยนแปลง', hint: 'because...', model: 'I used to eat fast food every day, but now I cook at home because I want to be healthier.' },
      { prompt: 'ขยายด้วยรายละเอียดอดีต', hint: 'add "would" for a repeated past action', model: 'I used to eat fast food every day and would often skip breakfast, but now I cook at home because I want to be healthier.' }
    ]
  },
  {
    id: 'b2-quantifier', level: 'B2', starterWord: 'time',
    grammarFocus: 'Quantifiers — few / a few / most',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'I have...', model: 'I have very little free time these days.' },
      { prompt: 'เพิ่มเหตุผล', hint: 'because...', model: 'I have very little free time these days because of work.' },
      { prompt: 'เพิ่ม most/a few', hint: 'Most of..., although a few...', model: 'Most of my free time goes to work, although I still find a few hours for hobbies.' },
      { prompt: 'ขยายให้สมบูรณ์', hint: 'combine both ideas', model: 'I have very little free time these days because of work, but most weekends I still manage to find a few hours for my hobbies.' }
    ]
  },
  {
    id: 'b2-future', level: 'B2', starterWord: 'career',
    grammarFocus: 'Future Continuous & Future Perfect',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'By next year, I will have...', model: 'By next year, I will have finished my certification.' },
      { prompt: 'เพิ่ม continuous detail', hint: 'This time next year, I will be...', model: 'This time next year, I will be working in a new role.' },
      { prompt: 'รวมทั้งสองประโยค', hint: 'combine both ideas', model: 'By next year, I will have finished my certification, and this time next year, I will be working in a new role.' },
      { prompt: 'เพิ่มจุดประสงค์', hint: 'that matches my...', model: 'By next year, I will have finished my certification, and this time next year, I will be working in a new role that matches my long-term career goals.' }
    ]
  },
  {
    id: 'b2-reported-question', level: 'B2', starterWord: 'ask',
    grammarFocus: 'Reported Speech — Questions',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'My friend asked me if...', model: 'My friend asked me if I was happy with my job.' },
      { prompt: 'เพิ่มคำตอบของฉัน', hint: 'and I said...', model: 'My friend asked me if I was happy with my job, and I said yes.' },
      { prompt: 'เพิ่ม wh-question ที่รายงาน', hint: 'She also asked what...', model: 'She also asked me what my future plans were.' },
      { prompt: 'รวมเป็นบทสนทนาเดียว', hint: 'combine into one exchange', model: 'My friend asked me if I was happy with my job, and I said yes. She also asked me what my future plans were, so I told her about my goals.' }
    ]
  },

  // ══════════════════ C1 ══════════════════
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
  {
    id: 'c1-participle', level: 'C1', starterWord: 'decision',
    grammarFocus: 'Participle Clauses',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'Faced with a difficult decision,...', model: 'Faced with a difficult decision, I decided to ask for advice.' },
      { prompt: 'เพิ่มผลลัพธ์', hint: 'which helped me...', model: 'Faced with a difficult decision, I decided to ask for advice, which helped me see things more clearly.' },
      { prompt: 'เพิ่ม participle clause อีกอัน', hint: 'Having considered...', model: 'Having considered all the options, I finally made my choice.' },
      { prompt: 'รวมเป็นย่อหน้าสะท้อนความคิด', hint: 'combine both sentences', model: 'Faced with a difficult decision, I decided to ask for advice, which helped me see things more clearly. Having considered all the options, I finally made my choice.' }
    ]
  },
  {
    id: 'c1-modal-speculation', level: 'C1', starterWord: 'mistake',
    grammarFocus: 'Modals of Past Speculation',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'I must have...', model: 'I must have made a mistake somewhere in the report.' },
      { prompt: 'เพิ่มการคาดเดาสาเหตุ', hint: 'since...', model: 'I must have made a mistake somewhere in the report, since the numbers don\'t add up.' },
      { prompt: 'เพิ่มการคาดเดาทางเลือกอื่น', hint: 'Alternatively, ... might have...', model: 'Alternatively, my colleague might have entered the wrong data.' },
      { prompt: 'รวมเป็นบทสะท้อนความคิดที่สมบูรณ์', hint: 'combine both ideas', model: 'I must have made a mistake somewhere in the report, since the numbers don\'t add up. Alternatively, my colleague might have entered the wrong data by accident.' }
    ]
  },
  {
    id: 'c1-concession', level: 'C1', starterWord: 'challenge',
    grammarFocus: 'Advanced Concession',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'Despite the challenges,...', model: 'Despite the challenges, the team completed the project on time.' },
      { prompt: 'เพิ่มรายละเอียด contrast', hint: 'even though...', model: 'Despite the challenges, the team completed the project on time, even though the deadline was extremely tight.' },
      { prompt: 'เพิ่ม whereas contrast', hint: 'Whereas..., others...', model: 'Whereas some members felt overwhelmed, others thrived under pressure.' },
      { prompt: 'รวมเป็นย่อหน้าที่สมบูรณ์', hint: 'combine both ideas', model: 'Despite the challenges, the team completed the project on time, even though the deadline was extremely tight. Whereas some members felt overwhelmed, others thrived under pressure.' }
    ]
  },
  {
    id: 'c1-nominalization', level: 'C1', starterWord: 'change',
    grammarFocus: 'Complex Noun Phrases & Nominalization',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'The company announced...', model: 'The company announced a significant change in strategy.' },
      { prompt: 'ใช้ nominalization', hint: 'The company\'s decision to...', model: 'The company\'s decision to restructure surprised many employees.' },
      { prompt: 'เพิ่มผลกระทบ', hint: 'and led to...', model: 'The company\'s decision to restructure surprised many employees and led to widespread uncertainty.' },
      { prompt: 'รวมเป็นบทสรุปที่เป็นทางการ', hint: 'combine into one formal summary', model: 'The company\'s decision to restructure surprised many employees and led to widespread uncertainty about job security in the following months.' }
    ]
  },

  // ══════════════════ C2 ══════════════════
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
  },
  {
    id: 'c2-fronting', level: 'C2', starterWord: 'realize',
    grammarFocus: 'Fronting & Inversion',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'Little did I know that...', model: 'Little did I know that this decision would change my entire career.' },
      { prompt: 'เพิ่มผลลัพธ์', hint: 'opening doors...', model: 'Little did I know that this decision would change my entire career, opening doors I never imagined.' },
      { prompt: 'เพิ่มประโยค fronting ที่สอง', hint: 'Only in hindsight did...', model: 'Only in hindsight did I fully appreciate how important that moment was.' },
      { prompt: 'รวมเป็นข้อความสะท้อนความคิด', hint: 'combine both sentences', model: 'Little did I know that this decision would change my entire career, opening doors I never imagined. Only in hindsight did I fully appreciate how important that moment was.' }
    ]
  },
  {
    id: 'c2-absolute', level: 'C2', starterWord: 'consider',
    grammarFocus: 'Absolute Constructions',
    steps: [
      { prompt: 'ประโยคพื้นฐาน', hint: 'All things considered,...', model: 'All things considered, the outcome was better than expected.' },
      { prompt: 'เพิ่ม absolute construction อีกอัน', hint: 'The risks weighed carefully,...', model: 'The risks weighed carefully, we decided to proceed with the plan.' },
      { prompt: 'รวมทั้งสองประโยค', hint: 'combine both ideas', model: 'All things considered, the outcome was better than expected, and the risks weighed carefully, we decided to proceed with the plan.' },
      { prompt: 'ขยายเป็นบทสรุปที่เป็นทางการ', hint: 'expand into a formal conclusion', model: 'All things considered, the outcome was better than expected. The risks having been weighed carefully, the team decided to proceed with the plan despite initial hesitation.' }
    ]
  },
  {
    id: 'c2-rhetorical', level: 'C2', starterWord: 'change',
    grammarFocus: 'Rhetorical Devices',
    steps: [
      { prompt: 'ใช้ rhetorical question', hint: 'Is it not time...?', model: 'Is it not time we rethought our approach to this problem?' },
      { prompt: 'เพิ่ม parallelism', hint: 'We must..., we must..., and we must...', model: 'We must question, we must challenge, and we must change.' },
      { prompt: 'เพิ่ม tricolon', hint: 'It is a matter of..., of..., and of...', model: 'It is a matter of will, of courage, and of vision.' },
      { prompt: 'รวมเป็นข้อความโน้มน้าวใจ', hint: 'combine into a persuasive passage', model: 'Is it not time we rethought our approach to this problem? We must question, we must challenge, and we must change — for it is a matter of will, of courage, and of vision.' }
    ]
  },
  {
    id: 'c2-booster-hedge', level: 'C2', starterWord: 'evidence',
    grammarFocus: 'Boosters & Hedges',
    steps: [
      { prompt: 'ใช้ booster', hint: 'It is evident that...', model: 'It is evident that the policy has had a significant impact.' },
      { prompt: 'เพิ่ม hedge เพื่อความละเอียดอ่อน', hint: 'although...remain somewhat unclear', model: 'It is evident that the policy has had a significant impact, although the long-term effects remain somewhat unclear.' },
      { prompt: 'เพิ่ม hedge อีกประโยค', hint: 'The data seem to...', model: 'The data seem to suggest further improvement is possible, though more research is needed.' },
      { prompt: 'รวมเป็นบทสรุปเชิงวิชาการที่สมดุล', hint: 'combine into a balanced academic conclusion', model: 'It is evident that the policy has had a significant impact, although the long-term effects remain somewhat unclear. The data seem to suggest further improvement is possible, though more research is needed.' }
    ]
  }
];
