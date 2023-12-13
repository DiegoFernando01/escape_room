// LightsC1.jsx
import React, { useState, useEffect } from "react";
import circuitSound from "/assets/sounds/circuit.mp3";


const LightsC1 = () => {
  const [ambientLightOn, setAmbientLightOn] = useState(true); // Inicializa con la luz ambiente encendida
  const [pointLightsOn, setPointLightsOn] = useState(false);
  const [circuitSoundOn, setCircuitSoundOn] = useState(false);

  useEffect(() => {
    const addQuickFlashes = () => {
      setPointLightsOn(true);
      setCircuitSoundOn(true);
      setTimeout(() => {
        setPointLightsOn(false);
        setCircuitSoundOn(false);
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
      }, 4000); // Duración fija de 4 segundos para la luz encendida
    };

    const keepLightsOff = () => {
      setPointLightsOn(false);
      setTimeout(() => {
        setPointLightsOn(true);
        setTimeout(() => {
          keepLightsOff();
        }, Math.random() * 15000 + 5000);
      }, 4000); // Duración fija de 4 segundos para la luz apagada
    };

    // Iniciar después de 33 segundos
    const initialTimeout = setTimeout(() => {
      // No apagar la luz ambiente aquí
      // setAmbientLightOn(true); // Encender la luz ambiente

      // Iniciar el bucle de acciones aleatorias después de 4 segundos
      const interval = setInterval(() => {
        const randomAction = Math.random();
        if (randomAction < 0.1) {
          addQuickFlashes();
        } else if (randomAction < 0.7) {
          keepLightsOn();
        } else {
          keepLightsOff();
        }
      }, 6000); // Intervalo fijo de 6 segundos para el bucle principal

      return () => {
        clearInterval(interval);
      };
    }, 25000); // Esperar 33 segundos antes de iniciar

    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  useEffect(() => {
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
      {ambientLightOn && <ambientLight intensity={0.1} />}
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

export default LightsC1;
