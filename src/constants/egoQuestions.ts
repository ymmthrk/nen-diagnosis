import type { EgoAxis } from "./nenTypes";

export interface EgoQuestion {
  id: number;
  text: string;
  axis: EgoAxis;
  reverse: boolean;
}

/** エゴグラム25問（各軸5問、5問目が逆転項目） */
export const EGO_QUESTIONS: EgoQuestion[] = [
  // CP（厳格な親）
  { id: 1,  text: "やると決めたことは、多少きつくても最後までやり切ろうとするほうだ", axis: "CP", reverse: false },
  { id: 2,  text: "ルールやマナーが守られていないと、心の中でモヤモヤする", axis: "CP", reverse: false },
  { id: 3,  text: "担当した仕事は「途中で投げ出したくない」という気持ちが強い", axis: "CP", reverse: false },
  { id: 4,  text: "時間や手順に余裕がなくても、雑にやるより丁寧に仕上げたい", axis: "CP", reverse: false },
  { id: 5,  text: "細かいことを気にしすぎるより、おおらかに構えるほうが自分らしい", axis: "CP", reverse: true },

  // NP（養育的な親）
  { id: 6,  text: "人と接するとき、欠点よりも先に良いところに目がいきやすい", axis: "NP", reverse: false },
  { id: 7,  text: "困っている人を見かけると「声をかけたほうがいいかな」と考える", axis: "NP", reverse: false },
  { id: 8,  text: "自分が疲れていても、「ここは手を貸したほうがよさそうだ」と思うと動いてしまう", axis: "NP", reverse: false },
  { id: 9,  text: "話を聞くとき「この人が少しでも楽になればいいな」と思いながら耳を傾けることがある", axis: "NP", reverse: false },
  { id: 10, text: "人の悩みに深入りするより、適度な距離を保つほうが心地いい", axis: "NP", reverse: true },

  // A（合理的な大人）
  { id: 11, text: "行動するとき「このあとどう影響しそうか」を頭の片隅に置いていることが多い", axis: "A", reverse: false },
  { id: 12, text: "感情的な話題になっても、どこかで冷静に状況を見ている自分がいる", axis: "A", reverse: false },
  { id: 13, text: "大きな選択をするときは、感覚よりも情報を集めて比べてから決めたい", axis: "A", reverse: false },
  { id: 14, text: "お金や時間を使うとき、「得か損か」をつい計算してしまう", axis: "A", reverse: false },
  { id: 15, text: "理屈より直感で動いて、結果的にうまくいくことが多い", axis: "A", reverse: true },

  // FC（自由な子供）
  { id: 16, text: "「おもしろそうだからやってみたい」と思えることがないと、退屈に感じやすい", axis: "FC", reverse: false },
  { id: 17, text: "気分が乗ってくると、表情や声のトーンにそのまま出てしまう", axis: "FC", reverse: false },
  { id: 18, text: "ふと思いついたアイデアを、その場で試してみるのがけっこう好きだ", axis: "FC", reverse: false },
  { id: 19, text: "新しいお店や知らない場所を見ると「とりあえず一度行ってみたい」と感じる", axis: "FC", reverse: false },
  { id: 20, text: "衝動的に動くより、一度立ち止まって考えてから行動するほうだ", axis: "FC", reverse: true },

  // AC（順応する子供）
  { id: 21, text: "強い口調で指摘されると、その場ではうまく言い返せないことが多い", axis: "AC", reverse: false },
  { id: 22, text: "会議などで周りと違う意見を言うとき、発言する前にかなり迷う", axis: "AC", reverse: false },
  { id: 23, text: "場の雰囲気が張りつめているとき、本当は言いたいことがあっても黙ってしまう", axis: "AC", reverse: false },
  { id: 24, text: "初めての場では、まず周りの様子を見てから自分の行動を決めることが多い", axis: "AC", reverse: false },
  { id: 25, text: "周囲の空気がどうであれ、自分の意見はハッキリ言えるほうだ", axis: "AC", reverse: true },
];
