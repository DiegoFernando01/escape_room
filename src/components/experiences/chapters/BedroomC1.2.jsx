import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const BedroomC3 = () => {
  const roomModel = useGLTF("/assets/models/bedroom/scene.gltf");
  const { camera, gl } = useThree();
  const cameraRef = useRef();
  const isRotatingCamera = useRef(false);
  const originalRotationY = useRef(4.5);

  const soundStartFiles = ["/assets/sounds/Chair/wood-creak-start.mp3", "/assets/sounds/Chair/wood-creak-start2.mp3"];
  const soundStartIndex = useRef(0);

  // Agregar referencias para los sonidos de inicio y fin
  const soundStartRef = useRef(new Audio(soundStartFiles[soundStartIndex.current]));
  const soundEndRef = useRef(new Audio("/assets/sounds/Chair/wood-creak-end.mp3"));

  useEffect(() => {
    // Configurar la posición y orientación inicial de la cámara.
    camera.position.set(-8, 5, -3.5);
    camera.lookAt(2, 2, 2);
    cameraRef.current = camera;
    cameraRef.current.rotation.x = 0;
    cameraRef.current.rotation.y = originalRotationY.current;
    cameraRef.current.rotation.z = 0;
  }, [camera]);

  const handleMouseDown = (e) => {
    if (e.button === 2) {
      // Clic derecho: Iniciar rotación de la cámara y reproducir sonido de inicio
      isRotatingCamera.current = true;
      soundStartRef.current.play();
    }
  };

  const handleMouseMove = (e) => {
    if (isRotatingCamera.current) {
      const deltaX = e.movementX;
      const rotationSpeed = 0.005; // Ajusta la velocidad de rotación
      let newRotationY = cameraRef.current.rotation.y - deltaX * rotationSpeed;

      // Limitar la rotación a un rango de -80 grados a 80 grados
      newRotationY = Math.max(Math.min(newRotationY, originalRotationY.current + 1.396), originalRotationY.current - 1.396);

      cameraRef.current.rotation.y = newRotationY;
    }
  };

  const handleMouseUp = (e) => {
    if (e.button === 2) {
      // Clic derecho: Detener la rotación de la cámara y reproducir sonido de fin
      isRotatingCamera.current = false;
      soundEndRef.current.play();

      // Cambiar al siguiente archivo de sonido de inicio
      soundStartIndex.current = (soundStartIndex.current + 1) % soundStartFiles.length;
      soundStartRef.current.src = soundStartFiles[soundStartIndex.current];
    }
  };

  useEffect(() => {
    // Utiliza el evento de contexto para evitar el menú contextual del clic derecho.
    gl.domElement.addEventListener("contextmenu", (e) => e.preventDefault());
    gl.domElement.addEventListener("mousedown", handleMouseDown);
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("mouseup", handleMouseUp);

  // Iniciar la reproducción del sonido después de 6 segundos
    const soundTimeout = setTimeout(() => {
      const audio = new Audio("/assets/sounds/Scenes C1/1.3.mp3");
      audio.play();
    }, 2);


    return () => {
      gl.domElement.removeEventListener("contextmenu", (e) => e.preventDefault());
      gl.domElement.removeEventListener("mousedown", handleMouseDown);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
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

export default BedroomC3;

