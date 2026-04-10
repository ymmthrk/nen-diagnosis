# シェアリンクボタン実装プラン

## 概要

結果画面に共有機能を追加し、診断結果をSNSや友達にシェアできるようにする。
URLに結果データを埋め込み、リンクを開いた人にも結果画面を表示する。
OGPは静的サイトのため固定画像で割り切り、後日対応可能な構造にしておく。

## 実装内容

### 1. URLエンコード/デコード（新規: `src/scoring/shareCodec.ts`）

結果データをURLパラメータに圧縮エンコード:

```
エンコード対象:
- nenScores: 6系統 × 各3桁以内の整数 → 18文字
- egoScores: 5軸 × 各2桁の整数 → 10文字
- mbtiType: 4文字
- showMbtiAsBonus: 1文字 (0/1)

形式: 数値をカンマ区切り→Base64URLエンコード
例: ?r=RTQ1LDMY...（約40〜50文字）
```

`encodeResult(result, mbtiType, showMbtiAsBonus) → string`
`decodeResult(param) → { nenScores, egoScores, topType, sorted, mbtiType, showMbtiAsBonus } | null`

### 2. App.tsx にURL復元ロジック追加

- 初回マウント時に `URLSearchParams` から `r` パラメータを読み取り
- デコード成功 → phase を直接 `"result"` に設定、result state にセット
- デコード失敗 → 通常のスタート画面

### 3. シェアボタンコンポーネント（新規: `src/components/ShareButtons.tsx`）

結果画面の免責表示の上に配置。3ボタン横並び:

| ボタン | 動作 |
|--------|------|
| X(Twitter) | `https://x.com/intent/tweet?text=...&url=...` を window.open |
| LINE | `https://social-plugins.line.me/lineit/share?url=...` を window.open |
| URLコピー | `navigator.clipboard.writeText(url)` + コピー完了トースト |

シェアテキスト例:
```
念能力系統診断の結果は【強化系】💪でした！
エゴグラムタイプ：熱血チャレンジャー型
#念能力系統診断
```

### 4. OGP meta タグ追加（`index.html`）

固定OGP（動的生成はしない）:
```html
<meta property="og:title" content="念能力系統診断" />
<meta property="og:description" content="エゴグラム×MBTIで診断するあなたの念能力系統" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://ymmthrk.github.io/nen-diagnosis/" />
<meta name="twitter:card" content="summary" />
```

og:image は素材がないため今回はスキップ。

## 修正ファイル

| ファイル | 変更内容 |
|---------|---------|
| `src/scoring/shareCodec.ts` | 新規: エンコード/デコード |
| `src/components/ShareButtons.tsx` | 新規: シェアボタン3種 |
| `src/App.tsx` | URL復元ロジック追加 + ShareButtons配置 |
| `index.html` | 固定OGP meta追加 |

## 検証方法

1. `npm run build && npm run preview` で動作確認
2. 診断完了 → 結果URLをコピー → 新しいタブで開く → 結果画面が復元されること
3. X/LINEボタンでシェアダイアログが開くこと
4. 不正なパラメータ → スタート画面にフォールバックすること
5. tsc --noEmit でエラーなし
