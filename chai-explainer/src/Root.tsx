import { Composition } from "remotion";
import { FPS, HEIGHT, WIDTH, sec, totalSeconds } from "./config";
import { Video } from "./Video";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ChaiExplainer"
    component={Video}
    durationInFrames={sec(totalSeconds)}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
