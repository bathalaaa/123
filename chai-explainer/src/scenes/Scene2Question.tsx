import React from "react";
import { AbsoluteFill } from "remotion";
import { Wallet } from "../assets/Money";
import { QuestionMark } from "../assets/QuestionMark";
import { Label } from "../assets/Text";
import { PopIn } from "../components/PopIn";
import { cues, local } from "../config";
import { SELLER_FOCUS, StallLayout } from "./StallLayout";

export const Scene2Question: React.FC = () => (
  <AbsoluteFill>
    <StallLayout zoomFrom={1.05} zoomTo={1.3} origin={SELLER_FOCUS} customers={false} />
    <PopIn delay={local("question", cues.question.questionMark)} style={{ position: "absolute", left: 1290, top: 110 }}>
      <QuestionMark size={240} />
    </PopIn>
    <PopIn delay={local("question", cues.question.wallet)} style={{ position: "absolute", left: 1270, top: 430, width: 480, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Wallet width={360} />
      <Label size={60} style={{ marginTop: 24 }}>
        Take-home pay?
      </Label>
    </PopIn>
  </AbsoluteFill>
);
