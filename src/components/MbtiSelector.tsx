import { MBTI_TYPES } from "../constants/nenTypes";

interface Props {
  onSelect: (type: string) => void;
}

export default function MbtiSelector({ onSelect }: Props) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2 leading-relaxed">
        あなたのMBTIタイプを選んでください
      </h2>
      <p className="text-sm text-white/40 mb-6">
        16タイプから該当するものをタップしてください
      </p>
      <div className="grid grid-cols-4 gap-2">
        {MBTI_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="py-3 rounded-xl bg-white/[0.05] border border-white/10
              text-[#E8E8F0] text-sm font-semibold cursor-pointer
              transition-all duration-200
              hover:bg-white/[0.12] hover:border-white/25 hover:scale-105"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
