# QA Report - AI模擬面接

**Date:** 2026-03-02
**Project:** ai-interview
**Tester:** Claude (automated QA)

## Checklist

- [x] `npm run build` 成功
- [x] `npm run lint` エラーなし
- [x] レスポンシブ対応（モバイル・デスクトップ） - Tailwind responsive classes使用、grid-cols-2/sm:grid-cols-5等
- [x] favicon設定 - `src/app/favicon.ico` 存在
- [x] OGP設定 - layout.tsx にグローバルOG/Twitter、result/[id] に動的OGP画像生成
- [x] 404ページ - `src/app/not-found.tsx` 実装済み
- [x] ローディング状態の表示 - `src/app/loading.tsx` + フォーム送信時スピナー
- [x] エラー状態の表示 - `src/app/error.tsx` + toast通知

## 発見した問題と対応

### 修正済み (4件)

| # | ファイル | 問題 | 対応 |
|---|---------|------|------|
| 1 | `src/app/page.tsx:28` | JSX内の`//`がコメントとして解釈される (react/jsx-no-comment-textnodes) | `{"//"}` に変更 |
| 2 | `src/app/result/[id]/page.tsx:76` | 同上 | `{"//"}` に変更 |
| 3 | `src/app/result/[id]/opengraph-image.tsx:82` | 同上 | `{"//"}` に変更 |
| 4 | `src/app/result/[id]/page.tsx:172` | 内部リンクに`<a>`を使用 (@next/next/no-html-link-for-pages) | `<Link>` に変更 |

### アクセシビリティ改善 (4件)

| # | ファイル | 問題 | 対応 |
|---|---------|------|------|
| 5 | `src/components/InterviewForm.tsx` | フォームのlabelとinputが未関連付け | `htmlFor`/`id` 属性を追加 |
| 6 | `src/components/FeedbackWidget.tsx` | 閉じるボタンに`aria-label`なし | `aria-label="フィードバックを閉じる"` 追加 |
| 7 | `src/components/FeedbackWidget.tsx` | テキストエリアに`maxLength`なし | `maxLength={1000}` + `aria-label` 追加 |
| 8 | `src/app/loading.tsx` | ローディング状態にrole/aria-label なし | `role="status"` + `aria-label` 追加 |

## SEO確認

| 項目 | 状態 | 備考 |
|------|------|------|
| メタデータ (title/description) | OK | layout.tsx でテンプレート設定済み |
| OGP (トップページ) | OK | title, description, url, siteName, type 設定済み |
| OGP (結果ページ) | OK | 動的メタデータ + opengraph-image.tsx で画像生成 |
| Twitter Card | OK | summary_large_image 設定済み |
| JSON-LD | OK | WebApplication スキーマ (page.tsx) |
| robots.txt | OK | 主要AIクローラー許可設定済み |
| sitemap.xml | OK | sitemap.ts で生成 |
| llms.txt | OK | AI向けサービス説明 |
| agent.json | OK | A2A Agent Card + MCPツール定義 |
| favicon | OK | src/app/favicon.ico |

## エッジケース確認

| 項目 | 状態 | 備考 |
|------|------|------|
| 空入力 (必須フィールド) | OK | クライアント + サーバー双方でバリデーション |
| 長文入力 | OK | maxLength制限 (100/50/500文字) + サーバー側slice |
| 特殊文字 | OK | String()変換、JSONエスケープで処理 |
| レートリミット | OK | IP単位で10分間5回まで (429レスポンス) |
| AI応答パース失敗 | OK | JSON.parse失敗時にregex fallback |

## パフォーマンス

| 項目 | 状態 | 備考 |
|------|------|------|
| Server Components活用 | OK | デフォルトSC、client指定は必要箇所のみ |
| 静的生成 | OK | トップ/404/robots/sitemap は静的プリレンダ |
| フォント最適化 | OK | next/font (Geist) 使用 |
| バンドルサイズ | OK | 外部依存は最小限 (sonner, nanoid等) |

## 未対応・既知の制限

- OGP画像のフォント: edge runtimeのため日本語フォント未指定（ブラウザデフォルト依存）
- Google Analytics: 環境変数 `NEXT_PUBLIC_GA_ID` 未設定時は無効化（正常動作）
