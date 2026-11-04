// ==========================================
// 單元式互動英文單字卡與測驗 - 主程式 (sketch.js)
// ==========================================

// 模擬從 Google Sheet 載入的題庫與單字資料庫
const database = {
  "Unit 1": [
    { word: "Resilience", phonetic: "/rɪˈzɪl.jəns/ (n.)", translation: "韌性、恢復力", example: "She showed great resilience in overcoming challenges.", optionA: "韌性、恢復力", optionB: "脆弱、易碎", optionC: "怠惰、懶散", optionD: "焦慮、不安", answer: "A" },
    { word: "Pragmatic", phonetic: "/præɡˈmæt.ɪk/ (adj.)", translation: "務實的、實用主義的", example: "We need a pragmatic approach to solve this problem.", optionA: "理想主義的", optionB: "務實的、實用主義的", optionC: "浪漫的", optionD: "悲觀的", answer: "B" },
    { word: "Ambiguous", phonetic: "/æmˈbɪɡ.ju.əs/ (adj.)", translation: "模稜兩可的、不明確的", example: "His reply was somewhat ambiguous.", optionA: "非常明確的", optionB: "絕對正確的", optionC: "模稜兩可的、不明確的", optionD: "公開透明的", answer: "C" },
    { word: "Meticulous", phonetic: "/məˈtɪk.jə.ləs/ (adj.)", translation: "一絲不苟的、極度仔細的", example: "The artist paid meticulous attention to detail.", optionA: "粗心大意的", optionB: "隨性自由的", optionC: "速度極快的", optionD: "一絲不苟的、極度仔細的", answer: "D" }
  ],
  "Unit 2": [
    { word: "Innovative", phonetic: "/ˈɪn.ə.və.tɪv/ (adj.)", translation: "創新的、革新的", example: "The company is known for its innovative products.", optionA: "傳統保守的", optionB: "創新的、革新的", optionC: "過時過氣的", optionD: "大量生產的", answer: "B" },
    { word: "Benevolent", phonetic: "/bəˈnev.əl.ənt/ (adj.)", translation: "仁慈的、慈善的", example: "She was a benevolent woman who helped many people.", optionA: "嚴厲苛刻的", optionB: "自私自利的", optionC: "仁慈的、慈善的", optionD: "冷酷無情的", answer: "C" },
    { word: "Candid", phonetic: "/ˈkæn.dɪd/ (adj.)", translation: "坦率的、真誠的", example: "To be candid, I didn't like the movie.", optionA: "虛偽狡詐的", optionB: "吞吞吐吐的", optionC: "保守秘密的", optionD: "坦率的、真誠的", answer: "D" },
    { word: "Diligent", phonetic: "/ˈdɪl.ə.dʒənt/ (adj.)", translation: "勤奮的、用功的", example: "He is a diligent student who always does his homework.", optionA: "勤奮的、用功的", optionB: "懶惰懈怠的", optionC: "聰明絕頂的", optionD: "粗心大意的", answer: "A" }
  ],
  "Unit 3": [
    { word: "Ephemeral", phonetic: "/ɪˈfem.ər.əl/ (adj.)", translation: "短暫的、朝生暮死的", example: "Fame in the digital age can be ephemeral.", optionA: "永恆不朽的", optionB: "緩慢長久的", optionC: "短暫的、朝生暮死的", optionD: "堅固耐用的", answer: "C" },
    { word: "Eloquent", phonetic: "/ˈel.ə.kwənt/ (adj.)", translation: "雄辯的、表達流暢的", example: "She gave an eloquent speech at the conference.", optionA: "啞口無言的", optionB: "雄辯的、表達流暢的", optionC: "結結巴巴的", optionD: "平淡無奇的", optionB: "雄辯的、表達流暢的", answer: "B" },
    { word: "Versatile", phonetic: "/ˈvɜːr.sə.təl/ (adj.)", translation: "多才多藝的、多用途的", example: "A smartphone is a versatile tool.", optionA: "功能單一的", optionB: "昂貴奢華的", optionC: "笨重難用的", optionD: "多才多藝的、多用途的", answer: "D" },
    { word: "Skeptical", phonetic: "/ˈskep.tɪ.kəl/ (adj.)", translation: "懷疑的、抱持保留態度的", example: "Many experts remain skeptical about the new treatment.", optionA: "深信不疑的", optionB: "完全盲從的", optionC: "懷疑的、抱持保留態度的", optionD: "興奮期待的", answer: "C" }
  ]
};

// 全域狀態變數宣告
let currentUnit = "Unit 1";              // 當前選中的單元名稱
let currentMode = "cards";              // 當前模式：'cards' (單字卡) 或 'quiz' (測驗)
let cardsState = [];                    // 儲存單字卡狀態陣列（包含動畫進度與翻面狀態）

// 測驗相關變數
let quizIndex = 0;                      // 當前測驗題目的索引
let quizScore = 0;                      // 測驗累積得分
let selectedOption = null;              // 使用者當前點選的選項 ('A', 'B', 'C', 'D')
let isAnswerSubmitted = false;          // 是否已送出並顯示該題解答
let quizFinished = false;               // 是否已完成該單元所有測驗題目

// p5.js 預載入函數
function preload() {
  // 此處可預載字型或圖片，目前架構使用系統內建網頁字型
}

// p5.js 初始化設定函數
function setup() {
  let canvas = createCanvas(850, 550);  // 建立寬 850px、高 550px 的畫布
  canvas.parent("canvas-container");    // 將畫布安插至指定 HTML DOM 容器中
  canvas.style("width", "100%");
  canvas.style("height", "auto");
  
  initCardsState();                     // 初始化當前單元的單字卡狀態
  setupDOMListeners();                  // 綁定 HTML 按鈕的互動事件監聽器
}

// p5.js 主繪製迴圈函數
function draw() {
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
  quizIndex = 0;                        // 重置題號至第一題
  quizScore = 0;                        // 分數歸零
  selectedOption = null;                // 清空選項選擇
  isAnswerSubmitted = false;            // 重置提交狀態
  quizFinished = false;                 // 重置完成狀態
}

// ----------------------------------------------------
// A. 繪製單字卡模式 (Grid Layout + Flip Animation)
// ----------------------------------------------------
function drawCardsMode() {
  // 1. 繪製頂部狀態與進度列
  fill(74, 74, 74);
  textSize(18);
  textAlign(LEFT, TOP);
  text(`📚 ${currentUnit} - 單字卡瀏覽`, 30, 25);
  
  // 計算已翻閱的卡片數量
  let flippedCount = cardsState.filter(c => c.isFlipped).length;
  textAlign(RIGHT, TOP);
  textSize(14);
  fill(138, 154, 134);
  text(`瀏覽進度: ${flippedCount} / ${cardsState.length} 張`, width - 30, 28);
  
  // 2. 格狀佈局參數設定 (2行 x 2列)
  let cols = 2;
  let cardWidth = 370;
  let cardHeight = 180;
  let startX = 55;
  let startY = 80;
  let gapX = 30;
  let gapY = 25;
  
  let items = database[currentUnit];    // 取得當前單元資料
  
  for (let i = 0; i < items.length; i++) {
    let col = i % cols;                 // 計算當前卡片欄位索引
    let row = Math.floor(i / cols);     // 計算當前卡片行數索引
    let x = startX + col * (cardWidth + gapX);
    let y = startY + row * (cardHeight + gapY);
    
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
    
    // 繪製卡片內部文字內容
    noStroke();
    fill(74, 74, 74);
    textAlign(CENTER, CENTER);
    
    if (cardsState[i].flipProgress < 0.5) {
      // 顯示正面：英文單字與音標
      textSize(24);
      textStyle(BOLD);
      text(items[i].word, 0, -25);
      
      textSize(14);
      textStyle(NORMAL);
      fill(110, 110, 110);
      text(items[i].phonetic, 0, 15);
      
      textSize(11);
      fill(160, 150, 140);
      text("（點擊卡片翻看中文與例句）", 0, 60);
    } else {
      // 顯示背面：中文翻譯與例句
      scale(-1, 1); // 將背面文字轉回來，避免鏡像顛倒
      textSize(20);
      textStyle(BOLD);
      fill(90, 75, 75);
      text(items[i].translation, 0, -35);
      
      textSize(12);
      textStyle(ITALIC);
      fill(100, 90, 90);
      text(`"${items[i].example}"`, 0, 10, cardWidth - 30, 50);
      
      textSize(11);
      textStyle(NORMAL);
      fill(160, 140, 140);
      text("（點擊卡片返回正面）", 0, 65);
    }
    
    pop();
  }
}

// ----------------------------------------------------
// B. 繪製隨堂測驗模式 (Dynamic Quiz & Immediate Feedback)
// ----------------------------------------------------
let optionButtons = [];                 // 儲存選項按鈕的點擊熱區範圍

function drawQuizMode() {
  let items = database[currentUnit];    // 取得當前單元題庫
  
  // 1. 頂部標題與總分顯示
  fill(74, 74, 74);
  textSize(18);
  textAlign(LEFT, TOP);
  text(`📝 ${currentUnit} - 單元隨堂測驗`, 30, 25);
  
  textAlign(RIGHT, TOP);
  textSize(16);
  fill(138, 154, 134);
  text(`目前得分: ${quizScore} 分`, width - 30, 25);
  
  // 檢查是否完成所有測驗題目
  if (quizFinished) {
    drawQuizResultScreen(items.length);
    return;
  }
  
  let currentItem = items[quizIndex];   // 取得當前題目物件
  
  // 2. 繪製題目面板外框
  fill(255, 255, 255);
  stroke(213, 204, 210);
  strokeWeight(1);
  rectMode(CORNER);
  rect(50, 75, width - 100, 430, 12);
  
  // 3. 顯示題號與題目內容
  noStroke();
  fill(110, 120, 105);
  textSize(14);
  textStyle(BOLD);
  text(`第 ${quizIndex + 1} 題 / 共 ${items.length} 題`, 80, 110);
  
  fill(74, 74, 74);
  textSize(22);
  text(`請問英文單字 "${currentItem.word}" (${currentItem.phonetic}) 的中文意思為何？`, 80, 140, width - 160, 60);
  
  // 4. 繪製 A、B、C、D 四個選項按鈕
  let options = [
    { key: "A", text: currentItem.optionA },
    { key: "B", text: currentItem.optionB },
    { key: "C", text: currentItem.optionC },
    { key: "D", text: currentItem.optionD }
  ];
  
  optionButtons = []; // 清空並重新計算選項按鈕座標
  let startYPos = 205;
  let optHeight = 48;
  let optGap = 8;
  
  for (let i = 0; i < options.length; i++) {
    let optY = startYPos + i * (optHeight + optGap);
    let optX = 80;
    let optWidth = width - 160;
    
    // 儲存選項點擊熱區範圍
    optionButtons.push({ key: options[i].key, x: optX, y: optY, w: optWidth, h: optHeight });
    
    // 設定選項按鈕預設或回饋顏色
    let btnFill = color(248, 246, 242);
    let borderCol = color(215, 210, 200);
    
    if (isAnswerSubmitted) {
      if (options[i].key === currentItem.answer) {
        btnFill = color(220, 238, 225); // 正確答案顯示莫蘭迪柔和綠
        borderCol = color(143, 188, 155);
      } else if (options[i].key === selectedOption) {
        btnFill = color(245, 220, 220); // 錯誤選擇顯示柔和紅
        borderCol = color(214, 150, 150);
      }
    } else if (selectedOption === options[i].key) {
      btnFill = color(230, 235, 230); // 點選中未送出狀態
    }
    
    fill(btnFill);
    stroke(borderCol);
    strokeWeight(1.5);
    rect(optX, optY, optWidth, optHeight, 8);
    
    // 繪製選項文字
    noStroke();
    fill(74, 74, 74);
    textSize(16);
    textStyle(NORMAL);
    textAlign(LEFT, CENTER);
    text(`${options[i].key}. ${options[i].text}`, optX + 20, optY + optHeight / 2);
  }
  
  // 5. 繪製底部操作按鈕（確認答案 / 下一題）
  if (!isAnswerSubmitted) {
    // 尚未送出時顯示「確定送出答案」按鈕
    fill(138, 154, 134);
    noStroke();
    rect(width - 230, 445, 150, 42, 8);
    fill(255);
    textSize(15);
    textAlign(CENTER, CENTER);
    text("確定送出答案", width - 155, 466);
  } else {
    // 已送出時顯示答對/答錯提示與「下一題」按鈕
    textAlign(LEFT, CENTER);
    textSize(16);
    if (selectedOption === currentItem.answer) {
      fill(75, 135, 90);
      text("✔ 答對了！太棒了！", 100, 466);
    } else {
      fill(175, 80, 80);
      text(`✖ 答錯囉！正確答案是：${currentItem.answer}`, 100, 466);
    }
    
    // 下一題按鈕
    fill(92, 107, 83);
    noStroke();
    rect(width - 230, 445, 150, 42, 8);
    fill(255);
    textSize(15);
    textAlign(CENTER, CENTER);
    let btnLabel = (quizIndex < items.length - 1) ? "下一題 ➔" : "查看結算 ➔";
    text(btnLabel, width - 155, 466);
  }
}

// 6. 繪製測驗結算畫面
function drawQuizResultScreen(totalQuestions) {
  fill(255, 255, 255);
  stroke(213, 204, 210);
  strokeWeight(1);
  rectMode(CORNER);
  rect(150, 120, width - 300, 370, 16);
  
  noStroke();
  fill(92, 107, 83);
  textSize(26);
  textAlign(CENTER, TOP);
  text("🎉 單元隨堂測驗結算", width / 2, 160);
  
  let percentage = Math.round((quizScore / totalQuestions) * 100);
  
  textSize(20);
  fill(74, 74, 74);
  text(`最終得分：${quizScore} / ${totalQuestions} 題 (${percentage}分)`, width / 2, 220);
  
  // 根據得分給予評語
  textSize(16);
  fill(120, 110, 100);
  let feedback = "";
  if (percentage === 100) {
    feedback = "太強了！你對這個單元的單字瞭若指掌！";
  } else if (percentage >= 70) {
    feedback = "表現非常優秀！基礎相當扎實！";
  } else {
    feedback = "建議再多複習幾次單字卡，加油！";
  }
  text(feedback, width / 2, 270);
  
  // 繪製「重新測驗」互動按鈕熱區
  fill(138, 154, 134);
  noStroke();
  rect(width / 2 - 100, 360, 200, 48, 8);
  
  fill(255);
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("🔄 重新測驗", width / 2, 384);
}

// ----------------------------------------------------
// C. 滑鼠互動事件處理 (p5.js mousePressed)
// ----------------------------------------------------
function mousePressed() {
  // 確保滑鼠點擊位置在畫布內部
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  
  if (currentMode === "cards") {
    // 檢查點擊了哪一張單字卡
    let cols = 2;
    let cardWidth = 370;
    let cardHeight = 180;
    let startX = 55;
    let startY = 80;
    let gapX = 30;
    let gapY = 25;
    
    let items = database[currentUnit];
    
    for (let i = 0; i < items.length; i++) {
      let col = i % cols;
      let row = Math.floor(i / cols);
      let x = startX + col * (cardWidth + gapX);
      let y = startY + row * (cardHeight + gapY);
      
      // 判斷滑鼠是否落在該卡片範圍內
      if (mouseX >= x && mouseX <= x + cardWidth && mouseY >= y && mouseY <= y + cardHeight) {
        cardsState[i].isFlipped = !cardsState[i].isFlipped; // 切換卡片正反面狀態
      }
    }
    
  } else if (currentMode === "quiz") {
    let items = database[currentUnit];
    
    if (quizFinished) {
      // 點擊「重新測驗」按鈕範圍
      let btnX = width / 2 - 100;
      let btnY = 360;
      let btnW = 200;
      let btnH = 48;
      if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
        resetQuiz();
      }
      return;
    }
    
    // 點擊選項按鈕檢查
    for (let i = 0; i < optionButtons.length; i++) {
      let b = optionButtons[i];
      if (!isAnswerSubmitted && mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
        selectedOption = b.key; // 紀錄使用者點選的選項
      }
    }
    
    // 點擊底部操作按鈕範圍檢查
    let actionBtnX = width - 230;
    let actionBtnY = 445;
    let actionBtnW = 150;
    let actionBtnH = 42;
    
    if (mouseX >= actionBtnX && mouseX <= actionBtnX + actionBtnW && mouseY >= actionBtnY && mouseY <= actionBtnY + actionBtnH) {
      if (!isAnswerSubmitted) {
        // 如果尚未送出且有選擇選項，則進行答案判定
        if (selectedOption !== null) {
          isAnswerSubmitted = true;
          if (selectedOption === items[quizIndex].answer) {
            quizScore += 1; // 答對加一分
          }
        }
      } else {
        // 如果已經送出，則進入下一題或結算畫面
        if (quizIndex < items.length - 1) {
          quizIndex++;
          selectedOption = null;
          isAnswerSubmitted = false;
        } else {
          quizFinished = true; // 測驗結束
        }
      }
    }
  }
}

// ----------------------------------------------------
// D. HTML DOM 控制項事件綁定
// ----------------------------------------------------
function setupDOMListeners() {
  // 綁定單元切換按鈕事件
  const unitButtons = document.querySelectorAll(".unit-btn");
  unitButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      unitButtons.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentUnit = e.target.getAttribute("data-unit");
      initCardsState();  // 重置單字卡狀態
      resetQuiz();       // 重置測驗狀態
    });
  });

  // 綁定模式切換按鈕事件
  const modeButtons = document.querySelectorAll(".mode-btn");
  modeButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      modeButtons.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentMode = e.target.getAttribute("data-mode");
      resetQuiz();       // 切換模式時同步重置測驗狀態
    });
  });
}