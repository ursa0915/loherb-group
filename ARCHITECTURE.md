# 日光 LOHERB 網站架構總覽

最後更新：v1.3.25

---

## 一、本機資料夾結構

```
/Users/ursa/Claude/
└── loherb-group/                    ← 唯一一份原始碼
    ├── .git/                        ← GitHub 同步用
    ├── .deploy.sh                   ← 一鍵發版腳本（patch / minor / major）
    ├── .gitignore
    ├── README.md
    ├── CIS.md                       ← 品牌識別系統文件
    ├── ARCHITECTURE.md              ← 本檔案
    │
    ├── main/                        ← 集團首頁
    │   ├── index.html               ← 中文版
    │   ├── en.html                  ← 英文版
    │   └── images/                  ← 4 張使用 + 2 張 RAW 備份
    │
    ├── careers/                     ← 企業徵才頁
    │   ├── index.html               ← 中文版
    │   ├── en.html                  ← 英文版
    │   └── image/                   ← careers-hero.png
    │
    ├── wedding/                     ← 婚禮事業
    │   ├── index.html, venues.html, cuisine.html
    │   ├── experience.html, journal.html, contact.html
    │   ├── en/                      ← 英文版完整目錄
    │   └── images/                  ← 28 張語意化命名
    │
    ├── villa/                       ← 旅宿（少量本地檔，主要由 villa.loherb.com.tw 服務）
    ├── cuisine/                     ← 高餐（同上）
    ├── estate/                      ← 物業
    └── party/                       ← 活動
```

---

## 二、GitHub 推送

| 項目 | 內容 |
|---|---|
| Repo | `ursa0915/loherb-group` |
| URL | https://github.com/ursa0915/loherb-group |
| 主分支 | `main` |
| 協作者 | KnucklesHuang |
| 版本標記 | Semantic Versioning（vMAJOR.MINOR.PATCH）|
| 目前版本 | v1.3.25 |

**版本號規則**
- `patch`（v1.3.25 → v1.3.26）：文案修正、CSS 微調、bug fix
- `minor`（v1.3.x → v1.4.0）：新增區塊、新功能
- `major`（v1.x → v2.0.0）：整站改版、結構重組

每次發版都會自動：
1. `git add -A`
2. `git commit -m "<訊息>"`
3. `git tag -a vX.Y.Z`
4. `git push && git push origin vX.Y.Z`

---

## 三、Firebase 部署

### Firebase 專案
- **Project ID**：`loherb-shared-journal`
- **Console**：https://console.firebase.google.com/project/loherb-shared-journal

### Hosting Site
- **Site ID**：`loherb-test`
- **Live URL**：**https://loherb-test.web.app**

### 部署中繼資料夾
```
/Users/ursa/Documents/loherb-firebase/
├── firebase.json     ← rewrites / headers / cache 設定
├── .firebaserc       ← target: loherb-test → loherb-shared-journal
└── （從 loherb-group 同步過來的所有頁面 + 圖片）
```

每次發版時，`.deploy.sh` 用 `rsync` 把 `loherb-group/` 整個拷到此資料夾（排除 `.git`、`.deploy.sh`、`firebase.json`、`.firebaserc`），再從這裡執行 `firebase deploy`。

### URL 對應（rewrites）
| 線上路徑 | 實際檔案 |
|---|---|
| `/` | 301 redirect → `/main/` |
| `/main/` | `main/index.html` |
| `/main/en.html` | 英文版集團首頁 |
| `/villa` | `villa/index.html` |
| `/cuisine` | `cuisine/index.html` |
| `/wedding` | `wedding/index.html` |
| `/wedding/journal` | `wedding/journal.html` |
| `/party` | `party/index.html` |
| `/estate` | `estate/index.html` |
| `/careers` | `careers/index.html` |
| `/api/wedding-inquiry` | Cloud Function `sendWeddingInquiry`（asia-east1）|

### Cache 設定
- `*.html` → `no-cache`（每次都拿最新）
- `*.jpg/png/webp/avif/svg` → 30 天
- `*.css/js` → 1 年 immutable

---

## 四、發版指令

從 `/Users/ursa/Claude/loherb-group/` 目錄下：

```bash
./.deploy.sh patch "修正某段文案"            # 自動 v1.3.25 → v1.3.26
./.deploy.sh minor "新增 SPA 頁面"            # 自動 → v1.4.0
./.deploy.sh major "整站重構"                 # 自動 → v2.0.0
./.deploy.sh v2.5.0 "自訂版號"                # 直接指定
```

每次跑完會印出：
- 新版本號
- GitHub release 連結
- Firebase live URL

---

## 五、流程圖

```
編輯 /Users/ursa/Claude/loherb-group/<某檔案>
              │
              ▼
    ./.deploy.sh patch "..."
              │
       ┌──────┴──────┐
       ▼             ▼
  GitHub push    rsync 同步
   + tag         到 /loherb-firebase/
       │             │
       │             ▼
       │      firebase deploy
       │             │
       └─────────────┴─────────► https://loherb-test.web.app
```

---

## 六、目前不在這個 repo 的子站

旅宿（villa）、高餐（cuisine）等子品牌站除了少量本地佔位，主要由獨立網域提供：
- https://villa.loherb.com.tw
- https://cuisine.loherb.com.tw
- https://estate.loherb.com.tw
- https://party.loherb.com.tw
- https://dearbb.design（Design / 文創）

這些在集團首頁與 careers 頁面以外連的方式呈現，本地端 `loherb-group/villa`、`/cuisine` 等資料夾僅作為 fallback 與測試用。

---

## 七、品牌設定

CIS 詳細規範在 `CIS.md`。重點：

| 字體用途 | 字型 |
|---|---|
| Logo「LOHERB」 | Bodoni 72（系統字）/ Bodoni Moda fallback |
| Logo「日 / 光」 | Noto Serif TC |
| 英文標題 | Cormorant Garamond |
| 英文內文 | Manrope |
| 中文標題/內文 | Noto Serif TC |

主色板（經典金）
- 品牌金 `#E6A401` / 深金 `#D08C03`
- 炭灰 `#505350` / 暖白 `#FAF2F0`

---

## 八、重要備註

- **不要**手動編輯 `/Users/ursa/Documents/loherb-firebase/` 裡的檔案，那只是中繼站，每次 deploy 都會被 rsync 覆蓋
- **不要**在桌面 (`~/Desktop`) 建立網站工作副本，所有原始碼僅在 `/Users/ursa/Claude/loherb-group/`
- 圖片放在各頁面的 `images/` 或 `image/` 子資料夾，**不再**細分子目錄
- 圖片命名採語意化：`brand-card-*` / `philosophy-*` / `careers-hero` / `hero-slide-*` / `service-0X-*` / `gallery-*` / `venue-*` / `cuisine-*`
