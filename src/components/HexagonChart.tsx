import type { NenType } from "../constants/nenTypes";
import { NEN_TYPES } from "../constants/nenTypes";

interface Props {
  scores: Record<NenType, number>;
  topType: NenType;
}

const TYPES: NenType[] = [
  "enhancement", "transmutation", "conjuration",
  "manipulation", "emission", "specialization",
];
const LABELS = ["強化", "変化", "具現化", "操作", "放出", "特質"];

const CX = 150;
const CY = 150;
const R = 110;

function pointAt(i: number, r: number): [number, number] {
  const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
  return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)];
}

export default function HexagonChart({ scores, topType }: Props) {
  const maxScore = Math.max(...TYPES.map((t) => scores[t]), 1);
  const dataPoints = TYPES.map((t, i) =>
    pointAt(i, (scores[t] / maxScore) * R)
  );
  const dataPoly = dataPoints.map((p) => p.join(",")).join(" ");
  const color = NEN_TYPES[topType].color;

  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full max-w-[320px] mx-auto block"
    >
      {/* グリッド */}
      {[1, 0.66, 0.33].map((s) => (
        <polygon
          key={s}
          points={TYPES.map((_, i) => pointAt(i, R * s).join(",")).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={1}
        />
      ))}

      {/* 軸線 */}
      {TYPES.map((_, i) => {
        const [x, y] = pointAt(i, R);
        return (
          <line
            key={i}
            x1={CX} y1={CY} x2={x} y2={y}
            stroke="rgba(255,255,255,0.08)"
          />
        );
      })}

      {/* データポリゴン */}
      <polygon
        points={dataPoly}
        fill={color + "55"}
        stroke={color}
        strokeWidth={2.5}
      />

      {/* データポイント */}
      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4} fill={color} />
      ))}

      {/* ラベル */}
      {TYPES.map((_, i) => {
        const [x, y] = pointAt(i, R + 22);
        return (
          <text
            key={i}
            x={x} y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(255,255,255,0.85)"
            fontSize={13}
            fontWeight={600}
          >
            {LABELS[i]}
          </text>
        );
      })}
    </svg>
  );
}
