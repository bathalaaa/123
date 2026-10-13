import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, fonts, outline } from "../theme";

export const Kettle: React.FC<{ width?: number }> = ({ width = 200 }) => (
  <svg width={width} height={(width * 150) / 200} viewBox="0 0 200 150" style={{ overflow: "visible" }}>
    <path d="M 150 70 Q 196 52 196 18" fill="none" {...outline} strokeWidth={10} />
    <path d="M 150 70 Q 196 52 196 18" fill="none" stroke={colors.cream} strokeWidth={3} strokeLinecap="round" />
    <path d="M 40 50 Q 40 140 100 140 Q 160 140 160 50 Z" fill={colors.cream} {...outline} />
    <path d="M 56 48 Q 100 0 144 48" fill="none" {...outline} strokeWidth={7} />
    <rect x={36} y={40} width={128} height={16} rx={8} fill={colors.chai} {...outline} />
    <circle cx={100} cy={30} r={8} fill={colors.charcoal} />
  </svg>
);

export const Stove: React.FC<{ width?: number }> = ({ width = 260 }) => {
  const frame = useCurrentFrame();
  const f = 1 + Math.sin(frame / 3) * 0.08;
  return (
    <svg width={width} height={(width * 220) / 260} viewBox="0 0 260 220" style={{ overflow: "visible" }}>
      <g transform={`translate(130 96) scale(1 ${f}) translate(-130 -96)`}>
        <path d="M 130 40 Q 100 80 104 100 Q 130 116 156 100 Q 160 80 130 40 Z" fill={colors.chai} {...outline} />
        <path d="M 130 70 Q 118 88 120 100 Q 130 106 140 100 Q 142 88 130 70 Z" fill={colors.cream} />
      </g>
      <rect x={60} y={100} width={140} height={20} rx={6} fill={colors.charcoal} />
      <rect x={20} y={118} width={220} height={80} rx={14} fill={colors.cream} {...outline} />
      <circle cx={70} cy={158} r={14} fill={colors.chai} {...outline} />
      <circle cx={190} cy={158} r={14} fill={colors.chai} {...outline} />
      <rect x={40} y={196} width={20} height={18} fill={colors.charcoal} />
      <rect x={200} y={196} width={20} height={18} fill={colors.charcoal} />
    </svg>
  );
};

export const Utensils: React.FC<{ width?: number }> = ({ width = 260 }) => (
  <svg width={width} height={(width * 220) / 260} viewBox="0 0 260 220" style={{ overflow: "visible" }}>
    {/* ladle */}
    <path d="M 210 20 L 170 140" {...outline} strokeWidth={10} />
    <path d="M 210 20 L 170 140" stroke={colors.brown} strokeWidth={4} strokeLinecap="round" />
    {/* pot */}
    <path d="M 30 100 L 200 100 L 186 200 Q 115 214 44 200 Z" fill={colors.cream} {...outline} />
    <rect x={20} y={88} width={190} height={20} rx={10} fill={colors.brown} {...outline} />
    <path d="M 20 120 Q 0 120 4 140" fill="none" {...outline} />
    <path d="M 210 120 Q 230 120 226 140" fill="none" {...outline} />
    {/* strainer */}
    <circle cx={226} cy={176} r={26} fill={colors.cream} {...outline} />
    <path d="M 210 168 L 242 168 M 210 182 L 242 182 M 218 158 L 218 196 M 234 158 L 234 196" stroke={colors.charcoal} strokeWidth={2} />
  </svg>
);

// Clay kulhad with chai inside.
export const Cup: React.FC<{ width?: number }> = ({ width = 120 }) => (
  <svg width={width} height={(width * 130) / 120} viewBox="0 0 120 130" style={{ overflow: "visible" }}>
    <path d="M 12 20 L 108 20 L 92 122 Q 60 130 28 122 Z" fill={colors.chai} {...outline} />
    <ellipse cx={60} cy={20} rx={48} ry={10} fill={colors.brown} {...outline} />
    <path d="M 24 60 L 96 60" stroke={colors.brown} strokeWidth={4} strokeOpacity={0.5} />
  </svg>
);

export const MilkPacket: React.FC<{ width?: number }> = ({ width = 180 }) => (
  <svg width={width} height={(width * 220) / 180} viewBox="0 0 180 220" style={{ overflow: "visible" }}>
    <path d="M 20 30 Q 90 10 160 30 Q 176 120 160 200 Q 90 216 20 200 Q 4 120 20 30 Z" fill={colors.white} {...outline} />
    <path d="M 20 140 Q 90 120 160 140 L 160 200 Q 90 216 20 200 Z" fill={colors.green} fillOpacity={0.85} />
    <path d="M 20 30 Q 90 10 160 30 Q 176 120 160 200 Q 90 216 20 200 Q 4 120 20 30 Z" fill="none" {...outline} />
    <text x={90} y={100} textAnchor="middle" fontFamily={fonts.heading} fontWeight={800} fontSize={36} fill={colors.charcoal}>
      MILK
    </text>
  </svg>
);

export const TeaJar: React.FC<{ width?: number }> = ({ width = 170 }) => (
  <svg width={width} height={(width * 220) / 170} viewBox="0 0 170 220" style={{ overflow: "visible" }}>
    <rect x={30} y={20} width={110} height={34} rx={8} fill={colors.chai} {...outline} />
    <rect x={18} y={54} width={134} height={156} rx={24} fill={colors.cream} {...outline} />
    <path d="M 26 120 Q 85 104 144 120 L 144 186 Q 144 204 126 204 L 44 204 Q 26 204 26 186 Z" fill={colors.brown} />
    {[
      [50, 140], [80, 132], [112, 146], [64, 170], [98, 168], [128, 180], [46, 188], [84, 192],
    ].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx={9} ry={5} fill={colors.charcoal} fillOpacity={0.5} transform={`rotate(${i * 40} ${x} ${y})`} />
    ))}
    <rect x={18} y={54} width={134} height={156} rx={24} fill="none" {...outline} />
  </svg>
);

export const SugarBowl: React.FC<{ width?: number }> = ({ width = 200 }) => (
  <svg width={width} height={(width * 170) / 200} viewBox="0 0 200 170" style={{ overflow: "visible" }}>
    {[
      [56, 60], [92, 48], [128, 60], [74, 30], [112, 28],
    ].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width={34} height={34} rx={5} fill={colors.white} {...outline} strokeWidth={4} />
    ))}
    <path d="M 14 86 L 186 86 Q 180 160 100 160 Q 20 160 14 86 Z" fill={colors.chai} {...outline} />
    <rect x={70} y={156} width={60} height={12} rx={6} fill={colors.brown} {...outline} strokeWidth={4} />
  </svg>
);

export const GasCylinder: React.FC<{ width?: number }> = ({ width = 150 }) => (
  <svg width={width} height={(width * 240) / 150} viewBox="0 0 150 240" style={{ overflow: "visible" }}>
    <rect x={52} y={6} width={46} height={26} rx={6} fill={colors.charcoal} />
    <path d="M 40 40 Q 40 28 75 28 Q 110 28 110 40 L 110 56 L 40 56 Z" fill={colors.red} {...outline} />
    <rect x={18} y={52} width={114} height={170} rx={40} fill={colors.red} {...outline} />
    <rect x={18} y={112} width={114} height={18} fill={colors.cream} {...outline} strokeWidth={4} />
    <rect x={30} y={218} width={90} height={16} rx={4} fill={colors.charcoal} />
  </svg>
);

export const PaperCups: React.FC<{ width?: number }> = ({ width = 150 }) => (
  <svg width={width} height={(width * 230) / 150} viewBox="0 0 150 230" style={{ overflow: "visible" }}>
    {[0, 1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M ${20} ${30 + i * 36} L ${130} ${30 + i * 36} L ${118} ${100 + i * 36} L ${32} ${100 + i * 36} Z`}
        fill={i === 0 ? colors.white : colors.cream}
        {...outline}
      />
    ))}
    <path d="M 20 30 L 130 30" {...outline} strokeWidth={8} />
  </svg>
);
