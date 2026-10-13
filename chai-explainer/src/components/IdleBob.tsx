import React from "react";
import { useCurrentFrame } from "remotion";

// Slight breathing bob for characters.
export const IdleBob: React.FC<{
  amount?: number;
  period?: number; // frames per cycle
  phase?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ amount = 4, period = 60, phase = 0, children, style }) => {
  const frame = useCurrentFrame();
  const y = Math.sin(((frame + phase) / period) * Math.PI * 2) * amount;
  return <div style={{ ...style, transform: `${style?.transform ?? ""} translateY(${y}px)` }}>{children}</div>;
};

// Eye scaleY: closes for 4 frames roughly every 3.5 s.
export const blinkScale = (frame: number, offset = 0, every = 105) => {
  const t = (frame + offset) % every;
  if (t < 2) return 1 - t * 0.45;
  if (t < 4) return 0.1 + (t - 2) * 0.45;
  return 1;
};
