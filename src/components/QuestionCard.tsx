import { useState, useEffect } from "react";

interface Props {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  onAnswer: (value: number) => void;
}

const OPTIONS: { label: string; value: number }[] = [
  { label: "✕", value: 0 },
  { label: "△", value: 1 },
  { label: "─", value: 2 },
  { label: "○", value: 3 },
  { label: "◎", value: 4 },
];

export default function QuestionCard({
  questionNumber,
  totalQuestions,
  questionText,
  onAnswer,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, [questionNumber]);

  const handleClick = (value: number) => {
    setVisible(false);
    setTimeout(() => onAnswer(value), 200);
  };

  return (
    <div
      className={`transition-all duration-200 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {/* プログレスバー */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-white/40 mb-1.5">
          <span>Q{questionNumber} / {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-[3px] bg-white/[0.08] rounded">
          <div
            className="h-full rounded transition-[width] duration-400 ease-out"
            style={{
              width: `${(questionNumber / totalQuestions) * 100}%`,
              background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
            }}
          />
        </div>
      </div>

      {/* 質問テキスト */}
      <h2 className="text-lg font-bold mb-6 leading-relaxed min-h-[3.5em]">
        {questionText}
      </h2>

      {/* 5段階回答（横並び） */}
      <div className="flex items-center justify-between gap-1">
        <span className="text-[10px] text-white/30 whitespace-nowrap">当てはまらない</span>
        <div className="flex gap-2">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleClick(opt.value)}
              className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10
                text-[#E8E8F0] text-lg font-bold cursor-pointer
                transition-all duration-150
                hover:bg-white/[0.15] hover:border-white/30 hover:scale-110
                active:scale-95"
            >
              {opt.label}
            </button>
          ))}
        </div>
        <span className="text-[10px] text-white/30 whitespace-nowrap">当てはまる</span>
      </div>
    </div>
  );
}
