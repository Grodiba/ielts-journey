// ── English Journey — Vocabulary Sets ──
// Everyday-life vocabulary, grouped by CEFR level & day/theme

const VOCAB_SETS = [
  // ══════════════════ A2 (7 days, deep) ══════════════════
  {
    level: 'A2', day: 1, theme: 'Family & People',
    words: [
      { word: 'parents', thai: 'พ่อแม่', chunk: 'live with my parents', sentence: 'I live with my parents in Bangkok.' },
      { word: 'sibling', thai: 'พี่น้อง', chunk: 'have a sibling', sentence: 'I have one sibling, a younger sister.' },
      { word: 'married', thai: 'แต่งงานแล้ว', chunk: 'be married to [someone]', sentence: 'My brother is married to a teacher.' },
      { word: 'relative', thai: 'ญาติ', chunk: 'visit a relative', sentence: 'We visit our relatives during holidays.' },
      { word: 'close', thai: 'สนิท', chunk: 'be close to [someone]', sentence: 'I am very close to my grandmother.' },
      { word: 'raise', thai: 'เลี้ยงดู', chunk: 'raise a child', sentence: 'My parents raised three children.' },
      { word: 'neighbor', thai: 'เพื่อนบ้าน', chunk: 'a friendly neighbor', sentence: 'Our neighbor helps us water the plants.' },
      { word: 'get along', thai: 'เข้ากันได้ดี', chunk: 'get along with [someone]', sentence: 'I get along well with my colleagues.' }
    ]
  },
  {
    level: 'A2', day: 2, theme: 'Daily Routine',
    words: [
      { word: 'wake up', thai: 'ตื่นนอน', chunk: 'wake up at [time]', sentence: 'I wake up at 6:30 every morning.' },
      { word: 'commute', thai: 'เดินทางไปทำงาน/เรียน', chunk: 'commute by [transport]', sentence: 'I commute to work by bus.' },
      { word: 'routine', thai: 'กิจวัตร', chunk: 'daily routine', sentence: 'My daily routine is very simple.' },
      { word: 'brush', thai: 'แปรง', chunk: 'brush my teeth', sentence: 'I brush my teeth twice a day.' },
      { word: 'exhausted', thai: 'เหนื่อยมาก', chunk: 'feel exhausted', sentence: 'I feel exhausted after a long day at work.' },
      { word: 'relax', thai: 'ผ่อนคลาย', chunk: 'relax by doing [activity]', sentence: 'I relax by listening to music.' },
      { word: 'usually', thai: 'ปกติแล้ว', chunk: 'usually + verb', sentence: 'I usually have breakfast at home.' },
      { word: 'go to bed', thai: 'เข้านอน', chunk: 'go to bed at [time]', sentence: 'I go to bed around 11 PM.' }
    ]
  },
  {
    level: 'A2', day: 3, theme: 'Food & Drink',
    words: [
      { word: 'delicious', thai: 'อร่อย', chunk: 'taste delicious', sentence: 'This soup tastes delicious.' },
      { word: 'recipe', thai: 'สูตรอาหาร', chunk: 'follow a recipe', sentence: 'I followed a recipe to cook fried rice.' },
      { word: 'ingredient', thai: 'ส่วนผสม', chunk: 'buy ingredients', sentence: 'I need to buy some ingredients for dinner.' },
      { word: 'spicy', thai: 'เผ็ด', chunk: 'too spicy for me', sentence: 'This curry is too spicy for me.' },
      { word: 'order', thai: 'สั่ง(อาหาร)', chunk: 'order food', sentence: 'We ordered noodles and a salad.' },
      { word: 'leftover', thai: 'อาหารเหลือ', chunk: 'save the leftovers', sentence: 'I saved the leftovers for tomorrow.' },
      { word: 'thirsty', thai: 'กระหายน้ำ', chunk: 'feel thirsty', sentence: 'I feel thirsty after exercising.' },
      { word: 'skip a meal', thai: 'ข้ามมื้ออาหาร', chunk: 'skip breakfast/lunch', sentence: 'I try not to skip breakfast.' }
    ]
  },
  {
    level: 'A2', day: 4, theme: 'House & Home',
    words: [
      { word: 'apartment', thai: 'อพาร์ตเมนต์', chunk: 'live in an apartment', sentence: 'I live in a small apartment near the station.' },
      { word: 'furniture', thai: 'เฟอร์นิเจอร์', chunk: 'buy new furniture', sentence: 'We bought new furniture for the living room.' },
      { word: 'tidy', thai: 'เรียบร้อย/เก็บของ', chunk: 'tidy up the room', sentence: 'I tidy up my room every weekend.' },
      { word: 'messy', thai: 'รกรุงรัง', chunk: 'the room is messy', sentence: 'My desk is always messy after work.' },
      { word: 'move (house)', thai: 'ย้ายบ้าน', chunk: 'move to a new place', sentence: 'We are moving to a new apartment next month.' },
      { word: 'rent', thai: 'ค่าเช่า/เช่า', chunk: 'pay the rent', sentence: 'I pay the rent on the first of every month.' },
      { word: 'neighborhood', thai: 'ย่าน/ละแวกบ้าน', chunk: 'a quiet neighborhood', sentence: 'I live in a quiet neighborhood.' },
      { word: 'comfortable', thai: 'สบาย', chunk: 'a comfortable home', sentence: 'My home is small but comfortable.' }
    ]
  },
  {
    level: 'A2', day: 5, theme: 'Weather & Seasons',
    words: [
      { word: 'humid', thai: 'ชื้น', chunk: 'hot and humid', sentence: 'The weather here is hot and humid.' },
      { word: 'forecast', thai: 'พยากรณ์อากาศ', chunk: 'check the forecast', sentence: 'I checked the forecast before leaving home.' },
      { word: 'pour', thai: 'ฝนตกหนัก', chunk: 'it\'s pouring', sentence: 'It was pouring, so we stayed inside.' },
      { word: 'freezing', thai: 'หนาวจัด', chunk: 'it\'s freezing', sentence: 'It\'s freezing outside; wear a jacket.' },
      { word: 'sunshine', thai: 'แสงแดด', chunk: 'enjoy the sunshine', sentence: 'We enjoyed the sunshine at the beach.' },
      { word: 'breeze', thai: 'ลมพัดเบาๆ', chunk: 'a cool breeze', sentence: 'There was a cool breeze in the evening.' },
      { word: 'flood', thai: 'น้ำท่วม', chunk: 'a serious flood', sentence: 'The heavy rain caused a serious flood.' },
      { word: 'season', thai: 'ฤดูกาล', chunk: 'my favorite season', sentence: 'Winter is my favorite season.' }
    ]
  },
  {
    level: 'A2', day: 6, theme: 'Shopping & Money',
    words: [
      { word: 'afford', thai: 'มีกำลังซื้อ', chunk: 'can afford [something]', sentence: 'I can\'t afford a new laptop right now.' },
      { word: 'discount', thai: 'ส่วนลด', chunk: 'get a discount', sentence: 'I got a 20% discount on these shoes.' },
      { word: 'receipt', thai: 'ใบเสร็จ', chunk: 'keep the receipt', sentence: 'Please keep the receipt in case you need a refund.' },
      { word: 'refund', thai: 'คืนเงิน', chunk: 'ask for a refund', sentence: 'I asked for a refund because the item was broken.' },
      { word: 'try on', thai: 'ลองใส่', chunk: 'try on clothes', sentence: 'Can I try on this shirt?' },
      { word: 'bargain', thai: 'ต่อรองราคา', chunk: 'a good bargain', sentence: 'I found a good bargain at the market.' },
      { word: 'expensive', thai: 'แพง', chunk: 'too expensive', sentence: 'This restaurant is too expensive for me.' },
      { word: 'save money', thai: 'เก็บเงิน', chunk: 'save money for [something]', sentence: 'I am saving money for a trip to Japan.' }
    ]
  },
  {
    level: 'A2', day: 7, theme: 'Health & Body',
    words: [
      { word: 'headache', thai: 'ปวดหัว', chunk: 'have a headache', sentence: 'I have a headache today.' },
      { word: 'exercise', thai: 'ออกกำลังกาย', chunk: 'do exercise', sentence: 'I try to exercise three times a week.' },
      { word: 'diet', thai: 'อาหารการกิน', chunk: 'a healthy diet', sentence: 'I try to eat a healthy diet.' },
      { word: 'sick', thai: 'ป่วย', chunk: 'feel sick', sentence: 'I felt sick, so I stayed home.' },
      { word: 'rest', thai: 'พักผ่อน', chunk: 'get some rest', sentence: 'You should get some rest.' },
      { word: 'appointment', thai: 'นัดหมาย(แพทย์)', chunk: 'a doctor\'s appointment', sentence: 'I have a doctor\'s appointment tomorrow.' },
      { word: 'medicine', thai: 'ยา', chunk: 'take medicine', sentence: 'I need to take medicine for my cold.' },
      { word: 'recover', thai: 'หายป่วย/ฟื้นตัว', chunk: 'recover from [illness]', sentence: 'It took a week to recover from the flu.' }
    ]
  },

  // ══════════════════ B1 (6 days, deep) ══════════════════
  {
    level: 'B1', day: 1, theme: 'Work & Jobs',
    words: [
      { word: 'colleague', thai: 'เพื่อนร่วมงาน', chunk: 'work with a colleague', sentence: 'I work closely with a few colleagues on this project.' },
      { word: 'deadline', thai: 'กำหนดส่งงาน', chunk: 'meet a deadline', sentence: 'We need to meet the deadline by Friday.' },
      { word: 'promotion', thai: 'การเลื่อนตำแหน่ง', chunk: 'get a promotion', sentence: 'She got a promotion after two years.' },
      { word: 'responsible for', thai: 'รับผิดชอบ', chunk: 'be responsible for [task]', sentence: 'I am responsible for training new employees.' },
      { word: 'workload', thai: 'ปริมาณงาน', chunk: 'a heavy workload', sentence: 'I have a heavy workload this month.' },
      { word: 'resign', thai: 'ลาออก', chunk: 'resign from a job', sentence: 'He decided to resign from his job last week.' },
      { word: 'skill', thai: 'ทักษะ', chunk: 'develop a skill', sentence: 'I am trying to develop my communication skills.' },
      { word: 'career', thai: 'อาชีพ/เส้นทางอาชีพ', chunk: 'build a career', sentence: 'She wants to build a career in marketing.' }
    ]
  },
  {
    level: 'B1', day: 2, theme: 'Travel & Transport',
    words: [
      { word: 'itinerary', thai: 'แผนการเดินทาง', chunk: 'plan an itinerary', sentence: 'We planned our itinerary before the trip.' },
      { word: 'accommodation', thai: 'ที่พัก', chunk: 'book accommodation', sentence: 'I booked accommodation near the city center.' },
      { word: 'delay', thai: 'ล่าช้า', chunk: 'a flight delay', sentence: 'Our flight had a two-hour delay.' },
      { word: 'destination', thai: 'จุดหมายปลายทาง', chunk: 'a popular destination', sentence: 'Chiang Mai is a popular destination for tourists.' },
      { word: 'luggage', thai: 'กระเป๋าเดินทาง', chunk: 'pack luggage', sentence: 'I packed my luggage the night before.' },
      { word: 'explore', thai: 'สำรวจ', chunk: 'explore a new city', sentence: 'We spent the weekend exploring the old town.' },
      { word: 'transfer', thai: 'ต่อเครื่อง/เปลี่ยนขบวน', chunk: 'transfer at [place]', sentence: 'We had to transfer at the airport in Singapore.' },
      { word: 'budget', thai: 'งบประมาณ', chunk: 'travel on a budget', sentence: 'We traveled on a tight budget last year.' }
    ]
  },
  {
    level: 'B1', day: 3, theme: 'Feelings & Emotions',
    words: [
      { word: 'frustrated', thai: 'หงุดหงิด/ท้อ', chunk: 'feel frustrated with [something]', sentence: 'I felt frustrated with the slow internet.' },
      { word: 'nervous', thai: 'ประหม่า', chunk: 'nervous about [something]', sentence: 'I was nervous about the interview.' },
      { word: 'confident', thai: 'มั่นใจ', chunk: 'feel confident about [something]', sentence: 'I feel more confident speaking English now.' },
      { word: 'overwhelmed', thai: 'รู้สึกท่วมท้น/รับมือไม่ไหว', chunk: 'feel overwhelmed', sentence: 'She felt overwhelmed by the amount of work.' },
      { word: 'relieved', thai: 'โล่งใจ', chunk: 'feel relieved', sentence: 'I felt relieved after finishing the exam.' },
      { word: 'grateful', thai: 'ซาบซึ้ง/รู้สึกขอบคุณ', chunk: 'grateful for [something]', sentence: 'I am grateful for my family\'s support.' },
      { word: 'jealous', thai: 'อิจฉา', chunk: 'jealous of [someone]', sentence: 'He was jealous of his friend\'s new car.' },
      { word: 'homesick', thai: 'คิดถึงบ้าน', chunk: 'feel homesick', sentence: 'I felt homesick during my first month abroad.' }
    ]
  },
  {
    level: 'B1', day: 4, theme: 'Technology & Communication',
    words: [
      { word: 'device', thai: 'อุปกรณ์', chunk: 'an electronic device', sentence: 'I use several electronic devices every day.' },
      { word: 'upload', thai: 'อัปโหลด', chunk: 'upload a file/photo', sentence: 'I uploaded the photos to the cloud.' },
      { word: 'notification', thai: 'การแจ้งเตือน', chunk: 'get a notification', sentence: 'I got a notification about the update.' },
      { word: 'connection', thai: 'การเชื่อมต่อ', chunk: 'a stable connection', sentence: 'I need a stable internet connection for video calls.' },
      { word: 'update', thai: 'อัปเดต', chunk: 'update an app', sentence: 'I updated the app to the latest version.' },
      { word: 'reply', thai: 'ตอบกลับ', chunk: 'reply to a message', sentence: 'I usually reply to messages within an hour.' },
      { word: 'access', thai: 'เข้าถึง', chunk: 'access [something]', sentence: 'I can\'t access my account right now.' },
      { word: 'rely on', thai: 'พึ่งพา', chunk: 'rely on technology', sentence: 'We rely on technology for almost everything.' }
    ]
  },
  {
    level: 'B1', day: 5, theme: 'Environment & Nature',
    words: [
      { word: 'pollution', thai: 'มลพิษ', chunk: 'air pollution', sentence: 'Air pollution is a serious problem in big cities.' },
      { word: 'recycle', thai: 'รีไซเคิล', chunk: 'recycle plastic/paper', sentence: 'We try to recycle plastic bottles at home.' },
      { word: 'reduce', thai: 'ลด', chunk: 'reduce waste', sentence: 'We should reduce single-use plastic waste.' },
      { word: 'resource', thai: 'ทรัพยากร', chunk: 'natural resources', sentence: 'We need to protect our natural resources.' },
      { word: 'sustainable', thai: 'ยั่งยืน', chunk: 'a sustainable lifestyle', sentence: 'More people are choosing a sustainable lifestyle.' },
      { word: 'climate change', thai: 'การเปลี่ยนแปลงสภาพภูมิอากาศ', chunk: 'the effects of climate change', sentence: 'Climate change is affecting weather patterns worldwide.' },
      { word: 'endangered', thai: 'ใกล้สูญพันธุ์', chunk: 'an endangered species', sentence: 'Tigers are an endangered species.' },
      { word: 'protect', thai: 'ปกป้อง', chunk: 'protect the environment', sentence: 'It is everyone\'s duty to protect the environment.' }
    ]
  },
  {
    level: 'B1', day: 6, theme: 'Education & Learning',
    words: [
      { word: 'achieve', thai: 'บรรลุผล', chunk: 'achieve a goal', sentence: 'I want to achieve fluency in English.' },
      { word: 'improve', thai: 'พัฒนา/ปรับปรุง', chunk: 'improve a skill', sentence: 'I am working hard to improve my vocabulary.' },
      { word: 'motivated', thai: 'มีแรงจูงใจ', chunk: 'feel motivated', sentence: 'I feel more motivated when I see my progress.' },
      { word: 'consistent', thai: 'สม่ำเสมอ', chunk: 'be consistent', sentence: 'The key to learning a language is being consistent.' },
      { word: 'struggle', thai: 'ดิ้นรน/มีปัญหากับ', chunk: 'struggle with [something]', sentence: 'I still struggle with grammar sometimes.' },
      { word: 'progress', thai: 'ความคืบหน้า', chunk: 'make progress', sentence: 'I can see real progress after a few weeks.' },
      { word: 'review', thai: 'ทบทวน', chunk: 'review vocabulary', sentence: 'I review new vocabulary every night before bed.' },
      { word: 'confidence', thai: 'ความมั่นใจ', chunk: 'build confidence', sentence: 'Speaking practice helps build my confidence.' }
    ]
  },

  // ══════════════════ B2 (2 days, seed) ══════════════════
  {
    level: 'B2', day: 1, theme: 'Opinions & Debates',
    words: [
      { word: 'perspective', thai: 'มุมมอง', chunk: 'from a different perspective', sentence: 'It helps to look at the problem from a different perspective.' },
      { word: 'controversial', thai: 'เป็นที่ถกเถียง', chunk: 'a controversial topic', sentence: 'Social media regulation is a controversial topic.' },
      { word: 'justify', thai: 'ให้เหตุผลสนับสนุน', chunk: 'justify a decision', sentence: 'It is hard to justify such a big expense.' },
      { word: 'outweigh', thai: 'มีน้ำหนักมากกว่า', chunk: 'the benefits outweigh the risks', sentence: 'In my view, the benefits outweigh the risks.' },
      { word: 'assumption', thai: 'ข้อสันนิษฐาน', chunk: 'make an assumption', sentence: 'We shouldn\'t make assumptions without evidence.' },
      { word: 'contradict', thai: 'ขัดแย้ง', chunk: 'contradict each other', sentence: 'The two studies seem to contradict each other.' },
      { word: 'compromise', thai: 'การประนีประนอม', chunk: 'reach a compromise', sentence: 'They finally reached a compromise after long discussions.' },
      { word: 'valid', thai: 'สมเหตุสมผล/ใช้ได้', chunk: 'a valid point/argument', sentence: 'That is a valid point I hadn\'t considered.' }
    ]
  },
  {
    level: 'B2', day: 2, theme: 'Society & Culture',
    words: [
      { word: 'diverse', thai: 'หลากหลาย', chunk: 'a diverse society', sentence: 'Bangkok is home to a diverse mix of cultures.' },
      { word: 'norm', thai: 'บรรทัดฐาน/ธรรมเนียม', chunk: 'social norms', sentence: 'Social norms can differ a lot between countries.' },
      { word: 'inequality', thai: 'ความไม่เท่าเทียม', chunk: 'income inequality', sentence: 'Income inequality remains a major issue.' },
      { word: 'tradition', thai: 'ประเพณี', chunk: 'preserve a tradition', sentence: 'Many families try to preserve their traditions.' },
      { word: 'stereotype', thai: 'ภาพเหมารวม', chunk: 'a common stereotype', sentence: 'It is unfair to judge people based on stereotypes.' },
      { word: 'generation gap', thai: 'ช่องว่างระหว่างวัย', chunk: 'a generation gap', sentence: 'There is often a generation gap in how people use technology.' },
      { word: 'community', thai: 'ชุมชน', chunk: 'a close-knit community', sentence: 'I grew up in a close-knit community.' },
      { word: 'integration', thai: 'การผสมกลมกลืน', chunk: 'social integration', sentence: 'Social integration is important for immigrants.' }
    ]
  },

  // ══════════════════ C1 (2 days, seed) ══════════════════
  {
    level: 'C1', day: 1, theme: 'Abstract Concepts',
    words: [
      { word: 'ambiguous', thai: 'คลุมเครือ', chunk: 'an ambiguous statement', sentence: 'His answer was rather ambiguous.' },
      { word: 'paradox', thai: 'ความขัดแย้งในตัวเอง', chunk: 'a strange paradox', sentence: 'It\'s a paradox that we have more devices but less time.' },
      { word: 'inherent', thai: 'ติดตัวมาโดยธรรมชาติ', chunk: 'an inherent risk/quality', sentence: 'There is an inherent risk in every investment.' },
      { word: 'nuance', thai: 'ความละเอียดอ่อน', chunk: 'understand the nuance', sentence: 'Translating poetry requires understanding subtle nuances.' },
      { word: 'coherent', thai: 'สอดคล้อง/เป็นเหตุเป็นผล', chunk: 'a coherent argument', sentence: 'She presented a coherent argument for the proposal.' },
      { word: 'implication', thai: 'นัยยะ/ผลที่ตามมา', chunk: 'the implications of a decision', sentence: 'We need to consider the long-term implications of this policy.' },
      { word: 'subjective', thai: 'เชิงอัตวิสัย', chunk: 'a subjective opinion', sentence: 'Beauty is often considered subjective.' },
      { word: 'underlying', thai: 'ซ่อนอยู่เบื้องหลัง/พื้นฐาน', chunk: 'the underlying cause', sentence: 'We need to address the underlying cause of the problem.' }
    ]
  },
  {
    level: 'C1', day: 2, theme: 'Idiomatic Expressions',
    words: [
      { word: 'get the ball rolling', thai: 'เริ่มลงมือทำ', chunk: 'get the ball rolling on [something]', sentence: 'Let\'s get the ball rolling on the new project.' },
      { word: 'a double-edged sword', thai: 'ดาบสองคม', chunk: '[something] is a double-edged sword', sentence: 'Social media is a double-edged sword.' },
      { word: 'think outside the box', thai: 'คิดนอกกรอบ', chunk: 'think outside the box', sentence: 'We need to think outside the box to solve this.' },
      { word: 'bite the bullet', thai: 'ยอมทำสิ่งที่ยาก/ทนทำ', chunk: 'bite the bullet and do [something]', sentence: 'I finally bit the bullet and booked the dentist appointment.' },
      { word: 'a blessing in disguise', thai: 'โชคร้ายที่กลายเป็นโชคดี', chunk: '[something] turned out to be a blessing in disguise', sentence: 'Losing that job was a blessing in disguise.' },
      { word: 'on the same page', thai: 'เข้าใจตรงกัน', chunk: 'be on the same page', sentence: 'Let\'s make sure we\'re on the same page before we start.' },
      { word: 'cut corners', thai: 'ลัดขั้นตอน/ทำแบบขอไปที', chunk: 'cut corners on [something]', sentence: 'They cut corners on safety to save money.' },
      { word: 'read between the lines', thai: 'อ่านนัยยะที่ซ่อนอยู่', chunk: 'read between the lines', sentence: 'You have to read between the lines to understand his real intention.' }
    ]
  },

  // ══════════════════ C2 (2 days, seed) ══════════════════
  {
    level: 'C2', day: 1, theme: 'Academic & Analytical Language',
    words: [
      { word: 'corroborate', thai: 'ยืนยัน/สนับสนุนหลักฐาน', chunk: 'corroborate a claim', sentence: 'The new data corroborates the earlier findings.' },
      { word: 'juxtapose', thai: 'วางเปรียบเทียบเคียงกัน', chunk: 'juxtapose [A] with [B]', sentence: 'The film juxtaposes wealth with extreme poverty.' },
      { word: 'discern', thai: 'แยกแยะได้/มองออก', chunk: 'discern a pattern', sentence: 'It took time to discern a clear pattern in the data.' },
      { word: 'multifaceted', thai: 'มีหลายแง่มุม', chunk: 'a multifaceted issue', sentence: 'Climate change is a multifaceted issue with no simple solution.' },
      { word: 'substantiate', thai: 'พิสูจน์/หาหลักฐานสนับสนุน', chunk: 'substantiate an argument', sentence: 'The report fails to substantiate its main claim.' },
      { word: 'ostensibly', thai: 'ดูเหมือนว่า(แต่จริงอาจไม่ใช่)', chunk: 'ostensibly [reason]', sentence: 'The meeting was, ostensibly, about budget cuts.' },
      { word: 'dichotomy', thai: 'ความแตกต่างขั้วตรงข้าม', chunk: 'a false dichotomy', sentence: 'This debate presents a false dichotomy between growth and sustainability.' },
      { word: 'pragmatic', thai: 'เชิงปฏิบัติ/มุ่งผลลัพธ์', chunk: 'a pragmatic approach', sentence: 'We need a pragmatic approach rather than an idealistic one.' }
    ]
  },
  {
    level: 'C2', day: 2, theme: 'Nuanced Collocations',
    words: [
      { word: 'a fine line', thai: 'เส้นแบ่งที่บางเบา', chunk: 'walk a fine line between [A] and [B]', sentence: 'She walks a fine line between confidence and arrogance.' },
      { word: 'to no avail', thai: 'ไม่เป็นผล/ไร้ประโยชน์', chunk: '[effort] was to no avail', sentence: 'We tried to persuade him, but it was to no avail.' },
      { word: 'a far cry from', thai: 'ต่างไกลจาก', chunk: '[X] is a far cry from [Y]', sentence: 'This result is a far cry from what we expected.' },
      { word: 'in the same vein', thai: 'ในทำนองเดียวกัน', chunk: 'in the same vein, ...', sentence: 'In the same vein, the second study also found similar results.' },
      { word: 'take for granted', thai: 'มองข้ามความสำคัญ/คิดว่าเป็นเรื่องปกติ', chunk: 'take [something] for granted', sentence: 'We often take clean water for granted.' },
      { word: 'a case in point', thai: 'ตัวอย่างที่ชัดเจน', chunk: '[X] is a case in point', sentence: 'The recent data breach is a case in point.' },
      { word: 'the crux of the matter', thai: 'ประเด็นสำคัญที่สุด', chunk: 'the crux of the matter is...', sentence: 'The crux of the matter is a lack of communication.' },
      { word: 'lend credence to', thai: 'เพิ่มความน่าเชื่อถือให้', chunk: 'lend credence to [a claim]', sentence: 'This new evidence lends credence to the theory.' }
    ]
  }
];
