import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

export const formatINR = (n: number) =>
  Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

// Numbers count up to their value with Indian comma grouping (50,000 / 1,00,000).
export const CountUp: React.FC<{
  to: number;
  from?: number;
  delay?: number; // frames
  duration?: number; // frames
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ to, from = 0, delay = 0, duration = 24, prefix = "₹", suffix = "", style }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [delay, delay + duration], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {prefix}
      {formatINR(v)}
      {suffix}
    </span>
  );
};
