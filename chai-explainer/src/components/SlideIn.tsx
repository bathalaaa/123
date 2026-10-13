import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

export const SlideIn: React.FC<{
  from?: "left" | "right" | "bottom";
  delay?: number;
  duration?: number;
  distance?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ from = "bottom", delay = 0, duration = 12, distance = 160, children, style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const off = (1 - p) * distance;
  const t =
    from === "left"
      ? `translateX(${-off}px)`
      : from === "right"
        ? `translateX(${off}px)`
        : `translateY(${off}px)`;
  return (
    <div style={{ ...style, transform: `${style?.transform ?? ""} ${t}`, opacity: frame < delay ? 0 : p }}>
      {children}
    </div>
  );
};
