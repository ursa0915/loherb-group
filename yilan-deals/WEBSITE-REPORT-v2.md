# 宜蘭吃喝玩樂 Coupon 優惠卷 — v2.0.0 Master Release Report

> 發布日期：2026-05-20
> 線上 URL：`https://travel.loherb.com.tw/` （DNS 設定完成後生效）
> 目前可訪問：`https://loherb-travel.web.app/`

---

## 一、本次 release 摘要

從 v1.x 累積調整到 v2.0.0 master，重點：
- 旅遊優惠站完整改版（KKday 風格 + SVG 鄉鎮地圖 + 多選圓圈）
- 引入設計感 sans-serif 字體系統（Manrope + Noto Sans TC）
- 全部圖片改用本地 hi-res 素材並壓縮
- 移除約 600 行死碼（CTA、舊地圖、已選提示列、sort 等）
- 設定 Firebase 獨立 hosting site `loherb-travel`，未來綁定 `travel.loherb.com.tw`
- 完整 SEO meta + Schema.org JSON-LD + sitemap + robots

---

## 二、技術架構

| 項目 | 內容 |
|---|---|
| 前端 | Vanilla HTML + CSS + JS（單一 index.html，2300 行內） |
| 資料庫 | Google Sheet（CSV gviz endpoint，前端即時抓） |
| 託管 | Firebase Hosting（multi-site：`loherb-test` + `loherb-travel`） |
| 部署 | `./.deploy.sh patch "msg"` 一鍵 |
| 圖片 | 本地 `/yilan-deals/image/` + Unsplash/Pexels CC0 圖庫 fallback |
| 地圖 | 自繪 SVG 12 鄉鎮 polygon（雙層 fill+border 解決縫隙） |
| 字體 | Noto Serif TC + Cormorant Garamond（內文） / Manrope + Noto Sans TC（UI） |

---

## 三、功能清單

### 篩選與導覽
- ✅ 圓形類別 icon 多選（餐飲 / 景點門票 / 伴手禮 / DIY / 交通 / 其他 / 全部）
  - 預設只勾選「景點門票」
- ✅ Hero 搜尋框（即時 filter 店名 + 優惠內容 + 鄉鎮）
- ✅ Hero 快速分類標籤 4 個（餐飲 / 景點 / 伴手禮 / DIY）
- ✅ SVG 鄉鎮地圖：點區域 = 多選篩選
- ✅ 圓圈鄉鎮選擇器（12 個 + 「全部」一鍵全選）
- ✅ 地圖 + 圓圈雙向同步

### 卡片
- ✅ KKday 風格大圖卡片
- ✅ 自動解析折扣為金色徽章（9折 / 買N送N / 折$NN / 加贈 等）
- ✅ 自動偵測鄉鎮（從店名 + 內容比對）
- ✅ 點卡片開啟詳情 modal
- ✅ Modal 含完整優惠 + 撥電話 + 開 Google Maps

### 內容區塊
- ✅ Hero 全螢幕背景（紅橋河岸空拍）+ 毛玻璃文字面板
- ✅ 「下榻宜蘭渡假村」住宿大區塊（連 villa.loherb.com.tw）
- ✅ 「在私廚用餐」用餐大區塊（連 cuisine.loherb.com.tw）
- ✅ 「宜蘭遊記」Travel Journal 4 篇文章卡片
- ✅ 「如何使用優惠」2 步驟說明
- ✅ Footer 含品牌 logo + 聯絡 + 子品牌連結 + 社群圖示

---

## 四、響應式測試結果

| 裝置 | viewport | 結果 |
|---|---|---|
| Mobile | 375 × 812 | ✅ 0 overflow / h1 35.2px / 圓圈 wrap 自然 |
| Tablet | 768 × 1024 | ✅ 0 overflow / cards 2 欄 |
| Desktop | 1440 × 900 | ✅ 0 overflow / cards 4 欄 / feature 2 欄 |

---

## 五、效能優化

### 圖片
| 檔案 | Before | After | 省 |
|---|---|---|---|
| Hero 紅橋河岸 | 648K | 640K | 8K |
| Villa 泳池空拍 | 1.1M | 780K | 320K |
| 威靈頓套餐 | 520K | 252K | 268K |
| ChatGPT 舊圖 | 2.0M | 刪除 | 2M |
| **總計** | **4.3M** | **1.7M** | **2.6M (60%)** |

### 程式碼
| 項目 | 改動 |
|---|---|
| 移除死 CSS | `.cta`/`.cta-*` 等 7 條規則約 80 行 |
| 移除死 CSS | `.region-map-reset` / `.results-meta` / `.sort-*` / `.controls-divider` 約 40 行 |
| 移除死 CSS | `.selected-summary` 已選提示列 約 90 行 |
| 移除死 JS | `currentSort` 變數 + sort handler 約 6 行 |
| 移除死 JS | `renderSelectedSummary()` 函式 約 30 行 |
| **總共精簡** | **~250 行** |

### Cache 策略（firebase.json）
- HTML → `no-cache`（每次取最新）
- 圖片 → `30 天`
- JS/CSS → `1 年 immutable`
- sitemap.xml → `1 天`
- robots.txt → `1 小時`

---

## 六、SEO 完整度

- ✅ `<title>` + `<meta name="description">` + `<meta name="keywords">`
- ✅ Canonical URL 指向 `https://travel.loherb.com.tw/`
- ✅ Open Graph 完整（title / description / type / url / image）
- ✅ Twitter Card 完整
- ✅ Schema.org JSON-LD（WebSite + SearchAction + Organization）
- ✅ `sitemap.xml` + `robots.txt`
- ✅ 12 個高搜尋量關鍵字（宜蘭優惠卷、宜蘭 Coupon、冬山優惠、礁溪優惠 等）
- ✅ 圖片 alt 標籤齊全
- ✅ 語意化 HTML5（`<nav>`/`<header>`/`<section>`/`<article>`/`<footer>`）

---

## 七、Firebase Multi-Site 架構

### `.firebaserc` 兩個 target
```json
{
  "targets": {
    "loherb-shared-journal": {
      "hosting": {
        "loherb-test": ["loherb-test"],     // 主集團站
        "loherb-travel": ["loherb-travel"]  // 旅遊優惠子站
      }
    }
  }
}
```

### `firebase.json` 兩個 hosting block
- **loherb-test**：`public: "."` 含全 repo（main/villa/wedding/...）
- **loherb-travel**：`public: "yilan-deals"` 獨立 site，根路徑 = `/yilan-deals/index.html`

### 線上 URL
| Site | Firebase URL | 自訂網域 |
|---|---|---|
| 主集團 | https://loherb-test.web.app | www.loherb.com.tw |
| 旅遊優惠 | https://loherb-travel.web.app | travel.loherb.com.tw（待設定 DNS） |

### `.deploy.sh` 自動偵測
腳本會自動檢查 `loherb-travel` site 是否存在，存在則同時部署兩站；不存在則只部署主站。完全向下相容。

---

## 八、travel.loherb.com.tw DNS 設定步驟

> 已建立 `loherb-travel` site，現需綁定自訂網域：

1. 進入 [Firebase Console → Hosting → loherb-travel site](https://console.firebase.google.com/project/loherb-shared-journal/hosting/sites)
2. 點「**新增自訂網域**」
3. 輸入 `travel.loherb.com.tw`
4. Firebase 會提供 **A record IP**（通常兩個 IP）— 例如：
   - `199.36.158.100`
   - `199.36.158.101`
5. 到 DNS 提供商（Cloudflare / GoDaddy / 等）新增：
   - **Type:** A
   - **Name:** `travel`
   - **Value:** Firebase 給的 IP（兩條都加）
6. 回 Firebase Console 點「驗證」
7. 等 SSL 憑證簽發（5-30 分鐘）
8. 完成後訪問 `https://travel.loherb.com.tw/` 直接顯示優惠站首頁

---

## 九、未來擴充建議

| 優先級 | 項目 |
|---|---|
| 🔥 高 | 把試算表「鄉鎮」欄補齊（目前 6/42 偵測到）— 補完後地圖每區都會亮起 |
| 🔥 高 | 商家補實際照片到「圖片URL」欄（取代 Unsplash 通用圖） |
| 🟡 中 | Blog 遊記 4 篇樣板需要實際文章內容（可建 Google Sheet 第二分頁讀取） |
| 🟡 中 | 加入 Google Analytics 4 + Search Console 註冊 |
| 🟢 低 | 加 PWA manifest + service worker（離線訪問） |
| 🟢 低 | i18n：英文版（給國外旅客） |

---

## 十、版本歷程速覽

```
v1.5 - v1.10   靜態版/設計改造
v1.11.0        Leaflet 地圖（後改回 SVG）
v1.12.0        SVG 12 鄉鎮地圖
v1.13.0        圓形 cat pill + 移除 cat 數字
v1.14.0        鄉鎮多選 + Coupon 優惠卷 hero
v1.14.2        Sans-serif 字體系統
v1.15.0        Hero 換圖無濾鏡 + 雙層邊界 + 全部按鈕
v1.15.2        Hero 毛玻璃 + 移除已選提示 + 威靈頓套餐
v1.16.0        SEO 全站優化（含主站）
v1.17.0        QA 健檢 + main.css 精簡
v2.0.0  ★    Master release — Firebase multi-site + travel.loherb.com.tw 預備 + 全站健檢
```

---

**🎉 v2.0.0 為旅遊優惠子站正式 master 版本，可隨時切換 travel.loherb.com.tw 上線。**
