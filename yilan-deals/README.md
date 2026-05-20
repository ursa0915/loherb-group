# 宜蘭吃喝玩樂 Coupon 優惠卷

> 子站架構文件 — 部署於 https://travel.loherb.com.tw

---

## 一、資料來源

Google Sheet（試算表為資料庫，前端 fetch CSV 即時讀取）：

```
https://docs.google.com/spreadsheets/d/1J4-lWexX-vZJud1gSIw08eErDF5Sm4wi5LuyM6aXPyY/
```

### 必要欄位（已存在）
| 欄位 | 用途 |
|---|---|
| 商店名稱 | 卡片標題 |
| 聯繫方式 | 電話／Email／加 LINE 等 |
| 優惠期限 | 「2026/12/31」或「無使用期限」或「限一週內使用」 |
| 狀態 | 「已刪除」「已無優惠」會自動隱藏 |
| 優惠類型 | 餐飲／景點門票／伴手禮／DIY／交通／其他 |
| 優惠內容 | 卡片內容 + modal 完整描述 |

### 選填欄位（程式自動偵測 header 名稱）
| 欄位 | 用途 |
|---|---|
| `圖片URL` | 覆寫該商家的卡片圖（不填則用 Unsplash 類別圖庫） |
| `鄉鎮` | 顯式指定鄉鎮（不填則由店名自動推斷） |
| `地圖` | 自訂 Google Maps 連結（不填則自動以店名搜尋） |
| `經緯度` | 精準座標 `24.65, 121.79` 格式（未來地圖細部 marker 用） |

### 編輯流程
1. 開試算表，新增 / 編輯 / 刪除商家
2. 等 5 分鐘 Google CDN 快取更新
3. 重新整理 `https://travel.loherb.com.tw/` 即可看到變動

---

## 二、本地預覽

```bash
cd /Users/ursa/Claude/loherb-group
python3 -m http.server 8090
# 造訪 http://localhost:8090/yilan-deals/
```

---

## 三、首次部署到 travel.loherb.com.tw

> ⚠️ 第一次部署需要先建立獨立 Firebase Hosting site，之後 `./.deploy.sh` 會自動處理。

### 1. 建立 hosting site（一次性，在 Firebase Console 或 CLI）

```bash
firebase hosting:sites:create loherb-travel --project loherb-shared-journal
```

或在 [Firebase Console → Hosting](https://console.firebase.google.com/project/loherb-shared-journal/hosting/sites) 點「Add another site」輸入 `loherb-travel`。

### 2. 首次部署

```bash
cd /Users/ursa/Documents/loherb-firebase
firebase deploy --only hosting:loherb-travel
# 部署後可訪問 https://loherb-travel.web.app
```

### 3. 綁定 travel.loherb.com.tw 自訂網域

1. Firebase Console → Hosting → `loherb-travel` site → 「新增自訂網域」
2. 輸入 `travel.loherb.com.tw`
3. 依 Firebase 指示在 DNS 提供商加 A record / TXT 驗證 record
4. 等 SSL 簽證（通常 5-30 分鐘）
5. 完成後 `https://travel.loherb.com.tw/` 直接服務本子站

### 4. 後續更新

```bash
cd /Users/ursa/Claude/loherb-group
./.deploy.sh patch "改個東西"
# 會同時部署 loherb-test 與 loherb-travel 兩個 site
```

---

## 四、檔案結構

```
yilan-deals/
├── index.html          ← 整個 SPA（內嵌 CSS + JS）
├── sitemap.xml         ← SEO sitemap
├── robots.txt          ← 允許 crawl
├── README.md           ← 本檔
└── image/              ← Hero / 住宿 / 用餐區塊用圖
    ├── 20260517_空拍_紅橋河岸城景_原圖.jpg
    ├── villa-pool-aerial.jpg
    └── 20251111_威靈頓套餐_方型_已發.jpg
```

商家卡片圖採類別 fallback（Unsplash CC0 圖庫，hot-link），未來可改用試算表 `圖片URL` 欄位逐筆覆蓋。

---

## 五、技術棧

| 項目 | 用途 |
|---|---|
| Vanilla HTML/CSS/JS | 無 build tool、無 framework，直接 `<script>` |
| Google Sheets CSV API | 資料庫 (`/gviz/tq?tqx=out:csv`) |
| Unsplash / Pexels | 商家圖類別 fallback |
| Firebase Hosting | 託管 |
| Manrope + Noto Sans TC | 設計感 sans 字體（UI 控件） |
| Noto Serif TC + Cormorant Garamond | 編輯級 serif（標題、內文） |
