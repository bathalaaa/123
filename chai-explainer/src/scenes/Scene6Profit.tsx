import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Calendar } from "../assets/Calendar";
import { Note } from "../assets/Money";
import { BigNumber } from "../assets/Text";
import { CountUp } from "../components/CountUp";
import { PopIn } from "../components/PopIn";
import { SlowZoom } from "../components/SlowZoom";
import { cues, local, numbers } from "../config";
import { colors } from "../theme";

export const Scene6Profit: React.FC = () => {
  const frame = useCurrentFrame();
  const c = cues.profit;
  const dayAt = local("profit", c.perDay);
  const calAt = local("profit", c.calendar);
  const monthAt = local("profit", c.perMonth);
  const dayFloat = interpolate(frame, [calAt, monthAt], [1, 30], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const day = Math.floor(dayFloat);
  const flipping = frame >= calAt && frame < monthAt;
  const squash = flipping ? 1 - 0.25 * Math.sin((dayFloat % 1) * Math.PI) : 1;
  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <SlowZoom>
        <PopIn delay={dayAt} style={{ position: "absolute", top: 110, width: 1920, display: "flex", justifyContent: "center" }}>
          <BigNumber size={170} color={colors.green}>
            <CountUp to={numbers.dailyProfit} delay={dayAt} duration={24} />
            <span style={{ fontSize: 90, color: colors.charcoal }}> / day</span>
          </BigNumber>
        </PopIn>
        <PopIn delay={calAt} style={{ position: "absolute", left: 300, top: 420 }}>
          <div style={{ transform: `scaleY(${squash})`, transformOrigin: "50% 0%" }}>
            <Calendar width={320} day={day} />
          </div>
        </PopIn>
        <PopIn delay={monthAt} origin="0% 50%" style={{ position: "absolute", left: 700, top: 570 }}>
          <BigNumber size={136} color={colors.green}>
            ₹{Math.round(numbers.monthlyProfit).toLocaleString("en-IN")}+
            <span style={{ fontSize: 72, color: colors.charcoal }}> / month</span>
          </BigNumber>
        </PopIn>
        {[0, 1, 2].map((i) => (
          <PopIn key={i} delay={monthAt + 6 + i * 4} style={{ position: "absolute", left: 820 + i * 260, top: 800, transform: `rotate(${(i - 1) * 8}deg)` }}>
            <Note width={220} />
          </PopIn>
        ))}
      </SlowZoom>
    </AbsoluteFill>
  );
};
