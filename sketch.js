// ==========================================
// 單元式互動英文單字卡與測驗 - 主程式 (sketch.js)
// ==========================================

// 模擬從 Google Sheet 載入的題庫與單字資料庫
const database = {
  "Affect 的相似詞": [
    { word: "Affect", phonetic: "/əˈfekt/ (v.)", translation: "影響（動詞）", example: "Lack of sleep can affect your concentration.", optionA: "結果、影響（名詞）", optionB: "影響（動詞）", optionC: "效果、效力", optionD: "造成、引起", answer: "B" },
    { word: "Effect", phonetic: "/ɪˈfekt/ (n.)", translation: "結果、效果（名詞）", example: "The medicine had a positive effect.", optionA: "影響（動詞）", optionB: "執行、實施", optionC: "結果、效果（名詞）", optionD: "感染、傳染", answer: "C" },
    { word: "Accept", phonetic: "/əkˈsept/ (v.)", translation: "接受、同意", example: "She decided to accept the job offer.", optionA: "除⋯之外", optionB: "拒絕、否認", optionC: "預期、期待", optionD: "接受、同意", answer: "D" },
    { word: "Except", phonetic: "/ɪkˈsept/ (prep.)", translation: "除了⋯之外", example: "Everyone came except Daniel.", optionA: "除了⋯之外", optionB: "接受、同意", optionC: "預期、期待", optionD: "包含、包括", answer: "A" },
    { word: "Advice", phonetic: "/ədˈvaɪs/ (n.)", translation: "建議（名詞）", example: "My teacher gave me useful advice.", optionA: "建議、勸告（動詞）", optionB: "建議（名詞）", optionC: "選擇、決定", optionD: "通知、公告", answer: "B" },
    { word: "Advise", phonetic: "/ədˈvaɪz/ (v.)", translation: "建議、勸告（動詞）", example: "Doctors advise patients to exercise regularly.", optionA: "建議（名詞）", optionB: "警告、提醒", optionC: "建議、勸告（動詞）", optionD: "允許、批准", answer: "C" }
  ],
  "Complement 的相似詞": [
    { word: "Complement", phonetic: "/ˈkɑːm.plə.ment/ (n./v.)", translation: "補足、使更完整", example: "The sauce complements the fish perfectly.", optionA: "稱讚、恭維", optionB: "補足、使更完整", optionC: "比較、對照", optionD: "競爭、抗衡", answer: "B" },
    { word: "Compliment", phonetic: "/ˈkɑːm.plə.ment/ (n./v.)", translation: "稱讚、恭維", example: "He complimented her on her presentation.", optionA: "補足、使更完整", optionB: "批評、責備", optionC: "稱讚、恭維", optionD: "感謝、回報", answer: "C" },
    { word: "Principal", phonetic: "/ˈprɪn.sə.pəl/ (n./adj.)", translation: "校長；主要的", example: "The principal welcomed the new students.", optionA: "原則、原理", optionB: "次要的、附屬的", optionC: "利益、利息", optionD: "校長；主要的", answer: "D" },
    { word: "Principle", phonetic: "/ˈprɪn.sə.pəl/ (n.)", translation: "原則、原理", example: "Honesty is an important principle.", optionA: "原則、原理", optionB: "校長；主要的", optionC: "校園、學區", optionD: "規則制定者", answer: "A" },
    { word: "Stationary", phonetic: "/ˈsteɪ.ʃə.ner.i/ (adj.)", translation: "靜止的、不動的", example: "The car remained stationary at the light.", optionA: "文具用品", optionB: "靜止的、不動的", optionC: "固定支出", optionD: "旅行中的", answer: "B" },
    { word: "Stationery", phonetic: "/ˈsteɪ.ʃə.ner.i/ (n.)", translation: "文具用品", example: "She bought stationery for the new school year.", optionA: "靜止的、不動的", optionB: "車站服務", optionC: "文具用品", optionD: "固定不變的", answer: "C" }
  ],
  "Imply 的相似詞": [
    { word: "Imply", phonetic: "/ɪmˈplaɪ/ (v.)", translation: "暗示、意指（說話者）", example: "Are you implying that I made a mistake?", optionA: "推論、推斷（聽者）", optionB: "否認、反駁", optionC: "暗示、意指（說話者）", optionD: "詢問、追問", answer: "C" },
    { word: "Infer", phonetic: "/ɪnˈfɜːr/ (v.)", translation: "推論、推斷（聽者）", example: "From her tone, I inferred that she was upset.", optionA: "暗示、意指（說話者）", optionB: "推論、推斷（聽者）", optionC: "說明、解釋", optionD: "猜測但無根據", answer: "B" },
    { word: "Lie", phonetic: "/laɪ/ (v.)", translation: "躺；位於（不需受詞）", example: "Please lie down and rest for a while.", optionA: "放置某物（需受詞）", optionB: "說謊", optionC: "站立、直立", optionD: "躺；位於（不需受詞）", answer: "D" },
    { word: "Lay", phonetic: "/leɪ/ (v.)", translation: "放置、擺放（需受詞）", example: "Lay the book on the table.", optionA: "放置、擺放（需受詞）", optionB: "躺下休息", optionC: "位於某處", optionD: "說謊、欺騙", answer: "A" },
    { word: "Rise", phonetic: "/raɪz/ (v.)", translation: "上升、起身（不需受詞）", example: "The sun rises in the east.", optionA: "舉起、提高（需受詞）", optionB: "上升、起身（不需受詞）", optionC: "降低、減少", optionD: "放下、擱置", answer: "B" },
    { word: "Raise", phonetic: "/reɪz/ (v.)", translation: "舉起、提高（需受詞）", example: "They plan to raise the price next month.", optionA: "上升、起身（不需受詞）", optionB: "下降、下沉", optionC: "舉起、提高（需受詞）", optionD: "保持不變", answer: "C" }
  ],
  "Economic 的相似詞": [
    { word: "Economic", phonetic: "/ˌiː.kəˈnɑː.mɪk/ (adj.)", translation: "經濟的、經濟學的", example: "The country is facing economic challenges.", optionA: "節省的、划算的", optionB: "昂貴的、奢侈的", optionC: "經濟的、經濟學的", optionD: "穩定的、安全的", answer: "C" },
    { word: "Economical", phonetic: "/ˌiː.kəˈnɑː.mɪ.kəl/ (adj.)", translation: "節省的、划算的", example: "This small car is economical to run.", optionA: "節省的、划算的", optionB: "與經濟學有關的", optionC: "昂貴的、奢侈的", optionD: "貧困的、缺乏的", answer: "A" },
    { word: "Historic", phonetic: "/hɪˈstɔːr.ɪk/ (adj.)", translation: "有歷史意義的", example: "It was a historic moment for the country.", optionA: "依照年代編排的", optionB: "有歷史意義的", optionC: "古老但不重要的", optionD: "記錄歷史的人", answer: "B" },
    { word: "Historical", phonetic: "/hɪˈstɔːr.ɪ.kəl/ (adj.)", translation: "歷史的、與歷史有關的", example: "She enjoys reading historical novels.", optionA: "有歷史意義的", optionB: "發生在未來的", optionC: "歷史的、與歷史有關的", optionD: "著名的、重要的", answer: "C" },
    { word: "Sensible", phonetic: "/ˈsen.sə.bəl/ (adj.)", translation: "明智的、理智的", example: "It would be sensible to bring an umbrella.", optionA: "敏感的、易受影響的", optionB: "感官上的", optionC: "情緒化的、衝動的", optionD: "明智的、理智的", answer: "D" },
    { word: "Sensitive", phonetic: "/ˈsen.sə.tɪv/ (adj.)", translation: "敏感的、易受影響的", example: "His skin is sensitive to sunlight.", optionA: "敏感的、易受影響的", optionB: "明智的、理智的", optionC: "冷靜客觀的", optionD: "堅硬耐用的", answer: "A" }
  ],
  "Farther 的相似詞": [
    { word: "Farther", phonetic: "/ˈfɑːr.ðər/ (adv./adj.)", translation: "更遠的（實際距離）", example: "We walked farther than we planned.", optionA: "此外、進一步", optionB: "更遠的（實際距離）", optionC: "較近的", optionD: "更久的（時間）", answer: "B" },
    { word: "Further", phonetic: "/ˈfɜːr.ðər/ (adv./adj.)", translation: "進一步的；此外（程度）", example: "We need to discuss this further.", optionA: "更遠的（實際距離）", optionB: "較早的", optionC: "進一步的；此外（程度）", optionD: "更高的（位置）", answer: "C" },
    { word: "Assure", phonetic: "/əˈʃʊr/ (v.)", translation: "向某人保證、使安心", example: "I assure you that everything is under control.", optionA: "確保某事發生", optionB: "為財物投保", optionC: "猜測、推測", optionD: "向某人保證、使安心", answer: "D" },
    { word: "Ensure", phonetic: "/ɪnˈʃʊr/ (v.)", translation: "確保、保證某事發生", example: "Please ensure that the door is locked.", optionA: "確保、保證某事發生", optionB: "向某人保證、使安心", optionC: "為財物投保", optionD: "阻止、避免", answer: "A" },
    { word: "Borrow", phonetic: "/ˈbɑːr.oʊ/ (v.)", translation: "借入、向人借", example: "May I borrow your dictionary?", optionA: "借出、把東西借給人", optionB: "借入、向人借", optionC: "購買、擁有", optionD: "歸還、退回", answer: "B" },
    { word: "Lend", phonetic: "/lend/ (v.)", translation: "借出、把東西借給人", example: "Could you lend me a pen?", optionA: "借入、向人借", optionB: "保留、收藏", optionC: "借出、把東西借給人", optionD: "歸還、退回", answer: "C" }
  ],
  "Allusion 的相似詞": [
    { word: "Allusion", phonetic: "/əˈluː.ʒən/ (n.)", translation: "暗指、典故", example: "The poem contains an allusion to Greek mythology.", optionA: "幻覺、錯覺", optionB: "暗指、典故", optionC: "證據、線索", optionD: "描述、說明", answer: "B" },
    { word: "Illusion", phonetic: "/ɪˈluː.ʒən/ (n.)", translation: "幻覺、錯覺", example: "The mirrors created an optical illusion.", optionA: "暗指、典故", optionB: "想法、觀念", optionC: "幻覺、錯覺", optionD: "記憶、回憶", answer: "C" },
    { word: "Elicit", phonetic: "/ɪˈlɪs.ɪt/ (v.)", translation: "引出、誘出（反應或資訊）", example: "The question elicited several different responses.", optionA: "非法的、不正當的", optionB: "隱藏、保密", optionC: "禁止、阻止", optionD: "引出、誘出（反應或資訊）", answer: "D" },
    { word: "Illicit", phonetic: "/ɪˈlɪs.ɪt/ (adj.)", translation: "非法的、不正當的", example: "The police discovered an illicit trading operation.", optionA: "非法的、不正當的", optionB: "引出、誘出（反應或資訊）", optionC: "正式的、合法的", optionD: "公開的、透明的", answer: "A" },
    { word: "Eminent", phonetic: "/ˈem.ə.nənt/ (adj.)", translation: "著名的、傑出的", example: "An eminent scientist will give the keynote speech.", optionA: "即將發生的", optionB: "著名的、傑出的", optionC: "平凡的、普通的", optionD: "古老的、過時的", answer: "B" },
    { word: "Imminent", phonetic: "/ˈɪm.ə.nənt/ (adj.)", translation: "即將發生的、迫近的", example: "Dark clouds warned of an imminent storm.", optionA: "著名的、傑出的", optionB: "遙遠的、不可能的", optionC: "即將發生的、迫近的", optionD: "短暫的、稍縱即逝的", answer: "C" }
  ],
  "Precede 的相似詞": [
    { word: "Precede", phonetic: "/prɪˈsiːd/ (v.)", translation: "在⋯之前、先於", example: "A short introduction will precede the lecture.", optionA: "繼續進行", optionB: "在⋯之前、先於", optionC: "取代、替換", optionD: "跟隨、追隨", answer: "B" },
    { word: "Proceed", phonetic: "/prəˈsiːd/ (v.)", translation: "繼續進行、著手", example: "After the break, we will proceed with the meeting.", optionA: "在⋯之前、先於", optionB: "暫停、停止", optionC: "繼續進行、著手", optionD: "回到原處", answer: "C" },
    { word: "Personal", phonetic: "/ˈpɜːr.sən.əl/ (adj.)", translation: "個人的、私人的", example: "Please do not ask personal questions.", optionA: "人事部門的", optionB: "公開的、公共的", optionC: "專業的、職業的", optionD: "個人的、私人的", answer: "D" },
    { word: "Personnel", phonetic: "/ˌpɜːr.səˈnel/ (n.)", translation: "全體員工、人事部門", example: "All personnel must wear identification badges.", optionA: "全體員工、人事部門", optionB: "個人的、私人的", optionC: "顧客、消費者", optionD: "管理方法", answer: "A" },
    { word: "Lose", phonetic: "/luːz/ (v.)", translation: "失去、遺失；輸掉", example: "Be careful not to lose your keys.", optionA: "寬鬆的、不緊的", optionB: "失去、遺失；輸掉", optionC: "找到、發現", optionD: "選擇、挑選", answer: "B" },
    { word: "Loose", phonetic: "/luːs/ (adj.)", translation: "寬鬆的、不緊的", example: "This shirt is too loose around the waist.", optionA: "失去、遺失；輸掉", optionB: "緊密的、牢固的", optionC: "寬鬆的、不緊的", optionD: "昂貴的、珍貴的", answer: "C" }
  ],
  "Desert 的相似詞": [
    { word: "Desert", phonetic: "/ˈdez.ərt/ (n.)", translation: "沙漠", example: "Few plants can survive in the desert.", optionA: "甜點", optionB: "森林", optionC: "海岸", optionD: "沙漠", answer: "D" },
    { word: "Dessert", phonetic: "/dɪˈzɜːrt/ (n.)", translation: "甜點", example: "We had fruit for dessert.", optionA: "甜點", optionB: "沙漠", optionC: "開胃菜", optionD: "主菜", answer: "A" },
    { word: "Adapt", phonetic: "/əˈdæpt/ (v.)", translation: "適應、改編", example: "Animals must adapt to changes in their environment.", optionA: "收養、採納", optionB: "適應、改編", optionC: "放棄、捨棄", optionD: "採取、執行", answer: "B" },
    { word: "Adopt", phonetic: "/əˈdɑːpt/ (v.)", translation: "收養、採納", example: "They decided to adopt a child.", optionA: "適應、改編", optionB: "調整、修改", optionC: "收養、採納", optionD: "拒絕、否決", answer: "C" },
    { word: "Beside", phonetic: "/bɪˈsaɪd/ (prep.)", translation: "在⋯旁邊", example: "She sat beside her sister.", optionA: "此外、而且", optionB: "在⋯對面", optionC: "在⋯之下", optionD: "在⋯旁邊", answer: "D" },
    { word: "Besides", phonetic: "/bɪˈsaɪdz/ (prep./adv.)", translation: "此外、而且", example: "Besides English, he also speaks Japanese.", optionA: "此外、而且", optionB: "在⋯旁邊", optionC: "然而、但是", optionD: "因此、所以", answer: "A" }
  ],
  "Altogether 的相似詞": [
    { word: "Altogether", phonetic: "/ˌɔːl.təˈɡeð.ər/ (adv.)", translation: "總共、完全地", example: "Altogether, we raised one thousand dollars.", optionA: "所有人一起", optionB: "總共、完全地", optionC: "逐一地、分開地", optionD: "幾乎、差不多", answer: "B" },
    { word: "All together", phonetic: "/ˌɔːl təˈɡeð.ər/ (phrase)", translation: "所有人一起、全部聚在一起", example: "The family was all together for the holiday.", optionA: "總共、完全地", optionB: "各自分開", optionC: "所有人一起、全部聚在一起", optionD: "偶爾、有時候", answer: "C" },
    { word: "Breath", phonetic: "/breθ/ (n.)", translation: "呼吸、氣息（名詞）", example: "Take a deep breath before you begin.", optionA: "呼吸（動詞）", optionB: "咳嗽、喘息", optionC: "空氣、風", optionD: "呼吸、氣息（名詞）", answer: "D" },
    { word: "Breathe", phonetic: "/briːð/ (v.)", translation: "呼吸（動詞）", example: "It is difficult to breathe at high altitudes.", optionA: "呼吸（動詞）", optionB: "呼吸、氣息（名詞）", optionC: "吞嚥、吸收", optionD: "說話、交談", answer: "A" },
    { word: "Cloth", phonetic: "/klɔːθ/ (n.)", translation: "布、布料", example: "She used a soft cloth to clean the table.", optionA: "衣服、服裝", optionB: "布、布料", optionC: "棉花、纖維", optionD: "衣櫃、抽屜", answer: "B" },
    { word: "Clothe", phonetic: "/kloʊð/ (v.)", translation: "給⋯穿衣、為⋯提供衣物", example: "The charity helps clothe families in need.", optionA: "布、布料", optionB: "清洗衣物", optionC: "給⋯穿衣、為⋯提供衣物", optionD: "摺疊、收納", answer: "C" }
  ],
  "Council 的相似詞": [
    { word: "Council", phonetic: "/ˈkaʊn.səl/ (n.)", translation: "委員會、議會", example: "The city council approved the new park.", optionA: "法律顧問", optionB: "法院、法庭", optionC: "市民、居民", optionD: "委員會、議會", answer: "D" },
    { word: "Counsel", phonetic: "/ˈkaʊn.səl/ (n./v.)", translation: "法律顧問；勸告", example: "She sought counsel from an experienced lawyer.", optionA: "法律顧問；勸告", optionB: "委員會、議會", optionC: "投票、選舉", optionD: "合約、協議", answer: "A" },
    { word: "Cite", phonetic: "/saɪt/ (v.)", translation: "引用、引述", example: "Please cite your sources in the report.", optionA: "景象、視野", optionB: "引用、引述", optionC: "地點、場所", optionD: "參觀、拜訪", answer: "B" },
    { word: "Site", phonetic: "/saɪt/ (n.)", translation: "地點、場所；網站", example: "The school was built on the site of an old factory.", optionA: "引用、引述", optionB: "視力、視覺", optionC: "地點、場所；網站", optionD: "標誌、符號", answer: "C" },
    { word: "Sight", phonetic: "/saɪt/ (n.)", translation: "視力、景象", example: "The mountain was a beautiful sight.", optionA: "引用、引述", optionB: "地點、場所", optionC: "氣味、香氣", optionD: "視力、景象", answer: "D" },
    { word: "Devise", phonetic: "/dɪˈvaɪz/ (v.)", translation: "設計、想出（計畫）", example: "The team devised a new way to solve the problem.", optionA: "設計、想出（計畫）", optionB: "裝置、設備", optionC: "建議、忠告", optionD: "發明者、創作者", answer: "A" }
  ],
  "Emigrate 的相似詞": [
    { word: "Emigrate", phonetic: "/ˈem.ɪ.ɡreɪt/ (v.)", translation: "移居外國（離開原居地）", example: "Her grandparents emigrated from Italy.", optionA: "移入某國定居", optionB: "移居外國（離開原居地）", optionC: "短期旅行", optionD: "回到原居地", answer: "B" },
    { word: "Immigrate", phonetic: "/ˈɪm.ɪ.ɡreɪt/ (v.)", translation: "移入某國定居", example: "They immigrated to Canada in 2010.", optionA: "移居外國（離開原居地）", optionB: "短期旅行", optionC: "移入某國定居", optionD: "離開某地", answer: "C" },
    { word: "Emigrant", phonetic: "/ˈem.ɪ.ɡrənt/ (n.)", translation: "移居外國者（離開原居地）", example: "The emigrants left their homeland for new opportunities.", optionA: "移民官", optionB: "旅客", optionC: "移入某國的移民", optionD: "移居外國者（離開原居地）", answer: "D" },
    { word: "Immigrant", phonetic: "/ˈɪm.ɪ.ɡrənt/ (n.)", translation: "移入某國的移民", example: "The city welcomed many immigrants.", optionA: "移入某國的移民", optionB: "移居外國者（離開原居地）", optionC: "觀光客", optionD: "移民官", answer: "A" },
    { word: "Emigration", phonetic: "/ˌem.ɪˈɡreɪ.ʃən/ (n.)", translation: "移居外國、移出", example: "Emigration increased during the economic crisis.", optionA: "移入、移民", optionB: "移居外國、移出", optionC: "旅行、旅遊", optionD: "人口成長", answer: "B" },
    { word: "Immigration", phonetic: "/ˌɪm.ɪˈɡreɪ.ʃən/ (n.)", translation: "移入、移民", example: "Immigration has shaped the country's culture.", optionA: "移居外國、移出", optionB: "人口減少", optionC: "移入、移民", optionD: "短期出境", answer: "C" }
  ],
  "Appraise 的相似詞": [
    { word: "Appraise", phonetic: "/əˈpreɪz/ (v.)", translation: "評估、估價", example: "An expert appraised the value of the painting.", optionA: "通知、告知", optionB: "評估、估價", optionC: "稱讚、恭維", optionD: "同意、贊成", answer: "B" },
    { word: "Apprise", phonetic: "/əˈpraɪz/ (v.)", translation: "通知、告知", example: "Please apprise me of any changes.", optionA: "評估、估價", optionB: "隱瞞、保密", optionC: "通知、告知", optionD: "反對、拒絕", answer: "C" },
    { word: "Assent", phonetic: "/əˈsent/ (n./v.)", translation: "同意、贊成", example: "The proposal received the committee's assent.", optionA: "上升、攀升", optionB: "拒絕、反對", optionC: "評估、估價", optionD: "同意、贊成", answer: "D" },
    { word: "Ascent", phonetic: "/əˈsent/ (n.)", translation: "上升、攀升", example: "The climbers began their ascent at dawn.", optionA: "上升、攀升", optionB: "同意、贊成", optionC: "下降、衰退", optionD: "通知、告知", answer: "A" },
    { word: "Canvas", phonetic: "/ˈkæn.vəs/ (n.)", translation: "帆布；畫布", example: "The artist stretched a canvas over the frame.", optionA: "逐一詢問意見", optionB: "帆布；畫布", optionC: "水彩、顏料", optionD: "畫筆、畫架", answer: "B" },
    { word: "Canvass", phonetic: "/ˈkæn.vəs/ (v.)", translation: "逐一詢問意見；拉票", example: "Volunteers canvassed the neighborhood for support.", optionA: "帆布；畫布", optionB: "描繪、作畫", optionC: "逐一詢問意見；拉票", optionD: "投票、選舉", answer: "C" }
  ],
  "Adverse 的相似詞": [
    { word: "Adverse", phonetic: "/ədˈvɜːrs/ (adj.)", translation: "不利的、負面的", example: "The drug may cause adverse effects.", optionA: "厭惡的、反感的", optionB: "有益的、正面的", optionC: "相反方向的", optionD: "不利的、負面的", answer: "D" },
    { word: "Averse", phonetic: "/əˈvɜːrs/ (adj.)", translation: "厭惡的、反感的", example: "She is not averse to trying new foods.", optionA: "厭惡的、反感的", optionB: "不利的、負面的", optionC: "有興趣的、熱衷的", optionD: "有害健康的", answer: "A" },
    { word: "Proscribe", phonetic: "/proʊˈskraɪb/ (v.)", translation: "禁止、宣告非法", example: "The law proscribes the sale of these substances.", optionA: "開處方、指示", optionB: "禁止、宣告非法", optionC: "描述、說明", optionD: "批准、允許", answer: "B" },
    { word: "Prescribe", phonetic: "/prɪˈskraɪb/ (v.)", translation: "開處方；規定", example: "The doctor prescribed a course of antibiotics.", optionA: "禁止、宣告非法", optionB: "取消、撤銷", optionC: "開處方；規定", optionD: "診斷、檢查", answer: "C" },
    { word: "Confident", phonetic: "/ˈkɑːn.fə.dənt/ (adj.)", translation: "有自信的、確信的", example: "She felt confident before the interview.", optionA: "知己、密友", optionB: "困惑的、不確定的", optionC: "保密的、機密的", optionD: "有自信的、確信的", answer: "D" },
    { word: "Confidant", phonetic: "/ˈkɑːn.fə.dɑːnt/ (n.)", translation: "知己、密友", example: "He shared the secret with a trusted confidant.", optionA: "知己、密友", optionB: "有自信的、確信的", optionC: "顧問、專家", optionD: "競爭者、對手", answer: "A" }
  ],
  "Ingenious 的相似詞": [
    { word: "Ingenious", phonetic: "/ɪnˈdʒiː.ni.əs/ (adj.)", translation: "聰明有創意的、巧妙的", example: "She devised an ingenious solution to the problem.", optionA: "真誠坦率的", optionB: "聰明有創意的、巧妙的", optionC: "天真的、容易受騙的", optionD: "勤奮用功的", answer: "B" },
    { word: "Ingenuous", phonetic: "/ɪnˈdʒen.ju.əs/ (adj.)", translation: "真誠坦率的；天真的", example: "His ingenuous question made everyone smile.", optionA: "聰明有創意的、巧妙的", optionB: "狡猾世故的", optionC: "真誠坦率的；天真的", optionD: "知識淵博的", answer: "C" },
    { word: "Censor", phonetic: "/ˈsen.sər/ (n./v.)", translation: "審查；審查員", example: "The agency censored parts of the report.", optionA: "譴責、責備", optionB: "贊同、支持", optionC: "審查制度", optionD: "審查；審查員", answer: "D" },
    { word: "Censure", phonetic: "/ˈsen.ʃər/ (n./v.)", translation: "譴責、責備", example: "The official faced censure for the decision.", optionA: "譴責、責備", optionB: "審查；審查員", optionC: "讚揚、表揚", optionD: "審核、檢查", answer: "A" },
    { word: "Precedent", phonetic: "/ˈpres.ə.dənt/ (n.)", translation: "先例、判例", example: "The ruling set a precedent for future cases.", optionA: "優先權、順位", optionB: "先例、判例", optionC: "前置條件", optionD: "歷史紀錄", answer: "B" },
    { word: "Precedence", phonetic: "/ˈpres.ɪ.dəns/ (n.)", translation: "優先權、順位", example: "Safety should take precedence over speed.", optionA: "先例、判例", optionB: "結果、後果", optionC: "優先權、順位", optionD: "程序、步驟", answer: "C" }
  ],
  "Flaunt 的相似詞": [
    { word: "Flaunt", phonetic: "/flɔːnt/ (v.)", translation: "炫耀、誇示", example: "He likes to flaunt his expensive watch.", optionA: "違反、不理會", optionB: "隱藏、遮掩", optionC: "批評、責備", optionD: "炫耀、誇示", answer: "D" },
    { word: "Flout", phonetic: "/flaʊt/ (v.)", translation: "公然違反、不理會", example: "The company was fined for flouting safety rules.", optionA: "公然違反、不理會", optionB: "炫耀、誇示", optionC: "遵守、服從", optionD: "嘲笑、取笑", answer: "A" },
    { word: "Discreet", phonetic: "/dɪˈskriːt/ (adj.)", translation: "謹慎低調的、言行慎重的", example: "Please be discreet about the private meeting.", optionA: "分開的、不連續的", optionB: "謹慎低調的、言行慎重的", optionC: "明顯的、突出的", optionD: "有趣的、娛樂性的", answer: "B" },
    { word: "Discrete", phonetic: "/dɪˈskriːt/ (adj.)", translation: "分開的、不連續的", example: "The course is divided into five discrete sections.", optionA: "謹慎低調的、言行慎重的", optionB: "連續不斷的", optionC: "分開的、不連續的", optionD: "保密的、不公開的", answer: "C" },
    { word: "Persecute", phonetic: "/ˈpɜːr.sɪ.kjuːt/ (v.)", translation: "迫害、欺凌", example: "The group was persecuted for its beliefs.", optionA: "起訴、檢控", optionB: "保護、維護", optionC: "追求、追趕", optionD: "迫害、欺凌", answer: "D" },
    { word: "Prosecute", phonetic: "/ˈprɑː.sɪ.kjuːt/ (v.)", translation: "起訴、檢控", example: "Authorities decided to prosecute the suspect.", optionA: "起訴、檢控", optionB: "迫害、欺凌", optionC: "辯護、代表", optionD: "調查、詢問", answer: "A" }
  ],
  "Hoard 的相似詞": [
    { word: "Hoard", phonetic: "/hɔːrd/ (n./v.)", translation: "囤積；儲藏物", example: "Squirrels hoard nuts for the winter.", optionA: "一大群、群眾", optionB: "囤積；儲藏物", optionC: "分配、分享", optionD: "浪費、耗盡", answer: "B" },
    { word: "Horde", phonetic: "/hɔːrd/ (n.)", translation: "一大群、群眾", example: "A horde of fans waited outside the theater.", optionA: "囤積；儲藏物", optionB: "小組、團隊", optionC: "一大群、群眾", optionD: "珍藏、寶物", answer: "C" },
    { word: "Respectable", phonetic: "/rɪˈspek.tə.bəl/ (adj.)", translation: "體面的、值得尊敬的", example: "They live in a respectable neighborhood.", optionA: "尊重他人的、有禮貌的", optionB: "可疑的、不光彩的", optionC: "受歡迎的、知名的", optionD: "體面的、值得尊敬的", answer: "D" },
    { word: "Respectful", phonetic: "/rɪˈspek.tfəl/ (adj.)", translation: "尊重他人的、有禮貌的", example: "The students were respectful toward their teacher.", optionA: "尊重他人的、有禮貌的", optionB: "體面的、值得尊敬的", optionC: "粗魯無禮的", optionD: "謙虛安靜的", answer: "A" },
    { word: "Credible", phonetic: "/ˈkred.ə.bəl/ (adj.)", translation: "可信的、可靠的", example: "The witness gave a credible account of events.", optionA: "輕信的、易受騙的", optionB: "可信的、可靠的", optionC: "有名的、傑出的", optionD: "創造性的、有想像力的", answer: "B" },
    { word: "Credulous", phonetic: "/ˈkredʒ.ə.ləs/ (adj.)", translation: "輕信的、易受騙的", example: "Credulous readers may believe the false story.", optionA: "可信的、可靠的", optionB: "懷疑的、不相信的", optionC: "輕信的、易受騙的", optionD: "謹慎的、深思熟慮的", answer: "C" }
  ],
  "Peruse 的相似詞": [
    { word: "Peruse", phonetic: "/pəˈruːz/ (v.)", translation: "仔細閱讀、詳閱", example: "Please peruse the contract before signing.", optionA: "追趕、追求", optionB: "略讀、快速瀏覽", optionC: "撰寫、編輯", optionD: "仔細閱讀、詳閱", answer: "D" },
    { word: "Pursue", phonetic: "/pərˈsuː/ (v.)", translation: "追求、追趕；從事", example: "She plans to pursue a career in medicine.", optionA: "追求、追趕；從事", optionB: "仔細閱讀、詳閱", optionC: "放棄、停止", optionD: "避免、逃離", answer: "A" },
    { word: "Explicit", phonetic: "/ɪkˈsplɪs.ɪt/ (adj.)", translation: "明確的、清楚表達的", example: "The instructions were explicit and easy to follow.", optionA: "含蓄的、未明說的", optionB: "明確的、清楚表達的", optionC: "複雜的、難懂的", optionD: "錯誤的、不正確的", answer: "B" },
    { word: "Implicit", phonetic: "/ɪmˈplɪs.ɪt/ (adj.)", translation: "含蓄的、未明說的", example: "There was an implicit promise in his words.", optionA: "明確的、清楚表達的", optionB: "公開的、眾所周知的", optionC: "含蓄的、未明說的", optionD: "直接的、不拐彎抹角的", answer: "C" },
    { word: "Amiable", phonetic: "/ˈeɪ.mi.ə.bəl/ (adj.)", translation: "和藹可親的、友善的", example: "Our host was an amiable and welcoming person.", optionA: "有益的、有幫助的", optionB: "好鬥的、敵對的", optionC: "相似的、友好的", optionD: "和藹可親的、友善的", answer: "D" },
    { word: "Amicable", phonetic: "/ˈæm.ɪ.kə.bəl/ (adj.)", translation: "友好和睦的（關係或協議）", example: "They reached an amicable agreement.", optionA: "友好和睦的（關係或協議）", optionB: "和藹可親的（形容人）", optionC: "正式合法的", optionD: "激烈爭執的", answer: "A" }
  ],
  "Aural 的相似詞": [
    { word: "Aural", phonetic: "/ˈɔːr.əl/ (adj.)", translation: "聽覺的、耳朵的", example: "The exam includes an aural comprehension section.", optionA: "口頭的、口說的", optionB: "聽覺的、耳朵的", optionC: "視覺的、眼睛的", optionD: "書面的、文字的", answer: "B" },
    { word: "Oral", phonetic: "/ˈɔːr.əl/ (adj.)", translation: "口頭的、口說的", example: "Students will take an oral examination.", optionA: "聽覺的、耳朵的", optionB: "書寫的、筆試的", optionC: "口頭的、口說的", optionD: "安靜的、無聲的", answer: "C" },
    { word: "Industrial", phonetic: "/ɪnˈdʌs.tri.əl/ (adj.)", translation: "工業的、產業的", example: "The region has a long industrial history.", optionA: "勤奮的、勤勞的", optionB: "農業的、鄉村的", optionC: "商業的、貿易的", optionD: "工業的、產業的", answer: "D" },
    { word: "Industrious", phonetic: "/ɪnˈdʌs.tri.əs/ (adj.)", translation: "勤奮的、勤勞的", example: "She is an industrious worker who rarely takes breaks.", optionA: "勤奮的、勤勞的", optionB: "工業的、產業的", optionC: "懶散的、不勤奮的", optionD: "熟練的、有經驗的", answer: "A" },
    { word: "Human", phonetic: "/ˈhjuː.mən/ (adj./n.)", translation: "人類的；人", example: "Human beings need clean water to survive.", optionA: "仁慈的、人道的", optionB: "人類的；人", optionC: "人文學科", optionD: "非人類的、機器的", answer: "B" },
    { word: "Humane", phonetic: "/hjuːˈmeɪn/ (adj.)", translation: "仁慈的、人道的", example: "The shelter provides humane care for animals.", optionA: "人類的；人", optionB: "殘酷的、不人道的", optionC: "仁慈的、人道的", optionD: "自然的、天生的", answer: "C" }
  ],
  "Forth 的相似詞": [
    { word: "Forth", phonetic: "/fɔːrθ/ (adv.)", translation: "向前；往外", example: "The soldiers marched forth at sunrise.", optionA: "第四（序數）", optionB: "來回、往返", optionC: "後退、向後", optionD: "向前；往外", answer: "D" },
    { word: "Fourth", phonetic: "/fɔːrθ/ (adj./n.)", translation: "第四（序數）", example: "Her birthday is on the fourth of May.", optionA: "第四（序數）", optionB: "向前；往外", optionC: "第五（序數）", optionD: "四分之一", answer: "A" },
    { word: "Waive", phonetic: "/weɪv/ (v.)", translation: "放棄（權利、要求）；免除", example: "The bank agreed to waive the fee.", optionA: "揮手；波浪", optionB: "放棄（權利、要求）；免除", optionC: "要求、堅持", optionD: "延後、延期", answer: "B" },
    { word: "Wave", phonetic: "/weɪv/ (n./v.)", translation: "揮手；波浪", example: "She waved goodbye as the train left.", optionA: "放棄（權利、要求）；免除", optionB: "海岸、海灣", optionC: "揮手；波浪", optionD: "握手、擁抱", answer: "C" },
    { word: "Weather", phonetic: "/ˈweð.ər/ (n./v.)", translation: "天氣；經受住", example: "The old house weathered the storm.", optionA: "是否、無論", optionB: "季節、氣候帶", optionC: "氣象預報", optionD: "天氣；經受住", answer: "D" },
    { word: "Whether", phonetic: "/ˈweð.ər/ (conj.)", translation: "是否、無論", example: "I don't know whether she will attend.", optionA: "是否、無論", optionB: "天氣；經受住", optionC: "因為、所以", optionD: "不管怎樣", answer: "A" }
  ],
  "Palate 的相似詞": [
    { word: "Palate", phonetic: "/ˈpæl.ət/ (n.)", translation: "上顎；味覺", example: "The chef created a dish to please every palate.", optionA: "木棧板；貨盤", optionB: "上顎；味覺", optionC: "調色盤", optionD: "味道、香氣", answer: "B" },
    { word: "Palette", phonetic: "/ˈpæl.ət/ (n.)", translation: "調色盤；色彩組合", example: "The painter chose a bright color palette.", optionA: "上顎；味覺", optionB: "畫布、帆布", optionC: "調色盤；色彩組合", optionD: "畫筆、顏料", answer: "C" },
    { word: "Regimen", phonetic: "/ˈredʒ.ə.mən/ (n.)", translation: "養生法；訓練計畫", example: "He follows a strict exercise regimen.", optionA: "養生法；訓練計畫", optionB: "政權、政府制度", optionC: "地區、範圍", optionD: "規則、法律", answer: "A" },
    { word: "Regime", phonetic: "/reɪˈʒiːm/ (n.)", translation: "政權、政府制度", example: "The regime introduced several new policies.", optionA: "養生法；訓練計畫", optionB: "政權、政府制度", optionC: "日常作息、習慣", optionD: "法令、規章", answer: "B" },
    { word: "Tortuous", phonetic: "/ˈtɔːr.tʃu.əs/ (adj.)", translation: "曲折的、迂迴的", example: "The hikers followed a tortuous mountain path.", optionA: "折磨人的、痛苦的", optionB: "筆直的、直接的", optionC: "曲折的、迂迴的", optionD: "狹窄的、擁擠的", answer: "C" },
    { word: "Torturous", phonetic: "/ˈtɔːr.tʃər.əs/ (adj.)", translation: "折磨人的、痛苦的", example: "Waiting for the test results felt torturous.", optionA: "折磨人的、痛苦的", optionB: "曲折的、迂迴的", optionC: "令人愉快的、舒適的", optionD: "直接明瞭的、簡單的", answer: "A" }
  ]
};

function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const selectedUnits = shuffle(Object.keys(database)).slice(0, 3);

// 全域狀態變數宣告
let currentUnit = selectedUnits[0];       // 每次進入隨機抽出的第一個單元
let currentMode = "cards";              // 當前模式：'cards' (單字卡) 或 'quiz' (測驗)
let cardsState = [];                    // 儲存單字卡狀態陣列（包含動畫進度與翻面狀態）
let actionButton = null;
let resultButton = null;
let canvasResizeObserver = null;
let canvasContainer = null;

// 測驗相關變數
let quizIndex = 0;                      // 當前測驗題目的索引
let quizScore = 0;                      // 測驗累積得分
let selectedOption = null;              // 使用者當前點選的選項 ('A', 'B', 'C', 'D')
let isAnswerSubmitted = false;          // 是否已送出並顯示該題解答
let quizFinished = false;               // 是否已完成該單元所有測驗題目
let quizItems = [];
const lastQuizOrderByUnit = {};

// p5.js 預載入函數
function preload() {
  // 此處可預載字型或圖片，目前架構使用系統內建網頁字型
}

// p5.js 初始化設定函數
function setup() {
  canvasContainer = document.getElementById("canvas-container");
  const canvasWidth = Math.min(850, canvasContainer.clientWidth || 850);
  let canvas = createCanvas(canvasWidth, getCanvasHeight(canvasWidth));
  canvas.parent(canvasContainer);
  canvas.style("width", "100%");
  canvas.style("height", "auto");
  canvas.style("touch-action", "pan-y");
  pixelDensity(1);
  canvasResizeObserver = new ResizeObserver(resizeCanvasForViewport);
  canvasResizeObserver.observe(canvasContainer);
  
  initCardsState();                     // 初始化當前單元的單字卡狀態
  setupDOMListeners();                  // 綁定 HTML 按鈕的互動事件監聽器
}

function getCanvasHeight(canvasWidth) {
  if (canvasWidth >= 600) return 550;
  return currentMode === "cards" ? 600 : 700;
}

function resizeCanvasForViewport() {
  if (!canvasContainer || !canvasContainer.clientWidth) return;
  const canvasWidth = Math.min(850, canvasContainer.clientWidth);
  const canvasHeight = getCanvasHeight(canvasWidth);
  if (width !== canvasWidth || height !== canvasHeight) {
    resizeCanvas(canvasWidth, canvasHeight);
  }
}

function windowResized() {
  resizeCanvasForViewport();
}

// p5.js 主繪製迴圈函數
function draw() {
  resizeCanvasForViewport();
  background(244, 241, 234);             // 繪製莫蘭迪米色背景
  
  // 根據當前模式切換繪製介面
  if (currentMode === "cards") {
    drawCardsMode();                    // 繪製單字卡格狀介面與動畫
  } else if (currentMode === "quiz") {
    drawQuizMode();                     // 繪製測驗模式介面與即時回饋
  }
}

// 初始化或重置當前單元的單字卡狀態
function initCardsState() {
  let items = database[currentUnit];    // 取得當前單元的單字資料陣列
  cardsState = [];                      // 清空舊的卡片狀態
  for (let i = 0; i < items.length; i++) {
    cardsState.push({
      isFlipped: false,                 // 記錄卡片是否已翻面 (false: 英文正面, true: 中文背面)
      flipProgress: 0                   // 記錄翻牌動畫進度 (0.0 到 1.0 之間漸變)
    });
  }
}

// 重置隨堂測驗狀態
function resetQuiz() {
  quizItems = shuffle(database[currentUnit]);
  const previousOrder = lastQuizOrderByUnit[currentUnit];
  if (previousOrder && quizItems.every((item, index) => item.word === previousOrder[index])) {
    quizItems.push(quizItems.shift());
  }
  lastQuizOrderByUnit[currentUnit] = quizItems.map(item => item.word);
  quizIndex = 0;                        // 重置題號至第一題
  quizScore = 0;                        // 分數歸零
  selectedOption = null;                // 清空選項選擇
  isAnswerSubmitted = false;            // 重置提交狀態
  quizFinished = false;                 // 重置完成狀態
}

function wrapTextByWidth(value, maxWidth) {
  const lines = [];
  let line = "";
  for (const character of value) {
    if (line && textWidth(line + character) > maxWidth) {
      lines.push(line);
      line = character;
    } else {
      line += character;
    }
  }
  if (line) lines.push(line);
  return lines.join("\n");
}

function getCardLayout(index) {
  const isMobile = width < 600;
  const cols = isMobile ? 2 : 3;
  const startX = isMobile ? 16 : 40;
  const startY = isMobile ? 84 : 80;
  const gapX = isMobile ? 12 : 20;
  const gapY = isMobile ? 14 : 25;
  const cardHeight = isMobile ? 150 : 180;
  const cardWidth = isMobile ? (width - startX * 2 - gapX) / 2 : 250;
  const col = index % cols;
  const row = Math.floor(index / cols);
  return {
    x: startX + col * (cardWidth + gapX),
    y: startY + row * (cardHeight + gapY),
    w: cardWidth,
    h: cardHeight
  };
}

function getSpeechButtonBounds(card) {
  const buttonWidth = Math.min(86, card.w - 20);
  const buttonHeight = 32;
  return {
    x: card.x + (card.w - buttonWidth) / 2,
    y: card.y + card.h - buttonHeight - 8,
    w: buttonWidth,
    h: buttonHeight
  };
}

function speakWord(word) {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    alert("此瀏覽器不支援語音播放，請改用其他瀏覽器。");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

// ----------------------------------------------------
// A. 繪製單字卡模式 (Grid Layout + Flip Animation)
// ----------------------------------------------------
function drawCardsMode() {
  const isMobile = width < 600;

  // 1. 繪製頂部狀態與進度列
  fill(74, 74, 74);
  textAlign(LEFT, TOP);
  textSize(isMobile ? 15 : 18);
  text(`📚 ${currentUnit} - 單字卡瀏覽`, isMobile ? 16 : 30, isMobile ? 16 : 25, width - (isMobile ? 32 : 60), 26);
  
  // 計算已翻閱的卡片數量
  let flippedCount = cardsState.filter(c => c.isFlipped).length;
  textAlign(isMobile ? LEFT : RIGHT, TOP);
  textSize(14);
  fill(138, 154, 134);
  text(`已看 ${flippedCount} / ${cardsState.length} 張`, isMobile ? 16 : width - 30, isMobile ? 47 : 28);
  
  let items = database[currentUnit];    // 取得當前單元資料
  
  for (let i = 0; i < items.length; i++) {
    const card = getCardLayout(i);
    const { x, y, w: cardWidth, h: cardHeight } = card;
    
    // 更新翻牌動畫漸變數值
    let targetProgress = cardsState[i].isFlipped ? 1.0 : 0.0;
    cardsState[i].flipProgress = lerp(cardsState[i].flipProgress, targetProgress, 0.2);
    
    // 繪製單張卡片外框與陰影
    push();
    translate(x + cardWidth / 2, y + cardHeight / 2); // 移動原點至卡片中心以便做 3D 縮放模擬
    
    // 模擬翻轉時的寬度縮放 (ScaleX)
    let scaleX = cos(cardsState[i].flipProgress * PI);
    scaleX = abs(scaleX) < 0.05 ? 0.05 : scaleX; // 避免為 0 造成渲染異常
    scale(scaleX, 1);
    
    // 卡片背景底色隨翻面狀態轉變（正面莫蘭迪綠灰，背面柔和米粉色）
    if (cardsState[i].flipProgress < 0.5) {
      fill(227, 237, 232); // 正面底色：柔和灰綠
      stroke(209, 218, 212);
    } else {
      fill(245, 232, 232); // 背面底色：溫柔莫蘭迪粉
      stroke(222, 209, 209);
    }
    strokeWeight(1.5);
    rectMode(CENTER);
    rect(0, 0, cardWidth, cardHeight, 12); // 圓角矩形卡片
    rectMode(CORNER);
    
    // 繪製卡片內部文字內容
    noStroke();
    fill(74, 74, 74);
    textAlign(CENTER, CENTER);
    
    if (cardsState[i].flipProgress < 0.5) {
      // 顯示正面：英文單字與音標
      textSize(isMobile ? 18 : 24);
      textStyle(BOLD);
      text(items[i].word, -cardWidth / 2 + 8, -47, cardWidth - 16, 44);
      
      textSize(14);
      textStyle(NORMAL);
      fill(110, 110, 110);
      text(items[i].phonetic, -cardWidth / 2 + 8, 0, cardWidth - 16, 30);
      const speechButton = getSpeechButtonBounds(card);
      fill(248, 246, 242);
      stroke(209, 218, 212);
      strokeWeight(1);
      rect(
        speechButton.x - (x + cardWidth / 2),
        speechButton.y - (y + cardHeight / 2),
        speechButton.w,
        speechButton.h,
        8
      );
      noStroke();
      fill(74, 74, 74);
      textSize(isMobile ? 12 : 14);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text(
        "🔊 播放發音",
        speechButton.x - (x + cardWidth / 2),
        speechButton.y - (y + cardHeight / 2),
        speechButton.w,
        speechButton.h
      );
    } else {
      // 顯示背面：中文翻譯與例句
      scale(-1, 1); // 將背面文字轉回來，避免鏡像顛倒
      const translationSize = isMobile ? (items[i].translation.length > 9 ? 12 : 14) : 20;
      const translationWidth = cardWidth - 24;
      textSize(translationSize);
      textStyle(BOLD);
      fill(90, 75, 75);
      text(
        wrapTextByWidth(items[i].translation, translationWidth),
        -cardWidth / 2 + 12,
        isMobile ? -51 : -54,
        translationWidth,
        isMobile ? 44 : 38
      );
      
      textSize(isMobile ? 10 : 12);
      textStyle(ITALIC);
      fill(100, 90, 90);
      text(
        `"${items[i].example}"`,
        -cardWidth / 2 + 12,
        isMobile ? 8 : -18,
        cardWidth - 24,
        isMobile ? 56 : 50
      );
      
      textSize(isMobile ? 10 : 11);
      textStyle(NORMAL);
      fill(160, 140, 140);
      text("（輕觸卡片返回正面）", -cardWidth / 2 + 6, 56, cardWidth - 12, 20);
    }
    
    pop();
  }
}

// ----------------------------------------------------
// B. 繪製隨堂測驗模式 (Dynamic Quiz & Immediate Feedback)
// ----------------------------------------------------
let optionButtons = [];                 // 儲存選項按鈕的點擊熱區範圍

function drawQuizMode() {
  const items = quizItems;
  const isMobile = width < 600;
  const panelX = isMobile ? 12 : 50;
  const panelY = isMobile ? 82 : 75;
  const panelWidth = width - panelX * 2;
  const panelHeight = isMobile ? height - 98 : 430;

  fill(74, 74, 74);
  textAlign(LEFT, TOP);
  if (isMobile) {
    textSize(15);
    text(`📝 ${currentUnit}`, 16, 14, width - 32, 24);
    textAlign(RIGHT, TOP);
    textSize(14);
    fill(138, 154, 134);
    text(`得分 ${quizScore}`, width - 16, 48);
  } else {
    textSize(18);
    text(`📝 ${currentUnit} - 相似詞測驗`, 30, 25);
    textAlign(RIGHT, TOP);
    textSize(16);
    fill(138, 154, 134);
    text(`目前得分: ${quizScore} 分`, width - 30, 25);
  }

  if (quizFinished) {
    drawQuizResultScreen(items.length);
    return;
  }

  const currentItem = items[quizIndex];
  fill(255, 255, 255);
  stroke(213, 204, 210);
  strokeWeight(1);
  rectMode(CORNER);
  rect(panelX, panelY, panelWidth, panelHeight, 12);

  noStroke();
  fill(110, 120, 105);
  textSize(isMobile ? 13 : 14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(`第 ${quizIndex + 1} 題 / 共 ${items.length} 題`, isMobile ? 28 : 80, isMobile ? 101 : 110);

  fill(74, 74, 74);
  textSize(isMobile ? 18 : 22);
  const promptX = isMobile ? 28 : 80;
  const promptY = isMobile ? 130 : 140;
  const promptWidth = width - promptX * 2;
  text(`請問英文單字 "${currentItem.word}" (${currentItem.phonetic}) 的中文意思為何？`, promptX, promptY, promptWidth, isMobile ? 76 : 60);

  const options = [
    { key: "A", text: currentItem.optionA },
    { key: "B", text: currentItem.optionB },
    { key: "C", text: currentItem.optionC },
    { key: "D", text: currentItem.optionD }
  ];

  optionButtons = [];
  const startYPos = isMobile ? 220 : 205;
  const optHeight = isMobile ? 58 : 48;
  const optGap = isMobile ? 10 : 8;

  for (let i = 0; i < options.length; i++) {
    const optY = startYPos + i * (optHeight + optGap);
    const optX = isMobile ? 24 : 80;
    const optWidth = width - optX * 2;
    optionButtons.push({ key: options[i].key, x: optX, y: optY, w: optWidth, h: optHeight });

    let btnFill = color(248, 246, 242);
    let borderCol = color(215, 210, 200);
    if (isAnswerSubmitted) {
      if (options[i].key === currentItem.answer) {
        btnFill = color(220, 238, 225);
        borderCol = color(143, 188, 155);
      } else if (options[i].key === selectedOption) {
        btnFill = color(245, 220, 220);
        borderCol = color(214, 150, 150);
      }
    } else if (selectedOption === options[i].key) {
      btnFill = color(230, 235, 230);
    }

    fill(btnFill);
    stroke(borderCol);
    strokeWeight(1.5);
    rect(optX, optY, optWidth, optHeight, 8);
    noStroke();
    fill(74, 74, 74);
    textSize(isMobile ? 14 : 16);
    textStyle(NORMAL);
    textAlign(LEFT, BASELINE);
    const optionBaseline = optY + optHeight / 2 + (textAscent() - textDescent()) / 2;
    text(`${options[i].key}. ${options[i].text}`, optX + (isMobile ? 12 : 20), optionBaseline);
  }

  const actionX = isMobile ? width / 2 - 85 : width - 230;
  const actionY = isMobile ? 620 : 445;
  const actionW = isMobile ? 170 : 150;
  const actionH = isMobile ? 46 : 42;
  actionButton = { x: actionX, y: actionY, w: actionW, h: actionH };

  if (!isAnswerSubmitted) {
    fill(138, 154, 134);
    noStroke();
    rect(actionX, actionY, actionW, actionH, 8);
    fill(255);
    textSize(15);
    textAlign(CENTER, BASELINE);
    const actionBaseline = actionY + actionH / 2 + (textAscent() - textDescent()) / 2;
    text("請先選擇答案", actionX + actionW / 2, actionBaseline);
  } else {
    textAlign(isMobile ? CENTER : LEFT, BASELINE);
    textSize(isMobile ? 14 : 16);
    const feedbackY = isMobile ? 505 : 466;
    const feedbackBaseline = feedbackY + (textAscent() - textDescent()) / 2;
    const feedbackText = selectedOption === currentItem.answer
      ? "✔ 答對了！太棒了！"
      : `✖ 答錯囉！正確答案是：${currentItem.answer}`;
    fill(selectedOption === currentItem.answer ? color(75, 135, 90) : color(175, 80, 80));
    if (isMobile) {
      text(feedbackText, width / 2, feedbackBaseline);
    } else {
      text(feedbackText, 100, feedbackBaseline);
    }

    fill(92, 107, 83);
    noStroke();
    rect(actionX, actionY, actionW, actionH, 8);
    fill(255);
    textSize(15);
    textAlign(CENTER, BASELINE);
    const btnLabel = quizIndex < items.length - 1 ? "下一題 ➔" : "查看結算 ➔";
    const nextBaseline = actionY + actionH / 2 + (textAscent() - textDescent()) / 2;
    text(btnLabel, actionX + actionW / 2, nextBaseline);
  }
}

// 6. 繪製測驗結算畫面
function drawQuizResultScreen(totalQuestions) {
  const isMobile = width < 600;
  const panelWidth = Math.min(isMobile ? 340 : 440, width - 32);
  const panelHeight = isMobile ? 300 : 320;
  const panelX = (width - panelWidth) / 2;
  const panelY = (height - panelHeight) / 2;
  noStroke();
  fill(40, 40, 40, 105);
  rect(0, 0, width, height);
  fill(255, 255, 255);
  stroke(213, 204, 210);
  strokeWeight(1);
  rectMode(CORNER);
  rect(panelX, panelY, panelWidth, panelHeight, 16);
  
  noStroke();
  fill(92, 107, 83);
  textSize(isMobile ? 21 : 26);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("🎉 測驗完成", panelX + 12, panelY + 32, panelWidth - 24);
  
  let percentage = Math.round((quizScore / totalQuestions) * 100);
  
  textSize(isMobile ? 16 : 20);
  textAlign(CENTER, TOP);
  textStyle(NORMAL);
  fill(74, 74, 74);
  text(`最終得分：${quizScore} / ${totalQuestions} 題（${percentage} 分）`, panelX + 12, panelY + 92, panelWidth - 24);
  
  // 根據得分給予評語
  textSize(isMobile ? 14 : 16);
  fill(120, 110, 100);
  let feedback = "";
  if (percentage === 100) {
    feedback = "太強了！你對這個單元的單字瞭若指掌！";
  } else if (percentage >= 70) {
    feedback = "表現非常優秀！基礎相當扎實！";
  } else {
    feedback = "建議再多複習幾次單字卡，加油！";
  }
  textAlign(CENTER, TOP);
  const lastItem = quizItems[quizItems.length - 1];
  const lastAnswerFeedback = selectedOption === lastItem.answer
    ? "最後一題答對了！"
    : `最後一題答錯，正確答案是 ${lastItem.answer}`;
  textSize(isMobile ? 14 : 16);
  fill(selectedOption === lastItem.answer ? color(75, 135, 90) : color(175, 80, 80));
  text(lastAnswerFeedback, panelX + 18, panelY + 138, panelWidth - 36, 28);
  textSize(isMobile ? 13 : 15);
  fill(120, 110, 100);
  text(feedback, panelX + 18, panelY + 174, panelWidth - 36, 48);
  
  // 繪製「重新測驗」互動按鈕熱區
  fill(138, 154, 134);
  noStroke();
  const buttonWidth = Math.min(isMobile ? 180 : 200, panelWidth - 40);
  const buttonY = panelY + panelHeight - 68;
  resultButton = { x: width / 2 - buttonWidth / 2, y: buttonY, w: buttonWidth, h: 44 };
  rect(resultButton.x, resultButton.y, resultButton.w, resultButton.h, 8);
  
  fill(255);
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, BASELINE);
  text("🔄 再測驗一次", width / 2, buttonY + 22 + (textAscent() - textDescent()) / 2);
}

// ----------------------------------------------------
// C. 滑鼠互動事件處理 (p5.js mousePressed)
// ----------------------------------------------------
function getCardIndexAt(x, y) {
  for (let i = 0; i < cardsState.length; i++) {
    const card = getCardLayout(i);
    if (x >= card.x && x <= card.x + card.w && y >= card.y && y <= card.y + card.h) {
      return i;
    }
  }
  return -1;
}

function mousePressed() {
  // 確保滑鼠點擊位置在畫布內部
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  
  if (currentMode === "cards") {
    const cardIndex = getCardIndexAt(mouseX, mouseY);
    if (cardIndex !== -1) {
      const card = getCardLayout(cardIndex);
      const speechButton = getSpeechButtonBounds(card);
      if (
        !cardsState[cardIndex].isFlipped &&
        mouseX >= speechButton.x &&
        mouseX <= speechButton.x + speechButton.w &&
        mouseY >= speechButton.y &&
        mouseY <= speechButton.y + speechButton.h
      ) {
        speakWord(database[currentUnit][cardIndex].word);
        return false;
      }
      cardsState[cardIndex].isFlipped = !cardsState[cardIndex].isFlipped;
    }
    return false;
  } else if (currentMode === "quiz") {
    let items = quizItems;
    
    if (quizFinished) {
      if (resultButton && mouseX >= resultButton.x && mouseX <= resultButton.x + resultButton.w && mouseY >= resultButton.y && mouseY <= resultButton.y + resultButton.h) {
        resetQuiz();
      }
      return;
    }
    
    // 選擇答案後立即判定並顯示回饋
    for (let i = 0; i < optionButtons.length; i++) {
      let b = optionButtons[i];
      if (!isAnswerSubmitted && mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
        selectedOption = b.key; // 紀錄使用者點選的選項
        isAnswerSubmitted = true;
        if (selectedOption === items[quizIndex].answer) {
          quizScore += 1;
        }
        if (quizIndex === items.length - 1) {
          quizFinished = true;
        }
        break;
      }
    }
    
    // 點擊底部操作按鈕範圍檢查
    if (actionButton && mouseX >= actionButton.x && mouseX <= actionButton.x + actionButton.w && mouseY >= actionButton.y && mouseY <= actionButton.y + actionButton.h) {
      if (isAnswerSubmitted && quizIndex < items.length - 1) {
        quizIndex++;
        selectedOption = null;
        isAnswerSubmitted = false;
      }
    }
  }
}

// ----------------------------------------------------
// D. HTML DOM 控制項事件綁定
// ----------------------------------------------------
function setupDOMListeners() {
  const unitGroup = document.getElementById("unit-group");
  unitGroup.replaceChildren();
  selectedUnits.forEach((unit, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === 0 ? "unit-btn active" : "unit-btn";
    button.dataset.unit = unit;
    button.textContent = unit;
    unitGroup.appendChild(button);
  });

  // 綁定單元切換按鈕事件
  const unitButtons = unitGroup.querySelectorAll(".unit-btn");
  unitButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      unitButtons.forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentUnit = e.currentTarget.getAttribute("data-unit");
      initCardsState();  // 重置單字卡狀態
      resetQuiz();       // 重置測驗狀態
    });
  });

  // 綁定模式切換按鈕事件
  const modeButtons = document.querySelectorAll(".mode-btn");
  modeButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      modeButtons.forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentMode = e.currentTarget.getAttribute("data-mode");
      resetQuiz();       // 切換模式時同步重置測驗狀態
      resizeCanvasForViewport();
    });
  });
}