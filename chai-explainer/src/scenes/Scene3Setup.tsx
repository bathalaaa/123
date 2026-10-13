import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Cart } from "../assets/Cart";
import { Stove, Utensils } from "../assets/Kitchen";
import { PriceTag } from "../assets/Money";
import { BigNumber, Label } from "../assets/Text";
import { CountUp, formatINR } from "../components/CountUp";
import { PopIn } from "../components/PopIn";
import { SlowZoom } from "../components/SlowZoom";
import { cues, local, numbers } from "../config";
import { colors, fonts, stroke } from "../theme";

export const Scene3Setup: React.FC = () => {
  const c = cues.setup;
  const items = [
    { at: c.cart, node: <Cart width={360} steam={false} /> },
    { at: c.stove, node: <Stove width={280} /> },
    { at: c.utensils, node: <Utensils width={300} /> },
  ];
  const totalAt = local("setup", c.total);
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <SlowZoom>
        <Label size={72} style={{ position: "absolute", top: 70, width: 1920, textAlign: "center" }}>
          Setup cost
        </Label>
        {/* empty slots, filled as each item is spoken */}
        {items.map((it, i) =>
          frame < local("setup", it.at) + 4 ? (
            <div
              key={`slot-${i}`}
              style={{
                position: "absolute",
                left: 260 + i * 500,
                top: 190,
                width: 420,
                height: 520,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 26,
                opacity: 0.35,
              }}
            >
              <div style={{ width: 300, height: 300, borderRadius: 32, border: `${stroke.width}px dashed ${stroke.color}` }} />
              <div
                style={{
                  fontFamily: fonts.number,
                  fontWeight: 800,
                  fontSize: 46,
                  color: colors.charcoal,
                  border: `${stroke.width}px dashed ${stroke.color}`,
                  borderRadius: 18,
                  padding: "8px 40px",
                }}
              >
                ₹ ?
              </div>
            </div>
          ) : null,
        )}
        {items.map((it, i) => (
          <PopIn
            key={i}
            delay={local("setup", it.at)}
            style={{
              position: "absolute",
              left: 260 + i * 500,
              top: 190,
              width: 420,
              height: 520,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 26,
            }}
          >
            {it.node}
            <PriceTag text={`₹${formatINR(numbers.setupItems[i].price)}`} />
          </PopIn>
        ))}
        <PopIn delay={totalAt} style={{ position: "absolute", top: 790, width: 1920, display: "flex", justifyContent: "center" }}>
          <BigNumber size={170} color={colors.chai}>
            <CountUp to={numbers.setupCost} delay={totalAt} duration={24} />
          </BigNumber>
        </PopIn>
      </SlowZoom>
    </AbsoluteFill>
  );
};
