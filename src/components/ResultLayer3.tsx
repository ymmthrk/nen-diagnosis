import type { EgoAxis } from "../constants/nenTypes";
import { EGO_AXES } from "../constants/nenTypes";
import { classifyMountainType } from "../scoring/mountainType";

interface Props {
  egoScores: Record<EgoAxis, number>;
  mbtiType: string;
  showMbtiAsBonus: boolean;
}

const EGO_LABELS: Record<EgoAxis, string> = {
  CP: "CP（厳格な親）",
  NP: "NP（養育的な親）",
  A: "A（合理的な大人）",
  FC: "FC（自由な子供）",
  AC: "AC（順応する子供）",
};

const EGO_MAX = 20;

export default function ResultLayer3({ egoScores, mbtiType, showMbtiAsBonus }: Props) {
  const mountain = classifyMountainType(egoScores);

  return (
    <div className="mt-8">
      {/* 山型分類 */}
      <div className="text-[13px] font-semibold text-white/40 mb-1 tracking-wider">
        エゴグラムプロフィール
      </div>

      <div className="px-4 py-3.5 mb-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
        <div className="text-center">
          <div className="text-lg font-bold">{mountain.name}</div>
          <div className="text-[12px] text-white/35 mt-1">
            念系統傾向：{mountain.nenTendency}
          </div>
        </div>
      </div>

      {/* エゴグラム5軸バーチャート */}
      <div>
        {EGO_AXES.map((axis) => {
          const val = egoScores[axis];
          const pct = (val / EGO_MAX) * 100;
          return (
            <div key={axis} className="mb-2.5">
              <div className="flex justify-between text-[13px] mb-1">
                <span>{EGO_LABELS[axis]}</span>
                <span className="text-white/40">{val} / {EGO_MAX}</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded">
                <div
                  className="h-full rounded bg-white/30"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* MBTI表示 */}
      <div className="mt-6">
        <div className="text-[13px] font-semibold text-white/40 mb-3 tracking-wider">
          {showMbtiAsBonus ? "おまけ：あなたのMBTIタイプ" : "MBTIタイプ"}
        </div>
        <div
          className="text-center py-3 rounded-xl bg-white/[0.05] border border-white/10
            text-2xl font-black tracking-widest"
        >
          {mbtiType}
        </div>
      </div>
    </div>
  );
}
