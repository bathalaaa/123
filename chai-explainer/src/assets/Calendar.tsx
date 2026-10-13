import React from "react";
import { colors, fonts, outline } from "../theme";

export const Calendar: React.FC<{ width?: number; day: number; label?: string }> = ({ width = 300, day, label = "DAY" }) => (
  <svg width={width} height={(width * 320) / 300} viewBox="0 0 300 320" style={{ overflow: "visible" }}>
    <rect x={10} y={30} width={280} height={280} rx={28} fill={colors.white} {...outline} />
    <path d="M 10 110 L 10 58 Q 10 30 38 30 L 262 30 Q 290 30 290 58 L 290 110 Z" fill={colors.chai} {...outline} />
    <rect x={70} y={6} width={22} height={54} rx={11} fill={colors.charcoal} />
    <rect x={208} y={6} width={22} height={54} rx={11} fill={colors.charcoal} />
    <text x={150} y={92} textAnchor="middle" fontFamily={fonts.heading} fontWeight={800} fontSize={40} fill={colors.white} letterSpacing={4}>
      {label}
    </text>
    <text x={150} y={250} textAnchor="middle" fontFamily={fonts.number} fontWeight={800} fontSize={130} fill={colors.charcoal}>
      {day}
    </text>
  </svg>
);
