export type NenType =
  | "enhancement"
  | "transmutation"
  | "emission"
  | "manipulation"
  | "conjuration"
  | "specialization";

export type EgoAxis = "CP" | "NP" | "A" | "FC" | "AC";

export type MbtiAxis = "EI" | "SN" | "TF" | "JP";

export interface NenTypeInfo {
  name: string;
  en: string;
  color: string;
  accent: string;
  char: string;
  desc: string;
  icon: string;
}

export const NEN_TYPES: Record<NenType, NenTypeInfo> = {
  enhancement: {
    name: "強化系",
    en: "Enhancement",
    color: "#F59E0B",
    accent: "#FCD34D",
    char: "ゴン＝フリークス",
    desc: "素直で一途。目標に向かって真っ直ぐ突き進む力を持つ。裏表がなく、仲間を大切にする情熱家。",
    icon: "💪",
  },
  transmutation: {
    name: "変化系",
    en: "Transmutation",
    color: "#8B5CF6",
    accent: "#C4B5FD",
    char: "キルア＝ゾルディック",
    desc: "気まぐれで嘘つき。表面上はつかみどころがないが、内面には独自の美学を持つ。",
    icon: "⚡",
  },
  emission: {
    name: "放出系",
    en: "Emission",
    color: "#EF4444",
    accent: "#FCA5A5",
    char: "レオリオ＝パラディナイト",
    desc: "短気で大胆。感情をストレートに表現し、思い立ったら即行動。情に厚い。",
    icon: "🔥",
  },
  manipulation: {
    name: "操作系",
    en: "Manipulation",
    color: "#10B981",
    accent: "#6EE7B7",
    char: "イルミ＝ゾルディック",
    desc: "理屈っぽくマイペース。自分のルールで動き、他人を論理で動かすことを好む戦略家。",
    icon: "🎭",
  },
  conjuration: {
    name: "具現化系",
    en: "Conjuration",
    color: "#3B82F6",
    accent: "#93C5FD",
    char: "クラピカ",
    desc: "神経質で完璧主義。こだわりが強く、緻密な計画を立てる。内省的で慎重。",
    icon: "⛓️",
  },
  specialization: {
    name: "特質系",
    en: "Specialization",
    color: "#EC4899",
    accent: "#F9A8D4",
    char: "クロロ＝ルシルフル",
    desc: "カリスマ性と個人主義。独自の世界観を持ち、既存の枠に収まらない。周囲を惹きつける存在。",
    icon: "✨",
  },
};

export const EGO_AXES: EgoAxis[] = ["CP", "NP", "A", "FC", "AC"];

export const NEN_TYPES_MAIN: Exclude<NenType, "specialization">[] = [
  "enhancement", "transmutation", "emission", "manipulation", "conjuration",
];

export const ALL_NEN_TYPES: NenType[] = [...NEN_TYPES_MAIN, "specialization"];

/** 六角形上の配置順（原作準拠） */
const NEN_CIRCLE: NenType[] = [
  "enhancement", "transmutation", "conjuration",
  "specialization", "manipulation", "emission",
];

/** 六角形上の2系統間の最短距離（0〜3） */
export function getNenDistance(a: NenType, b: NenType): number {
  const ia = NEN_CIRCLE.indexOf(a);
  const ib = NEN_CIRCLE.indexOf(b);
  const diff = Math.abs(ia - ib);
  return Math.min(diff, 6 - diff);
}

export const MBTI_TYPES = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ",
] as const;
