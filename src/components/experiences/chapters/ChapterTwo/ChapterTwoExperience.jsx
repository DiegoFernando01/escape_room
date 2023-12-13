import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Bed from "../../../../world/elements/Bed";
import Chair from "../../../../world/elements/Chair";
import Bucket from "../../../../world/elements/Bucket";
import Desktop from "../../../../world/elements/Desktop";
import Library from "../../../../world/elements/Library";
import BedroomC2 from "./BedroomC2_1";
import LightsC2 from "./LightsC2";
import Pared from "./Pared";

const ChapterOneExperience = () => {
  const [isBedClicked, setIsBedClicked] = useState(false);
  const [isLibraryClicked, setIsLibraryClicked] = useState(false);
  const [isDesktopClicked, setIsDesktopClicked] = useState(false);
  const [isBucketClicked, setIsBucketClicked] = useState(false);
  const [isParedClicked, setIsParedClicked] = useState(false);

  const [lastClickTime, setLastClickTime] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleElementClick = (audioSrc) => {
    const currentTime = new Date().getTime();
    
    if (currentTime - lastClickTime > 20000 && !isAudioPlaying) {
      playAudio(audioSrc);
      setLastClickTime(currentTime);
    }
  };

  const playAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.play();
    setIsAudioPlaying(true);

    audio.addEventListener("ended", () => {
      setIsAudioPlaying(false);
    });
  };

  return (
    <>
      <Canvas shadows>
        <BedroomC2 />
        <Bed
          onClick={() => {
            setIsBedClicked(true);
            handleElementClick("/assets/sounds/Scenes C2/C2_2.mp3");
          }}
          position={[1.2, 0.2, 5]}
          rotation-y={Math.PI * 0.95}
        />
        <Bucket
          onBucketClick={() => {
            setIsBucketClicked(true);
            handleElementClick("/assets/sounds/Scenes C2/C2_5.mp3");
          }}
          position={[5, 0, -2]}
        />
        <Chair
          onClick={() => {
            // Puedes agregar lógica específica del silla aquí si es necesario
          }}
          position={[-7.2, 0, -2]}
        />
        <Desktop
          onClick={() => {
            setIsDesktopClicked(true);
            handleElementClick("/assets/sounds/Scenes C2/C2_4.mp3");
          }}
          position={[4, -1, -6.28]}
        />
        <Library
          onClick={() => {
            setIsLibraryClicked(true);
            // Puedes agregar lógica específica de la biblioteca aquí si es necesario
          }}
          position={[6.1, 0.42, 5]}
        />
        <LightsC2 />
        <Pared
          onParedClick={() => {
            setIsParedClicked(true);
            handleElementClick("/assets/sounds/Scenes C2/C2_6.mp3");
          }}
          position={[4.3, 5, -12.5]}
        />
      </Canvas>
    </>
  );
};

export default ChapterOneExperience;
