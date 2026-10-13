import React from "react";
import { AbsoluteFill } from "remotion";
import { GasCylinder, MilkPacket, PaperCups, SugarBowl, TeaJar } from "../assets/Kitchen";
import { Label } from "../assets/Text";
import { CostDrain } from "../components/CostDrain";
import { PopIn } from "../components/PopIn";
import { SlowZoom } from "../components/SlowZoom";
import { cues, local, numbers } from "../config";
import { colors } from "../theme";

export const Scene5Costs: React.FC = () => {
  const c = cues.costs;
  const icons = [
    { at: c.milk, node: <MilkPacket width={170} /> },
    { at: c.tea, node: <TeaJar width={160} /> },
    { at: c.sugar, node: <SugarBowl width={210} /> },
    { at: c.gas, node: <GasCylinder width={140} /> },
    { at: c.cups, node: <PaperCups width={140} /> },
  ];
  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <SlowZoom>
        <Label size={72} color={colors.red} style={{ position: "absolute", top: 70, width: 1920, textAlign: "center" }}>
          Daily costs
        </Label>
        {icons.map((it, i) => (
          <PopIn
            key={i}
            delay={local("costs", it.at)}
            style={{
              position: "absolute",
              left: 200 + i * 310,
              top: 200,
              width: 280,
              height: 300,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            {it.node}
          </PopIn>
        ))}
        <div style={{ position: "absolute", left: 260, top: 640 }}>
          <CostDrain total={numbers.dailySales} cost={numbers.dailyCosts} delay={local("costs", c.drain)} width={1400} height={140} />
        </div>
      </SlowZoom>
    </AbsoluteFill>
  );
};
