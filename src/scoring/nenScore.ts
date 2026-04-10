import type { NenType, EgoAxis } from "../constants/nenTypes";
import { EGO_AXES, NEN_TYPES_MAIN, ALL_NEN_TYPES, getNenDistance } from "../constants/nenTypes";
import { NEN_WEIGHTS, MBTI_CORRECTION } from "../constants/weights";
import type { EgoAnswer } from "./egogram";
import { calcEgoScores, calcInconsistency } from "./egogram";

export interface DiagnosisResult {
  nenScores: Record<NenType, number>;
  egoScores: Record<EgoAxis, number>;
  topType: NenType;
  sorted: [NenType, number][];
  mbtiType: string;
}

/** MBTI 4文字 → 念系統補正値 */
function calcMbtiCorrection(mbtiType: string): Record<NenType, number> {
  const correction: Record<NenType, number> = {
    enhancement: 0, transmutation: 0, emission: 0,
    manipulation: 0, conjuration: 0, specialization: 0,
  };
  for (const letter of mbtiType) {
    const bonuses = MBTI_CORRECTION[letter];
    if (bonuses) {
      for (const [type, val] of Object.entries(bonuses)) {
        correction[type as NenType] += val!;
      }
    }
  }
  return correction;
}

/** 特質系スコア算出（一貫性チェック付き）
 *
 *  適当回答（一貫性スコア > 1.5）の場合は特質系ボーナスを付与しない。
 *  スコア差が小さく、エゴグラムが平坦なほど高くなる。
 */
function calcSpecializationScore(
  nenScores: Record<NenType, number>,
  egoScores: Record<EgoAxis, number>,
  inconsistency: number,
): number {
  if (inconsistency > 1.5) return 0;

  const mainScores = NEN_TYPES_MAIN
    .map((t) => nenScores[t])
    .sort((a, b) => b - a);

  let score = 0;

  // スコア差ボーナス
  const gap = mainScores[0] - mainScores[1];
  if (gap <= 5) score += 10;

  // エゴグラム平坦ボーナス
  const egoValues = EGO_AXES.map((a) => egoScores[a]);
  const egoMean = egoValues.reduce((s, v) => s + v, 0) / egoValues.length;
  const variance = egoValues.reduce((s, v) => s + (v - egoMean) ** 2, 0) / egoValues.length;
  const stdDev = Math.sqrt(variance);
  if (stdDev <= 2.0) score += 6;

  return score;
}

/** 最終スコア算出 */
export function calcFinalScores(
  egoAnswers: EgoAnswer[],
  mbtiType: string,
): DiagnosisResult {
  // 1. エゴグラム集計
  const egoScores = calcEgoScores(egoAnswers);

  // 2. 一貫性チェック
  const inconsistency = calcInconsistency(egoAnswers);

  // 3. エゴグラム × 重み表 → 5系統の基礎スコア
  const nenScores: Record<NenType, number> = {
    enhancement: 0, transmutation: 0, emission: 0,
    manipulation: 0, conjuration: 0, specialization: 0,
  };
  for (const type of NEN_TYPES_MAIN) {
    for (const axis of EGO_AXES) {
      nenScores[type] += egoScores[axis] * NEN_WEIGHTS[type][axis];
    }
  }

  // 4. MBTI補正
  const correction = calcMbtiCorrection(mbtiType);
  for (const type of ALL_NEN_TYPES) {
    nenScores[type] += correction[type];
  }

  // 5. 特質系スコア算出
  nenScores.specialization += calcSpecializationScore(nenScores, egoScores, inconsistency);

  // 5.5. 六角形距離による隣接系統減衰
  const preDecaySorted = ALL_NEN_TYPES
    .map((t): [NenType, number] => [t, nenScores[t]])
    .sort((a, b) => b[1] - a[1]);
  const topType = preDecaySorted[0][0];

  if (topType === "specialization") {
    // 特質系1位: 他5系統を一律-10%
    for (const type of NEN_TYPES_MAIN) {
      nenScores[type] = Math.round(nenScores[type] * 0.9);
    }
  } else {
    // 主要系統1位: 六角形距離で減衰 + 特質系-20%
    for (const type of ALL_NEN_TYPES) {
      if (type === topType) continue;
      if (type === "specialization") {
        nenScores[type] = Math.round(nenScores[type] * 0.8);
      } else {
        const dist = getNenDistance(topType, type);
        if (dist === 2) nenScores[type] = Math.round(nenScores[type] * 0.9);
        if (dist === 3) nenScores[type] = Math.round(nenScores[type] * 0.8);
      }
    }
  }

  // 6. ソートして最高スコアの系統を決定
  const sorted = ALL_NEN_TYPES
    .map((t): [NenType, number] => [t, nenScores[t]])
    .sort((a, b) => b[1] - a[1]);

  return {
    nenScores,
    egoScores,
    topType: sorted[0][0],
    sorted,
    mbtiType,
  };
}
