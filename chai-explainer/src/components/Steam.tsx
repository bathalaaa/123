import React from "react";
import { useCurrentFrame } from "remotion";
import { colors } from "../theme";

// Looping wavy steam lines. Place above a kettle or cup.
export const Steam: React.FC<{
  width?: number;
  height?: number;
  lines?: number;
  style?: React.CSSProperties;
}> = ({ width = 90, height = 120, lines = 3, style }) => {
  const frame = useCurrentFrame();
  const period = 45;
  return (
    <svg width={width} height={height} viewBox="0 0 90 120" style={{ overflow: "visible", ...style }}>
      {new Array(lines).fill(0).map((_, i) => {
        const t = ((frame + i * (period / lines)) % period) / period;
        const x = 15 + i * (60 / Math.max(1, lines - 1));
        const y = 100 - t * 70;
        const op = Math.sin(t * Math.PI) * 0.85;
        const sway = Math.sin((frame + i * 20) / 10) * 5;
        return (
          <path
            key={i}
            d={`M ${x} ${y + 30} C ${x - 12 + sway} ${y + 18}, ${x + 12 + sway} ${y + 8}, ${x} ${y - 5} S ${x - 10 - sway} ${y - 25}, ${x + sway} ${y - 35}`}
            fill="none"
            stroke={colors.charcoal}
            strokeOpacity={0.45}
            strokeWidth={5}
            strokeLinecap="round"
            opacity={op}
          />
        );
      })}
    </svg>
  );
};
