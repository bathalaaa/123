import React from "react";
import { colors, outline } from "../theme";

// Simple customer silhouette, deliberately less detailed than the seller.
export const Customer: React.FC<{ width?: number; tint?: string; holdingCup?: boolean }> = ({
  width = 170,
  tint = colors.brown,
  holdingCup = false,
}) => (
  <svg width={width} height={(width * 400) / 170} viewBox="0 0 170 400" style={{ overflow: "visible" }}>
    <path d="M 30 190 Q 85 160 140 190 L 150 390 L 20 390 Z" fill={tint} fillOpacity={0.45} {...outline} />
    <circle cx={85} cy={110} r={52} fill={tint} fillOpacity={0.3} {...outline} />
    {holdingCup ? (
      <g transform="translate(100 236)">
        <path d="M 0 0 L 34 0 L 28 40 L 6 40 Z" fill={colors.chai} {...outline} strokeWidth={4} />
      </g>
    ) : null}
  </svg>
);
