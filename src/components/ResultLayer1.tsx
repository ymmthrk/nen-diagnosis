import type { NenType } from "../constants/nenTypes";
import { NEN_TYPES } from "../constants/nenTypes";
import HexagonChart from "./HexagonChart";

interface Props {
  nenScores: Record<NenType, number>;
  topType: NenType;
  sorted: [NenType, number][];
}

export default function ResultLayer1({ nenScores, topType, sorted }: Props) {
  const top = NEN_TYPES[topType];
  const maxNenScore = sorted[0][1];

  return (
    <div>
      {/* ヒーローカード */}
      <div
        className="text-center px-5 py-7 mb-6 rounded-2xl border"
        style={{
          background: `linear-gradient(135deg, ${top.color}22, ${top.color}08)`,
          borderColor: top.color + "44",
        }}
      >
        <div className="text-5xl">{top.icon}</div>
        <div
          className="text-[13px] font-semibold tracking-widest mt-2"
          style={{ color: top.accent }}
        >
          {top.en.toUpperCase()}
        </div>
        <div className="text-[32px] font-black mt-1">{top.name}</div>
        <div className="text-[13px] text-white/45 mt-2">
          代表キャラ：{top.char}
        </div>
        <p className="text-sm leading-relaxed text-white/70 mt-4">{top.desc}</p>
      </div>

      {/* レーダーチャート */}
      <HexagonChart scores={nenScores} topType={topType} />

      {/* 念系統スコアバー */}
      <div className="mt-6">
        <div className="text-[13px] font-semibold text-white/40 mb-3 tracking-wider">
          念系統スコア
        </div>
        {sorted.map(([key, val]) => {
          const t = NEN_TYPES[key];
          const pct = Math.max(5, (val / maxNenScore) * 100);
          return (
            <div key={key} className="mb-2.5">
              <div className="flex justify-between text-[13px] mb-1">
                <span>{t.icon} {t.name}</span>
                <span className="text-white/40">{val}pt</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded">
                <div
                  className="h-full rounded transition-[width] duration-600"
                  style={{ width: `${pct}%`, background: t.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
