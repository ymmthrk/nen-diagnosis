import type { NenType } from "../constants/nenTypes";
import { NEN_TYPES } from "../constants/nenTypes";
import { getCrossTexts, MBTI_LETTER_LABELS } from "../constants/crossInterpretations";

interface Props {
  topType: NenType;
  mbtiType: string;
  showMbtiAsBonus: boolean;
}

export default function ResultLayer2({ topType, mbtiType, showMbtiAsBonus }: Props) {
  const top = NEN_TYPES[topType];
  const crossTexts = getCrossTexts(topType, mbtiType);
  const letters = Array.from(mbtiType);

  return (
    <div className="mt-8">
      {/* セクションヘッダー */}
      <div className="text-[13px] font-semibold text-white/40 mb-1 tracking-wider">
        MBTI × 念系統クロス解説
      </div>
      <div className="text-[11px] text-white/25 mb-4">
        あなたのMBTIタイプ「{mbtiType}」の各軸が{top.name}とどう組み合わさるか
      </div>
      {showMbtiAsBonus && (
        <div className="text-[11px] text-amber-400/60 mb-4 px-3 py-2 rounded-lg bg-amber-400/[0.06] border border-amber-400/10">
          簡易判定による推定結果です。正式なMBTI診断とは精度が異なるため、以下の解説は参考としてお楽しみください。
        </div>
      )}

      {/* 4軸の解説カード */}
      <div className="space-y-3">
        {letters.map((letter, i) => {
          const meta = MBTI_LETTER_LABELS[letter];
          return (
            <div
              key={letter}
              className="px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{
                    background: top.color + "22",
                    color: top.accent,
                  }}
                >
                  {meta.axis}
                </span>
                <span className="text-[13px] font-semibold text-white/70">
                  {letter}（{meta.label}）× {top.name}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-white/60">
                {crossTexts[i]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
