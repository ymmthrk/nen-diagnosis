import type { EgoAxis } from "../constants/nenTypes";
import { EGO_AXES } from "../constants/nenTypes";

export interface MountainResult {
  name: string;
  nenTendency: string;
}

const HIGH_THRESHOLD = 14;
const LOW_THRESHOLD = 6;

interface Pattern {
  match: (high: Set<EgoAxis>, low: Set<EgoAxis>) => boolean;
  name: string;
  nenTendency: string;
}

const PATTERNS: Pattern[] = [
  // 2軸高パターン（先に判定）
  { match: (h) => h.has("CP") && h.has("NP"), name: "面倒見キャプテン型", nenTendency: "強化系/放出系" },
  { match: (h) => h.has("CP") && h.has("A"),  name: "きっちり管理マネージャー型", nenTendency: "操作系/具現化系" },
  { match: (h) => h.has("CP") && h.has("FC"), name: "熱血チャレンジャー型", nenTendency: "強化系" },
  { match: (h) => h.has("CP") && h.has("AC"), name: "忠義の騎士型", nenTendency: "強化系/具現化系" },
  { match: (h) => h.has("NP") && h.has("A"),  name: "知性派カウンセラー型", nenTendency: "放出系/操作系" },
  { match: (h) => h.has("NP") && h.has("FC"), name: "やさしさエンターテイナー型", nenTendency: "放出系/変化系" },
  { match: (h) => h.has("NP") && h.has("AC"), name: "献身ハーモニスト型", nenTendency: "放出系/具現化系" },
  { match: (h) => h.has("A") && h.has("FC"),  name: "現実派クリエイター型", nenTendency: "変化系/操作系" },
  { match: (h) => h.has("A") && h.has("AC"),  name: "リスク管理プランナー型", nenTendency: "具現化系" },
  { match: (h) => h.has("FC") && h.has("AC"), name: "感受性アーティスト型", nenTendency: "変化系/具現化系" },

  // 単独高パターン
  { match: (h) => h.has("CP") && h.size === 1, name: "責任感リーダー型", nenTendency: "強化系" },
  { match: (h) => h.has("NP") && h.size === 1, name: "やさしさサポーター型", nenTendency: "放出系" },
  { match: (h) => h.has("A") && h.size === 1,  name: "クール参謀型", nenTendency: "操作系" },
  { match: (h) => h.has("FC") && h.size === 1, name: "ひらめきムードメーカー型", nenTendency: "変化系" },
  { match: (h) => h.has("AC") && h.size === 1, name: "空気読みナビゲーター型", nenTendency: "具現化系" },

  // 全軸高い
  { match: (h) => h.size >= 3, name: "エネルギッシュ万能型", nenTendency: "特質系/強化系" },

  // 低軸パターン（高い軸がなく、低い軸がある）
  { match: (h, l) => h.size === 0 && l.size >= 1, name: "内省マイペース型", nenTendency: "特質系" },

  // 全軸フラット（High 0個, Low 0個）
  { match: (h, l) => h.size === 0 && l.size === 0, name: "バランスオールラウンダー型", nenTendency: "特質系" },
];

/** エゴグラムスコアから山型を判定 */
export function classifyMountainType(egoScores: Record<EgoAxis, number>): MountainResult {
  const high = new Set<EgoAxis>();
  const low = new Set<EgoAxis>();

  for (const axis of EGO_AXES) {
    if (egoScores[axis] >= HIGH_THRESHOLD) high.add(axis);
    if (egoScores[axis] <= LOW_THRESHOLD) low.add(axis);
  }

  for (const pattern of PATTERNS) {
    if (pattern.match(high, low)) {
      return { name: pattern.name, nenTendency: pattern.nenTendency };
    }
  }

  // どのパターンにも当てはまらない場合
  return { name: "ミックス型", nenTendency: "——" };
}
