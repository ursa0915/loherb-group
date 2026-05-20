# 日光時刻 LOHERB Moments — 專案總體計劃

**版本**：v1.17.0 master · 2026-05-20
**負責人**：service@loherb.com.tw
**站點**：`https://loherb-test.web.app/party/` → `https://party.loherb.com.tw/`（規劃）
**事業定位**：日光集團 6 大事業體之 **「時刻」線**（水畔咖啡館 × 包場活動場域）

---

## 一、專案願景

> **日常是水畔咖啡，盛事是整座渡假村。**

「日光時刻」是日光集團從「住食宴」延伸出的第三條敘事線：
- **散客面**：宜蘭最緩慢的玻璃屋水畔咖啡館（一人一杯、一場午後）
- **包場面**：五千坪渡假村裡的活動場域（企業、婚禮、派對、聚會）
- **品牌作用**：作為集團「日常入口」— 讓還沒住過 Villa、還沒吃過私廚的客人，從一杯拿鐵開始與日光相遇。

---

## 二、品牌雙軌策略

```
            ┌───────────────────────┐
            │  日光集團 LOHERB GROUP │
            └────────────┬──────────┘
       ┌────────────────┼────────────────┐
   住    │      食         │       宴         │       創
       │                │                │
   ┌───▼───┐  ┌─────▼─────┐  ┌──────▼──────┐  ┌─────▼─────┐
   │綠築 Villa│  │日光私廚 Cuisine│  │日光時刻 Moments│  │日光文創 Design│
   └────────┘  └────────────┘  └──────────────┘  └────────────┘
                                       │
                       ┌───────────────┴──────────────┐
                       │                              │
                  日常／散客                       盛事／包場
                  café.html                       events.html
                  menu.html                       venues.html
                  book.html                       gourmet.html
```

**重要**：日光時刻是集團裡**唯一同時面向散客與包場**的事業體，需在同一網站維持兩種語氣。
- 散客線（cafe.html / menu.html）：女性向、Pinterest 感、網美視覺、即時可訂位
- 包場線（events.html / venues.html / gourmet.html）：B2B 詢價、容納人數、預算分級、流程透明

---

## 三、目前完成狀態（v1.17.0 為止）

### ✅ 已上線資產
| 類別 | 內容 |
|---|---|
| **頁面** | 10 中文（index / cafe / menu / book / venues / events / gourmet / contact / journal / team）+ 9 英文對譯 |
| **SEO** | 全站 19 頁 meta、canonical、hreflang、OG、Twitter Card；首頁 LocalBusiness JSON-LD + cafe CafeOrCoffeeShop JSON-LD；robots.txt + sitemap.xml |
| **設計系統** | 5 色 token、Cormorant Garamond + Noto Serif TC、`.lp2-*` 完整網美 LP 元件庫 |
| **照片庫** | ~120 張歸類圖（lifestyle / menu / venues / brand），含使用者實拍 23 張 |
| **互動元件** | 評價手動輪播（auto-advance + swipe + 按鈕）、Hero collage、frosted-glass brand cards |
| **第三方串接** | Google Maps embed、外部訂位（party.loherb.com.tw/zh/book）、private chef 連結（cuisine.loherb.com.tw） |
| **部署管線** | `./.deploy.sh patch/minor/major` 一鍵 Git tag + Firebase Hosting |
| **文件** | SEO-OPTIMIZATION.md、WEBSITE-REPORT.md、本檔 PROJECT-PLAN.md |

### 📊 技術健康度
- CSS：4001 行（從 4350 精簡 −8%）
- HTML：純靜態，無 build step，無第三方腳本
- a11y：iframe title、aria-label、form label、loading="lazy" 已補
- 響應式：1280 / 960 / 600 / 380 四階斷點覆蓋
- 載入：首頁 32.7 KB、< 600ms TTFB（Firebase CDN）

---

## 四、四階段藍圖（建議執行序）

### 🟢 Phase 1 — 上線基礎（已完成 v1.16–v1.17）
- [x] 全站 SEO 完整
- [x] 響應式驗證
- [x] 上線阻斷 bug 修復
- [x] CSS / 死代碼精簡
- [x] WEBSITE-REPORT 健檢報告
- [x] Firebase 部署

### 🟡 Phase 2 — 內容深化（建議 2026-Q2 內完成）
- [ ] **menu.html 加 Menu JSON-LD**（每道菜 price / image / nutrition）→ Google 餐點搜尋曝光
- [ ] **venues.html 加 EventVenue JSON-LD**（capacity / amenity）→ 場地搜尋曝光
- [ ] **圖片 alt 批次補完**：將內容性 background-image 改 `<img>` 並加 alt（hero / collage / IG feed / 評價人物）
- [ ] **WebP / AVIF 圖片版本**：對 LCP 候選圖片優化，目標 Lighthouse Performance ≥ 90
- [ ] **Google Search Console** 提交 sitemap.xml，並接入 Bing Webmaster
- [ ] **GA4 事件追蹤**：CTA 點擊、表單送出、滾動深度（與 cuisine.loherb.com.tw 共用 GA4 帳號）
- [ ] **journal.html 內容生產**：每月 2–4 篇，含季節限定關鍵字（春櫻、夏螢、秋楓、冬泉）
- [ ] **真實客戶評價彙整**：將部落客文章（Jennie / 佩佩醬 / 小聿媽 / 黛西）擴大到 12 筆

### 🟠 Phase 3 — 商業導流（2026-Q3）
- [ ] **線上訂位整合**：將 `party.loherb.com.tw/zh/book` 外部訂位內嵌或統一為 `/party/book.html`（兩條訂位流目前並存，需收斂）
- [ ] **包場詢價自動化**：events / venues / gourmet 表單接 Notion / Airtable，自動分派業務
- [ ] **季節限定 LP**：與 yilan-deals 配合，做 2–3 個檔期限定頁（如「父親節包場 8 折」、「畢業派對」）
- [ ] **集團網站交叉導流**：明確規劃 4 站之間的入口（cuisine / villa / party / 集團首頁）
- [ ] **LINE 官方帳號自動回覆**：加入訂位／FAQ 機器人
- [ ] **廣告投放素材**：每月一組 hero 視覺，配合 Meta / Google Ads（避開週二三四午餐散客時段，依私廚營運排程備忘）

### 🔵 Phase 4 — 規模化與品牌（2026-Q4 起）
- [ ] **正式網域遷移**：`loherb-test.web.app/party/` → `party.loherb.com.tw`，更新所有 canonical / OG URL
- [ ] **內容國際化**：英文頁從翻譯版升級為**獨立內容**（針對國際旅客敘事）
- [ ] **VIP 會員系統**：累計消費、生日特典、優先訂位（與私廚 / Villa 打通）
- [ ] **後台 CMS**：journal.html 改由 Notion / Sanity 拉資料，編輯不需動 HTML
- [ ] **影音內容**：YouTube channel 重啟，每月 1 支 cinematic short
- [ ] **PR 投放**：與宜蘭觀光 / 旅遊雜誌合作專欄

---

## 五、關鍵 KPI（建議追蹤）

### 流量指標
| 指標 | Phase 1 baseline | Phase 2 目標 | Phase 3 目標 |
|---|---|---|---|
| 月 UV | （待 GA4 起算） | 3,000 | 8,000 |
| 平均工作階段 | — | 2:00 | 3:30 |
| 跳出率 | — | < 65% | < 50% |
| 行動裝置比例 | — | ≥ 70% | ≥ 75% |

### 轉換指標
| 指標 | Phase 2 目標 | Phase 3 目標 |
|---|---|---|
| 月訂位（線上） | 80 | 200 |
| 月詢價（包場） | 12 | 30 |
| LINE 加好友 | 50/月 | 150/月 |
| 部落客 / IG tag | 8 篇/月 | 20 篇/月 |

### SEO 指標
| 指標 | Phase 2 | Phase 3 |
|---|---|---|
| 「宜蘭咖啡廳」自然排名 | 進前 50 | 進前 20 |
| 「宜蘭包場活動」自然排名 | 進前 30 | 進前 10 |
| Google 評價數 | 1,300+ | 1,500+ |
| Lighthouse Performance | ≥ 85 | ≥ 92 |

---

## 六、營運注意事項（CEO 備忘）

### 排程協同
- ⚠️ **週二–週四午餐**：日光私廚為**包場專用**時段。日光時刻 cafe 在此時段散客如常開放，但**廣告投放需明確區分**：私廚的午餐廣告須避開週二三四（依 `project_cuisine_operations.md`）；日光時刻 cafe 的午餐廣告可全週投放。
- 🔁 **內容互引**：cafe.html 提到晚餐選項時導向 cuisine.loherb.com.tw（已實裝），cuisine 也應反向加 cafe 連結。

### 訂位流邏輯
目前有 **2 條訂位路徑並存**，建議 Phase 3 收斂為 1 條：
- 路徑 A：`/party/book.html`（自建表單，未串後台）
- 路徑 B：`party.loherb.com.tw/zh/book`（舊系統，含 inline-react / 第三方）
**推薦**：B 收斂為 A，並把 A 的後端接 Notion / Sheets / Airtable，業務面板統一。

### 風險與依賴
| 風險 | 緩解 |
|---|---|
| 圖片版權（特別是 Unsplash 飲料圖） | Phase 2 替換為實拍 |
| Firebase Hosting 流量爆量 | 預備 Cloudflare 緩存層 |
| 季節性需求峰谷大 | Phase 3 季節限定 LP + 廣告自動排程 |
| SEO 字詞競爭（宜蘭咖啡廳） | 內容策略偏向長尾（如「宜蘭玻璃屋下午茶」「宜蘭包場場地 50 人」） |

---

## 七、團隊分工建議

| 角色 | 職責 | 時間投入 |
|---|---|---|
| **CEO（您）** | 願景、商業決策、Phase 重點選擇、品牌語氣把關 | 每週 2 小時審視 |
| **AI 工程協作（Claude）** | HTML/CSS/JS 實作、SEO meta、技術文件、部署 | On-demand |
| **內容編輯** | journal 文章、季節文案、IG 同步 | 每週 4 小時 |
| **攝影師（外包）** | 每季 1 次大型拍攝（春夏秋冬） | 每季 1 天 |
| **業務（包場線）** | events / venues / gourmet 詢價跟進 | 每日 |
| **店務（cafe）** | 訂位回覆、現場運營、菜單更新提報 | 每日 |

---

## 八、近期 7 天行動清單

1. **今日**：v1.17.0 已部署，分享 WEBSITE-REPORT.md 給團隊內部 review
2. **24 hr 內**：手機 + 桌機實機測試所有 19 頁，回報任何視覺異常
3. **48 hr 內**：Google Search Console 提交 sitemap.xml
4. **3 日內**：決定訂位流收斂方向（A or B）
5. **5 日內**：補圖片 alt 的第一波（hero / cafe collage / 評價區）
6. **7 日內**：journal.html 上 1 篇 5 月新文，測試內容生產流程

---

## 九、附錄：相關文件索引

| 文件 | 用途 | 路徑 |
|---|---|---|
| `WEBSITE-REPORT.md` | v1.17.0 健檢報告（bug 修復 / 響應式 / 程式碼精簡） | `/party/WEBSITE-REPORT.md` |
| `SEO-OPTIMIZATION.md` | SEO 策略完整文件（關鍵字 / schema / robots） | `/party/SEO-OPTIMIZATION.md` |
| `PROJECT-PLAN.md`（本檔） | 專案藍圖、KPI、四階段路線圖 | `/party/PROJECT-PLAN.md` |
| `robots.txt` / `sitemap.xml` | 搜尋引擎指南 | `/party/robots.txt`、`/party/sitemap.xml` |
| `.deploy.sh` | 一鍵部署腳本 | `/loherb-group/.deploy.sh` |
| LOHERB CIS Skill | 品牌 CIS（5 色主題） | `~/.claude/skills/loherb-cis/` |

---

**最後更新**：2026-05-20 by Claude (master release v1.17.0)
**下次審視**：建議 Phase 2 結束時（2026-Q3 初）
