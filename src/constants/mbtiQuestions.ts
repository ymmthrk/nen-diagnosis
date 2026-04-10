import type { MbtiAxis } from "./nenTypes";

export interface MbtiQuestion {
  text: string;
  axis: MbtiAxis;
  yesLetter: string;
}

/** MBTI判定8問（各軸2問、各方向1問ずつ） */
export const MBTI_QUESTIONS: MbtiQuestion[] = [
  { text: "大人数のイベントのあと、エネルギーが充電される感覚がある", axis: "EI", yesLetter: "E" },
  { text: "考えを整理するとき、人と話すより一人で考えるほうが捗る", axis: "EI", yesLetter: "I" },
  { text: "物事を理解するとき、具体的な事実やデータを重視する", axis: "SN", yesLetter: "S" },
  { text: "まだ存在しない可能性やパターンを想像するのが好きだ", axis: "SN", yesLetter: "N" },
  { text: "意思決定では、公平さや論理的整合性を最優先する", axis: "TF", yesLetter: "T" },
  { text: "正しくても相手を傷つける言い方は避けたいと思う", axis: "TF", yesLetter: "F" },
  { text: "旅行は事前にしっかり計画を立てるほうが安心する", axis: "JP", yesLetter: "J" },
  { text: "予定が変わっても柔軟に対応できるし、むしろ楽しめる", axis: "JP", yesLetter: "P" },
];
