// Lights.jsx
import React, { useState, useEffect } from "react";
import circuitSound from "/assets/sounds/circuit.mp3"; // Importa el sonido "circuit.mp3"

const Lights = () => {
  const [ambientLightOn, setAmbientLightOn] = useState(true);
  const [pointLightsOn, setPointLightsOn] = useState(true);
  const [circuitSoundOn, setCircuitSoundOn] = useState(false); // Estado para el sonido "circuit.mp3"

  useEffect(() => {
    const addQuickFlashes = () => {
      setPointLightsOn(true);
      setCircuitSoundOn(true); // Inicia la reproducción del sonido "circuit.mp3"
      setTimeout(() => {
        setPointLightsOn(false);
        setCircuitSoundOn(false); // Detén la reproducción del sonido
        setTimeout(() => {
          addQuickFlashes();
        }, Math.random() * 6000 + 2000);
      }, 100);
    };

    const keepLightsOn = () => {
      setPointLightsOn(true);
      setTimeout(() => {
        setPointLightsOn(false);
        setTimeout(() => {
          keepLightsOn();
        }, Math.random() * 15000 + 5000);
      }, 2000);
    };

    const keepLightsOff = () => {
      setPointLightsOn(false);
      setTimeout(() => {
        setPointLightsOn(true);
        setTimeout(() => {
          keepLightsOff();
        }, Math.random() * 15000 + 5000);
      }, 2000);
    };

    const interval = setInterval(() => {
      setAmbientLightOn(true);

      const randomAction = Math.random();
      if (randomAction < 0.1) {
        addQuickFlashes();
      } else if (randomAction < 0.7) {
        keepLightsOn();
      } else {
        keepLightsOff();
      }
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Efecto para controlar la reproducción del sonido "circuit.mp3"
    const circuitAudio = new Audio(circuitSound);

    if (circuitSoundOn) {
      circuitAudio.play();
    } else {
      circuitAudio.pause();
      circuitAudio.currentTime = 0;
    }

    return () => {
      circuitAudio.pause();
      circuitAudio.currentTime = 0;
    };
  }, [circuitSoundOn]);

  return (
    <>
      {ambientLightOn && <ambientLight intensity={0.5} />}
      {pointLightsOn && (
        <>
        <pointLight position={[4, 1, -5]} intensity={30} />
        <pointLight position={[-5, 1, -5]} intensity={30} />
        <pointLight position={[4, 1, 1]} intensity={30} />
        <pointLight position={[4, 6, -11.5]} intensity={30} />
      
        </>
      )}
    </>
  );
};

export default Lights;
