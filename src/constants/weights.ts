import type { NenType, EgoAxis } from "./nenTypes";

/** エゴグラム → 念系統 重み表（◎=3, ○=2, △=1, -=0） */
export const NEN_WEIGHTS: Record<Exclude<NenType, "specialization">, Record<EgoAxis, number>> = {
  enhancement:   { CP: 3, NP: 2, A: 0, FC: 2, AC: 0 },
  transmutation: { CP: 0, NP: 0, A: 1, FC: 3, AC: 1 },
  emission:      { CP: 2, NP: 3, A: 0, FC: 2, AC: 0 },
  manipulation:  { CP: 1, NP: 0, A: 3, FC: 0, AC: 1 },
  conjuration:   { CP: 1, NP: 1, A: 2, FC: 0, AC: 3 },
};

/** MBTI → 念系統 補正表（5段階化に対応して +4/+2） */
export const MBTI_CORRECTION: Record<string, Partial<Record<NenType, number>>> = {
  E: { emission: 4, enhancement: 2 },
  I: { manipulation: 4, conjuration: 2 },
  S: { enhancement: 4, emission: 2 },
  N: { transmutation: 4, specialization: 2 },
  T: { manipulation: 4, transmutation: 2 },
  F: { emission: 4, enhancement: 2 },
  J: { conjuration: 4, manipulation: 2 },
  P: { transmutation: 4, emission: 2 },
};
