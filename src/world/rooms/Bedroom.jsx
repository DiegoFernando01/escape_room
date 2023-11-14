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
  const movementSpeed = 0.042;
  const shakeAmplitude = 0.02;
  const shakeFrequency = 0.015;
  const cameraShakeOffset = useRef(0);
  const [isColliding, setIsColliding] = useState(false);

  const walls = [
    { position: { x: -2.89409022321951664, y: 6, z: -14.909690848615181 }, width: 10, height: 5, depth: 0.8 },
    { position: { x: 4.420275758873161 , y: 6 , z: -12.57006765888377 }, width: 3, height: 5, depth: 0.8 },
    { position: { x: 2.9226310671761837  , y: 6 , z: -10 }, width: 3, height: 5, depth: 1.5 },
    { position: { x: 2 , y: 5 , z: -8 }, width: 3, height: 5, depth: 0.8},
    { position: { x: 3 , y: 6 , z: -7 }, width: 3, height: 5, depth: 0.8},
    { position: { x: 6 , y: 6 , z: -4 }, width: 5, height: 20, depth: 0.8},
    { position: { x: 6 , y: 4 , z: -2 }, width: 5, height: 20, depth: 0.8},
    { position: { x: 7 , y: 4 , z: 3 }, width: 5, height: 20, depth: 0.8},
    { position: { x: 6 , y: 6 , z: 5 }, width: 10, height: 20, depth: 0.8},
    { position: { x: 6 , y: 5 , z: 3 }, width: 10, height: 20, depth: 1},
    { position: { x: 6 , y: 6 , z: 6 }, width: 10, height: 20, depth: 1},
    { position: { x: 1 , y: 5 , z: 0 }, width: 10, height: 20, depth: 1},
    { position: { x: -5 , y: 5 , z: 1 }, width: 1, height: 20, depth: 1},
    { position: { x: -6 , y: 5 , z: -1 }, width: 5, height: 1, depth: 1},
    { position: { x: -8 , y: 5 , z: -2 }, width: 3, height: 10, depth: 1},
  
  ];

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
        cameraRef.current.position.y = 6 + cameraShakeOffset.current;
      }
    }
  };

  const [, stop] = useRafLoop(shakeCamera);

  useEffect(() => {
    // Configurar la posición y orientación inicial de la cámara.
    camera.position.set(0, 6, -14);
    camera.lookAt(2, 2, 2);
    cameraRef.current = camera;
    cameraRef.current.rotation.x = 0;
    cameraRef.current.rotation.y = 3.144;
    cameraRef.current.rotation.z = 0;
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
          // Calcula la nueva posición sin realizar la actualización directa
          const newX = cameraRef.current.position.x + movementDirection.current.x * movementSpeed;
          const newZ = cameraRef.current.position.z - movementDirection.current.z * movementSpeed;
      
          checkCollision(newX, newZ); // Verifica colisiones antes de mover la cámara
      
          // Solo actualiza la posición si no hay colisión
          if (!isColliding) {
            cameraRef.current.position.x = newX;
            cameraRef.current.position.z = newZ;
            requestAnimationFrame(moveForward);
            audioRef.current.play();
            // Nuevo: Iniciar el sonido de fondo al dar el primer paso.
            startBackgroundSound();
          }
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


  const checkCollision = () => {
    for (const wall of walls) {
      if (
        cameraRef.current.position.x > wall.position.x - wall.width / 2 &&
        cameraRef.current.position.x < wall.position.x + wall.width / 2 &&
        cameraRef.current.position.z > wall.position.z - wall.depth / 2 &&
        cameraRef.current.position.z < wall.position.z + wall.depth / 2
      ) {
        // Solo ajusta la posición si no estaba en estado de colisión previamente
        if (!isColliding) {
          // Colisión detectada, ajusta la posición de la cámara
          // Puedes detener completamente el movimiento o ajustar la posición según tus necesidades
          // En este ejemplo, detenemos el movimiento en esa dirección
          movementDirection.current = { x: 0, z: 0 };
          setIsColliding(true);
        }
        return; // Sale de la función para evitar ajustes múltiples en un solo marco
      }
    }

    // Si no hay colisión, restablece el estado de colisión
  setIsColliding(false);
};


  const handleMouseUp = (e) => {
    console.log("handleMouseUp se llamó",e);
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
      // Agrega el console.log para ver la posición de la cámara
      console.log(
        "Posición de la cámara:",
        cameraRef.current.position.x,
        cameraRef.current.position.y,
        cameraRef.current.position.z
      );
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