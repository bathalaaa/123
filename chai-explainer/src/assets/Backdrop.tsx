import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, outline } from "../theme";

// Muted street-corner backdrop: building blocks, windows, pavement and a lamp post.
export const StreetBackdrop: React.FC = () => (
  <AbsoluteFill style={{ background: colors.cream }}>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      <g opacity={0.5}>
        {[
          { x: -40, w: 380, h: 560, c: colors.brown },
          { x: 330, w: 300, h: 700, c: colors.chai },
          { x: 1300, w: 340, h: 640, c: colors.chai },
          { x: 1630, w: 340, h: 520, c: colors.brown },
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={860 - b.h} width={b.w} height={b.h} fill={b.c} fillOpacity={0.35} {...outline} />
            {new Array(Math.floor(b.h / 130)).fill(0).map((_, r) =>
              [0, 1].map((cIdx) => (
                <rect
                  key={`${r}-${cIdx}`}
                  x={b.x + 50 + cIdx * (b.w / 2 - 10)}
                  y={860 - b.h + 50 + r * 130}
                  width={b.w / 2 - 90}
                  height={70}
                  rx={8}
                  fill={colors.cream}
                  {...outline}
                />
              )),
            )}
          </g>
        ))}
        {/* lamp post */}
        <rect x={1230} y={420} width={16} height={440} fill={colors.charcoal} />
        <path d="M 1238 430 Q 1238 390 1190 390" fill="none" stroke={colors.charcoal} strokeWidth={10} strokeLinecap="round" />
        <path d="M 1160 390 L 1220 390 L 1206 418 L 1174 418 Z" fill={colors.chai} {...outline} />
      </g>
      {/* pavement and road */}
      <rect x={0} y={860} width={1920} height={60} fill={colors.brown} fillOpacity={0.25} />
      <rect x={0} y={860} width={1920} height={6} fill={colors.charcoal} fillOpacity={0.6} />
      <rect x={0} y={920} width={1920} height={160} fill={colors.charcoal} fillOpacity={0.12} />
      {new Array(8).fill(0).map((_, i) => (
        <rect key={i} x={60 + i * 250} y={990} width={120} height={14} rx={7} fill={colors.cream} fillOpacity={0.8} />
      ))}
    </svg>
  </AbsoluteFill>
);
