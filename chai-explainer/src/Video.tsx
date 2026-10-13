import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { audio, scenes, sec } from "./config";
import { colors } from "./theme";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Question } from "./scenes/Scene2Question";
import { Scene3Setup } from "./scenes/Scene3Setup";
import { Scene4Revenue } from "./scenes/Scene4Revenue";
import { Scene5Costs } from "./scenes/Scene5Costs";
import { Scene6Profit } from "./scenes/Scene6Profit";
import { Scene7Outro } from "./scenes/Scene7Outro";

const sceneComponents: Record<(typeof scenes)[number]["id"], React.FC> = {
  hook: Scene1Hook,
  question: Scene2Question,
  setup: Scene3Setup,
  revenue: Scene4Revenue,
  costs: Scene5Costs,
  profit: Scene6Profit,
  outro: Scene7Outro,
};

export const Video: React.FC = () => (
  <AbsoluteFill style={{ background: colors.cream }}>
    {scenes.map((s) => {
      const C = sceneComponents[s.id];
      return (
        <Sequence key={s.id} from={sec(s.start)} durationInFrames={sec(s.end) - sec(s.start)} name={s.id}>
          <C />
        </Sequence>
      );
    })}
    {audio.voiceover ? <Audio src={staticFile(audio.voiceover)} /> : null}
    {audio.music ? <Audio src={staticFile(audio.music)} volume={audio.musicVolume} /> : null}
  </AbsoluteFill>
);
