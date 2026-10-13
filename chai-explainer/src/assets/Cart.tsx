import React from "react";
import { colors, fonts, outline } from "../theme";
import { Steam } from "../components/Steam";
import { Kettle } from "./Kitchen";

// Original chai cart: striped awning, wooden counter with sign, two wheels, kettle on top.
export const Cart: React.FC<{ width?: number; sign?: string; steam?: boolean }> = ({
  width = 640,
  sign = "CHAI",
  steam = true,
}) => {
  const k = width / 640;
  const stripes = 8;
  const sw = 580 / stripes;
  return (
    <div style={{ position: "relative", width, height: 640 * k }}>
      <svg width={width} height={640 * k} viewBox="0 -80 640 640" style={{ overflow: "visible", position: "absolute" }}>
        {/* awning sits 80 units higher so the seller's face stays visible */}
        <g transform="translate(0 -80)">
        {/* posts */}
        <rect x={62} y={110} width={18} height={320} fill={colors.brown} {...outline} />
        <rect x={560} y={110} width={18} height={320} fill={colors.brown} {...outline} />
        {/* awning stripes */}
        {new Array(stripes).fill(0).map((_, i) => (
          <g key={i}>
            <rect x={30 + i * sw} y={50} width={sw} height={70} fill={i % 2 === 0 ? colors.chai : colors.cream} />
            <path
              d={`M ${30 + i * sw} 120 A ${sw / 2} ${sw / 2.6} 0 0 0 ${30 + (i + 1) * sw} 120 Z`}
              fill={i % 2 === 0 ? colors.chai : colors.cream}
              {...outline}
            />
          </g>
        ))}
        <rect x={30} y={50} width={580} height={70} fill="none" {...outline} />
        <path d="M 20 52 L 320 18 L 620 52 Z" fill={colors.brown} {...outline} />
        </g>
        {/* counter */}
        <rect x={40} y={330} width={560} height={140} rx={10} fill={colors.brown} {...outline} />
        <rect x={28} y={312} width={584} height={28} rx={8} fill={colors.cream} {...outline} />
        <rect x={210} y={360} width={220} height={80} rx={14} fill={colors.cream} {...outline} />
        <text
          x={320}
          y={415}
          textAnchor="middle"
          fontFamily={fonts.heading}
          fontWeight={800}
          fontSize={48}
          fill={colors.chai}
          letterSpacing={4}
        >
          {sign}
        </text>
        {/* cups on counter */}
        {[420, 470, 520].map((x) => (
          <path key={x} d={`M ${x} 272 L ${x + 34} 272 L ${x + 28} 312 L ${x + 6} 312 Z`} fill={colors.chai} {...outline} strokeWidth={4} />
        ))}
        {/* wheels */}
        {[150, 490].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy={492} r={56} fill={colors.cream} {...outline} />
            <circle cx={cx} cy={492} r={12} fill={colors.charcoal} />
            {[0, 60, 120].map((a) => (
              <line
                key={a}
                x1={cx + Math.cos((a * Math.PI) / 180) * 50}
                y1={492 + Math.sin((a * Math.PI) / 180) * 50}
                x2={cx - Math.cos((a * Math.PI) / 180) * 50}
                y2={492 - Math.sin((a * Math.PI) / 180) * 50}
                stroke={colors.charcoal}
                strokeWidth={4}
              />
            ))}
          </g>
        ))}
      </svg>
      <div style={{ position: "absolute", left: 120 * k, top: 266 * k }}>
        <Kettle width={170 * k} />
      </div>
      {steam ? <Steam width={90 * k} height={120 * k} style={{ position: "absolute", left: 158 * k, top: 146 * k }} /> : null}
    </div>
  );
};
