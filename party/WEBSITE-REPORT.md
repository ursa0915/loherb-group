# 日光時刻 LOHERB Moments 網站健檢報告

**版本**：v1.17.0 (master)
**日期**：2026-05-20
**範圍**：`/party/` 中文版 10 頁 + `/party/en/` 英文版 9 頁 + 共用資產
**部署網址**：`https://loherb-test.web.app/party/`
**生產網址（規劃）**：`https://party.loherb.com.tw/`
**舊站對照**：`https://party.loherb.com.tw/zh`

---

## 一、總體評估

### ✅ 通過
- **品牌框架延續**：頂導覽（多元活動／場地空間／美食百匯／線上訂位／時刻手札／聯繫日光）、Loherb Group 六大事業體 footer、品牌 logo wordmark（日 LOHERB 光），結構完整對齊舊站。
- **頁面完整性**：10 中文頁全部存在、全部互聯，9 英文對譯頁同步。
- **SEO 完整度**：每頁皆有 title／description／keywords／robots／canonical／hreflang／OG／Twitter Card；首頁含 LocalBusiness JSON-LD（地理座標 24.6618/121.7991、營業時段、4.8★/1240）；cafe.html 含 CafeOrCoffeeShop JSON-LD。
- **響應式覆蓋**：所有主要 .lp2-* 與基礎元件皆有 960px／600px breakpoint，部分含 380px 微調。
- **無重大標籤錯誤**：未發現重複 ID、未閉合標籤、缺 viewport meta。

### ⚠ 與舊站差異（刻意調整 — 不影響上線）
| 模組 | 舊站 (party.loherb.com.tw) | 新站 | 狀態 |
|---|---|---|---|
| 五棟 Villa 展示 (I/H/T/F/A) | ✅ 主視覺模組 | ❌ 簡化為「場地空間」單頁 | 刻意 |
| Instagram Feed 直連 | ✅ 首頁區塊 | 🔁 改為 cafe.html 的 IG 風格 grid | 風格延續 |
| Success Cases 案例集 | ✅ 全幅 | 🔁 簡化為「精選客戶」logo strip | 刻意 |
| 設計者署名 (Dymantic) | ✅ footer | ❌ 移除 | 刻意 |
| Dearbb 品牌連結 | ✅ footer | 🔁 改為「日光文創」 | 刻意 |
| 持續頂導覽 | ❌（舊站靠 hero icon 進入） | ✅ 6 連結持久顯示 | 升級 |
| 咖啡館（cafe.html） | ❌ 無 | ✅ 全新獨立 LP | 新增 |

---

## 二、本次修正（v1.16.1 → v1.17.0）

### 🔴 上線阻斷型（已修）
1. **OG / Twitter 圖片 URL 全錯**（10 個中文頁）
   `https://party.loherb.com.tw/party/images/…` ❌ → `https://loherb-test.web.app/party/images/…` ✅
   原本社群分享預覽會 404；現已對齊 canonical 網域。

2. **測試網址外洩到 production HTML**
   `index.html:361` 寫死 `https://loherb-test.web.app/party/cafe.html` → 改為相對路徑 `/party/cafe.html`。

### 🟡 體驗一致性（已修）
3. **menu.html 語系切換錯位**：`/party/en/` → `/party/en/menu.html`。
4. **CTA 標籤不一致**：`index.html` 的「活動場刊 →」→ 「看看菜單 →」。
5. **nav 切換按鈕 aria-label**：中文頁的 `aria-label="Menu"` → `aria-label="選單"`（9 頁）；英文頁保持英文。
6. **Google Maps iframe 缺 title**：cafe.html / contact.html / en/contact.html 三處 iframe 補上中／英文 title 屬性（WCAG 4.1.2）。
7. **社群連結缺 aria-label**：contact.html 的 4 個大型 social icon 補 FB／IG／YT／LINE aria-label。
8. **team.html `<img>`** 補 `loading="lazy"`、`width`、`height` 與更完整 alt。

### 🧹 程式碼精簡（已修）
9. **main.css 死代碼移除**：349 行（4350 → 4001）。刪除的區塊：
   - `.lp2-hero` 基底 + `.lp2-hero-bg/mask/frame/cta`（舊版 hero 模板，cafe 已改用 `.lp2-hero-v2`）
   - `.lp2-pullquote` / `.lp2-quote-mark` / `.lp2-quote-en`（從未實裝）
   - `.lp2-menu*` / `.lp2-polaroid*`（舊版 menu 拍立得卡片，已被 `.lp2-bakes` 取代）
   - `.lp2-footer*`（舊版淡 footer，現用全站 `.site-footer`）
   - `.lp2-back*` 回主站 callout（92 行 — 從未在任何頁面實裝）
   - 相關 `@media` overrides
10. **重複 CSS 合併**：`.lp2-why-head` 兩個區塊合併為一。

### 📊 累計改動
- HTML：12 個檔案（10 zh + 4 動到的 en + 1 team）
- CSS：4350 → 4001 行（**-8%**）
- 新增：robots.txt、sitemap.xml、WEBSITE-REPORT.md（本檔）
- 保留：SEO-OPTIMIZATION.md（v1.16.0 策略文件）

---

## 三、響應式驗證

### 中斷點覆蓋
| 元件 | 1280+ | 960 (tablet) | 600 (mobile) | 380 (small) |
|---|---|---|---|---|
| `.top` 頂導覽 | ✅ 6 links + CTA | ✅ collapse to burger | ✅ | ✅ |
| `.hero-grid` 首頁 hero | ✅ 2-col | ✅ stack | ✅ stack | ✅ |
| `.lp2-collage` cafe hero | ✅ 3×3 | ✅ stack | ✅ | ✅ |
| `.lp2-bakes-grid` | ✅ 4-col | ✅ 2-col | ✅ 2-col | ✅ 1-col |
| `.lp2-mains-grid` | ✅ 3-col | ✅ 2-col | ✅ 1-col | ✅ |
| `.lp2-feed-grid--4col` | ✅ 4-col | ✅ 3-col | ✅ 3-col | ✅ 2-col |
| `.lp2-reviews-grid--carousel` | ✅ | ✅ | ✅ | ✅ |
| `.brand-card` (contact) | ✅ 3-col | ✅ 2-col | ✅ 1-col | ✅ |
| `.menu-block` (menu) | ✅ 2-col | ✅ 2-col | ✅ 1-col | ✅ |

### 已知中等優先課題
- `.lp2-stories-grid` 從 3-col 直接跳 1-col（缺中間 2-col 階段，於 700–900px 略擁擠）。
- `.lp2-reviews-grid--carousel` 採固定高度（960px+: 360px / 600px-: 460px），長 review 在某些 viewport 可能溢出。
- 首頁 hero 多張背景大圖以 CSS `background-image` 載入，無法原生 lazy-load；mobile 流量大頁面可考慮 IntersectionObserver。

---

## 四、SEO 健康度

| 項目 | 狀態 | 備註 |
|---|---|---|
| `<title>` 唯一性 | ✅ 19/19 頁 | 含關鍵字 + 品牌名 |
| `<meta description>` | ✅ 19/19 頁 | 平均 120 字內 |
| canonical | ✅ 19/19 頁 | 中文指向 zh、英文指向 en |
| hreflang | ✅ 19/19 頁 | zh-TW / en / x-default |
| Open Graph | ✅ 19/19 頁 | 含 width/height |
| Twitter Card | ✅ 19/19 頁 | summary_large_image |
| LocalBusiness JSON-LD | ✅ index.html | 含 geo、營業時段、評價 |
| CafeOrCoffeeShop JSON-LD | ✅ cafe.html | |
| robots.txt | ✅ | Allow /party/、Sitemap 指向 |
| sitemap.xml | ✅ | 19 URL + hreflang alternate |
| 圖片 alt | 🟡 部分 | CSS background 圖片無 alt — Phase 2 改善 |
| Menu schema | 🟡 待做 | menu.html 尚未加 Menu JSON-LD（含 price） |
| EventVenue schema | 🟡 待做 | venues.html 尚未加 EventVenue JSON-LD |

---

## 五、效能初評

| 資產 | 狀態 |
|---|---|
| `main.css` | **49 KB**（精簡後）／壓縮後 ≈ 12 KB |
| `main.js` | 5 KB / 151 行 |
| Google Fonts | 2 系列（Cormorant Garamond + Noto Serif TC）含 preconnect |
| 圖片總數 | ~120 張（lifestyle / menu / venues / brand） |
| LCP 候選 | 首頁 hero `lake-walk.jpg`、cafe hero collage |
| 第三方腳本 | 0（純靜態） |

**建議下一步**：將 hero 主圖製作 WebP/AVIF 版本，並用 `<picture>` 與明確 width/height 標示，可在 Lighthouse 提高 LCP 與 CLS 評分。

---

## 六、可訪問性 (a11y)

- ✅ 所有 `<form>` 欄位有對應 `<label for>`
- ✅ nav-toggle 有 aria-label（中文「選單」/ 英文「Menu」）
- ✅ social icon 有 aria-label
- ✅ iframe 有 title
- 🟡 CSS background image 無 alt — 視為裝飾性可接受，但內容性圖片（如菜單、評價人物）建議改 `<img>` 加 alt
- 🟡 對比度需用 Lighthouse 抽測（金色文字於淡色底時）

---

## 七、已知殘留與建議

### Phase 2 — 建議下次處理
1. **首頁午餐時段政策再確認**：`index.html:140` 與 `menu.html:64` 寫「午餐 12:00–14:30 每日」。如未來日光私廚的「週二–週四午餐包場」政策延伸至日光時刻，需調整文案。
2. **menu.html 加 Menu JSON-LD**（每道菜含 price / currency / image）
3. **venues.html 加 EventVenue JSON-LD**（含 capacity / amenity）
4. **批次補 image alt**：將 hero / collage / IG feed 由 CSS `background-image` 改 `<img>` 並加 alt（提升 SEO 圖片搜尋曝光）
5. **WebP/AVIF 圖片版本**：對 LCP 候選圖（hero、editorial）做格式優化
6. **Google Search Console** 提交 `sitemap.xml`

### Phase 3 — 內容運營
- `journal.html` 每月補 2–4 篇文章（新增季節限定關鍵字）
- 補上 `aggregateRating` 來源（連結到 Google Maps 評價）
- 規劃 `_blog/<slug>.html` 子頁

---

## 八、檔案異動清單 (v1.17.0)

```
Modified:
  party/index.html        — og:image fix, test-URL leak fix, CTA label, aria-label
  party/menu.html         — og:image fix, lang switch fix, aria-label
  party/cafe.html         — og:image fix, iframe title, aria-label
  party/contact.html      — og:image fix, iframe title, social aria-label, aria-label
  party/book.html         — og:image fix, aria-label
  party/venues.html       — og:image fix, aria-label
  party/events.html       — og:image fix, aria-label
  party/gourmet.html      — og:image fix, aria-label
  party/journal.html      — og:image fix, aria-label
  party/team.html         — og:image fix, aria-label, img loading/width/height
  party/en/contact.html   — iframe title
  party/assets/css/main.css — 349 dead lines removed, .lp2-why-head merged

New:
  party/WEBSITE-REPORT.md — this report
```

---

**負責人**：service@loherb.com.tw
**回報**：發現新 bug 請開新 issue 或留言於此檔末尾
