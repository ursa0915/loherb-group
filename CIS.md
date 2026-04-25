# 日光 LOHERB 集團 — CIS 企業識別規範

> **文件版本**：對應網站 v1.1.6
> **最後更新**：2026-04-25
> **適用範圍**：集團首頁（main/index.html 中文版、main/en.html 英文版）

---

## 1. 品牌核心

| 項目 | 中文 | English |
|------|------|---------|
| **品牌名稱** | 日光 | LOHERB |
| **集團定位** | Villa · Cuisine · Estate · Party · Wedding · Design |
| **品牌精神** | 享受生活，每一天 | Enjoy life, every day. |
| **品牌哲學** | 為人與自然搭起橋梁 | Bridging humanity and nature |
| **品牌風格** | 極簡高端、大量留白、東方美學、古典精品感 |

---

## 2. Logo 規範（中英文版本一致）

```
日                    （上 — 思源宋體 / Noto Serif TC）
LOHERB                （中 — Bodoni 72 / Bodoni Moda）
光                    （下 — 思源宋體 / Noto Serif TC）
```

- **垂直排列**：日 → LOHERB → 光
- **字體鎖定**：永遠使用 Bodoni 72（值錢系統字體版本），不可替換
- **顏色**：金色 `#E6A401`（深色背景）／炭灰 `#505350`（淺色背景）
- **淨空區**：周圍至少保留一個字元高度的留白
- **禁止**：旋轉、變形、加陰影、改變排列方向

---

## 3. 色彩系統

### 3.1 主色板（兩版本共用）

| 角色 | 色碼 | 用途 |
|------|------|------|
| **品牌金** | `#E6A401` | Logo、標題、強調元素、hover 高亮 |
| **深金** | `#D08C03` | 金色變體、active 狀態 |
| **炭灰** | `#505350` | 主文字色、深色背景 |
| **暖白** | `#FAF2F0` | 主背景、淺色區塊 |
| **純黑** | `#1a1a1a` | 高對比文字 |
| **純白** | `#ffffff` | 反白文字 |

### 3.2 品牌副色（各事業體）

| 品牌 | 中／英 | 主色 | 色名 |
|------|-------|------|------|
| Villa | 旅宿 | `#084136` | 深森綠 |
| Cuisine | 高餐 | `#42452F` | 橄欖深 |
| Estate | 物業 | `#0a2e64` | 深藍 |
| Party | 活動 | `#505350` | 炭灰 |
| Wedding | 婚禮 | `#25323E` | 暗夜藍 |
| Design | 文創 | `#5C2A46` | 莓果紫 |

---

## 4. 字體系統

### 4.1 中文版（index.html）

| 用途 | 字體 | Fallback |
|------|------|----------|
| **Logo（LOHERB）** | Bodoni 72 | Bodoni Moda → Georgia |
| **Logo（日／光）** | Noto Serif TC | 思源宋體 |
| **英文標題／小標** | Bodoni 72 | Bodoni Moda → Georgia |
| **中文內文／正文** | Noto Serif TC | 思源宋體 |

```css
--font-en: 'Bodoni 72', 'Bodoni Moda', Georgia, 'Times New Roman', serif;
--font-zh: 'Noto Serif TC', '思源宋體', '宋體', serif;
```

### 4.2 英文版（en.html）

採用 **Playfair Display + Manrope** 高質感雙字體配置，Logo 維持原 Bodoni。

| 用途 | 字體 | 載入方式 |
|------|------|----------|
| **Logo（LOHERB）** | Bodoni 72 | 系統字體（鎖定不替換）|
| **Logo（日／光）** | Noto Serif TC | Google Fonts |
| **顯示標題／大寫小標** | Playfair Display | Google Fonts |
| **Body 內文／描述** | Manrope | Google Fonts |

```css
--font-logo:    'Bodoni 72', 'Bodoni Moda', Georgia, serif;     /* LOGO ONLY */
--font-zh-logo: 'Noto Serif TC', '思源宋體', serif;              /* 日／光 LOGO ONLY */
--font-en:      'Playfair Display', 'Bodoni Moda', Georgia, serif;
--font-zh:      'Manrope', -apple-system, sans-serif;
--font-display: 'Playfair Display', Georgia, serif;
--font-body:    'Manrope', -apple-system, sans-serif;
```

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### 4.3 字距 & 字重指南

#### 中文版
| 元素 | 字距 | 字重 |
|------|------|------|
| 中文標題（大）| 0.2em | 500 |
| 中文內文 | 0.05em | 300–400 |
| 英文 Logo（LOHERB）| 0.5em | 500 |
| 英文小 caps 標籤 | 0.5em | 500 |

#### 英文版（v1.1.6 — 全大寫精品風）
| 元素 | text-transform | letter-spacing | font-weight |
|------|----------------|----------------|-------------|
| **Slogan**（ENJOY LIFE…）| uppercase | 0.2em | 400 |
| **Philosophy**（BRIDGING…）| uppercase | 0.2em | 400 |
| **Section titles**（OUR BRANDS / JOURNAL / LOHERB FILM）| uppercase | 0.25em | 500 |
| **品牌卡名**（VILLA / CUISINE…）| uppercase | 0.28em | 500 |
| **Hero tagline**（WELCOME TO LOHERB）| uppercase | 0.28em | 400 |
| **小 caps 標籤**（MANTRA / BRANDS…）| uppercase | 0.4em | 500 |
| **Journal 文章標題**（長句，例外）| none | 0.02em | 500 |
| **IG handle**（@loherb_yilan）| none | 0.15em | 500 |

---

## 5. 設計原則（兩版本通用）

1. **極簡留白** — 大量負空間，不堆砌元素
2. **東方直排美學** — Logo 和品牌標題優先垂直排列
3. **一頁一重點** — 每區塊只傳達一個核心訊息
4. **材質感** — 適度融入金屬拉絲、紙質、石材等質感暗示
5. **深淺對比** — 深色底配金／白字，淺色底配炭灰／深綠字
6. **禁止花俏** — 不用漸層、不用陰影、不用多餘裝飾線條

---

## 6. 元件庫

### 6.1 Section Label（小寫大字標）
全頁 8 處：MANTRA · BRANDS · PHILOSOPHY · JOURNAL · FILM · FOLLOW US

```css
font-family: var(--font-en);          /* Bodoni 中文版 / Playfair 英文版 */
font-size: 0.6rem;
text-transform: uppercase;
letter-spacing: 0.5em;
color: var(--gold);                    /* #E6A401 */
font-weight: 500;
```

### 6.2 Hero 毛玻璃文字框

```css
background: rgba(0, 0, 0, 0.08);
backdrop-filter: blur(6px);
padding: 2rem 3rem;
mask-image: radial-gradient(
  ellipse 60% 95% at center,
  rgba(0,0,0,0.9) 0%, ...
  rgba(0,0,0,0) 100%
);  /* 9 段超柔邊界 */
```

### 6.3 品牌卡 Hover 動效
- 卡片**位置不動**
- 背景圖 `transform: scale(1.08)` 放大
- 文字色變金色 `color: var(--gold)`
- 底線發光 `var(--gold)`
- 箭頭右移

### 6.4 導覽列
- 桌機：Logo 居中　│　品牌連結 6 個　│　**中／EN 切換**　│　漢堡按鈕（手機）
- 預設透明 → 捲動後半透明毛玻璃 + 金色細線
- 文字配色：暖白 → 炭灰（隨背景轉換）

---

## 7. 文案規範（中英對照）

| 區塊 | 中文 | English |
|------|------|---------|
| **Hero** | 歡迎來到日光 | WELCOME TO LOHERB |
| **Mantra** | 享受生活，每一天 | ENJOY LIFE, EVERY DAY. |
| **Brands** | 日光旗下品牌 | OUR BRANDS |
| **Brand 1** | 旅宿｜日光綠築｜自然裡的頂級渡假村 | VILLA｜LOHERB Villa｜A luxury resort within nature |
| **Brand 2** | 高餐｜日光私廚｜以在地食材述說故事 | CUISINE｜LOHERB Cuisine｜Stories told through local ingredients |
| **Brand 3** | 物業｜日光物業｜永續建築與開發 | ESTATE｜LOHERB Estate｜Sustainable architecture & development |
| **Brand 4** | 活動｜日光時刻｜咖啡館與派對活動 | PARTY｜LOHERB Party｜Café & event experiences |
| **Brand 5** | 婚禮｜日光婚禮｜結合室內戶外的浪漫盛典 | WEDDING｜LOHERB Wedding｜Romance, indoor & outdoor |
| **Brand 6** | 文創｜日光文創｜手作體驗與客製化商品 | DESIGN｜LOHERB Design｜Handcraft experiences & bespoke goods |
| **Philosophy 標題** | 為人與自然搭起橋梁 | BRIDGING HUMANITY AND NATURE |
| **Philosophy 內文** | 在這裡住下、用餐、相聚，見證愛情、親手創造，每一刻，都是故事的開始。 | Here you stay, dine, and gather; witness love, create with your hands. Every moment is the beginning of a story. |
| **Journal** | 日光札記｜記錄美食旅居、生活美學與四季光景 | JOURNAL｜Notes on stays, dining, life aesthetics, and seasonal scenes |
| **Film** | 日光映像｜以鏡頭留下日光的每一刻光景 | LOHERB FILM｜Capturing every LOHERB moment through the lens |
| **Footer Tagline** | 享受生活，每一天 | Enjoy life, every day. |
| **版權** | © 2026 LOHERB all rights reserved. Built by Disp-Tech. |
| **聯絡** | service@loherb.com.tw / +886-3-959-5685 |
| **地址** | 台北市羅斯福路三段335號9樓 / 宜蘭縣冬山鄉寶福路372-450號 |

---

## 8. 響應式設計斷點

| 斷點 | 範圍 | 主要調整 |
|------|------|----------|
| 桌機 | > 1024px | 完整版面，6 卡片 3×2 |
| 平板 | ≤ 1024px | 同桌機 3×2 |
| 手機 | ≤ 768px | 2 欄 × 3 列、Hero 第 1 張 82% center / 第 2 張 right |
| 小手機 | ≤ 480px | 1 欄 × 6 列、卡片改 16:9 |

### 直式手機特殊處理
- 日光映像影片容器改 5:4，iframe 142.22% 寬置中裁切

---

## 9. 部署資訊

| 項目 | 連結 |
|------|------|
| **生產環境** | （未上線）|
| **測試環境** | https://loherb-test.web.app |
| **GitHub** | https://github.com/ursa0915/loherb-group |
| **Firebase 專案** | loherb-shared-journal |
| **YouTube 頻道** | https://www.youtube.com/@loherb222 |
| **Instagram** | https://www.instagram.com/loherb_yilan |

### 子站連結
| 品牌 | URL |
|------|-----|
| Villa | https://villa.loherb.com.tw |
| Cuisine | https://cuisine.loherb.com.tw |
| Estate | https://estate.loherb.com.tw |
| Party | https://party.loherb.com.tw |
| Wedding | https://loherb-test.web.app/wedding/（測試）|
| Design | https://dearbb.design |

---

## 10. 版本歷史摘要

| 版本 | 主要更新 |
|------|---------|
| **v1.1.6**（current）| 全英文標題改為 MANTRA 風格大寫 + 寬字距 |
| v1.1.5 | 品牌卡標題改為品牌名（Villa/Cuisine/...）|
| v1.1.4 | 標題去除斜體，統一 Playfair Display 正體 |
| v1.1.3 | EN 版改用 Playfair Display + Manrope |
| v1.1.0 | 新增 EN 版 (en.html) + 中英切換 |
| v1.0.0 | 集團網站初始版本 |

---

> 📌 **更新流程**：所有 CIS 異動皆透過 `./.deploy.sh patch/minor/major "說明"` 推送  
> 📌 **同步到**：GitHub Tag → Firebase Hosting → CIS 文件版本紀錄
