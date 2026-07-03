# 九九19

11×11 〜 19×19 の掛け算（インド式かけ算）を、日本の九九のように効率よく暗記・練習するSPA。
フロントエンドのみで完結し、バックエンド不要。

## 機能

- **練習モード**: 11×11〜19×19 をランダム出題。テキスト入力 / テンキーUI で回答、即時判定。
  不正解時は **インド式（縦・交差法）の計算手順** を解説として表示。
- **九九表モード**: 11×11〜19×19 の 9×9 グリッド。セルをタップすると該当する行/列がハイライトされ、式とインド式解説を表示。
- **スコア**: 現在の連続正解（コンボ）・最高コンボ・直近10問の正答率を LocalStorage に永続化。

## 開発

```bash
npm install
npm run dev            # 開発サーバー（http://localhost:5173）
npm run build          # 型チェック + 本番ビルド
npm run preview        # ビルド結果のプレビュー
npm test               # ユニット/統合テスト（Vitest）
npm run test:coverage  # カバレッジ付き（80%閾値）
npm run e2e            # Playwright E2E
```

## 技術スタック

- Vite + React 19 + TypeScript 6
- Tailwind CSS v4（`@tailwindcss/vite` プラグイン）
- テスト: Vitest + @testing-library/react + jsdom（ユニット/統合）／ Playwright（E2E）

> **TypeScript バージョンについて**: 当初要件は「TypeScript 7.0以上」でしたが、本環境の npm レジストリでは 7.0 が未公開のため、最新の **TypeScript 6** を採用しています。

## 設計

3層分離で保守性とテスト容易性を確保:

- `src/domain/` — React 非依存の純粋関数（問題生成・インド式計算・スコア更新）。全ビジネスロジックと単体テストをここに集中。
- `src/hooks/` — ドメイン関数を React 状態に結びつけ、副作用（LocalStorage 永続化）を扱う。
- `src/components/` — 表示に専念するUIコンポーネント（コンテナが状態を注入）。

状態は `useState` + カスタムフックのみで、状態管理ライブラリは使用しません。スコア状態はイミュータブルに更新します。
