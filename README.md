# 日光 LOHERB Group Website

日光集團官方網站 — 集團主站、企業徵才、六大子品牌頁面，外加旅遊優惠子站。

> **品牌標語**：享受生活，每一天 / Enjoy Life, Every Day.

---

## 目錄

- [品牌架構](#品牌架構)
- [專案結構](#專案結構)
- [技術棧](#技術棧)
- [本機開發](#本機開發)
- [部署流程](#部署流程)
- [版本號規則](#版本號規則)
- [品牌識別 CIS](#品牌識別-cis)
- [圖片命名慣例](#圖片命名慣例)
- [Laravel 遷移計畫](#laravel-遷移計畫)
- [常見問題](#常見問題)

---

## 品牌架構

| 品牌 | 中文 | 資料夾 | 線上網址 |
|---|---|---|---|
| **Villa** | 日光綠築 | `villa/` `villa-redesign/` | [villa.loherb.com.tw](https://villa.loherb.com.tw) |
| **Cuisine** | 日光私廚 | `cuisine/` | [cuisine.loherb.com.tw](https://cuisine.loherb.com.tw) |
| **Estate** | 日光物業 | `estate/` | [estate.loherb.com.tw](https://estate.loherb.com.tw) |
| **Party** | 日光時刻 | `party/` | [party.loherb.com.tw](https://party.loherb.com.tw) |
| **Wedding** | 日光婚禮 | `wedding/` | [wedding.loherb.com.tw](https://wedding.loherb.com.tw) |
| **Design** | 日光文創 | （外部）| [dearbb.design](https://dearbb.design) |
| **集團主站** | LOHERB Group | `main/` | [loherb.com.tw](https://loherb.com.tw) |
| **企業徵才** | Careers | `careers/` | `/careers` |
| **旅遊優惠** | LOHERB Travel | `yilan-deals/` | [travel.loherb.com.tw](https://travel.loherb.com.tw) |

每個子站均提供 **中文 + 英文** 兩種版本（多數為 `xxx/index.html` + `xxx/en/index.html`）。

---

## 專案結構

```
loherb-group/
├── .deploy.sh              # 一鍵發版腳本（patch / minor / major / vX.Y.Z）
├── .gitignore
├── CLAUDE.md               # Claude Code 工作須知（精簡版）
├── README.md               # 本檔
├── ARCHITECTURE.md         # 早期架構文件（歷史紀錄）
├── CIS.md                  # 品牌識別系統完整規範
├── llms.txt / llms-full.txt # AI 引擎索引用
├── robots.txt
│
├── main/                   # 集團主站
│   ├── index.html          # 中文
│   ├── en.html             # 英文
│   └── images/
│
├── careers/                # 企業徵才
│   ├── index.html, en.html
│   └── image/
│
├── villa/                  # 旅宿（舊版／佔位，主站在外部）
├── villa-redesign/         # 旅宿改版實驗站
│   ├── index.html, about.html, rooms.html, journal.html, contact.html, faq.html
│   └── assets/
│
├── cuisine/                # 高餐
├── estate/                 # 物業
│   ├── index.html, sustainability.html, contact.html
│   ├── en/{index,sustainability,contact}.html
│   └── image/
│
├── party/                  # 活動／咖啡館
│   ├── index.html, cafe.html, menu.html, ...
│   └── SEO-OPTIMIZATION.md, PROJECT-PLAN.md, WEBSITE-REPORT.md
│
├── wedding/                # 婚禮（含 Laravel 工作目錄，已 gitignore）
│   ├── index.html, venues.html, cuisine.html, experience.html, journal.html, contact.html
│   ├── en/...               # 英文版完整目錄
│   ├── images/
│   └── （Laravel app/ config/ database/ vendor/ … 已排除）
│
├── yilan-deals/            # 旅遊優惠子站（travel.loherb.com.tw）
│   ├── index.html, image/, sitemap.xml
│   └── WEBSITE-REPORT-v2.md
│
└── wedding-static-backup/  # 婚禮舊靜態備份（歷史保留）
```

---

## 技術棧

| 層 | 用什麼 |
|---|---|
| 內容 | 純 HTML + CSS + 內嵌 JS（無框架） |
| 字體 | Google Fonts（Noto Serif TC / Cormorant Garamond / Manrope）＋ 系統 Bodoni 72 |
| 圖片 | 本地 JPG / PNG / WebP（語意化命名）＋ Unsplash 外連模擬圖 |
| 版本控管 | Git + GitHub（[ursa0915/loherb-group](https://github.com/ursa0915/loherb-group)） |
| Hosting | Firebase Hosting（專案 `loherb-shared-journal`、site `loherb-test`） |
| Cloud Functions | `sendWeddingInquiry`（asia-east1，婚禮表單收件） |
| SEO | meta + OG + Twitter Cards + JSON-LD（LocalBusiness, FAQPage, BreadcrumbList）+ sitemap.xml |
| AI Engine | llms.txt + llms-full.txt + robots.txt 允許 GPTBot/ClaudeBot/PerplexityBot 等 |

未來規劃：婚禮站轉 Laravel + Filament 後台（已開始建構）。

---

## 本機開發

只需要一台有 Python 3 的 Mac：

```bash
# 在任何子站資料夾下開啟靜態檔伺服器
cd main
python3 -m http.server 8090
# 開瀏覽器到 http://localhost:8090
```

或用 VS Code 的 Live Server 套件直接預覽單一 HTML 檔。

**重要**：所有編輯必須在 `/Users/ursa/Claude/AI_Website/loherb-group/`，**不要**在桌面、Documents 或其他位置複製副本。

---

## 部署流程

### 一鍵發版

```bash
./.deploy.sh patch "修正某段文案"          # 自動 vX.Y.Z → vX.Y.(Z+1)
./.deploy.sh minor "新增頁面或功能"         # vX.Y.Z → vX.(Y+1).0
./.deploy.sh major "整站重構"               # vX.Y.Z → v(X+1).0.0
./.deploy.sh v2.5.0 "指定版號"              # 直接設定
```

每次發版會自動執行三步驟：

```
編輯 /Users/ursa/Claude/AI_Website/loherb-group/<檔案>
              │
              ▼
    ./.deploy.sh patch "..."
              │
       ┌──────┴──────┐
       ▼             ▼
  GitHub push    rsync 同步
   + tag         到 ~/Documents/loherb-firebase/
       │             │
       │             ▼
       │      firebase deploy
       │             │
       └─────────────┴─────────► https://loherb-test.web.app
```

腳本內部會：

1. `git add -A` → `git commit -m "<訊息>"` → `git tag -a vX.Y.Z` → `git push && git push origin vX.Y.Z`
2. `rsync -a --delete` 同步原始碼到 `~/Documents/loherb-firebase/`（排除 .git、Laravel 工作目錄、設定檔等）
3. `firebase deploy --only hosting:loherb-test --project loherb-shared-journal`

### Firebase 設定

- **專案 ID**：`loherb-shared-journal`
- **Hosting Site**：`loherb-test`（測試）
- **線上**：https://loherb-test.web.app
- **Cache 政策**：HTML `no-cache`、圖片 30 天、CSS/JS 一年 immutable
- **rewrites**：根 `/` → `/main/`、`/villa` `/cuisine` `/estate` `/party` `/wedding` `/careers` 等乾淨網址，內頁如 `/estate/sustainability`、`/estate/en` 等也有對應

### 不要動的東西

- ❌ `~/Documents/loherb-firebase/` — 那是 rsync 中繼站，會被覆蓋
- ❌ `wedding/vendor/`、`wedding/storage/`、`wedding/bootstrap/cache/`、`wedding/node_modules/` — Laravel 工作目錄，已 gitignore
- ❌ `~/Desktop` 上的網站副本 — 不要建立

---

## 版本號規則

採用 Semantic Versioning（vMAJOR.MINOR.PATCH）。

| 類型 | 範例 | 適用 |
|---|---|---|
| `patch` | v1.5.13 → v1.5.14 | 文案修正、CSS 微調、bug fix、圖片替換 |
| `minor` | v1.5.x → v1.6.0 | 新增頁面、新區塊、新功能 |
| `major` | v1.x → v2.0.0 | 整站重構、結構性改動、技術棧切換 |

每個 tag 對應 GitHub release：https://github.com/ursa0915/loherb-group/releases

---

## 品牌識別 CIS

完整規範在 [CIS.md](./CIS.md)。重點摘要：

### 字體系統

| 用途 | 字體 |
|---|---|
| Logo「LOHERB」 | **Bodoni 72**（系統字）／ Bodoni Moda fallback |
| Logo「日 / 光」 | **Noto Serif TC** |
| 英文標題（顯示） | **Cormorant Garamond** |
| 英文內文 | **Manrope** |
| 中文標題／內文 | **Noto Serif TC** |

CSS 變數命名：`--font-logo` / `--font-zh-logo` / `--font-en` / `--font-display` / `--font-zh` / `--font-body`。

Logo 字體永遠用 `!important` 鎖定，避免其他規則覆蓋。

### 色彩

主色板（經典金）：

| 角色 | 色碼 |
|---|---|
| 品牌金 | `#E6A401` |
| 深金 | `#D08C03` |
| 炭灰 | `#505350` |
| 暖白 | `#FAF2F0` |

各子品牌另有專屬色彩（CIS.md 詳列）：森林綠（Villa）／橄欖金（Cuisine）／海軍藍（Estate）／夜藍莓果（Party / Wedding）／青瓷玫瑰（SPA／柔性場景）。

### 設計原則

1. 極簡留白、東方直排美學
2. 一頁一重點
3. 材質感（金屬拉絲、紙質、石材）
4. 深淺對比，不用漸層／陰影／花俏裝飾
5. **毛玻璃 + 文字**：永遠把毛玻璃放在 `::before` 並用 `isolation: isolate`，否則 mask 會連帶把文字變半透明

---

## 圖片命名慣例

語意化、扁平化（**不分**子資料夾），看檔名就知道用在哪。

| 規則 | 範例 |
|---|---|
| `hero-*` | `hero-sustainable-architecture.png`、`hero-slide-couple-ceremony.jpg` |
| `page-hero-*` | `page-hero-aerial-view.jpg` |
| `gallery-*` | `gallery-bride.jpg`、`gallery-newlyweds.jpg` |
| `wedding-*` / `venue-*` | `wedding-outdoor-lawn.jpg`、`venue-poolside.jpg` |
| `service-0X-*` | `service-01-planning.png` … `service-06-music.png` |
| `cuisine-*` | `cuisine-outdoor-bbq.png` |
| `brand-card-*` | `brand-card-estate.jpg` |
| `eco-*` / `sustainability-*` | `eco-tokyo-cityscape.jpg`、`sustainability-impact.jpg` |
| 原始檔備份 | `xxx-original-raw.jpg` |

優化：所有圖片 ≤ 2400px、品質 ≈ 85、JPG 為主、首屏圖檔 `<link rel="preload" as="image">`。

---

## Laravel 遷移計畫

> 目標：保留靜態站速度與 SEO 優勢，把需要後台、表單收件、會員、訂位等**動態功能**統一收進一個 Laravel App。**同一個 app 處理中文 + 英文**。

### 為什麼考慮 Laravel

| 動機 | 現況痛點 |
|---|---|
| **表單後端** | 婚禮洽詢已用 Firebase Functions 處理，但散落、難擴充。Contact、徵才、訂位、優惠申請都需要結構化儲存 |
| **內容管理** | 文案／圖片散在 30+ HTML，CEO 想換字要工程師動手 — 需要 CMS |
| **多語切換** | 目前是中英分檔（`index.html` + `en/index.html`），文案重複維護易漏掉 |
| **訂位／預約** | Cuisine 訂位、Party 包場、Wedding 顧問預約、Villa 房間 — 需要會員 + 行事曆 |
| **SEO 強化** | 動態 sitemap、自動 hreflang、JSON-LD by data 比靜態硬寫好維護 |

已開始的部分：`wedding/` 目錄裡有 Laravel 11 + Filament 3 的雛形（`app/Filament/Resources/InquiryResource.php` 等），目前未啟用 SSR。

### 目標 App 結構

```
loherb-app/                  ← 全新獨立 repo 或保留在 loherb-group/
├── app/
│   ├── Http/Controllers/
│   │   ├── HomeController.php
│   │   ├── VillaController.php
│   │   ├── EstateController.php
│   │   ├── WeddingController.php
│   │   └── InquiryController.php
│   ├── Filament/
│   │   └── Resources/        ← 各品牌的後台 CRUD
│   ├── Models/
│   │   ├── Page.php          ← CMS 頁面內容
│   │   ├── Inquiry.php       ← 表單收件
│   │   ├── Property.php      ← Estate 物業項目
│   │   ├── Room.php          ← Villa 房型
│   │   └── ...
│   └── Services/
│       └── LocaleService.php
│
├── resources/
│   ├── views/
│   │   ├── layouts/app.blade.php
│   │   ├── villa/{index,rooms,journal,contact}.blade.php
│   │   ├── estate/{index,sustainability,contact}.blade.php
│   │   ├── wedding/{index,venues,cuisine,experience,journal,contact}.blade.php
│   │   └── components/         ← 共用 nav、footer、frosted glass 等
│   └── lang/
│       ├── zh-Hant/messages.php
│       └── en/messages.php
│
├── routes/
│   └── web.php               ← locale prefix 路由
│
├── database/
│   └── migrations/
│       ├── pages
│       ├── inquiries
│       ├── properties
│       └── rooms
│
├── public/
│   └── images/               ← 所有圖片集中（或維持子站結構）
│
└── config/
    └── app.php               ← supported_locales, default_locale
```

### 同一個 App 處理中文 + 英文

#### 1. 設定 supported locales

```php
// config/app.php
'locale' => 'zh-Hant',
'fallback_locale' => 'zh-Hant',
'supported_locales' => ['zh-Hant', 'en'],
```

#### 2. 路由用 locale prefix

```php
// routes/web.php
Route::group([
    'prefix' => '{locale?}',
    'where' => ['locale' => 'en'],   // 只有 en 走 prefix，中文走根
    'middleware' => 'set.locale',
], function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');

    Route::prefix('estate')->name('estate.')->group(function () {
        Route::get('/', [EstateController::class, 'index'])->name('index');
        Route::get('/sustainability', [EstateController::class, 'sustainability'])->name('sustainability');
        Route::get('/contact', [EstateController::class, 'contact'])->name('contact');
    });

    Route::prefix('wedding')->name('wedding.')->group(function () {
        Route::get('/', [WeddingController::class, 'index'])->name('index');
        // ...
    });
});
```

URL 對應：
- 中文：`loherb.com.tw/estate/sustainability`
- 英文：`loherb.com.tw/en/estate/sustainability`

#### 3. Middleware 切換 locale

```php
// app/Http/Middleware/SetLocale.php
public function handle($request, Closure $next)
{
    $locale = $request->route('locale') ?? 'zh-Hant';
    if (!in_array($locale, config('app.supported_locales'))) {
        abort(404);
    }
    App::setLocale($locale);
    return $next($request);
}
```

#### 4. Blade 共用模板 + 翻譯

`resources/views/estate/index.blade.php`：

```blade
@extends('layouts.app')

@section('content')
  <h1>{{ __('estate.hero_title') }}</h1>
  <p>{{ __('estate.hero_subtitle') }}</p>

  {{-- 共用毛玻璃元件 --}}
  <x-frosted-glass-card>
    {{ __('estate.intro') }}
  </x-frosted-glass-card>
@endsection
```

`resources/lang/zh-Hant/estate.php`：

```php
return [
    'hero_title' => '與大地共生的建築哲學',
    'hero_subtitle' => '永續建築開發',
];
```

`resources/lang/en/estate.php`：

```php
return [
    'hero_title' => 'Designed With the Earth in Mind',
    'hero_subtitle' => 'Sustainable Architecture',
];
```

#### 5. Filament 後台 — 雙語欄位

用 [`spatie/laravel-translatable`](https://github.com/spatie/laravel-translatable) 或 Filament 的多語套件，讓每篇文章、每個物業項目都是雙語 JSON：

```php
// Filament Resource
TextInput::make('title.zh-Hant')->label('標題（中）'),
TextInput::make('title.en')->label('Title (EN)'),
```

#### 6. 語系切換器

每頁 nav 都有「中 / EN」切換鈕，背後產生對應 URL：

```blade
<a href="{{ LocaleSwitcher::url('zh-Hant') }}">中</a>
<a href="{{ LocaleSwitcher::url('en') }}">EN</a>
```

### Hosting 切換

| 現況 | 目標 |
|---|---|
| Firebase Hosting（靜態） | **Cloud Run**（容器化 PHP，自動 scale） + Cloud SQL（MySQL）|
| 婚禮 Functions sendInquiry | 改成 Laravel Controller |
| 靜態圖片 | Cloud Storage / 維持 Firebase Hosting CDN |

Firebase Hosting 可保留為 CDN／靜態 fallback，rewrite 動態請求到 Cloud Run。

### 漸進式遷移路徑（建議順序）

1. **Phase 1 — Wedding 完整切換**（已 70% 就緒）
   - 把現有 `wedding/app/` 完整化、加 Inquiry/Venue/Package 三個 Resource
   - DB schema、Migration、Seeder
   - Blade view 改寫 6 個頁面（zh + en）
   - 部署到 Cloud Run，Firebase rewrite `/wedding` → Cloud Run
   - **里程碑**：婚禮顧問可在 Filament 後台改照片、改文案、看洽詢

2. **Phase 2 — Estate 移植**
   - 5 個物業項目、永續報告下載、聯絡表單
   - 重點：sustainability 認證資料模型化（未來可加新認證不動程式）

3. **Phase 3 — Cuisine + Party**
   - 菜單、IG Feed、訂位（接 Inline / SevenRooms API）
   - Party 咖啡館營業時段、Pop-up 活動

4. **Phase 4 — Main + Careers + Villa**
   - 集團首頁文案 CMS 化
   - Careers 串 104 API（拉職缺即時）

5. **Phase 5 — Yilan Deals 整合**
   - 旅遊優惠子站可獨立、可整進去（看商業策略）

每個 Phase 之間，**靜態站不下線**：Firebase rewrites 控制哪些路由走 Cloud Run、哪些還是靜態 HTML。

### Phase 1 詳細工時估算

| 任務 | 時間 |
|---|---|
| Laravel 11 + Filament 3 環境設定 | 2 hr |
| Inquiry / Venue / Package 三個 Resource + Migration | 1 day |
| Wedding 中英版 6 頁 Blade 改寫 | 2–3 day |
| Cloud Run 部署 + Cloud SQL 連線 | 1 day |
| Firebase rewrite 切換 + 測試 | 0.5 day |
| **合計** | **約 5–6 個工作天** |

---

## 常見問題

### Q：Firebase 認證過期
```
firebase login --reauth
```

### Q：GitHub push 被拒（fetch first）
```
git pull --rebase
git push
```

### Q：圖片更新了但網頁看到舊圖
- 強制重新整理：Safari `Cmd + Option + R`、Chrome `Cmd + Shift + R`
- 或用私密視窗開：Safari `Cmd + Shift + N`

### Q：要新增一張圖片到網頁
1. 把圖檔放到對應子站的 `images/` 或 `image/` 資料夾
2. 用語意化檔名（不要 `IMG_1234.jpg`）
3. HTML 直接 `<img src="./image/your-name.jpg">`
4. `./.deploy.sh patch "..."`

### Q：要做大改但怕弄壞
```bash
git checkout -b experiment      # 開分支
# ...修改...
git commit -am "WIP"
# 如果不滿意：
git checkout main
git branch -D experiment        # 丟掉
```

### Q：誤刪檔案或誤 commit 想還原
```bash
git log --oneline               # 找到要回去的 commit
git revert <commit-hash>        # 安全：建立反向 commit
# 或極端做法：
git reset --hard <commit-hash>  # 危險：本機歷史會消失
```

---

## 授權與聯絡

- © 2026 LOHERB Group. All rights reserved.
- Built by Disp-Tech.
- 一般聯絡：service@loherb.com.tw
- 技術維護：透過 GitHub Issues 或內部 Slack
