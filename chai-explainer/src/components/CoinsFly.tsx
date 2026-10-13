import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Coin } from "../assets/Money";

// A few coins arc from a source point into a target (pile or wallet).
export const CoinsFly: React.FC<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  count?: number;
  delay?: number;
  stagger?: number;
  duration?: number;
  size?: number;
  arc?: number;
}> = ({ from, to, count = 6, delay = 0, stagger = 4, duration = 20, size = 70, arc = 260 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {new Array(count).fill(0).map((_, i) => {
        const start = delay + i * stagger;
        const p = interpolate(frame, [start, start + duration], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.inOut(Easing.quad),
        });
        if (frame < start) return null;
        // Landed coins stack slightly so the pile grows.
        const tx = to.x + ((i % 3) - 1) * size * 0.45;
        const ty = to.y - Math.floor(i / 3) * size * 0.22;
        const x = from.x + (tx - from.x) * p;
        const y = from.y + (ty - from.y) * p - Math.sin(p * Math.PI) * arc;
        const rot = (1 - p) * 360;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - size / 2,
              top: y - size / 2,
              width: size,
              height: size,
              transform: `rotate(${rot}deg)`,
            }}
          >
            <Coin size={size} />
          </div>
        );
      })}
    </>
  );
};
