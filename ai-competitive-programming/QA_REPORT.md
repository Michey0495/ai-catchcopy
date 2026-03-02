# QA Report - AI Competitive Programming

Date: 2026-03-02

## Checklist

- [x] `npm run build` 成功
- [x] `npm run lint` エラーなし (0 errors, 0 warnings)
- [x] レスポンシブ対応（モバイル・デスクトップ）
- [x] favicon, OGP設定
- [x] 404ページ
- [x] ローディング状態の表示（空状態の表示あり）
- [x] エラー状態の表示

## Issues Found & Fixed

### SEO

| # | Issue | Fix |
|---|-------|-----|
| 1 | metadata title doubling: layouts set full title (e.g. "問題一覧 \| AI CP") which root template appends again | Changed layout/page titles to short form; root template `%s \| AI Competitive Programming` handles suffix |
| 2 | `robots.txt` domain inconsistency: used `ai-competitive-programming.ezoai.jp` instead of `ai-competitive-programming.ezoai.jp` | Fixed domain to `ai-competitive-programming.ezoai.jp` |
| 3 | Missing `sitemap.xml` (referenced in `robots.txt`) | Created `src/app/sitemap.ts` with dynamic routes for all pages and problems |

### Code Quality

| # | Issue | Fix |
|---|-------|-----|
| 4 | `difficultyColor`, `statusColor`, `statusLabel` duplicated across 4 files | Extracted to `src/lib/format.ts`; all pages now import from shared module |
| 5 | `formatTime` in submissions page lacked explicit timezone | Added `timeZone: "Asia/Tokyo"` to `formatTime` in `src/lib/format.ts` |
| 6 | Lint warnings: unused destructured vars in API routes | Added ESLint rule for `argsIgnorePattern: "^_"` and used `_` prefix convention |
| 7 | Unused default Next.js SVGs: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | Removed from `public/` |

### Accessibility

| # | Issue | Fix |
|---|-------|-----|
| 8 | Submissions/Rankings used div-grid instead of semantic `<table>` | Replaced with `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` |
| 9 | Feedback widget: close button missing `aria-label` | Added `aria-label="閉じる"` |
| 10 | Feedback widget: no `role="dialog"` or `aria-label` on container | Added `role="dialog" aria-label="フィードバック送信"` |
| 11 | Feedback widget: textarea missing label | Added `<label className="sr-only">` with `htmlFor` |
| 12 | Feedback type buttons: no semantic grouping | Wrapped in `<fieldset>` with `<legend className="sr-only">` |
| 13 | Feedback type buttons: no `aria-pressed` | Added `aria-pressed={type === t}` |
| 14 | Nav: no `aria-label` on `<nav>` | Added `aria-label="メインナビゲーション"` |

### Responsive Design

| # | Issue | Fix |
|---|-------|-----|
| 15 | Submissions 6-col grid breaks on mobile | Replaced with semantic `<table>` inside `overflow-x-auto` container |
| 16 | Rankings 7-col grid breaks on mobile | Same table + overflow-x-auto approach |
| 17 | Header nav overflows on small screens | Added mobile hamburger menu with show/hide toggle (`sm:hidden`/`hidden sm:flex`) |

### UX

| # | Issue | Fix |
|---|-------|-----|
| 18 | Header: no active link indication | Added `usePathname()` to highlight current route with `text-white` vs `text-white/50` |
| 19 | Feedback widget: uses `alert()` for error | Replaced with inline error message using state |
| 20 | Feedback widget: no response.ok check | Added `res.ok` check before marking as sent |
| 21 | Feedback widget: no input length limit | Added `maxLength={2000}` on textarea and `.slice(0, 2000)` on submit |
| 22 | Header hamburger menu: accessible toggle | Added `aria-expanded` and `aria-label` attributes |

## Known Limitations (Not Fixed)

These are architectural limitations noted during review but not addressed as they require design decisions beyond QA scope:

1. **In-memory store**: Data is ephemeral in serverless environments. `setTimeout`-based judge simulation may not fire in production Vercel functions.
2. **No API input validation/rate limiting**: API endpoints accept arbitrary payloads without schema validation or rate limiting.
3. **No authentication**: Any caller can submit as any agent name.
4. **`lucide-react` dependency**: Listed in `package.json` (likely pulled in by shadcn/ui), but project design rules forbid icon libraries. Currently not directly imported in custom code.
5. **Dead export**: `rankings` array in `data.ts` is exported but never imported (rankings are computed dynamically).

## Build Output

```
Route (app)
  / (Dynamic)
  /_not-found (Static)
  /api/feedback (Dynamic)
  /api/mcp (Dynamic)
  /api/problems (Dynamic)
  /api/problems/[id] (Dynamic)
  /api/rankings (Dynamic)
  /api/stats (Dynamic)
  /api/submissions (Dynamic)
  /problems (Dynamic)
  /problems/[id] (Dynamic)
  /rankings (Dynamic)
  /sitemap.xml (Dynamic)
  /submissions (Dynamic)
```
