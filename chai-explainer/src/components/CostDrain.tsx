import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, stroke } from "../theme";
import { formatINR } from "./CountUp";

// Green revenue bar; a red cost segment eats into it from the right.
export const CostDrain: React.FC<{
  total: number;
  cost: number;
  delay?: number;
  duration?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}> = ({ total, cost, delay = 0, duration = 30, width = 1300, height = 120, style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const costW = (cost / total) * width * p;
  const remaining = total - cost * p;
  const labelStyle: React.CSSProperties = {
    fontFamily: fonts.number,
    fontWeight: 800,
    fontSize: 64,
    color: colors.white,
    position: "absolute",
    top: 0,
    height,
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  };
  return (
    <div style={{ position: "relative", width, height, ...style }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: colors.green,
          borderRadius: 28,
          border: `${stroke.width}px solid ${stroke.color}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: costW,
            background: colors.red,
            borderLeft: costW > 2 ? `${stroke.width}px solid ${stroke.color}` : "none",
          }}
        />
      </div>
      <div style={{ ...labelStyle, left: 36 }}>₹{formatINR(remaining)}</div>
      {p > 0.35 ? (
        <div style={{ ...labelStyle, right: 36, opacity: interpolate(p, [0.35, 0.6], [0, 1], { extrapolateRight: "clamp" }) }}>
          −₹{formatINR(cost * p)}
        </div>
      ) : null}
    </div>
  );
};
