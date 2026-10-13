import React from "react";
import { useCurrentFrame } from "remotion";
import { blinkScale } from "../components/IdleBob";
import { colors, outline } from "../theme";

// Original main character: chai seller in an orange kurta, cream apron and white cap.
// wave: right arm angle in degrees (0 = resting, about -140 = raised in a wave).
export const ChaiSeller: React.FC<{ width?: number; wave?: number; blinkOffset?: number; legs?: boolean }> = ({
  width = 300,
  wave = 0,
  blinkOffset = 0,
  legs = true,
}) => {
  const frame = useCurrentFrame();
  const b = blinkScale(frame, blinkOffset);
  return (
    <svg width={width} height={(width * 560) / 300} viewBox="0 0 300 560" style={{ overflow: "visible" }}>
      {/* legs (hidden when standing behind the cart) */}
      {legs ? (
        <>
          <rect x={104} y={420} width={38} height={110} rx={16} fill={colors.brown} {...outline} />
          <rect x={158} y={420} width={38} height={110} rx={16} fill={colors.brown} {...outline} />
          <ellipse cx={118} cy={534} rx={30} ry={14} fill={colors.charcoal} />
          <ellipse cx={182} cy={534} rx={30} ry={14} fill={colors.charcoal} />
        </>
      ) : null}
      {/* left arm (resting) */}
      <g transform="rotate(12 82 252)">
        <rect x={62} y={240} width={40} height={150} rx={20} fill={colors.chai} {...outline} />
        <circle cx={82} cy={398} r={20} fill={colors.skin} {...outline} />
      </g>
      {/* kurta body */}
      <path
        d="M 92 236 Q 150 220 208 236 Q 236 246 238 280 L 246 446 Q 150 466 54 446 L 62 280 Q 64 246 92 236 Z"
        fill={colors.chai}
        {...outline}
      />
      {/* apron */}
      <path d="M 104 300 L 196 300 L 204 440 Q 150 452 96 440 Z" fill={colors.cream} {...outline} />
      <path d="M 116 300 Q 150 262 184 300" fill="none" {...outline} />
      <rect x={126} y={350} width={48} height={34} rx={8} fill={colors.cream} {...outline} />
      {/* right arm (waves) */}
      <g transform={`rotate(${-12 + wave} 218 252)`}>
        <rect x={198} y={240} width={40} height={150} rx={20} fill={colors.chai} {...outline} />
        <circle cx={218} cy={398} r={20} fill={colors.skin} {...outline} />
      </g>
      {/* neck */}
      <rect x={132} y={210} width={36} height={34} rx={10} fill={colors.skin} {...outline} />
      {/* ears */}
      <circle cx={80} cy={160} r={16} fill={colors.skin} {...outline} />
      <circle cx={220} cy={160} r={16} fill={colors.skin} {...outline} />
      {/* head */}
      <circle cx={150} cy={156} r={72} fill={colors.skin} {...outline} />
      {/* cap */}
      <path d="M 86 118 Q 92 74 150 70 Q 208 74 214 118 Q 150 128 86 118 Z" fill={colors.white} {...outline} />
      <path d="M 150 72 L 150 122" stroke={colors.charcoal} strokeWidth={3} strokeOpacity={0.35} />
      {/* eyes */}
      <g transform={`translate(0 156) scale(1 ${b}) translate(0 -156)`}>
        <circle cx={124} cy={156} r={8} fill={colors.charcoal} />
        <circle cx={176} cy={156} r={8} fill={colors.charcoal} />
      </g>
      {/* cheeks */}
      <circle cx={106} cy={184} r={11} fill={colors.chai} opacity={0.35} />
      <circle cx={194} cy={184} r={11} fill={colors.chai} opacity={0.35} />
      {/* moustache and smile */}
      <path d="M 128 186 Q 140 176 150 186 Q 160 176 172 186 Q 160 196 150 190 Q 140 196 128 186 Z" fill={colors.charcoal} />
      <path d="M 134 202 Q 150 214 166 202" fill="none" {...outline} strokeWidth={4} />
    </svg>
  );
};
