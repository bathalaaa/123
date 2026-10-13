import React from "react";
import { colors, fonts } from "../theme";

export const BigNumber: React.FC<{ children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }> = ({
  children,
  color = colors.charcoal,
  size = 180,
  style,
}) => (
  <div style={{ fontFamily: fonts.number, fontWeight: 800, fontSize: size, color, lineHeight: 1, whiteSpace: "nowrap", ...style }}>
    {children}
  </div>
);

export const Label: React.FC<{ children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }> = ({
  children,
  color = colors.charcoal,
  size = 64,
  style,
}) => (
  <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: size, color, lineHeight: 1.1, whiteSpace: "nowrap", ...style }}>
    {children}
  </div>
);
