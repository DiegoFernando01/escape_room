import React from "react";
import Bed from "../../../world/elements/Bed";
import Chair from "../../../world/elements/chair";
import Bucket from "../../../world/elements/Bucket";
import Desktop from "../../../world/elements/Desktop";
import Library from "../../../world/elements/Library";
import BedroomC2 from "./BedroomC2";
import LightsC1 from "./LightsC1";
import { Canvas } from "@react-three/fiber";



const ChapterOneExperience = () => {
  return (
    <Canvas shadows>
      <BedroomC2 />
      <Bed position={[1.2, 0.2, 5]} rotation-y={Math.PI * 0.95} />
      <Bucket position={[1.3, 1.19, 6.4]} />
      <Chair position={[-7.2, 0, -2]} />
      <Desktop position={[4, -1, -6.28]} />
      <Library position={[6.1, 0.42, 5]} />
      <LightsC1 />
    </Canvas>
  );
};

export default ChapterOneExperience;
