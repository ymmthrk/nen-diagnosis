import type { MbtiAxis } from "../constants/nenTypes";
import type { MbtiQuestion } from "../constants/mbtiQuestions";

export interface MbtiAnswer {
  axis: MbtiAxis;
  yesLetter: string;
  value: number; // 0〜4
}

/** MBTI回答 → 4文字タイプ判定（同点はE/S/T/J優先） */
export function deriveMbti(answers: MbtiAnswer[]): string {
  const axisScores: Record<MbtiAxis, Record<string, number>> = {
    EI: { E: 0, I: 0 },
    SN: { S: 0, N: 0 },
    TF: { T: 0, F: 0 },
    JP: { J: 0, P: 0 },
  };

  for (const a of answers) {
    axisScores[a.axis][a.yesLetter] += a.value;
  }

  const axes: [MbtiAxis, string, string][] = [
    ["EI", "E", "I"],
    ["SN", "S", "N"],
    ["TF", "T", "F"],
    ["JP", "J", "P"],
  ];

  return axes
    .map(([axis, a, b]) =>
      axisScores[axis][a] >= axisScores[axis][b] ? a : b
    )
    .join("");
}

/** MBTI8問をシャッフルして返す */
export function shuffleMbtiQuestions(questions: MbtiQuestion[]): MbtiQuestion[] {
  return [...questions].sort(() => Math.random() - 0.5);
}
