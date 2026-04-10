import type { EgoAxis } from "../constants/nenTypes";
import type { EgoQuestion } from "../constants/egoQuestions";
import { EGO_AXES } from "../constants/nenTypes";

export interface EgoAnswer {
  axis: EgoAxis;
  value: number;   // 生の回答値 0〜4
  reverse: boolean;
}

/** 逆転処理を含むエゴグラム5軸集計（各軸0〜20） */
export function calcEgoScores(answers: EgoAnswer[]): Record<EgoAxis, number> {
  const scores: Record<EgoAxis, number> = { CP: 0, NP: 0, A: 0, FC: 0, AC: 0 };
  for (const a of answers) {
    scores[a.axis] += a.reverse ? (4 - a.value) : a.value;
  }
  return scores;
}

/** 一貫性チェック（適当回答フィルタ）
 *  各軸の順方向平均と逆転項目の反転値の差を平均
 */
export function calcInconsistency(answers: EgoAnswer[]): number {
  let totalDiff = 0;
  for (const axis of EGO_AXES) {
    const axisAnswers = answers.filter((a) => a.axis === axis);
    const forward = axisAnswers.filter((a) => !a.reverse);
    const reversed = axisAnswers.filter((a) => a.reverse);
    if (forward.length === 0 || reversed.length === 0) continue;
    const forwardAvg = forward.reduce((s, a) => s + a.value, 0) / forward.length;
    const reversedAvg = reversed.reduce((s, a) => s + (4 - a.value), 0) / reversed.length;
    totalDiff += Math.abs(forwardAvg - reversedAvg);
  }
  return totalDiff / EGO_AXES.length;
}

/** 25問をシャッフルして返す */
export function shuffleEgoQuestions(questions: EgoQuestion[]): EgoQuestion[] {
  return [...questions].sort(() => Math.random() - 0.5);
}
