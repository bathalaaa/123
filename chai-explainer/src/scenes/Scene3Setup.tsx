import React from "react";
import { AbsoluteFill } from "remotion";
import { Cart } from "../assets/Cart";
import { Stove, Utensils } from "../assets/Kitchen";
import { PriceTag } from "../assets/Money";
import { BigNumber, Label } from "../assets/Text";
import { CountUp, formatINR } from "../components/CountUp";
import { PopIn } from "../components/PopIn";
import { SlowZoom } from "../components/SlowZoom";
import { cues, local, numbers } from "../config";
import { colors } from "../theme";

export const Scene3Setup: React.FC = () => {
  const c = cues.setup;
  const items = [
    { at: c.cart, node: <Cart width={360} steam={false} /> },
    { at: c.stove, node: <Stove width={280} /> },
    { at: c.utensils, node: <Utensils width={300} /> },
  ];
  const totalAt = local("setup", c.total);
  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <SlowZoom>
        <Label size={72} style={{ position: "absolute", top: 70, width: 1920, textAlign: "center" }}>
          Setup cost
        </Label>
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
