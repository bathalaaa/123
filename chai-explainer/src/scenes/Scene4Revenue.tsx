import React from "react";
import { AbsoluteFill } from "remotion";
import { Cup } from "../assets/Kitchen";
import { PriceTag } from "../assets/Money";
import { BigNumber, Label } from "../assets/Text";
import { CoinsFly } from "../components/CoinsFly";
import { CountUp, formatINR } from "../components/CountUp";
import { PopIn } from "../components/PopIn";
import { SlideIn } from "../components/SlideIn";
import { SlowZoom } from "../components/SlowZoom";
import { Steam } from "../components/Steam";
import { cues, local, numbers } from "../config";
import { colors } from "../theme";

export const Scene4Revenue: React.FC = () => {
  const c = cues.revenue;
  const eqAt = local("revenue", c.equals);
  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <SlowZoom>
        <Label size={72} style={{ position: "absolute", top: 70, width: 1920, textAlign: "center" }}>
          Daily sales
        </Label>
        <PopIn
          delay={local("revenue", c.cup)}
          style={{ position: "absolute", left: 170, top: 250, width: 320, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}
        >
          <Steam width={110} height={130} style={{ marginBottom: -40 }} />
          <Cup width={220} />
          <PriceTag text={`₹${formatINR(numbers.pricePerCup)}`} fontSize={56} />
        </PopIn>
        <SlideIn from="bottom" delay={local("revenue", c.times)} style={{ position: "absolute", left: 560, top: 400 }}>
          <BigNumber size={140}>× {numbers.cupsPerDay}</BigNumber>
        </SlideIn>
        <SlideIn from="right" delay={eqAt} style={{ position: "absolute", left: 1060, top: 400 }}>
          <BigNumber size={140} color={colors.green}>
            = <CountUp to={numbers.dailySales} delay={eqAt} duration={26} />
          </BigNumber>
        </SlideIn>
        <CoinsFly from={{ x: 1880, y: -60 }} to={{ x: 1450, y: 760 }} count={9} delay={eqAt + 6} stagger={3} />
      </SlowZoom>
    </AbsoluteFill>
  );
};
