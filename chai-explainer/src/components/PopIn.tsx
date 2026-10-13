import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

// Spring scale from 0 to slightly over 1, then settle.
export const PopIn: React.FC<{
  delay?: number; // frames
  children: React.ReactNode;
  style?: React.CSSProperties;
  origin?: string;
}> = ({ delay = 0, children, style, origin = "50% 50%" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 9, stiffness: 160, mass: 0.7 },
  });
  return (
    <div
      style={{
        ...style,
        transform: `${style?.transform ?? ""} scale(${s})`,
        transformOrigin: origin,
        opacity: frame < delay ? 0 : 1,
      }}
    >
      {children}
    </div>
  );
};
