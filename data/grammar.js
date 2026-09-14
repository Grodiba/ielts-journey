// ── English Journey — Grammar Clinic Data ──
// Topics grouped by CEFR level: A2 (10), B1 (10), B2/C1/C2 (4 each, seed)

const GRAMMAR_TOPICS = [
  // ══════════════════ A2 ══════════════════
  {
    id: 'be', level: 'A2', order: 1,
    title: 'Verb "to be" — am / is / are', icon: '🔑',
    rule: 'am/is/are แปลว่า เป็น/อยู่/คือ\nI + am | he/she/it + is | you/we/they + are\nปฏิเสธ: am not / isn\'t / aren\'t | คำถาม: สลับตำแหน่ง Am/Is/Are + subject...?',
    examples: ['I am a student.', 'She is from Thailand.', 'They are my friends.', 'Is he your brother?'],
    examples2: ['My sister is a nurse.', 'We are happy today.', 'This coffee is not sweet.', 'Are you free this weekend?'],
    tip: '💡 am/is/are เปลี่ยนตาม subject เสมอ — ไม่มีคำว่า "is" ซ้อนกับ verb อื่น (ผิด: "She is like coffee.")'
  },
  {
    id: 'pronouns-possessives', level: 'A2', order: 2,
    title: 'Pronouns & Possessives — I/my, you/your...', icon: '🙋',
    rule: 'Subject pronouns: I, you, he, she, it, we, they (ทำหน้าที่ประธาน)\nPossessive adjectives: my, your, his, her, its, our, their (แสดงความเป็นเจ้าของ + noun)',
    examples: ['I have a brother. His name is Tom.', 'She loves her job.', 'We visit our grandparents every month.', 'They forgot their umbrella.'],
    examples2: ['He is tall. His hair is black.', 'It is my cat. Its name is Milo.', 'You can bring your friend.', 'Is this your bag?'],
    tip: '💡 my/your/his/her/its/our/their ตามด้วย noun เสมอ (my book) — ไม่ตามด้วย verb'
  },
  {
    id: 'plural-articles', level: 'A2', order: 3,
    title: 'Plural Nouns & a / an / the', icon: '📦',
    rule: 'นับได้ + s (book→books, box→boxes) | นับไม่ได้ไม่เติม s (water, rice)\na = พยัญชนะ, an = สระ (a,e,i,o,u) | the = สิ่งที่รู้กันแล้ว/เจาะจง',
    examples: ['I have two dogs.', 'She bought an apple and a banana.', 'The book on the table is mine.', 'There are three children in the park.'],
    examples2: ['I need an umbrella; it\'s raining.', 'We watched a movie last night. The movie was great.', 'Children need a lot of sleep.', 'He has three watches.'],
    tip: '💡 ใช้ "the" เมื่อพูดถึงสิ่งที่พูดไปแล้ว หรือมีสิ่งเดียวที่ทุกคนรู้ (the sun, the internet)'
  },
  {
    id: 'present-simple', level: 'A2', order: 4,
    title: 'Present Simple — Habits & Facts', icon: '🔄',
    rule: 'ใช้กับ: นิสัย, กิจวัตร, ความจริงทั่วไป\nI/you/we/they + V | he/she/it + V+s/es\nปฏิเสธ: don\'t/doesn\'t + V | คำถาม: Do/Does + subject + V?',
    examples: ['I wake up at 7 every morning.', 'She works in a hospital.', 'Water boils at 100 degrees.', 'They don\'t eat meat.'],
    examples2: ['My father drives to work every day.', 'Do you like coffee?', 'The shop closes at 9 PM.', 'We usually watch TV in the evening.'],
    tip: '💡 Signal words: always, usually, often, sometimes, never, every day/week'
  },
  {
    id: 'present-continuous', level: 'A2', order: 5,
    title: 'Present Continuous — Happening Now', icon: '▶️',
    rule: 'ใช้กับ: กำลังทำอยู่ตอนนี้ หรือช่วงนี้\nam/is/are + V-ing',
    examples: ['I am cooking dinner right now.', 'She is reading a book at the moment.', 'We are studying English this month.', 'They are watching a movie.'],
    examples2: ['Look! It is raining.', 'He is talking on the phone.', 'I am learning to drive these days.', 'Why are you crying?'],
    tip: '💡 Signal words: now, at the moment, right now, currently, these days, Look!/Listen!'
  },
  {
    id: 'there-is-are', level: 'A2', order: 6,
    title: 'There is / There are', icon: '📍',
    rule: 'There is + เอกพจน์/นับไม่ได้ | There are + พหูพจน์\nใช้บอกว่ามีอะไรอยู่ที่ไหน',
    examples: ['There is a cat on the roof.', 'There are three windows in this room.', 'There isn\'t any milk in the fridge.', 'Are there any shops near here?'],
    examples2: ['There is a lot of traffic today.', 'There are many students in this class.', 'There is no water left.', 'How many people are there in your family?'],
    tip: '💡 There is/are ≠ It is — "There is" บอกว่ามีอะไรอยู่ | "It is" บอกลักษณะของสิ่งนั้น'
  },
  {
    id: 'can-cant', level: 'A2', order: 7,
    title: 'Can / Can\'t — Ability & Permission', icon: '💪',
    rule: 'can + base verb = ความสามารถ/ขออนุญาต | can\'t = ไม่สามารถ\nไม่เปลี่ยนรูปตาม subject',
    examples: ['I can swim very well.', 'She can\'t speak French.', 'Can you help me, please?', 'We can meet tomorrow.'],
    examples2: ['My grandmother can cook Thai food perfectly.', 'He can\'t drive a car yet.', 'Can I open the window?', 'Birds can fly, but penguins can\'t.'],
    tip: '💡 can + base verb เท่านั้น (ไม่มี to, ไม่เติม s): "She can sings" ผิด ต้อง "She can sing"'
  },
  {
    id: 'past-simple', level: 'A2', order: 8,
    title: 'Past Simple — Finished Actions', icon: '⏪',
    rule: 'ใช้กับเหตุการณ์ที่จบแล้วในอดีต\nregular verbs + -ed | irregular verbs เปลี่ยนรูป (go→went, eat→ate)',
    examples: ['I visited my grandmother last weekend.', 'She cooked dinner yesterday.', 'We went to the beach last summer.', 'They didn\'t watch the news.'],
    examples2: ['He bought a new phone last month.', 'Did you see the movie last night?', 'I was tired after work.', 'We had a great time at the party.'],
    tip: '💡 Signal words: yesterday, last night/week/year, ago, in 2020 | คำถาม/ปฏิเสธใช้ did/didn\'t + base verb'
  },
  {
    id: 'prepositions', level: 'A2', order: 9,
    title: 'Prepositions of Place & Time — in/on/at', icon: '📌',
    rule: 'Place: in (พื้นที่ใหญ่/กล่อง), on (พื้นผิว), at (จุดที่เจาะจง)\nTime: in (เดือน/ปี/ฤดู), on (วัน/วันที่), at (เวลา/จุดเวลา)',
    examples: ['I live in Bangkok.', 'The book is on the table.', 'She is waiting at the bus stop.', 'My birthday is in July.'],
    examples2: ['We have a meeting on Monday.', 'The train leaves at 8 o\'clock.', 'There is a picture on the wall.', 'I was born in 1998.'],
    tip: '💡 in = เดือน/ปี/ฤดู | on = วัน/วันที่ | at = เวลา/สถานที่เจาะจง (at home, at work, at night)'
  },
  {
    id: 'comparatives', level: 'A2', order: 10,
    title: 'Comparatives & Superlatives', icon: '📏',
    rule: 'Comparative (2 สิ่ง): adj+er / more + adj + than\nSuperlative (สุดในกลุ่ม): the + adj+est / the most + adj',
    examples: ['My brother is taller than me.', 'This book is more interesting than that one.', 'She is the tallest student in the class.', 'Bangkok is the biggest city in Thailand.'],
    examples2: ['This test is easier than the last one.', 'He runs faster than his friend.', 'Durian is the most expensive fruit here.', 'Today is colder than yesterday.'],
    tip: '💡 คำสั้น (1 พยางค์) + er/est | คำยาว (2+ พยางค์) ใช้ more/most | ผิดปกติ: good→better→best, bad→worse→worst'
  },

  // ══════════════════ B1 ══════════════════
  {
    id: 'present-perfect', level: 'B1', order: 1,
    title: 'Present Perfect — Experience & Results', icon: '✨',
    rule: 'have/has + V3 (past participle)\nใช้กับ: ประสบการณ์ที่เคย/ไม่เคยทำ, เหตุการณ์ที่มีผลถึงตอนนี้',
    examples: ['I have visited Japan twice.', 'She has never eaten durian.', 'We have already finished the project.', 'Have you ever been to Europe?'],
    examples2: ['He has lived here for ten years.', 'I have just woken up.', 'They haven\'t decided yet.', 'My sister has worked at that company since 2019.'],
    tip: '💡 Signal words: ever, never, already, yet, just, for, since, so far | for = ระยะเวลา, since = จุดเริ่มต้น'
  },
  {
    id: 'past-continuous', level: 'B1', order: 2,
    title: 'Past Continuous — Actions in Progress', icon: '⏳',
    rule: 'was/were + V-ing\nใช้กับ: กำลังทำอยู่ในอดีต ณ ช่วงเวลาหนึ่ง หรือถูกขัดจังหวะโดยเหตุการณ์อื่น',
    examples: ['I was cooking dinner when she called.', 'They were watching TV at 8 PM last night.', 'While I was studying, my phone rang.', 'What were you doing yesterday afternoon?'],
    examples2: ['It was raining when we left the house.', 'She was sleeping when the earthquake happened.', 'We were traveling around Europe last summer.', 'He wasn\'t paying attention during the meeting.'],
    tip: '💡 มักใช้คู่กับ Past Simple + "when/while": [Past Continuous] + when + [Past Simple]'
  },
  {
    id: 'future-forms', level: 'B1', order: 3,
    title: 'Future — will vs going to', icon: '🔮',
    rule: 'will = ตัดสินใจตอนนั้น หรือทำนาย | going to = มีแผนอยู่แล้ว/เห็นหลักฐานชัดเจน',
    examples: ['I think it will rain tomorrow.', 'I am going to visit my parents this weekend. (already planned)', 'A: The phone is ringing. B: I\'ll get it! (instant decision)', 'Look at those clouds — it is going to rain.'],
    examples2: ['She is going to start a new job next month.', 'I will help you carry that bag.', 'They are going to get married in December.', 'I promise I will call you tonight.'],
    tip: '💡 going to = แผนที่ตัดสินใจไว้ก่อนแล้ว | will = ตัดสินใจ ณ ตอนพูด หรือคาดการณ์'
  },
  {
    id: 'as-as', level: 'B1', order: 4,
    title: 'Comparisons — as...as / less...than', icon: '⚖️',
    rule: 'as + adj + as = เท่ากัน | not as + adj + as = ไม่เท่ากัน (น้อยกว่า) | less + adj + than = น้อยกว่า',
    examples: ['My sister is as tall as me.', 'This restaurant is not as expensive as that one.', 'Cycling is less tiring than running.', 'He speaks English as fluently as a native speaker.'],
    examples2: ['This city is not as crowded as Bangkok.', 'Her new job is as stressful as the old one.', 'Reading is less exciting than watching a movie, in my opinion.', 'The weather today is as cold as yesterday.'],
    tip: '💡 as...as ใช้ adjective รูปเดิม (ไม่เติม er) | not as...as แปลว่า "ไม่เท่ากับ" (ตัวแรกน้อยกว่า)'
  },
  {
    id: 'modals-obligation', level: 'B1', order: 5,
    title: 'Modals of Obligation — must / have to / should', icon: '⚠️',
    rule: 'must/have to = จำเป็นต้องทำ | should = ควรทำ (advice) | don\'t have to = ไม่จำเป็น (ต่างจาก mustn\'t = ห้าม)',
    examples: ['You must wear a seatbelt in the car.', 'I have to finish this report by Friday.', 'You should drink more water.', 'You don\'t have to come if you are busy.'],
    examples2: ['Students must submit their homework on time.', 'You mustn\'t smoke here — it\'s not allowed.', 'I think you should see a doctor.', 'We have to leave early to catch the flight.'],
    tip: '💡 mustn\'t = ห้ามทำ | don\'t have to = ไม่จำเป็นต้องทำ (ทำก็ได้ไม่ทำก็ได้) — ความหมายต่างกันมาก!'
  },
  {
    id: 'first-conditional', level: 'B1', order: 6,
    title: 'First Conditional — Real Possibilities', icon: '⚡',
    rule: 'If + present simple, ... will + base verb\nใช้กับเหตุการณ์ที่มีโอกาสเกิดขึ้นจริงในอนาคต',
    examples: ['If it rains, I will stay home.', 'If you study hard, you will pass the exam.', 'She will be upset if you forget her birthday.', 'If I have time, I will call you.'],
    examples2: ['If we don\'t leave now, we will miss the bus.', 'If he apologizes, I will forgive him.', 'You will feel better if you get some rest.', 'If the weather is nice, we will go hiking.'],
    tip: '💡 If-clause ใช้ present simple เสมอ (ห้ามใช้ will ใน if-clause) — สลับตำแหน่ง clause ได้'
  },
  {
    id: 'relative-clauses', level: 'B1', order: 7,
    title: 'Relative Clauses — who / which / that', icon: '🔗',
    rule: 'who = คน | which = สิ่งของ | that = คนหรือสิ่งของ (แทน who/which ได้ในประโยคทั่วไป)\nใช้เชื่อมข้อมูลเพิ่มเติมเข้ากับ noun',
    examples: ['The woman who lives next door is a doctor.', 'I lost the book that you gave me.', 'This is the restaurant which serves the best noodles.', 'The man who called you is my uncle.'],
    examples2: ['She is the teacher who taught me English.', 'The movie that we watched last night was great.', 'I have a friend who speaks four languages.', 'This is the phone which I bought last week.'],
    tip: '💡 who ใช้กับคนเท่านั้น | which ใช้กับสิ่งของเท่านั้น | that ใช้แทนได้ทั้งสองแบบ (ไม่เป็นทางการ)'
  },
  {
    id: 'verb-patterns', level: 'B1', order: 8,
    title: 'Gerunds & Infinitives — V-ing vs to + V', icon: '🔃',
    rule: 'บาง verb ตามด้วย V-ing (enjoy, avoid, finish, suggest, keep)\nบาง verb ตามด้วย to + V (want, decide, plan, hope, need)',
    examples: ['I enjoy traveling to new places.', 'She decided to change her job.', 'We finished cleaning the house.', 'They plan to move to a new city.'],
    examples2: ['He avoids eating junk food.', 'I hope to see you soon.', 'She keeps forgetting her keys.', 'We need to leave early tomorrow.'],
    tip: '💡 จำเป็น pattern เป็นกลุ่ม: enjoy/avoid/finish/suggest/keep + V-ing | want/decide/plan/hope/need + to + V'
  },
  {
    id: 'passive-simple', level: 'B1', order: 9,
    title: 'Passive Voice — Present & Past Simple', icon: '🔁',
    rule: 'be + V3 (past participle)\nใช้เมื่อเน้นที่ผลลัพธ์/สิ่งที่ถูกกระทำ มากกว่าใครทำ',
    examples: ['English is spoken in many countries.', 'The letter was sent yesterday.', 'This bridge was built in 1990.', 'Rice is grown in many parts of Asia.'],
    examples2: ['The windows are cleaned every week.', 'The house was sold last month.', 'These cookies are made with fresh butter.', 'The report was written by my colleague.'],
    tip: '💡 Passive = be (am/is/are/was/were) + V3 | ใช้เมื่อไม่รู้/ไม่สำคัญว่าใครทำ'
  },
  {
    id: 'linking-words', level: 'B1', order: 10,
    title: 'Linking Words — because / so / but / although / however', icon: '🧩',
    rule: 'because = เพราะ | so = ดังนั้น | but/however = แต่ | although = แม้ว่า\nhowever มักขึ้นต้นประโยคใหม่ + comma',
    examples: ['I was tired, so I went to bed early.', 'She passed the test because she studied hard.', 'He is rich, but he is not happy.', 'Although it was raining, we went for a walk.'],
    examples2: ['I like the city. However, it is too crowded for me.', 'Although she was nervous, she gave a great presentation.', 'The food was expensive, but it was delicious.', 'He didn\'t sleep well, so he felt tired all day.'],
    tip: '💡 because/so เชื่อม cause-effect | but/although/however เชื่อม contrast — although อยู่ต้นประโยค, but อยู่กลาง'
  },

  // ══════════════════ B2 (seed) ══════════════════
  {
    id: 'second-conditional', level: 'B2', order: 1,
    title: 'Second Conditional — Unreal Present/Future', icon: '🌙',
    rule: 'If + past simple, ... would + base verb\nใช้พูดถึงสถานการณ์สมมติที่ไม่จริง หรือไม่น่าจะเกิดขึ้น',
    examples: ['If I won the lottery, I would travel around the world.', 'If I were you, I would apologize.', 'She would feel happier if she changed her job.', 'What would you do if you had more free time?'],
    examples2: ['If we had a bigger house, we would adopt a dog.', 'I wouldn\'t worry about it if I were you.', 'If he spoke more slowly, people would understand him better.', 'If money were not an issue, where would you live?'],
    tip: '💡 "If I were you" ใช้ "were" กับทุก subject ในเชิงทางการ | เหตุการณ์สมมติ ไม่ใช่เรื่องจริง'
  },
  {
    id: 'present-perfect-continuous', level: 'B2', order: 2,
    title: 'Present Perfect Continuous — Ongoing Actions', icon: '⏱️',
    rule: 'have/has + been + V-ing\nเน้นระยะเวลาของการกระทำที่เริ่มในอดีตและต่อเนื่องมาถึงตอนนี้',
    examples: ['I have been learning English for two years.', 'She has been working here since 2020.', 'They have been waiting for an hour.', 'It has been raining all day.'],
    examples2: ['He has been studying medicine for six years.', 'We have been trying to contact her all morning.', 'I\'ve been thinking about changing careers.', 'How long have you been living in this city?'],
    tip: '💡 ใช้กับ for/since เพื่อเน้นระยะเวลา/ความต่อเนื่อง ต่างจาก Present Perfect ที่เน้นผลลัพธ์'
  },
  {
    id: 'reported-speech', level: 'B2', order: 3,
    title: 'Reported Speech — Statements', icon: '💬',
    rule: 'เมื่อรายงานคำพูด verb ในประโยคเดิมมักถอยหลัง 1 tense\nsaid (that) + subject + verb (backshifted)',
    examples: ['"I am tired," she said. → She said (that) she was tired.', '"I will call you," he said. → He said he would call me.', '"I have finished," she said. → She said she had finished.', '"I like coffee," he said. → He said he liked coffee.'],
    examples2: ['"I am studying English," she said. → She said she was studying English.', '"We will visit you next week," they said. → They said they would visit us the following week.', '"I can\'t come," he said. → He said he couldn\'t come.', '"I saw the movie," she said. → She said she had seen the movie.'],
    tip: '💡 Backshift: am/is→was, are→were, will→would, can→could, have done→had done'
  },
  {
    id: 'modals-deduction', level: 'B2', order: 4,
    title: 'Modals of Deduction — must be / might be / can\'t be', icon: '🔍',
    rule: 'must be = มั่นใจว่าเป็น | might/could be = อาจจะเป็น | can\'t be = มั่นใจว่าไม่ใช่\nใช้แสดงการคาดเดา/อนุมานจากหลักฐาน',
    examples: ['She isn\'t answering; she must be asleep.', 'He might be stuck in traffic.', 'That can\'t be true — it\'s impossible.', 'They could be at the office still.'],
    examples2: ['The lights are off; they must be out.', 'She might not know about the meeting.', 'He can\'t be at home — I just saw his car at work.', 'It could be a scam; be careful.'],
    tip: '💡 must be = ความมั่นใจสูง | might/could be = ไม่แน่ใจ | can\'t be = มั่นใจว่าเป็นไปไม่ได้'
  },

  // ══════════════════ C1 (seed) ══════════════════
  {
    id: 'third-conditional', level: 'C1', order: 1,
    title: 'Third & Mixed Conditionals', icon: '⏮️',
    rule: 'Third: If + past perfect, ... would have + V3 (เหตุการณ์สมมติในอดีตที่ไม่เกิดขึ้นจริง)\nMixed: ผสมระหว่างอดีต-ปัจจุบัน',
    examples: ['If I had studied harder, I would have passed the exam.', 'She wouldn\'t have missed the flight if she had left earlier.', 'If he had taken that job, he would be living in London now. (mixed)', 'If I hadn\'t met her, my life would be very different now. (mixed)'],
    examples2: ['We would have gone to the party if we had known about it.', 'If they had invested earlier, they would be rich now.', 'I wouldn\'t have made that mistake if I had listened to you.', 'If she hadn\'t studied medicine, she wouldn\'t be a doctor today.'],
    tip: '💡 Third Conditional พูดถึงอดีตทั้งคู่ | Mixed Conditional ผสมเงื่อนไขอดีตกับผลปัจจุบัน'
  },
  {
    id: 'inversion', level: 'C1', order: 2,
    title: 'Inversion for Emphasis', icon: '🔄',
    rule: 'สลับตำแหน่ง subject-verb เพื่อเน้นความหมาย มักใช้กับ negative adverbials: Never, Rarely, Not only, No sooner',
    examples: ['Never have I seen such a beautiful sunset.', 'Rarely does she complain about her job.', 'Not only did he apologize, but he also fixed the problem.', 'No sooner had we arrived than it started to rain.'],
    examples2: ['Seldom do we get such an opportunity.', 'Not until later did I understand what happened.', 'Under no circumstances should you share this information.', 'Only after the meeting did she realize her mistake.'],
    tip: '💡 หลัง negative adverbial ต้องสลับ auxiliary verb มาก่อน subject เหมือนประโยคคำถาม'
  },
  {
    id: 'causative', level: 'C1', order: 3,
    title: 'Causative — have / get something done', icon: '🛠️',
    rule: 'have/get + object + V3 = ให้คนอื่นทำสิ่งนั้นให้เรา',
    examples: ['I had my hair cut yesterday.', 'We are getting our house painted next week.', 'She had her car repaired at the garage.', 'They are having a new kitchen installed.'],
    examples2: ['He gets his suits made by a tailor.', 'I need to have this document translated.', 'We had our photos taken professionally.', 'She is having her computer fixed.'],
    tip: '💡 have/get + object + past participle — เน้นว่า "คนอื่นทำให้" ไม่ใช่ทำเอง'
  },
  {
    id: 'advanced-passive', level: 'C1', order: 4,
    title: 'Advanced Passive & Reporting Structures', icon: '📰',
    rule: 'It is said/believed/reported that... = โครงสร้าง passive แบบทางการสำหรับรายงานข้อมูล/ความเชื่อทั่วไป',
    examples: ['It is believed that the treaty will be signed soon.', 'The company is said to be expanding overseas.', 'It has been reported that prices will rise.', 'She is thought to be one of the best scientists in her field.'],
    examples2: ['It is estimated that millions of species remain undiscovered.', 'The suspect is alleged to have stolen the documents.', 'It is widely known that stress affects health.', 'The building is rumoured to be haunted.'],
    tip: '💡 It is + said/believed/thought/reported + that... หรือ Subject + is/are + said/believed + to + V'
  },

  // ══════════════════ C2 (seed) ══════════════════
  {
    id: 'subjunctive', level: 'C2', order: 1,
    title: 'Subjunctive Mood — Demands & Wishes', icon: '🕊️',
    rule: 'ใช้ base verb (ไม่ผัน) หลัง verbs เช่น suggest, recommend, insist, demand, propose ที่แสดงความต้องการ/ข้อเสนอ',
    examples: ['The doctor recommended that he rest for a week.', 'I suggest that she see a specialist.', 'It is essential that everyone be on time.', 'They insisted that the report be revised.'],
    examples2: ['The manager demanded that the project be finished by Friday.', 'It is vital that the data remain confidential.', 'She proposed that the meeting be postponed.', 'The teacher requires that every student submit the assignment.'],
    tip: '💡 หลัง suggest/recommend/insist/demand/propose + that + subject + base verb (ไม่ผันตาม subject เลย)'
  },
  {
    id: 'cleft-sentences', level: 'C2', order: 2,
    title: 'Cleft Sentences — It is... / What I need is...', icon: '🎯',
    rule: 'ใช้แบ่งประโยคเพื่อเน้นข้อมูลสำคัญ: It is/was + [emphasized part] + that... หรือ What + clause + is/was + ...',
    examples: ['It was Sarah who solved the problem, not me.', 'What I really need is more time.', 'It is honesty that matters most in a relationship.', 'What surprised everyone was his sudden resignation.'],
    examples2: ['It was in 1969 that humans first landed on the moon.', 'What annoys me most is people who are always late.', 'It is the process, not the result, that teaches us the most.', 'What we should focus on is long-term growth.'],
    tip: '💡 Cleft sentence ใช้เน้นส่วนสำคัญที่สุดของประโยค — เปลี่ยนจุดโฟกัสโดยไม่เปลี่ยนความหมายหลัก'
  },
  {
    id: 'hedging', level: 'C2', order: 3,
    title: 'Hedging & Nuanced Modality', icon: '🎭',
    rule: 'ใช้ภาษาที่นุ่มนวล/ไม่ฟันธง เพื่อแสดงความไม่แน่ใจหรือความสุภาพในบริบททางการ: seem, tend to, arguably, it could be argued that...',
    examples: ['It could be argued that social media has more disadvantages than benefits.', 'This approach tends to work better in smaller companies.', 'The results seem to suggest a strong correlation.', 'One might argue that the policy was poorly designed.'],
    examples2: ['It is arguably the most significant discovery of the decade.', 'There appears to be a link between diet and mood.', 'It would seem that the plan requires further revision.', 'Some would say that the risks outweigh the benefits.'],
    tip: '💡 Hedging ใช้มากในงานวิชาการ/ทางการ เพื่อแสดงความรอบคอบ ไม่ฟันธงเกินไป'
  },
  {
    id: 'discourse-markers', level: 'C2', order: 4,
    title: 'Advanced Discourse Markers & Register', icon: '🗣️',
    rule: 'ใช้คำเชื่อมขั้นสูงเพื่อควบคุมน้ำเสียงและความเป็นทางการ: nevertheless, notwithstanding, in light of, that being said',
    examples: ['The plan was risky. Nevertheless, it succeeded.', 'In light of recent events, the policy has been revised.', 'The results were disappointing; that being said, we learned valuable lessons.', 'Notwithstanding the criticism, she continued her research.'],
    examples2: ['The evidence was inconclusive; nonetheless, the jury reached a verdict.', 'Given the circumstances, the decision seems reasonable.', 'That said, there is still room for improvement.', 'In view of the budget constraints, the project was postponed.'],
    tip: '💡 คำเหล่านี้ใช้ในบริบททางการ/วิชาการ — ทำให้น้ำเสียงดูรอบคอบและมีน้ำหนักมากขึ้น'
  }
];

// ══════════════════════════════════════════════════
// GRAMMAR EXERCISES — keyed by topic id
// ══════════════════════════════════════════════════
const GRAMMAR_EXERCISES = {
  'be': {
    intro: 'am/is/are คือรูปของ verb "to be" ที่เปลี่ยนไปตาม subject',
    exercises: [
      { type: 'mcq', q: 'My mother _____ a teacher.', options: ['am', 'is', 'are', 'be'], answer: 1, exp: '✅ is — my mother = 3rd person singular' },
      { type: 'gap', q: 'They _____ (be) very kind.', answer: 'are', exp: '✅ are — they = plural' },
      { type: 'mcq', q: 'Which sentence is correct?', options: ['He are my father.', 'He is my father.', 'He am my father.', 'He be my father.'], answer: 1, exp: '✅ He is — he = 3rd person singular' },
      { type: 'error', q: 'Find the error: "She are my best friend."', options: ['"are" should be "is"', '"my" should be "her"', '"best" should be "good"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ She IS my best friend — she = singular → is' },
      { type: 'build', q: 'เรียงคำให้ถูก: [from / I / Thailand / am]', answer: 'I am from Thailand.', exp: '✅ I (S) + am (be) + from Thailand' }
    ]
  },
  'pronouns-possessives': {
    intro: 'Subject pronouns ทำหน้าที่ประธาน (I, you, he...) ส่วน Possessive adjectives แสดงความเป็นเจ้าของ + noun (my, your, his...)',
    exercises: [
      { type: 'mcq', q: 'This is Anna. _____ favorite color is blue.', options: ['She', 'Her', 'Hers', 'He'], answer: 1, exp: '✅ Her + noun (favorite color) แสดงความเป็นเจ้าของ' },
      { type: 'gap', q: 'We love _____ (we) new house.', answer: 'our', exp: '✅ our — possessive adjective ของ we' },
      { type: 'mcq', q: 'That is Tom\'s car. It is _____ car.', options: ['he', 'his', 'him', 'he\'s'], answer: 1, exp: '✅ his + noun (car)' },
      { type: 'error', q: 'Find the error: "Its my phone."', options: ['"Its" should be "It\'s" or the sentence should be "This is my phone."', '"my" should be "mine"', '"phone" should be "phones"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ "It\'s" (it is) ≠ "its" (possessive) — ที่นี่ควรพูดว่า "This is my phone."' },
      { type: 'build', q: 'เรียงคำให้ถูก: [is / her / name / Sarah]', answer: 'Her name is Sarah.', exp: '✅ Her (possessive) + name (noun) + is + Sarah' }
    ]
  },
  'plural-articles': {
    intro: 'คำนามนับได้เติม -s เป็นพหูพจน์ | a ใช้หน้าพยัญชนะ, an ใช้หน้าสระ, the ใช้กับสิ่งที่เจาะจง',
    exercises: [
      { type: 'mcq', q: 'I saw _____ elephant at the zoo.', options: ['a', 'an', 'the', '-'], answer: 1, exp: '✅ an — elephant ขึ้นต้นด้วยสระ' },
      { type: 'gap', q: 'There are five _____ (box) in the room.', answer: 'boxes', exp: '✅ boxes — box ลงท้าย x เติม -es' },
      { type: 'mcq', q: 'I bought a shirt yesterday. _____ shirt is red.', options: ['A', 'An', 'The', '-'], answer: 2, exp: '✅ The — พูดถึงเสื้อตัวที่กล่าวไปแล้ว (เจาะจงแล้ว)' },
      { type: 'error', q: 'Find the error: "She has three childs."', options: ['"childs" should be "children" (irregular plural)', '"three" should be "third"', '"has" should be "have"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ children — child เป็น irregular plural' },
      { type: 'build', q: 'เรียงคำให้ถูก: [book / interesting / an / is / this]', answer: 'This is an interesting book.', exp: '✅ an ใช้หน้า interesting (ขึ้นต้นด้วยสระ)' }
    ]
  },
  'present-simple': {
    intro: 'Present Simple ใช้กับนิสัยและความจริงทั่วไป Signal words: always, usually, often, every day',
    exercises: [
      { type: 'mcq', q: 'She _____ (work) in a bank.', options: ['work', 'works', 'working', 'worked'], answer: 1, exp: '✅ works — she = 3rd person singular เติม -s' },
      { type: 'gap', q: 'I _____ (not/like) spicy food.', answer: 'don\'t like', exp: '✅ don\'t like — I ใช้ don\'t + base verb' },
      { type: 'mcq', q: '_____ your brother speak English?', options: ['Do', 'Does', 'Is', 'Are'], answer: 1, exp: '✅ Does — your brother = 3rd person singular' },
      { type: 'error', q: 'Find the error: "He don\'t like vegetables."', options: ['"don\'t" should be "doesn\'t"', '"like" should be "likes"', '"vegetables" should be "vegetable"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ doesn\'t — he = 3rd person singular ต้องใช้ doesn\'t' },
      { type: 'build', q: 'เรียงคำให้ถูก: [to / goes / school / she / every day]', answer: 'She goes to school every day.', exp: '✅ She + goes (V+s) + to school + every day' }
    ]
  },
  'present-continuous': {
    intro: 'Present Continuous ใช้กับสิ่งที่กำลังเกิดขึ้นตอนนี้ รูป: am/is/are + V-ing',
    exercises: [
      { type: 'mcq', q: 'Listen! Someone _____ (sing).', options: ['sing', 'sings', 'is singing', 'sang'], answer: 2, exp: '✅ is singing — "Listen!" = signal ของ Present Continuous' },
      { type: 'gap', q: 'We _____ (plan) a trip to Chiang Mai this week.', answer: 'are planning', exp: '✅ are planning — this week = ช่วงนี้' },
      { type: 'mcq', q: 'Which sentence is correct?', options: ['I am like pizza.', 'I like pizza.', 'I am liking pizza.', 'I likes pizza.'], answer: 1, exp: '✅ I like pizza — like เป็น state verb ไม่ใช้ continuous' },
      { type: 'error', q: 'Find the error: "She is has a shower now."', options: ['"is has" should be "is having"', '"shower" should be "showers"', '"now" should be "today"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ is having — be + V-ing (has → having)' },
      { type: 'build', q: 'เรียงคำให้ถูก: [now / the / kids / playing / are / outside]', answer: 'The kids are playing outside now.', exp: '✅ The kids + are playing (continuous) + outside + now' }
    ]
  },
  'there-is-are': {
    intro: 'There is/are ใช้บอกว่ามีอะไรอยู่ที่ไหน — is กับเอกพจน์ are กับพหูพจน์',
    exercises: [
      { type: 'mcq', q: '_____ a park near my house.', options: ['There is', 'There are', 'It is', 'They are'], answer: 0, exp: '✅ There is — a park = เอกพจน์' },
      { type: 'gap', q: '_____ (there/be) five people in my family.', answer: 'There are', exp: '✅ There are — five people = พหูพจน์' },
      { type: 'mcq', q: '_____ any bread in the kitchen?', options: ['Is there', 'Are there', 'There is', 'There are'], answer: 0, exp: '✅ Is there — bread นับไม่ได้ (เอกพจน์)' },
      { type: 'error', q: 'Find the error: "There is many people at the party."', options: ['"is" should be "are"', '"many" should be "much"', '"party" should be "parties"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ There ARE many people — many people = พหูพจน์' },
      { type: 'build', q: 'เรียงคำให้ถูก: [is / bathroom / a / there / upstairs]', answer: 'There is a bathroom upstairs.', exp: '✅ There is + a bathroom + upstairs' }
    ]
  },
  'can-cant': {
    intro: 'can/can\'t ใช้แสดงความสามารถและการขออนุญาต ตามด้วย base verb เสมอ',
    exercises: [
      { type: 'mcq', q: 'My brother _____ play the guitar.', options: ['can', 'cans', 'can to', 'is can'], answer: 0, exp: '✅ can + base verb (ไม่เปลี่ยนรูป ไม่เติม s)' },
      { type: 'gap', q: 'She _____ (can/not) come to the party tonight.', answer: 'can\'t', exp: '✅ can\'t — ปฏิเสธของ can' },
      { type: 'mcq', q: '_____ I use your phone?', options: ['Can', 'Do', 'Am', 'Does'], answer: 0, exp: '✅ Can I...? — ขออนุญาต' },
      { type: 'error', q: 'Find the error: "He can speaks three languages."', options: ['"speaks" should be "speak"', '"three" should be "3"', '"languages" should be "language"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ can speak — can + base verb (ไม่เติม s)' },
      { type: 'build', q: 'เรียงคำให้ถูก: [ride / can / a / bike / I]', answer: 'I can ride a bike.', exp: '✅ I + can + ride (base verb) + a bike' }
    ]
  },
  'past-simple': {
    intro: 'Past Simple ใช้กับเหตุการณ์ที่จบแล้วในอดีต Signal: yesterday, last week, ago',
    exercises: [
      { type: 'mcq', q: 'I _____ (go) to the market yesterday.', options: ['go', 'goes', 'went', 'going'], answer: 2, exp: '✅ went — irregular past ของ go' },
      { type: 'gap', q: 'She _____ (not/finish) her homework last night.', answer: 'didn\'t finish', exp: '✅ didn\'t finish — did/didn\'t + base verb' },
      { type: 'mcq', q: '_____ you enjoy the trip?', options: ['Do', 'Did', 'Does', 'Were'], answer: 1, exp: '✅ Did — คำถาม Past Simple ใช้ Did + base verb' },
      { type: 'error', q: 'Find the error: "We goed to school by bus."', options: ['"goed" should be "went"', '"school" should be "schools"', '"by" should be "with"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ went — go เป็น irregular verb (ไม่ใช่ +ed)' },
      { type: 'build', q: 'เรียงคำให้ถูก: [called / mother / me / my / yesterday]', answer: 'My mother called me yesterday.', exp: '✅ My mother + called (V2) + me + yesterday' }
    ]
  },
  'prepositions': {
    intro: 'in/on/at ใช้ต่างกันสำหรับสถานที่และเวลา — in (ใหญ่/เดือน-ปี), on (พื้นผิว/วัน), at (จุดเจาะจง/เวลา)',
    exercises: [
      { type: 'mcq', q: 'I usually study _____ night.', options: ['in', 'on', 'at', '-'], answer: 2, exp: '✅ at night — at ใช้กับ night' },
      { type: 'gap', q: '_____ Saturday, we are having a party.', answer: 'On', exp: '✅ On — วันในสัปดาห์ใช้ on' },
      { type: 'mcq', q: 'She was born _____ 2000.', options: ['in', 'on', 'at', 'for'], answer: 0, exp: '✅ in 2000 — ปีใช้ in' },
      { type: 'error', q: 'Find the error: "I will meet you in 5 o\'clock."', options: ['"in" should be "at"', '"5" should be "five"', '"meet" should be "meeting"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ at 5 o\'clock — เวลาที่เจาะจงใช้ at' },
      { type: 'build', q: 'เรียงคำให้ถูก: [on / clock / the / wall / a / is]', answer: 'A clock is on the wall.', exp: '✅ A clock + is + on the wall (พื้นผิวใช้ on)' }
    ]
  },
  'comparatives': {
    intro: 'Comparative เปรียบเทียบ 2 สิ่ง (adj+er/more) | Superlative สุดในกลุ่ม (the adj+est/the most)',
    exercises: [
      { type: 'mcq', q: 'This phone is _____ than my old one.', options: ['good', 'better', 'best', 'more good'], answer: 1, exp: '✅ better — good เป็น irregular comparative' },
      { type: 'gap', q: 'She is _____ (young) student in the group.', answer: 'the youngest', exp: '✅ the youngest — superlative ของคำสั้น' },
      { type: 'mcq', q: 'This is _____ movie I have ever seen.', options: ['more interesting', 'the most interesting', 'interestinger', 'the interestingest'], answer: 1, exp: '✅ the most interesting — คำยาวใช้ the most' },
      { type: 'error', q: 'Find the error: "This exercise is more easy than the last one."', options: ['"more easy" should be "easier"', '"exercise" should be "exercises"', '"last" should be "lasting"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ easier — คำสั้น (1-2 พยางค์) เติม -er ไม่ใช้ more' },
      { type: 'build', q: 'เรียงคำให้ถูก: [than / is / expensive / more / that / this / one]', answer: 'This is more expensive than that one.', exp: '✅ This is + more expensive (คำยาว) + than + that one' }
    ]
  },
  'present-perfect': {
    intro: 'Present Perfect (have/has + V3) ใช้กับประสบการณ์และเหตุการณ์ที่มีผลถึงตอนนี้',
    exercises: [
      { type: 'mcq', q: 'I _____ (see) that movie three times.', options: ['see', 'saw', 'have seen', 'seeing'], answer: 2, exp: '✅ have seen — ประสบการณ์ที่สะสมมา' },
      { type: 'gap', q: 'She _____ (not/finish) her report yet.', answer: 'hasn\'t finished', exp: '✅ hasn\'t finished — yet = signal ของ Present Perfect' },
      { type: 'mcq', q: '_____ you ever tried Korean food?', options: ['Do', 'Did', 'Have', 'Has'], answer: 2, exp: '✅ Have you ever...? — ประสบการณ์ในชีวิต' },
      { type: 'error', q: 'Find the error: "I have seen him yesterday."', options: ['"yesterday" ใช้กับ Past Simple ไม่ใช่ Present Perfect', '"seen" should be "see"', '"him" should be "he"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ "I saw him yesterday." — yesterday = specific past time' },
      { type: 'build', q: 'เรียงคำให้ถูก: [Paris / never / to / I / been / have]', answer: 'I have never been to Paris.', exp: '✅ I + have never been + to Paris' }
    ]
  },
  'past-continuous': {
    intro: 'Past Continuous (was/were + V-ing) ใช้กับการกระทำที่กำลังดำเนินอยู่ในอดีต',
    exercises: [
      { type: 'mcq', q: 'I _____ (walk) home when it started to rain.', options: ['walk', 'walked', 'was walking', 'am walking'], answer: 2, exp: '✅ was walking — เหตุการณ์ที่กำลังดำเนินอยู่ ถูกขัดจังหวะ' },
      { type: 'gap', q: 'While she _____ (cook), the phone rang.', answer: 'was cooking', exp: '✅ was cooking — while + Past Continuous' },
      { type: 'mcq', q: 'They _____ (play) football at 5 PM yesterday.', options: ['play', 'played', 'were playing', 'are playing'], answer: 2, exp: '✅ were playing — at a specific past time = Past Continuous' },
      { type: 'error', q: 'Find the error: "I was study when you called."', options: ['"was study" should be "was studying"', '"called" should be "call"', '"when" should be "while"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ was studying — was/were + V-ing' },
      { type: 'build', q: 'เรียงคำให้ถูก: [TV / was / when / arrived / I / watching / you]', answer: 'I was watching TV when you arrived.', exp: '✅ I was watching TV (continuous) + when + you arrived (simple)' }
    ]
  },
  'future-forms': {
    intro: 'will = ตัดสินใจตอนนั้น/ทำนาย | going to = มีแผนอยู่แล้ว/เห็นหลักฐานชัดเจน',
    exercises: [
      { type: 'mcq', q: 'A: I\'m thirsty. B: _____ get you some water.', options: ['I go to', 'I\'m going to', 'I\'ll', 'I am'], answer: 2, exp: '✅ I\'ll — ตัดสินใจทันที ณ ตอนพูด' },
      { type: 'gap', q: 'We _____ (go) to Chiang Mai next week. Everything is booked.', answer: 'are going', exp: '✅ are going — มีแผนไว้แล้ว (booked)' },
      { type: 'mcq', q: 'Look at the sky! It _____ rain soon.', options: ['will', 'is going to', 'would', 'can'], answer: 1, exp: '✅ is going to rain — เห็นหลักฐานชัดเจน (dark sky)' },
      { type: 'error', q: 'Find the error: "I will to call you later."', options: ['"will to" should be "will"', '"call" should be "calling"', '"later" should be "late"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ will + base verb (ไม่มี to)' },
      { type: 'build', q: 'เรียงคำให้ถูก: [going / to / cook / dinner / am / I]', answer: 'I am going to cook dinner.', exp: '✅ I am going to + base verb' }
    ]
  },
  'as-as': {
    intro: 'as + adjective + as = เท่ากัน | not as...as = น้อยกว่า',
    exercises: [
      { type: 'mcq', q: 'This test was _____ difficult _____ the last one.', options: ['as / as', 'more / than', 'as / than', 'so / as'], answer: 0, exp: '✅ as...as — เปรียบเทียบว่าเท่ากัน' },
      { type: 'gap', q: 'My house is not _____ (big) as yours.', answer: 'as big', exp: '✅ as big — as + base adjective (ไม่เติม er)' },
      { type: 'mcq', q: 'She is _____ friendly _____ her mother.', options: ['as/as', 'so/so', 'more/more', 'less/less'], answer: 0, exp: '✅ as friendly as' },
      { type: 'error', q: 'Find the error: "He is as older as his brother."', options: ['"older" should be "old"', '"as...as" should be "than"', '"brother" should be "brothers"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ as old as — as...as ใช้ adjective รูปเดิม' },
      { type: 'build', q: 'เรียงคำให้ถูก: [as / this / that / expensive / one / as / is / not]', answer: 'This is not as expensive as that one.', exp: '✅ This is not as + adj + as + that one' }
    ]
  },
  'modals-obligation': {
    intro: 'must/have to = จำเป็น | should = ควรทำ | mustn\'t = ห้าม | don\'t have to = ไม่จำเป็น',
    exercises: [
      { type: 'mcq', q: 'You _____ smoke in the hospital. It\'s forbidden.', options: ['don\'t have to', 'mustn\'t', 'should', 'can'], answer: 1, exp: '✅ mustn\'t — ห้ามทำโดยเด็ดขาด' },
      { type: 'gap', q: 'I think you _____ (should) apologize to her.', answer: 'should apologize', exp: '✅ should apologize — คำแนะนำ' },
      { type: 'mcq', q: 'You _____ pay for the ticket — it\'s free.', options: ['must', 'have to', 'don\'t have to', 'shouldn\'t'], answer: 2, exp: '✅ don\'t have to — ไม่จำเป็น (ทำก็ได้ไม่ทำก็ได้)' },
      { type: 'error', q: 'Find the error: "She must to finish her homework."', options: ['"must to" should be "must"', '"finish" should be "finishing"', '"homework" should be "homeworks"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ must + base verb (ไม่มี to)' },
      { type: 'build', q: 'เรียงคำให้ถูก: [wear / must / a / helmet / you]', answer: 'You must wear a helmet.', exp: '✅ You + must + wear (base verb) + a helmet' }
    ]
  },
  'first-conditional': {
    intro: 'If + present simple, ... will + base verb — ใช้กับเหตุการณ์ที่มีโอกาสเกิดขึ้นจริง',
    exercises: [
      { type: 'mcq', q: 'If it _____ tomorrow, we will cancel the trip.', options: ['rain', 'rains', 'will rain', 'rained'], answer: 1, exp: '✅ rains — if-clause ใช้ present simple' },
      { type: 'gap', q: 'If you _____ (not/hurry), you will be late.', answer: 'don\'t hurry', exp: '✅ don\'t hurry — if-clause ปฏิเสธใช้ don\'t/doesn\'t' },
      { type: 'mcq', q: 'She will call you if she _____ time.', options: ['has', 'will have', 'had', 'have'], answer: 0, exp: '✅ has — if-clause ใช้ present simple' },
      { type: 'error', q: 'Find the error: "If I will see him, I will tell him."', options: ['"will see" should be "see"', '"tell" should be "telling"', '"him" should be "he"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ If I see him — ห้ามใช้ will ใน if-clause' },
      { type: 'build', q: 'เรียงคำให้ถูก: [I / rest / if / better / feel / will / get / some]', answer: 'I will feel better if I get some rest.', exp: '✅ [Result: will+V] + if + [Condition: present simple]' }
    ]
  },
  'relative-clauses': {
    intro: 'who = คน | which = สิ่งของ | that = แทนได้ทั้งคู่ — ใช้เชื่อมข้อมูลเพิ่มเติมเข้ากับ noun',
    exercises: [
      { type: 'mcq', q: 'The man _____ lives next to me is very friendly.', options: ['which', 'who', 'whose', 'what'], answer: 1, exp: '✅ who — man = คน' },
      { type: 'gap', q: 'This is the book _____ (that) I told you about.', answer: 'that', exp: '✅ that — ใช้แทน which ในประโยคทั่วไปได้ (which ก็ถูก)' },
      { type: 'mcq', q: 'I have a cat _____ name is Milo.', options: ['who', 'which', 'whose', 'that'], answer: 2, exp: '✅ whose — แสดงความเป็นเจ้าของ (cat\'s name)' },
      { type: 'error', q: 'Find the error: "The girl which won the prize is my sister."', options: ['"which" should be "who"', '"won" should be "win"', '"prize" should be "prizes"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ who — girl = คน' },
      { type: 'build', q: 'เรียงคำให้ถูก: [restaurant / is / this / serves / which / pizza / the / best]', answer: 'This is the restaurant which serves the best pizza.', exp: '✅ ...the restaurant + which (สิ่งของ) + serves the best pizza' }
    ]
  },
  'verb-patterns': {
    intro: 'enjoy/avoid/finish/suggest/keep + V-ing | want/decide/plan/hope/need + to + V',
    exercises: [
      { type: 'mcq', q: 'I enjoy _____ (read) before bed.', options: ['read', 'to read', 'reading', 'reads'], answer: 2, exp: '✅ reading — enjoy + V-ing' },
      { type: 'gap', q: 'She decided _____ (study) abroad.', answer: 'to study', exp: '✅ to study — decide + to + verb' },
      { type: 'mcq', q: 'We suggest _____ (book) the tickets early.', options: ['book', 'to book', 'booking', 'booked'], answer: 2, exp: '✅ booking — suggest + V-ing' },
      { type: 'error', q: 'Find the error: "He wants going to the party."', options: ['"going" should be "to go"', '"wants" should be "want"', '"party" should be "parties"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ to go — want + to + verb' },
      { type: 'build', q: 'เรียงคำให้ถูก: [avoid / traffic / I / driving / in]', answer: 'I avoid driving in traffic.', exp: '✅ I + avoid + driving (V-ing) + in traffic' }
    ]
  },
  'passive-simple': {
    intro: 'Passive = be + V3 — ใช้เมื่อเน้นผลลัพธ์มากกว่าใครเป็นคนทำ',
    exercises: [
      { type: 'mcq', q: 'This song _____ by a famous singer.', options: ['sings', 'sang', 'is sung', 'was sing'], answer: 2, exp: '✅ is sung — Present Simple Passive: is + V3' },
      { type: 'gap', q: 'The email _____ (send) an hour ago.', answer: 'was sent', exp: '✅ was sent — Past Simple Passive: was + V3' },
      { type: 'mcq', q: 'These shoes _____ in Vietnam.', options: ['make', 'made', 'are made', 'is made'], answer: 2, exp: '✅ are made — shoes = plural → are + V3' },
      { type: 'error', q: 'Find the error: "The cake was baking by my mother."', options: ['"was baking" should be "was baked"', '"cake" should be "cakes"', '"by" should be "with"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ was baked — passive ใช้ be + V3 (ไม่ใช่ V-ing)' },
      { type: 'build', q: 'เรียงคำให้ถูก: [1998 / built / in / school / this / was]', answer: 'This school was built in 1998.', exp: '✅ This school + was built (passive) + in 1998' }
    ]
  },
  'linking-words': {
    intro: 'because/so เชื่อม cause-effect | but/although/however เชื่อม contrast',
    exercises: [
      { type: 'mcq', q: 'I stayed home _____ I was sick.', options: ['so', 'because', 'but', 'however'], answer: 1, exp: '✅ because — ให้เหตุผล' },
      { type: 'gap', q: '_____ he practiced every day, he still made mistakes.', answer: 'Although', exp: '✅ Although — contrast ที่ต้นประโยค' },
      { type: 'mcq', q: 'The movie was long, _____ it was very interesting.', options: ['because', 'so', 'but', 'although'], answer: 2, exp: '✅ but — contrast กลางประโยค' },
      { type: 'error', q: 'Find the error: "Although she was tired, but she kept working."', options: ['ใช้ although และ but ด้วยกันไม่ได้ — เลือกอย่างใดอย่างหนึ่ง', '"kept" should be "keep"', '"tired" should be "tiring"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ "Although she was tired, she kept working." หรือ "She was tired, but she kept working."' },
      { type: 'build', q: 'เรียงคำให้ถูก: [tired / bed / I / early / so / went / was / to]', answer: 'I was tired, so I went to bed early.', exp: '✅ [Cause] so [Result]' }
    ]
  },
  'second-conditional': {
    intro: 'If + past simple, ... would + base verb — สถานการณ์สมมติที่ไม่จริง',
    exercises: [
      { type: 'mcq', q: 'If I _____ more time, I would learn to paint.', options: ['have', 'had', 'will have', 'would have'], answer: 1, exp: '✅ had — if-clause ของ 2nd conditional ใช้ past simple' },
      { type: 'gap', q: 'If she _____ (be) taller, she would join the basketball team.', answer: 'were', exp: '✅ were — "If I/she/he were" ใช้กับเงื่อนไขสมมติ' },
      { type: 'mcq', q: 'What would you do if you _____ a million dollars?', options: ['find', 'found', 'will find', 'would find'], answer: 1, exp: '✅ found — if-clause ใช้ past simple' },
      { type: 'error', q: 'Find the error: "If I would have more money, I would travel more."', options: ['ตัด would ออกจาก if-clause → "If I had more money..."', '"travel" should be "traveling"', '"money" should be "moneys"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ If I had more money — ห้ามใช้ would ใน if-clause' }
    ]
  },
  'present-perfect-continuous': {
    intro: 'have/has been + V-ing — เน้นระยะเวลาต่อเนื่องของการกระทำ',
    exercises: [
      { type: 'mcq', q: 'I _____ (wait) for you for 30 minutes!', options: ['wait', 'have waited', 'have been waiting', 'waited'], answer: 2, exp: '✅ have been waiting — เน้นระยะเวลาต่อเนื่อง' },
      { type: 'gap', q: 'She _____ (study) Japanese since last year.', answer: 'has been studying', exp: '✅ has been studying — since + Present Perfect Continuous' },
      { type: 'mcq', q: 'How long _____ you _____ (learn) the piano?', options: ['have / been learning', 'do / learn', 'are / learning', 'did / learn'], answer: 0, exp: '✅ have...been learning — ถามระยะเวลาที่ทำต่อเนื่อง' },
      { type: 'error', q: 'Find the error: "I am living here since 2015."', options: ['"am living" should be "have been living"', '"here" should be "there"', '"2015" should be "in 2015"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ have been living — since + Present Perfect Continuous' }
    ]
  },
  'reported-speech': {
    intro: 'เมื่อรายงานคำพูด verb มักถอยหลัง 1 tense (backshift)',
    exercises: [
      { type: 'mcq', q: '"I am busy," she said. → She said she _____ busy.', options: ['is', 'was', 'were', 'be'], answer: 1, exp: '✅ was — am → was (backshift)' },
      { type: 'gap', q: '"I will help you," he said. → He said he _____ (will) help me.', answer: 'would', exp: '✅ would — will → would' },
      { type: 'mcq', q: '"I can\'t swim," Tom said. → Tom said he _____ swim.', options: ['can\'t', 'couldn\'t', 'doesn\'t', 'didn\'t'], answer: 1, exp: '✅ couldn\'t — can\'t → couldn\'t' },
      { type: 'error', q: 'Find the error: "She said that she is tired."', options: ['"is" should be "was"', '"said" should be "says"', '"that" should be "which"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ was — backshift ใน reported speech' }
    ]
  },
  'modals-deduction': {
    intro: 'must be = มั่นใจสูง | might/could be = ไม่แน่ใจ | can\'t be = มั่นใจว่าเป็นไปไม่ได้',
    exercises: [
      { type: 'mcq', q: 'He hasn\'t eaten all day. He _____ be hungry.', options: ['can\'t', 'must', 'might not', 'couldn\'t'], answer: 1, exp: '✅ must be — มั่นใจสูงจากหลักฐาน' },
      { type: 'gap', q: 'She isn\'t here yet; she _____ (might) be stuck in traffic.', answer: 'might', exp: '✅ might — ไม่แน่ใจ, เป็นไปได้' },
      { type: 'mcq', q: 'That _____ be him — he is on vacation this week.', options: ['must', 'might', 'can\'t', 'could'], answer: 2, exp: '✅ can\'t be — มั่นใจว่าเป็นไปไม่ได้' },
      { type: 'error', q: 'Find the error: "He must to be tired after the long trip."', options: ['"must to" should be "must"', '"tired" should be "tiring"', '"the" should be "a"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ must + base verb (ไม่มี to)' }
    ]
  },
  'third-conditional': {
    intro: 'If + past perfect, ... would have + V3 — เหตุการณ์สมมติในอดีตที่ไม่เกิดขึ้นจริง',
    exercises: [
      { type: 'mcq', q: 'If I _____ known, I would have told you.', options: ['have', 'had', 'would have', 'has'], answer: 1, exp: '✅ had known — if-clause ของ 3rd conditional ใช้ past perfect' },
      { type: 'gap', q: 'She would have called if she _____ (have) your number.', answer: 'had had', exp: '✅ had had — past perfect ของ have' },
      { type: 'mcq', q: 'If he had left earlier, he _____ the train.', options: ['would catch', 'would have caught', 'caught', 'catches'], answer: 1, exp: '✅ would have caught — main clause ของ 3rd conditional' },
      { type: 'error', q: 'Find the error: "If I would have known, I would have come."', options: ['ตัด would ออก → "If I had known, I would have come."', '"come" should be "came"', '"known" should be "know"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ If I had known — ห้ามใช้ would ใน if-clause' }
    ]
  },
  'inversion': {
    intro: 'สลับตำแหน่ง subject-verb หลัง negative adverbial (Never, Rarely, Not only) เพื่อเน้นความหมาย',
    exercises: [
      { type: 'mcq', q: '_____ have I felt so proud.', options: ['Ever', 'Never', 'Always', 'Not'], answer: 1, exp: '✅ Never — negative adverbial + auxiliary + subject' },
      { type: 'gap', q: 'Not only _____ (he/apologize) but he also brought flowers.', answer: 'did he apologize', exp: '✅ did he apologize — inversion หลัง Not only' },
      { type: 'mcq', q: 'Rarely _____ such dedication among new employees.', options: ['we see', 'do we see', 'we saw', 'did we saw'], answer: 1, exp: '✅ do we see — inversion หลัง Rarely' },
      { type: 'error', q: 'Find the error: "Never I have seen such chaos."', options: ['ต้องสลับเป็น "Never have I seen such chaos."', '"chaos" should be "chaoses"', '"seen" should be "see"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ Never have I seen — auxiliary มาก่อน subject' }
    ]
  },
  'causative': {
    intro: 'have/get + object + V3 = ให้คนอื่นทำสิ่งนั้นให้เรา',
    exercises: [
      { type: 'mcq', q: 'I need to _____ my phone _____ .', options: ['have / repair', 'have / repaired', 'have / repairing', 'had / repair'], answer: 1, exp: '✅ have...repaired — have + object + V3' },
      { type: 'gap', q: 'She _____ (have) her nails done every month.', answer: 'has', exp: '✅ has her nails done' },
      { type: 'mcq', q: 'We are getting our roof _____ next month.', options: ['fix', 'fixed', 'fixing', 'to fix'], answer: 1, exp: '✅ fixed — get + object + V3' },
      { type: 'error', q: 'Find the error: "He had cut his hair by the barber."', options: ['ควรเป็น "He had his hair cut by the barber."', '"barber" should be "barbers"', '"cut" should be "cutting"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ had his hair cut — have + object + V3' }
    ]
  },
  'advanced-passive': {
    intro: 'It is said/believed/reported that... — โครงสร้าง passive แบบทางการสำหรับรายงานข้อมูลทั่วไป',
    exercises: [
      { type: 'mcq', q: 'It _____ that the economy will improve next year.', options: ['says', 'is said', 'is saying', 'said'], answer: 1, exp: '✅ is said — It is said that...' },
      { type: 'gap', q: 'She _____ (think) to be the best candidate for the job.', answer: 'is thought', exp: '✅ is thought — subject + is/are + thought + to + V' },
      { type: 'mcq', q: 'The ancient city _____ have been destroyed by an earthquake.', options: ['is said to', 'is saying to', 'says to', 'said to'], answer: 0, exp: '✅ is said to — subject + is said to + have + V3' },
      { type: 'error', q: 'Find the error: "It is believe that he will win."', options: ['"is believe" should be "is believed"', '"win" should be "wins"', '"that" should be "which"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ is believed — passive form (be + V3)' }
    ]
  },
  'subjunctive': {
    intro: 'หลัง suggest/recommend/insist/demand/propose + that + subject + base verb (ไม่ผันตาม subject)',
    exercises: [
      { type: 'mcq', q: 'The board recommended that he _____ the position immediately.', options: ['takes', 'take', 'took', 'taking'], answer: 1, exp: '✅ take — subjunctive ใช้ base verb เสมอ' },
      { type: 'gap', q: 'It is important that she _____ (be) informed right away.', answer: 'be', exp: '✅ be — subjunctive ของ verb "to be" คือ base form "be"' },
      { type: 'mcq', q: 'The committee insisted that the rule _____ enforced.', options: ['is', 'was', 'be', 'being'], answer: 2, exp: '✅ be enforced — subjunctive passive: base verb "be"' },
      { type: 'error', q: 'Find the error: "I suggest that he goes home early."', options: ['"goes" should be "go"', '"suggest" should be "suggests"', '"early" should be "earlier"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ go — subjunctive ไม่ผันตาม subject เลย' }
    ]
  },
  'cleft-sentences': {
    intro: 'It is/was...that... และ What...is/was... ใช้เน้นข้อมูลสำคัญในประโยค',
    exercises: [
      { type: 'mcq', q: '_____ was John who finally admitted the mistake.', options: ['This', 'It', 'That', 'There'], answer: 1, exp: '✅ It was John who... — cleft sentence structure' },
      { type: 'gap', q: '_____ (What) I need most right now is some rest.', answer: 'What', exp: '✅ What I need... is... — cleft sentence เน้นสิ่งที่ต้องการ' },
      { type: 'mcq', q: 'It was her determination _____ impressed the judges.', options: ['which', 'that', 'what', 'who'], answer: 1, exp: '✅ that — It was...that... (accept "which" too in informal use)' },
      { type: 'error', q: 'Find the error: "What I need is to more sleep."', options: ['"to more sleep" should be "more sleep"', '"need" should be "needs"', '"is" should be "was"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ What I need is more sleep — ไม่ต้องใช้ "to" ตรงนี้' }
    ]
  },
  'hedging': {
    intro: 'ภาษานุ่มนวล/ไม่ฟันธง: seem, tend to, arguably, it could be argued that... ใช้มากในบริบททางการ',
    exercises: [
      { type: 'mcq', q: '_____ that the new policy will reduce costs.', options: ['It is', 'It could be argued', 'It must be', 'It will be'], answer: 1, exp: '✅ It could be argued — hedging language แสดงความไม่ฟันธง' },
      { type: 'gap', q: 'The data _____ (seem) to support this theory.', answer: 'seems', exp: '✅ seems (or "seem" if data treated as plural) — nuanced/tentative claim' },
      { type: 'mcq', q: 'This method _____ to produce more consistent results.', options: ['tend', 'tends', 'tending', 'tended'], answer: 1, exp: '✅ tends — 3rd person singular subject (this method)' },
      { type: 'error', q: 'Find the error: "It must be that he is right, but I am not completely sure."', options: ['ขัดแย้งในตัว — ควรใช้ "It could be that he is right" แทน', '"right" should be "rightly"', '"sure" should be "surely"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ "It could be that..." สอดคล้องกับความไม่แน่ใจมากกว่า "must be"' }
    ]
  },
  'discourse-markers': {
    intro: 'nevertheless, notwithstanding, in light of, that being said — คำเชื่อมขั้นสูงที่ควบคุมน้ำเสียงทางการ',
    exercises: [
      { type: 'mcq', q: 'The project faced many delays. _____ , it was completed on time.', options: ['Because', 'Nevertheless', 'So', 'Since'], answer: 1, exp: '✅ Nevertheless — contrast เชิงทางการ' },
      { type: 'gap', q: '_____ (In light of) the new evidence, the case was reopened.', answer: 'In light of', exp: '✅ In light of — เมื่อพิจารณาจาก' },
      { type: 'mcq', q: 'The service was slow; _____ , the food was excellent.', options: ['therefore', 'that being said', 'because', 'so'], answer: 1, exp: '✅ that being said — เชื่อม contrast อย่างสุภาพ' },
      { type: 'error', q: 'Find the error: "Notwithstanding of the delay, we finished on time."', options: ['"Notwithstanding of" should be "Notwithstanding"', '"delay" should be "delays"', '"finished" should be "finish"', 'ไม่มีข้อผิดพลาด'], answer: 0, exp: '✅ Notwithstanding the delay — ไม่ต้องใช้ "of"' }
    ]
  }
};
