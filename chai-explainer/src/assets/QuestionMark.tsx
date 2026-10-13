import React from "react";
import { colors, fonts, outline } from "../theme";

export const QuestionMark: React.FC<{ size?: number }> = ({ size = 260 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: "visible" }}>
    <circle cx={100} cy={100} r={92} fill={colors.chai} {...outline} />
    <text x={100} y={146} textAnchor="middle" fontFamily={fonts.heading} fontWeight={800} fontSize={140} fill={colors.white}>
      ?
    </text>
  </svg>
);
