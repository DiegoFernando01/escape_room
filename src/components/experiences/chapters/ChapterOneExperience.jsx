import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Bed from "../../../world/elements/Bed";
import Chair from "../../../world/elements/Chair";
import Bucket from "../../../world/elements/Bucket";
import Desktop from "../../../world/elements/Desktop";
import Library from "../../../world/elements/Library";
import BedroomC1 from "./BedroomC1";
import BedroomC1_1 from "./BedroomC1.1";
import BedroomC1_1_1 from "./BedroomC1.1.1";
import BedroomC1_1_2 from "./BedroomC1.1.2";
import BedroomC1_2 from "./BedroomC1.2";
import LightsC1 from "./LightsC1";
import './SceneC1.css';

const SceneC1 = ({ showButton, showAdditionalButtons, showAdditionalButtons2, onButtonClick }) => {
  return (
    <div className="scene-container">
      {showButton && <button className="Button1" onClick={() => onButtonClick("button1")}>Tomar medicina para dormir</button>}
      {showButton && <button className="Button2" onClick={() => onButtonClick("button2")}>No tomar medicina para dormir</button>}
      {showAdditionalButtons && <button className="Button3" onClick={() => onButtonClick("button3")}>Cantar para aliviar penas</button>}
      {showAdditionalButtons && <button className="Button4" onClick={() => onButtonClick("button4")}>No cantar</button>}
      {showAdditionalButtons2 && <button className="Button5" onClick={() => onButtonClick("button4")}>Cerrar los ojos</button>}
      {showAdditionalButtons2 && <button className="Button6" onClick={() => onButtonClick("button4")}>No cerrar los ojos</button>}
    </div>
  );
};

const ChapterOneExperience = () => {
  const [showButton, setShowButton] = useState(false);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [showAdditionalButtons2, setShowAdditionalButtons2] = useState(false);
  const [showBedroomC1, setShowBedroomC1] = useState(true);
  const [showBedroomC1_1, setShowBedroomC1_1] = useState(false);
  const [showBedroomC1_1_1, setShowBedroomC1_1_1] = useState(false);
  const [showBedroomC1_1_2, setShowBedroomC1_1_2] = useState(false);
  const [showBedroomC1_2, setShowBedroomC1_2] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = (button) => {
    setShowButton(false);

    if (button === "button1") {
      setShowBedroomC1(false);
      setShowBedroomC1_1(true);
      setShowBedroomC1_1_1(false);
      setShowBedroomC1_1_2(false);
      setShowBedroomC1_2(false);

      setTimeout(() => {
        setShowAdditionalButtons(true);
      }, 35000);

    } else if (button === "button2") {
      setShowBedroomC1(false);
      setShowBedroomC1_1(false);
      setShowBedroomC1_1_1(false);
      setShowBedroomC1_1_2(false);
      setShowBedroomC1_2(true);
    } else if (button === "button3") {
      setShowBedroomC1_1_1(true);
      setShowBedroomC1_1_2(false);
      setShowAdditionalButtons(false);

      setTimeout(() => {
        setShowAdditionalButtons2(true);
      }, 50000);
    } else if (button === "button4") {
      setShowBedroomC1_1_1(false);
      setShowBedroomC1_1_2(true);
      setShowAdditionalButtons(false);
    } else if (button === "button5") {
      setShowBedroomC1_1_1(false);
      setShowBedroomC1_1_2(true);
      setShowAdditionalButtons(false);
    } 

  };

  return (
    <>
      <SceneC1 showButton={showButton} showAdditionalButtons={showAdditionalButtons} showAdditionalButtons2={showAdditionalButtons2} onButtonClick={handleButtonClick} />

      <Canvas shadows>
        {showBedroomC1 && <BedroomC1 />}
        {showBedroomC1_1 && <BedroomC1_1 />}
        {showBedroomC1_1_1 && <BedroomC1_1_1 />}
        {showBedroomC1_1_2 && <BedroomC1_1_2 />}
        {showBedroomC1_2 && <BedroomC1_2 />}
        <Bed position={[1.2, 0.2, 5]} rotation-y={Math.PI * 0.95} />
        <Bucket position={[1.3, 1.19, 6.4]} />
        <Chair position={[-7.2, 0, -2]} />
        <Desktop position={[4, -1, -6.28]} />
        <Library position={[6.1, 0.42, 5]} />
        <LightsC1 />
      </Canvas>
    </>
  );
};

export default ChapterOneExperience;
