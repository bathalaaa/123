import React from "react";
import { AbsoluteFill } from "remotion";
import { Cup } from "../assets/Kitchen";
import { BigNumber, Label } from "../assets/Text";
import { CountUp } from "../components/CountUp";
import { PopIn } from "../components/PopIn";
import { cues, local, numbers } from "../config";
import { colors } from "../theme";
import { StallLayout } from "./StallLayout";

export const Scene1Hook: React.FC = () => {
  const counterAt = local("hook", cues.hook.counter);
  return (
    <AbsoluteFill>
      <StallLayout popCart customers={false} />
      <div style={{ position: "absolute", left: 1290, top: 150 }}>
        <PopIn delay={counterAt} origin="0% 50%">
          <BigNumber size={190} color={colors.chai}>
            <CountUp to={numbers.cupsPerDay} prefix="" suffix="+" delay={counterAt} duration={30} />
          </BigNumber>
          <Label size={68}>cups a day</Label>
        </PopIn>
      </div>
      {/* cups multiplying */}
      {new Array(10).fill(0).map((_, i) => (
        <PopIn
          key={i}
          delay={6 + i * 4}
          style={{ position: "absolute", left: 1300 + (i % 5) * 110, top: 560 + Math.floor(i / 5) * 140 }}
        >
          <Cup width={90} />
        </PopIn>
      ))}
    </AbsoluteFill>
  );
};
