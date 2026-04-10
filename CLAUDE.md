# 念能力系統診断（Nen Type Diagnosis）

## 概要

Hunter×Hunterの念能力6系統を、エゴグラム（交流分析）× MBTIのクロス分析で診断するWebアプリ。
「MBTI×念系統の交差解説」が既存サイトにない独自の差別化ポイント。

## 技術スタック

- React（Vite）+ TypeScript + Tailwind CSS
- 静的サイト（API不要、クライアント完結）

## ユーザーフロー

```
START → "MBTIを知っていますか？"
  YES → 16タイプ選択 → エゴグラム25問 → 結果（3層）
  NO  → MBTI判定8問 → エゴグラム25問 → 結果（3層 + MBTI判定おまけ）
```

所要時間：MBTI既知 約4分 / 未知 約6分

## 結果画面：3層構造

1. **念系統の診断結果** — レーダーチャート + スコアバー
2. **MBTI×念クロス解説** — 4軸×念系統の組合せ短文（48パターンから4文選出）
3. **エゴグラムプロフィール** — 山型分類 + 5軸バーチャート

## 詳細ドキュメント

| ファイル | 内容 |
|---------|------|
| [docs/scoring.md](docs/scoring.md) | スコアリングモデル（重み表・MBTI補正・特質系判定・計算式） |
| [docs/questions.md](docs/questions.md) | 全質問文（エゴグラム25問 + MBTI判定8問） |
| [docs/interpretations.md](docs/interpretations.md) | 48パターンのクロス解説文 + 山型分類の定義 |

## 推奨ファイル構成

```
src/
├── App.tsx
├── constants/
│   ├── nenTypes.ts            # 念系統データ（色・キャラ・説明）
│   ├── egoQuestions.ts        # エゴグラム25問
│   ├── mbtiQuestions.ts       # MBTI判定8問
│   ├── weights.ts             # 重み表・MBTI補正値
│   └── crossInterpretations.ts
├── scoring/
│   ├── egogram.ts             # 逆転処理含む集計
│   ├── mbtiDerive.ts
│   ├── nenScore.ts            # 重み+MBTI補正+特質系
│   └── mountainType.ts
├── components/
│   ├── StartScreen.tsx
│   ├── MBTISelector.tsx
│   ├── QuestionCard.tsx       # 5段階回答カード
│   ├── ProgressBar.tsx
│   ├── ResultLayer1.tsx
│   ├── ResultLayer2.tsx
│   ├── ResultLayer3.tsx
│   └── HexagonChart.tsx
└── styles/
    └── index.css
```

## UI仕様

- ダークテーマ（背景 #0B0B14）
- モバイルファースト（max-width: 540px）
- フェードトランジション（200ms）
- 回答：5段階横並び（✕ △ ─ ○ ◎）
- 念系統カラー：強化#F59E0B / 変化#8B5CF6 / 放出#EF4444 / 操作#10B981 / 具現化#3B82F6 / 特質#EC4899

## リポジトリ構成

このプロジェクトは2つのGitHubリポジトリで運用している。

- **private**: `ymmthrk/nen-diagnosis-private` — 開発用（全ファイル管理）
- **public**: `ymmthrk/nen-diagnosis` — 公開用（GitHub Pages）

### ルール
- ローカルのremote `origin` = privateリポ、`public` = publicリポ
- privateリポへのpushで `mirror-to-public.yml` が自動実行され、CLAUDE.md・docs/を除外してpublicリポにミラー
- **publicリポに直接pushしないこと**

## 免責

> この診断はエゴグラム（交流分析）の理論をベースに、Hunter×Hunterの念能力系統へ独自に対応付けたファンコンテンツです。科学的・医学的な性格診断ではありません。
