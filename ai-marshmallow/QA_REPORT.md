# QA Report — AIマシュマロ

**Date:** 2026-03-01 (Updated: 2026-03-01 16:45)
**Tester:** Claude QA Agent
**Project:** ai-marshmallow (`/Users/lily/Desktop/dev/02dev/ai`)

---

## Build & Lint

| Check | Result |
|-------|--------|
| `npm run build` | ✅ Passed |
| `npm run lint` | ✅ Passed |
| TypeScript | ✅ No errors |

---

## Issues Found & Fixed (Round 1)

### 1. Missing custom 404 page [FIXED]
- **Severity:** Medium
- **File created:** `src/app/not-found.tsx`
- **Details:** No custom 404 page existed. Created a branded not-found page with navigation back to home.

### 2. Missing OGP image (og:image) [FIXED]
- **Severity:** High — affects SNS share previews
- **Files created:**
  - `src/app/opengraph-image.tsx` — static home page OGP (gradient with logo/title)
  - `src/app/q/[id]/opengraph-image.tsx` — dynamic Q&A OGP showing question + answer text
- **Details:** No og:image was set, causing blank previews when shared on Twitter/X, LINE, etc.

### 3. Missing `metadataBase` [FIXED]
- **Severity:** Medium — causes Next.js warning and incorrect absolute URL generation for OGP
- **File:** `src/app/layout.tsx`
- **Fix:** Added `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai.ezoai.jp")`

### 4. No robots.txt / sitemap.xml [FIXED]
- **Severity:** Low-Medium — SEO crawl guidance missing
- **Files created:**
  - `src/app/robots.ts` — allows all crawlers, references sitemap
  - `src/app/sitemap.ts` — lists `/` and `/about` with priority/frequency hints

### 5. ShareButtons — no copy feedback [FIXED]
- **Severity:** Low — UX issue
- **File:** `src/components/ShareButtons.tsx`
- **Fix:** Added `copied` state. Button text changes to "コピーしました！" for 2 seconds after clicking.

### 6. FeedbackWidget close button — no aria-label [FIXED]
- **Severity:** Low — accessibility
- **File:** `src/components/FeedbackWidget.tsx`
- **Fix:** Added `aria-label="閉じる"` to the `×` button.

### 7. QuestionForm textarea — no accessible label [FIXED]
- **Severity:** Low — accessibility
- **File:** `src/components/QuestionForm.tsx`
- **Fix:** Added `aria-label="質問を入力"` to the Textarea element.

---

## Issues Found & Fixed (Round 2)

### 8. About page title — template duplication [FIXED]
- **Severity:** Medium — SEO/UX
- **File:** `src/app/about/page.tsx`
- **Root cause:** Title was set to `"このサービスについて | AIマシュマロ"` but the root layout defines `title.template: "%s | AIマシュマロ"`. Next.js would apply the template, producing `"このサービスについて | AIマシュマロ | AIマシュマロ"` (duplicate suffix).
- **Fix:** Changed to `title: "このサービスについて"` — template now correctly produces `"このサービスについて | AIマシュマロ"`.

### 9. FeedbackWidget textarea — missing aria-label [FIXED]
- **Severity:** Low — accessibility
- **File:** `src/components/FeedbackWidget.tsx`
- **Fix:** Added `aria-label="フィードバック内容"` to the feedback textarea.

### 10. Q&A detail page — wrong Twitter card type [FIXED]
- **Severity:** Low-Medium — SNS preview quality
- **File:** `src/app/q/[id]/page.tsx`
- **Root cause:** Twitter card type was `"summary"` (small square image) but the `/q/[id]/opengraph-image` generates a 1200×630 landscape image, which requires `"summary_large_image"`.
- **Fix:** Changed `twitter.card` to `"summary_large_image"` to properly display the large OGP image on Twitter/X shares.

---

## Issues Confirmed OK (No Fix Needed)

| Area | Status | Notes |
|------|--------|-------|
| Input validation | ✅ | 280 char limit enforced on both client and server |
| Error state display | ✅ | QuestionForm shows error messages via sonner toast |
| Loading state | ✅ | Button shows "マシュが考え中…" during API call |
| Loading skeleton — home | ✅ | `src/app/loading.tsx` with animate-pulse skeletons |
| Loading skeleton — Q page | ✅ | `src/app/q/[id]/loading.tsx` with animate-pulse skeletons |
| Responsive layout | ✅ | `max-w-2xl mx-auto px-4` — works mobile to desktop |
| Favicon | ✅ | `src/app/favicon.ico` exists |
| Lang attribute | ✅ | `<html lang="ja">` set |
| Suspense fallback | ✅ | RecentQAs wrapped in Suspense with fallback text |
| Special character handling | ✅ | `whitespace-pre-wrap break-words` on answer/question text |
| Long text handling | ✅ | `break-words` prevents overflow; server truncates OGP text |
| API input sanitization | ✅ | `trim()` applied, type checked, length validated |
| Rate limiting | ✅ | IP-based rate limiting implemented in `/api/questions` |
| In-memory fallback | ✅ | Works without KV env vars (dev/staging) |
| KV production storage | ✅ | Conditional import of `@vercel/kv` |
| GA integration | ✅ | Conditional on `NEXT_PUBLIC_GA_ID` env var |
| SNS share URLs | ✅ | Properly encoded with `encodeURIComponent` |
| `noopener noreferrer` | ✅ | On all external `target="_blank"` links |
| Per-question metadata | ✅ | `generateMetadata` on `/q/[id]` for SEO |
| JSON-LD structured data | ✅ | WebApplication schema in root layout |
| 404 page | ✅ | Custom `not-found.tsx` with branded UI |
| About page | ✅ | Proper metadata, clear service description |

---

## Remaining Gaps (Non-blocking)

| Item | Priority | Notes |
|------|----------|-------|
| Content moderation | Low | SYSTEM_PROMPT instructs model but no hard filter. Monitor post-launch. |

---

## Checklist Summary

- [x] `npm run build` 成功
- [x] `npm run lint` エラーなし
- [x] TypeScript エラーなし
- [x] レスポンシブ対応（モバイル・デスクトップ）
- [x] favicon 設定済み
- [x] OGP画像設定済み（ImageResponse による動的生成）
- [x] 404ページ
- [x] ローディングスケルトン（ホーム・Q&A詳細）
- [x] エラー状態の表示
- [x] robots.txt / sitemap.xml
- [x] 基本的なa11y対応（aria-label）
- [x] SEO メタデータ（title / description / OGP / Twitter card）
- [x] JSON-LD 構造化データ
- [x] レート制限

---

**総評:** MVPとして本番リリース可能な品質。今回のRound 2でSEO・アクセシビリティ・SNSプレビューの細かな問題を追加修正。すべてのチェックリスト項目をクリア。

---

## Issues Found & Fixed (Round 3)

**Date:** 2026-03-01 17:03
**Tester:** Claude QA Agent (automated)

Build: ✅ Passed | Lint: ✅ Passed

### 11. FeedbackWidget — `alert()` を `toast.error()` に変更 [FIXED]
- **Severity:** Low — UX 一貫性
- **File:** `src/components/FeedbackWidget.tsx`
- **Details:** フィードバック送信失敗時にネイティブ `alert()` を使用していた。sonner の `toast.error()` に統一。

### 12. /api/feedback — JSON パースエラー未ハンドル [FIXED]
- **Severity:** Low — 堅牢性
- **File:** `src/app/api/feedback/route.ts`
- **Details:** `request.json()` が不正なリクエストボディで例外を投げた場合、未キャッチで 500 エラーになっていた。try/catch を追加し 400 Bad Request を返すように修正。

### 13. robots.ts — API ルートを disallow に追加 [FIXED]
- **Severity:** Low — SEO
- **File:** `src/app/robots.ts`
- **Details:** `/api/*` エンドポイントがクローラーにインデックスされる可能性があった。`disallow: "/api/"` を追加。

### 14. ホームページ Suspense fallback — スケルトンへ改善 [FIXED]
- **Severity:** Low — UX 一貫性
- **File:** `src/app/page.tsx`
- **Details:** `RecentQAs` コンポーネントの Suspense fallback が単純なテキスト「読み込み中…」だった。ページレベルの `loading.tsx` と同じアニメーション付きスケルトンに変更し、視覚的な一貫性を確保。

### 15. public/ — デフォルト Next.js SVG を削除 [FIXED]
- **Severity:** Info — クリーンアップ
- **Files:** `public/{file,globe,next,vercel,window}.svg`
- **Details:** Next.js テンプレートのデフォルト SVG が残留していた。プロジェクトで参照されていないため削除。
