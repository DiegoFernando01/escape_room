import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import Bed from "../../../../world/elements/Bed";
import Chair from "../../../../world/elements/Chair";
import Bucket from "../../../../world/elements/Bucket";
import Desktop from "../../../../world/elements/Desktop";
import Library from "../../../../world/elements/Library";
import BedroomC1 from "./BedroomC1";
import BedroomC1_1 from "./BedroomC1.1";
import BedroomC1_1_1 from "./BedroomC1.1.1";
import BedroomC1_1_2 from "./BedroomC1.1.2";
import BedroomC1_1_1_1 from "./BedroomC1.1.1.1";
import BedroomC1_1_1_2 from "./BedroomC1.1.1.2";
import BedroomC1_2 from "./BedroomC1.2";
import LightsC1 from "./LightsC1";
import Pared from "../ChapterTwo/Pared";
import './SceneC1.css';

const SceneC1 = ({ showButton, showAdditionalButtons, showAdditionalButtons2, showOptionalButtons, showOptionalButtons1, showOptionalButtons2, showOptionalButtons3, onButtonClick }) => {
  return (
    <div className="scene-container">
      {showButton && <button className="Button1" onClick={() => onButtonClick("button1")}>Tomar medicina para dormir</button>}
      {showButton && <button className="Button2" onClick={() => onButtonClick("button2")}>No tomar medicina para dormir</button>}
      {showAdditionalButtons && <button className="Button3" onClick={() => onButtonClick("button3")}>Cerrar los ojos</button>}
      {showAdditionalButtons && <button className="Button4" onClick={() => onButtonClick("button4")}>No cerrar los ojos</button>}
      {showAdditionalButtons2 && <button className="Button5" onClick={() => onButtonClick("button5")}>Cerrar los ojos</button>}
      {showAdditionalButtons2 && <button className="Button6" onClick={() => onButtonClick("button6")}>No cerrar los ojos</button>}
      
      {showOptionalButtons && <button className="Button7" onClick={() => onButtonClick("button7")}>Continuar</button>}
      {showOptionalButtons1 && <button className="Button8" onClick={() => onButtonClick("button8")}>Continuar</button>}
      {showOptionalButtons2 && <button className="Button9" onClick={() => onButtonClick("button9")}>Continuar</button>}
      {showOptionalButtons3 && <button className="Button10" onClick={() => onButtonClick("button10")}>Continuar</button>}


    </div>
  );
};

const ChapterOneExperience = () => {
  const [showButton, setShowButton] = useState(false);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [showAdditionalButtons2, setShowAdditionalButtons2] = useState(false);
  const [showOptionalButtons, setShowOptionalButtons] = useState(false);
  const [showOptionalButtons1, setShowOptionalButtons1] = useState(false);
  const [showOptionalButtons2, setShowOptionalButtons2] = useState(false);
  const [showOptionalButtons3, setShowOptionalButtons3] = useState(false);
  const [showBedroomC1, setShowBedroomC1] = useState(true);
  const [showBedroomC1_2, setShowBedroomC1_2] = useState(false);
  const [showBedroomC1_1, setShowBedroomC1_1] = useState(false);
  const [showBedroomC1_1_1, setShowBedroomC1_1_1] = useState(false);
  const [showBedroomC1_1_2, setShowBedroomC1_1_2] = useState(false);
  const [showBedroomC1_1_1_1, setShowBedroomC1_1_1_1] = useState(false);
  const [showBedroomC1_1_1_2, setShowBedroomC1_1_1_2] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 59000);

    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = (button) => {
    setShowButton(false);

    if (button === "button1") {
      setShowBedroomC1(false);
      setShowBedroomC1_1(true);
      setShowBedroomC1_2(false);
      setShowBedroomC1_1_1(false);
      setShowBedroomC1_1_2(false);
      setShowBedroomC1_1_1_1(false);
      setShowBedroomC1_1_1_2(false);
      //va a setShowAdditionalButtons (boton 3 y 4)

      setTimeout(() => {
        setShowAdditionalButtons(true);
      }, 28000);

    } else if (button === "button2") {
      setShowBedroomC1(false);
      setShowBedroomC1_1(false);
      setShowBedroomC1_2(true);
      setShowBedroomC1_1_1(false);
      setShowBedroomC1_1_2(false);
      setShowBedroomC1_1_1_1(false);
      setShowBedroomC1_1_1_2(false);

      setTimeout(() => {
        setShowAdditionalButtons2(true);
      }, 20000);

    } else if (button === "button3") {
      setShowBedroomC1(false);
      setShowBedroomC1_1(false);
      setShowBedroomC1_2(false);
      setShowBedroomC1_1_1(true);
      setShowBedroomC1_1_2(false);
      setShowBedroomC1_1_1_1(false);
      setShowBedroomC1_1_1_2(false);
      setShowAdditionalButtons(false);
      

      setTimeout(() => {
        setShowOptionalButtons(true);
      }, 12000);
    } else if (button === "button4") {
      setShowBedroomC1(false);
      setShowBedroomC1_1(false);
      setShowBedroomC1_2(false);
      setShowBedroomC1_1_1(false);
      setShowBedroomC1_1_2(true);
      setShowBedroomC1_1_1_1(false);
      setShowBedroomC1_1_1_2(false);
      setShowAdditionalButtons(false);

      setTimeout(() => {
        setShowOptionalButtons1(true);
      }, 12000);
    } else if (button === "button5") {
      setShowBedroomC1(false);
      setShowBedroomC1_1(false);
      setShowBedroomC1_2(false);
      setShowBedroomC1_1_1(false);
      setShowBedroomC1_1_2(false);
      setShowBedroomC1_1_1_1(true);
      setShowBedroomC1_1_1_2(false);
      setShowAdditionalButtons2(false);

      setTimeout(() => {
        setShowOptionalButtons2(true);
      }, 12000);
    } else if (button === "button6") {
      setShowBedroomC1(false);
      setShowBedroomC1_1(false);
      setShowBedroomC1_2(false);
      setShowBedroomC1_1_1(false);
      setShowBedroomC1_1_2(false);
      setShowBedroomC1_1_1_1(false);
      setShowBedroomC1_1_1_2(true);
      setShowOptionalButtons3(false);

      setTimeout(() => {
        setShowOptionalButtons3(true);
      }, 12000); 
    } else if (button === "button7"){
      navigate("/chapter_two");
    }
  };

  return (
    <>
      <SceneC1 showButton={showButton} showAdditionalButtons={showAdditionalButtons} showAdditionalButtons2={showAdditionalButtons2} showOptionalButtons={showOptionalButtons} showOptionalButtons1={showOptionalButtons1} showOptionalButtons2={showOptionalButtons2} showOptionalButtons3={showOptionalButtons3} onButtonClick={handleButtonClick} />

      <Canvas shadows>
        {showBedroomC1 && <BedroomC1 />}
        {showBedroomC1_1 && <BedroomC1_1 />}
        {showBedroomC1_2 && <BedroomC1_2 />}
        {showBedroomC1_1_1 && <BedroomC1_1_1 />}
        {showBedroomC1_1_2 && <BedroomC1_1_2 />}
        {showBedroomC1_1_1_1 && <BedroomC1_1_1_1 />}
        {showBedroomC1_1_1_2 && <BedroomC1_1_1_2 />}
        <Bed position={[1.2, 0.2, 5]} rotation-y={Math.PI * 0.95} />
        <Bucket position={[4, -1, -6.28]} />
        <Chair position={[-7.2, 0, -2]} />
        <Desktop position={[4, -1, -6.28]} />
        <Library position={[6.1, 0.42, 5]} />
        <LightsC1 />
      </Canvas>
    </>
  );
};

export default ChapterOneExperience;
