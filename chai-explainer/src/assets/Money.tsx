import React from "react";
import { colors, fonts, outline } from "../theme";

export const Coin: React.FC<{ size?: number }> = ({ size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: "visible" }}>
    <circle cx={50} cy={50} r={44} fill={colors.chai} {...outline} />
    <circle cx={50} cy={50} r={32} fill="none" stroke={colors.brown} strokeWidth={4} />
    <text x={50} y={66} textAnchor="middle" fontFamily={fonts.number} fontWeight={800} fontSize={44} fill={colors.cream}>
      ₹
    </text>
  </svg>
);

export const Note: React.FC<{ width?: number }> = ({ width = 220 }) => (
  <svg width={width} height={(width * 110) / 220} viewBox="0 0 220 110" style={{ overflow: "visible" }}>
    <rect x={6} y={6} width={208} height={98} rx={10} fill={colors.green} {...outline} />
    <circle cx={110} cy={55} r={28} fill={colors.cream} {...outline} strokeWidth={4} />
    <text x={110} y={70} textAnchor="middle" fontFamily={fonts.number} fontWeight={800} fontSize={40} fill={colors.green}>
      ₹
    </text>
  </svg>
);

export const Wallet: React.FC<{ width?: number; mark?: string }> = ({ width = 280, mark = "?" }) => (
  <svg width={width} height={(width * 220) / 280} viewBox="0 0 280 220" style={{ overflow: "visible" }}>
    <rect x={30} y={20} width={180} height={60} rx={8} fill={colors.green} {...outline} transform="rotate(-8 120 50)" />
    <rect x={14} y={50} width={252} height={160} rx={26} fill={colors.brown} {...outline} />
    <rect x={180} y={100} width={92} height={64} rx={18} fill={colors.chai} {...outline} />
    <circle cx={208} cy={132} r={10} fill={colors.cream} {...outline} strokeWidth={4} />
    <text x={96} y={160} textAnchor="middle" fontFamily={fonts.heading} fontWeight={800} fontSize={96} fill={colors.cream}>
      {mark}
    </text>
  </svg>
);

// Price tag with a string hole; text is passed in.
export const PriceTag: React.FC<{ text: string; color?: string; fontSize?: number }> = ({
  text,
  color = colors.chai,
  fontSize = 46,
}) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 14,
      background: color,
      color: colors.white,
      border: `5px solid ${colors.charcoal}`,
      borderRadius: 18,
      padding: "8px 26px 8px 18px",
      fontFamily: fonts.number,
      fontWeight: 800,
      fontSize,
      whiteSpace: "nowrap",
    }}
  >
    <span style={{ width: 16, height: 16, borderRadius: 8, background: colors.cream, border: `4px solid ${colors.charcoal}` }} />
    {text}
  </div>
);
