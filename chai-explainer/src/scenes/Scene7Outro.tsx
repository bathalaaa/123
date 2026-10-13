import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { cues, local } from "../config";
import { SELLER_FOCUS, StallLayout } from "./StallLayout";

export const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const waveAt = local("outro", cues.outro.wave);
  const raise = interpolate(frame, [waveAt, waveAt + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const wave = raise * (-140 + Math.sin((frame - waveAt) / 3) * 14);
  return (
    <AbsoluteFill>
      <StallLayout zoomFrom={1.3} zoomTo={1} origin={SELLER_FOCUS} wave={wave} />
    </AbsoluteFill>
  );
};
