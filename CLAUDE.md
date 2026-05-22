# CLAUDE.md

Claude Code 工作須知 — 詳細說明請見 [README.md](./README.md)。

## 是什麼

日光 LOHERB 集團與六個子品牌的靜態網站集合 + 共用 Firebase Hosting。

- **集團主站**：`main/`、`careers/`
- **六大品牌**：`villa/`（旅宿）、`cuisine/`（高餐）、`estate/`（物業）、`party/`（活動／咖啡館）、`wedding/`（婚禮）、Design 子品牌在外部 `dearbb.design`
- **實驗 / 內部**：`villa-redesign/`（旅宿改版實驗）、`yilan-deals/`（旅遊優惠，**不列入主導覽**）
- 每個子站皆有 `xxx/index.html`（中文）+ `xxx/en/` 或 `xxx/en.html`（英文）

## 部署

```bash
./.deploy.sh patch "commit message"   # patch / minor / major / vX.Y.Z
```

一個指令搞定：git commit + tag + push 到 `ursa0915/loherb-group` → rsync 到 `/Users/ursa/Documents/loherb-firebase/` → `firebase deploy --only hosting:loherb-test`。

線上：https://loherb-test.web.app（測試）／各事業體有獨立網域。

## 編輯與部署規則

1. 只在 `/Users/ursa/Claude/AI_Website/loherb-group/` 編輯。**不要動** `~/Documents/loherb-firebase/`（rsync 目的地）。
2. **不要動** `wedding/vendor/`、`wedding/storage/`、`wedding/bootstrap/`、`wedding/app/`、`wedding/config/`、`wedding/database/` 等 Laravel 工作目錄 — 已在 deploy.sh 與 .gitignore 排除。
3. 圖片放在各頁面的 `images/` 或 `image/` 子資料夾，**不再**細分子目錄，採語意化檔名（`hero-*` / `gallery-*` / `service-0X-*` 等）。
4. 字體鎖定：LOHERB 用 Bodoni 72、日／光用 Noto Serif TC、英文顯示標用 Cormorant Garamond、英文內文用 Manrope。詳見 `CIS.md`。
5. 毛玻璃 + 文字疊圖時，毛玻璃放 `::before` + `isolation: isolate`，避免遮罩連帶把文字變半透明。

## 部署過期 / 常見錯誤

- `Authentication Error: Your credentials are no longer valid` → `firebase login --reauth`
- `! [rejected] main -> main (fetch first)` → `git pull --rebase && git push`
- 部署資料夾不對 → 從 `~/Documents/loherb-firebase` 跑 `firebase deploy`（deploy.sh 自動切換）

## 規劃中：Laravel 遷移

詳見 [README.md → Laravel 遷移計畫](./README.md#laravel-遷移計畫)。重點：

- 同一個 Laravel app 處理中文 + 英文，路由用 locale prefix `/{locale}/...`
- 漸進式遷移：先做 `wedding/`（已開始 Filament 後台）、再 `estate/` → 其他子站
- Hosting 從 Firebase 靜態 → Cloud Run（容器 PHP）或 Laravel Forge
- 靜態網站不會立刻退場 — Laravel 與靜態頁可並存於 Firebase rewrites 之後
