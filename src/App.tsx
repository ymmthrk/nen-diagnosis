import { useState } from "react";
import { EGO_QUESTIONS } from "./constants/egoQuestions";
import type { EgoQuestion } from "./constants/egoQuestions";
import { MBTI_QUESTIONS } from "./constants/mbtiQuestions";
import type { MbtiQuestion } from "./constants/mbtiQuestions";
import { shuffleEgoQuestions } from "./scoring/egogram";
import type { EgoAnswer } from "./scoring/egogram";
import { deriveMbti, shuffleMbtiQuestions } from "./scoring/mbtiDerive";
import type { MbtiAnswer } from "./scoring/mbtiDerive";
import { calcFinalScores } from "./scoring/nenScore";
import type { DiagnosisResult } from "./scoring/nenScore";
import QuestionCard from "./components/QuestionCard";
import MbtiSelector from "./components/MbtiSelector";
import ResultLayer1 from "./components/ResultLayer1";
import ResultLayer2 from "./components/ResultLayer2";
import ResultLayer3 from "./components/ResultLayer3";

type Phase =
  | "start"
  | "mbti-ask"
  | "mbti-select"
  | "mbti-questions"
  | "egogram"
  | "result";

export default function App() {
  const [phase, setPhase] = useState<Phase>("start");
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  const [showMbtiAsBonus, setShowMbtiAsBonus] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [fadeIn, setFadeIn] = useState(true);

  const [egoQuestionSet, setEgoQuestionSet] = useState<EgoQuestion[]>([]);
  const [mbtiQuestionSet, setMbtiQuestionSet] = useState<MbtiQuestion[]>([]);
  const [egoAnswers, setEgoAnswers] = useState<EgoAnswer[]>([]);
  const [mbtiAnswers, setMbtiAnswers] = useState<MbtiAnswer[]>([]);

  const transition = (next: () => void) => {
    setFadeIn(false);
    setTimeout(() => {
      next();
      setFadeIn(true);
    }, 250);
  };

  const handleMbtiKnown = (knows: boolean) => {
    const ego = shuffleEgoQuestions(EGO_QUESTIONS);
    const mbti = shuffleMbtiQuestions(MBTI_QUESTIONS);
    transition(() => {
      setEgoQuestionSet(ego);
      setMbtiQuestionSet(mbti);
      if (knows) {
        setShowMbtiAsBonus(false);
        setPhase("mbti-select");
      } else {
        setShowMbtiAsBonus(true);
        setPhase("mbti-questions");
      }
    });
  };

  const handleMbtiSelect = (type: string) => {
    transition(() => {
      setMbtiType(type);
      setPhase("egogram");
    });
  };

  const handleMbtiAnswer = (value: number) => {
    const q = mbtiQuestionSet[mbtiAnswers.length];
    const next: MbtiAnswer[] = [
      ...mbtiAnswers,
      { axis: q.axis, yesLetter: q.yesLetter, value },
    ];
    setMbtiAnswers(next);
    if (next.length >= mbtiQuestionSet.length) {
      const derived = deriveMbti(next);
      setMbtiType(derived);
      setPhase("egogram");
    }
  };

  const handleEgoAnswer = (value: number) => {
    const q = egoQuestionSet[egoAnswers.length];
    const next: EgoAnswer[] = [
      ...egoAnswers,
      { axis: q.axis, value, reverse: q.reverse },
    ];
    setEgoAnswers(next);
    if (next.length >= egoQuestionSet.length) {
      const res = calcFinalScores(next, mbtiType!);
      setResult(res);
      setPhase("result");
    }
  };

  const handleRetry = () => {
    transition(() => {
      setPhase("start");
      setMbtiType(null);
      setMbtiAnswers([]);
      setEgoAnswers([]);
      setEgoQuestionSet([]);
      setMbtiQuestionSet([]);
      setShowMbtiAsBonus(false);
      setResult(null);
    });
  };

  const handleBack = () => {
    transition(() => {
      if (phase === "mbti-questions") {
        if (mbtiAnswers.length > 0) {
          setMbtiAnswers(mbtiAnswers.slice(0, -1));
        } else {
          setPhase("mbti-ask");
        }
      } else if (phase === "egogram") {
        if (egoAnswers.length > 0) {
          setEgoAnswers(egoAnswers.slice(0, -1));
        } else if (showMbtiAsBonus) {
          setMbtiType(null);
          setPhase("mbti-questions");
        } else {
          setMbtiType(null);
          setPhase("mbti-select");
        }
      } else if (phase === "mbti-select") {
        setPhase("mbti-ask");
      } else if (phase === "mbti-ask") {
        setPhase("start");
      }
    });
  };

  const canGoBack = phase !== "start" && phase !== "result";

  // プログレス計算
  const egoTotal = egoQuestionSet.length || EGO_QUESTIONS.length;
  const mbtiTotal = mbtiQuestionSet.length || MBTI_QUESTIONS.length;
  const totalQuestions = showMbtiAsBonus ? mbtiTotal + egoTotal : egoTotal;

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-[540px] mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-7 relative">
          {canGoBack && (
            <div className="flex justify-between absolute top-0 left-0 right-0">
              <button
                onClick={handleBack}
                className="text-[13px] text-white/35 hover:text-white/60
                  transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                ← 戻る
              </button>
              <button
                onClick={handleRetry}
                className="text-[13px] text-white/35 hover:text-white/60
                  transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                TOPへ
              </button>
            </div>
          )}
          <div className={`text-[11px] tracking-[4px] uppercase text-white/35 mb-1.5 ${canGoBack ? "pt-6" : ""}`}>
            Nen Type Diagnosis
          </div>
          <h1 className="text-[26px] font-black tracking-wide m-0">
            念能力系統診断
          </h1>
        </div>

        {/* コンテンツ */}
        <div
          className={`transition-all duration-300 ease-out ${
            fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          {/* スタート画面 */}
          {phase === "start" && (
            <div className="text-center">
              <div className="text-6xl mb-4">🔮</div>
              <p className="text-white/55 text-sm leading-relaxed mb-8">
                エゴグラムとMBTIを組み合わせた心理学ベースの診断で、
                <br />
                あなたの念能力の系統を判定します。
              </p>
              <button
                onClick={() => transition(() => setPhase("mbti-ask"))}
                className="px-12 py-3.5 rounded-full text-white text-base font-bold
                  cursor-pointer tracking-wide border-none"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                }}
              >
                診断スタート
              </button>
            </div>
          )}

          {/* MBTI知ってる？ */}
          {phase === "mbti-ask" && (
            <div className="text-center">
              <h2 className="text-lg font-bold mb-6 leading-relaxed">
                あなたはMBTI（16タイプ性格診断）の
                <br />
                自分のタイプを知っていますか？
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleMbtiKnown(true)}
                  className="block w-full px-4 py-3.5 rounded-xl
                    bg-white/[0.05] border border-white/10 text-[#E8E8F0]
                    text-[15px] cursor-pointer transition-all duration-200
                    hover:bg-white/[0.12] hover:border-white/25"
                >
                  はい、知っています
                </button>
                <button
                  onClick={() => handleMbtiKnown(false)}
                  className="block w-full px-4 py-3.5 rounded-xl
                    bg-white/[0.05] border border-white/10 text-[#E8E8F0]
                    text-[15px] cursor-pointer transition-all duration-200
                    hover:bg-white/[0.12] hover:border-white/25"
                >
                  いいえ、知りません
                </button>
              </div>
              <p className="text-xs text-white/30 mt-4">
                知らない場合は8問の質問で判定します
              </p>
            </div>
          )}

          {/* MBTI 16タイプ選択 */}
          {phase === "mbti-select" && (
            <MbtiSelector onSelect={handleMbtiSelect} />
          )}

          {/* MBTI 8問 */}
          {phase === "mbti-questions" && mbtiQuestionSet.length > 0 && (
            <QuestionCard
              questionNumber={mbtiAnswers.length + 1}
              totalQuestions={totalQuestions}
              questionText={mbtiQuestionSet[mbtiAnswers.length].text}
              onAnswer={handleMbtiAnswer}
            />
          )}

          {/* エゴグラム 25問 */}
          {phase === "egogram" && egoQuestionSet.length > 0 && (
            <QuestionCard
              questionNumber={
                (showMbtiAsBonus ? mbtiTotal : 0) +
                egoAnswers.length +
                1
              }
              totalQuestions={totalQuestions}
              questionText={egoQuestionSet[egoAnswers.length].text}
              onAnswer={handleEgoAnswer}
            />
          )}

          {/* 結果画面（3層構造） */}
          {phase === "result" && result && (
            <div className="animate-[fadeIn_0.5s_ease]">
              <ResultLayer1
                nenScores={result.nenScores}
                topType={result.topType}
                sorted={result.sorted}
              />
              <ResultLayer2
                topType={result.topType}
                mbtiType={mbtiType!}
                showMbtiAsBonus={showMbtiAsBonus}
              />
              <ResultLayer3
                egoScores={result.egoScores}
                mbtiType={mbtiType!}
                showMbtiAsBonus={showMbtiAsBonus}
              />

              {/* 免責表示 */}
              <p className="mt-8 text-[11px] text-white/25 leading-relaxed text-center">
                この診断はエゴグラム（交流分析）とMBTIを組み合わせた独自の解釈に基づくファンコンテンツです。
                公式とは一切関係ありません。
              </p>

              {/* リトライボタン */}
              <button
                onClick={handleRetry}
                className="block w-full mt-6 mb-8 py-3.5 rounded-xl
                  bg-white/[0.06] border border-white/10 text-[#E8E8F0]
                  text-[15px] font-semibold cursor-pointer
                  transition-all duration-200
                  hover:bg-white/[0.12] hover:border-white/25"
              >
                もう一度診断する
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
