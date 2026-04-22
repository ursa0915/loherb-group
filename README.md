# 日光 LOHERB Group Website

日光集團官方網站 — 集團主站與六大子品牌頁面。

## 🏢 品牌架構

| 品牌 | 中文 | 資料夾 | 線上網址 |
|------|------|--------|---------|
| **Villa** | 日光綠築 | `villa/` | [villa.loherb.com.tw](https://villa.loherb.com.tw) |
| **Cuisine** | 日光私廚 | `cuisine/` | [cuisine.loherb.com.tw](https://cuisine.loherb.com.tw) |
| **Estate** | 日光物業 | `estate/` | [estate.loherb.com.tw](https://estate.loherb.com.tw) |
| **Party** | 日光時刻 | `party/` | [party.loherb.com.tw](https://party.loherb.com.tw) |
| **Wedding** | 日光婚禮 | `wedding/` | [wedding.loherb.com.tw](https://wedding.loherb.com.tw) |
| **Design** | 日光文創 | — | [design.loherb.com.tw](https://design.loherb.com.tw) |

## 📁 專案結構

```
loherb-group/
├── main/            # 集團主站（日光 LOHERB 集團首頁）
│   ├── index.html
│   └── images/
├── villa/           # 日光綠築 — 旅宿
├── cuisine/         # 日光私廚 — 高餐
├── estate/          # 日光物業
├── party/           # 日光時刻 — 活動 / 咖啡館
└── wedding/         # 日光婚禮
```

## 🎨 品牌識別 (CIS)

- **色彩系統**：經典金 / 森林綠 / 夜藍莓果 / 橄欖金 / 青瓷玫瑰
- **品牌金**：`#E6A401`
- **字體**：Bodoni 72（英）、Aptos / 思源宋體（中）
- **Logo 排列**：日 → LOHERB → 光（垂直三段）

## 🚀 部署

### 本地預覽
```bash
cd main
python3 -m http.server 8090
# 造訪 http://localhost:8090
```

### Firebase Hosting 部署（測試站）
```bash
cd /Users/ursa/Documents/loherb-firebase
./.firebase-deploy.sh
```

- **測試網址**：https://loherb-test.web.app
- **Firebase 專案**：`loherb-shared-journal`

## 📝 品牌 Slogan

> 享受生活，每一天

## 🌱 Philosophy

為人與自然搭起橋梁 — 在這裡住下、用餐、相聚，見證愛情、親手創造，每一刻，都是故事的開始。

---

© 2026 日光 LOHERB Group. All rights reserved.
