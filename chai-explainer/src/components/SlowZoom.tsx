import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

// Gentle Ken Burns so no scene is ever fully static.
export const SlowZoom: React.FC<{
  from?: number;
  to?: number;
  origin?: string;
  children: React.ReactNode;
}> = ({ from = 1, to = 1.05, origin = "50% 50%", children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const s = interpolate(frame, [0, durationInFrames], [from, to], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ transform: `scale(${s})`, transformOrigin: origin }}>
      {children}
    </AbsoluteFill>
  );
};
