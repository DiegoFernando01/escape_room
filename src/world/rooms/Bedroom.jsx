import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRafLoop } from "react-use";

import woodSound from "/assets/sounds/steps/wood.mp3";
import woodEndSound from "/assets/sounds/steps/wood-end2.mp3";
import backgroundSound from "/assets/sounds/background.mp3";

const Bedroom = () => {
  const roomModel = useGLTF("/assets/models/bedroom/scene.gltf");
  const { camera, gl } = useThree();
  const cameraRef = useRef();
  const isDragging = useRef(false);
  const prevMouseX = useRef(null);
  const isMovingForward = useRef(false);
  const isRotatingCamera = useRef(false);
  const isCameraShaking = useRef(false);
  const audioRef = useRef(new Audio(woodSound));
  const audioEndRef = useRef(new Audio(woodEndSound));

  // Elemento de audio para el sonido de fondo.
  const backgroundAudioRef = useRef(new Audio(backgroundSound));

  const movementDirection = useRef({ x: 0, z: -1 });
  const movementSpeed = 0.04;
  const shakeAmplitude = 0.02;
  const shakeFrequency = 0.015;
  const cameraShakeOffset = useRef(0);

  const [elapsedTime, setElapsedTime] = useState(0); // Nuevo estado para el tiempo transcurrido.

  // Nuevo estado para registrar si se está presionando el clic izquierdo.
  const [isLeftClickPressed, setIsLeftClickPressed] = useState(false);

  // Nuevo estado para registrar si se está presionando el clic derecho.
  const [isRightClickPressed, setIsRightClickPressed] = useState(false);

  // Nuevo estado para registrar si se soltó el clic izquierdo.
  const [isLeftClickReleased, setIsLeftClickReleased] = useState(false);

  // Nuevo estado para controlar si el sonido de fondo se ha iniciado.
  const [isBackgroundSoundStarted, setIsBackgroundSoundStarted] = useState(false);

  // Función para reiniciar el sonido de fondo con un retraso aleatorio.
  const restartBackgroundSound = () => {
    // Detenemos el sonido actual.
    backgroundAudioRef.current.pause();

    // Calculamos un retraso aleatorio entre 0 y 10 segundos.
    const randomDelay = Math.random() * 10000; // 10 segundos en milisegundos

    // Iniciamos el sonido nuevamente después del retraso.
    setTimeout(() => {
      backgroundAudioRef.current.currentTime = 0;
      backgroundAudioRef.current.play();
      setElapsedTime(0); // Reiniciamos el tiempo transcurrido.
    }, randomDelay);
  };

  const shakeCamera = () => {
    if (isLeftClickPressed) {
      cameraShakeOffset.current =
        Math.sin(performance.now() * shakeFrequency) * shakeAmplitude;
      if (cameraRef.current && isCameraShaking.current) {
        cameraRef.current.position.y = 5 + cameraShakeOffset.current;
      }
    }
  };

  const [, stop] = useRafLoop(shakeCamera);

  useEffect(() => {
    // Configurar la posición y orientación inicial de la cámara.
    camera.position.set(1, 5, -14);
    camera.lookAt(2, 2, 2);
    cameraRef.current = camera;
  }, [camera]);

  // Nuevo: Control de reproducción del sonido de fondo al inicio.
  useEffect(() => {
    // Agregar un oyente para reiniciar el sonido de fondo cuando termine.
    backgroundAudioRef.current.addEventListener(
      "ended",
      restartBackgroundSound
    );

    // Iniciar el sonido de fondo al cargar el componente.
    backgroundAudioRef.current.loop = true;

    // Iniciar el sonido de fondo solo si no se ha iniciado ya.
    if (!isBackgroundSoundStarted) {
      backgroundAudioRef.current.play();
      setIsBackgroundSoundStarted(true);
    }

    return () => {
      // Detener el sonido y eliminar el oyente al desmontar el componente.
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current.removeEventListener(
        "ended",
        restartBackgroundSound
      );
    };
  }, [isBackgroundSoundStarted]);

  // Nueva función para iniciar el sonido de fondo al dar el primer paso.
  const startBackgroundSound = () => {
    if (!isBackgroundSoundStarted) {
      backgroundAudioRef.current.play();
      setIsBackgroundSoundStarted(true);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    isDragging.current = true;
    prevMouseX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      if (isRotatingCamera.current) {
        const deltaX = e.clientX - prevMouseX.current;
        const rotationSpeed = 0.005; // Ajusta la velocidad de rotación
        const rotationY = cameraRef.current.rotation.y - deltaX * rotationSpeed;
        cameraRef.current.rotation.y = rotationY;
      }
      prevMouseX.current = e.clientX;
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      // Clic izquierdo: Avanzar
      isMovingForward.current = true;
      isCameraShaking.current = true;

      // Calcular la nueva dirección de movimiento basada en la rotación de la cámara
      const angle = cameraRef.current.rotation.y;
      movementDirection.current = {
        x: Math.sin(-angle), // Cambiar el signo
        z: Math.cos(-angle), // Cambiar el signo
      };

      const moveForward = () => {
        if (isMovingForward.current && cameraRef.current) {
          cameraRef.current.position.x += movementDirection.current.x * movementSpeed; // Cambiar el signo
          cameraRef.current.position.z += movementDirection.current.z * movementSpeed; // Cambiar el signo
          requestAnimationFrame(moveForward);
          audioRef.current.play();
          // Nuevo: Iniciar el sonido de fondo al dar el primer paso.
          startBackgroundSound();
        }
      };

      moveForward();

      setIsLeftClickPressed(true);
      setIsLeftClickReleased(false); // Reiniciar el estado de liberación
      setIsRightClickPressed(false);
    } else if (e.button === 2) {
      // Clic derecho: Rotar la cámara
      isRotatingCamera.current = true;
      setIsRightClickPressed(true);
      setIsLeftClickPressed(false);
    }
  };

  const handleMouseUp = (e) => {
    isDragging.current = false;
    isRotatingCamera.current = false;
    prevMouseX.current = null;

    // Detener el movimiento cuando se suelta el clic izquierdo o derecho
    isMovingForward.current = false;
    setIsRightClickPressed(false);

    if (e.button === 0) {
      // Si se soltó el clic izquierdo, reproducir wood-end y detener wood
      audioRef.current.pause();
      audioEndRef.current.currentTime = 0;
      audioEndRef.current.play();
      setIsLeftClickPressed(false);
      setIsLeftClickReleased(true);
    }
  };

  useEffect(() => {
    stop();

    gl.domElement.addEventListener("contextmenu", handleContextMenu);
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("mousedown", handleMouseDown);
    gl.domElement.addEventListener("mouseup", handleMouseUp);

    return () => {
      gl.domElement.removeEventListener("contextmenu", handleContextMenu);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("mousedown", handleMouseDown);
      gl.domElement.removeEventListener("mouseup", handleMouseUp);
    };
  }, [gl.domElement]);

  return (
    <group>
      {/* Renderizar el modelo de la habitación dentro de un grupo. */}
      <mesh scale={[2, 2, 2]}>
        <primitive object={roomModel.scene} />
      </mesh>
    </group>
  );
};

export default Bedroom;
