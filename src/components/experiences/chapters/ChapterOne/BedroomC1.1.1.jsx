import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const BedroomC2 = () => {
  const roomModel = useGLTF("/assets/models/bedroom/scene.gltf");
  const { camera, gl } = useThree();
  const cameraRef = useRef();
  const isRotatingCamera = useRef(false);
  const originalRotationY = useRef(4.5);
  const originalRotationX = useRef(0);

  const soundStartFiles = ["/assets/sounds/Chair/wood-creak-start.mp3", "/assets/sounds/Chair/wood-creak-start2.mp3"];
  const soundStartIndex = useRef(0);

  const soundStartRef = useRef(new Audio(soundStartFiles[soundStartIndex.current]));
  const soundEndRef = useRef(new Audio("/assets/sounds/Chair/wood-creak-end.mp3"));

  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    camera.position.set(-8, 5, -3.5);
    camera.lookAt(2, 2, 2);
    cameraRef.current = camera;
    cameraRef.current.rotation.x = originalRotationX.current;
    cameraRef.current.rotation.y = originalRotationY.current;
    cameraRef.current.rotation.z = 0;
  }, [camera]);

  const handleMouseDown = (e) => {
    if (e.button === 2) {
      isRotatingCamera.current = true;
      soundStartRef.current.play();
    }
  };

  const handleMouseMove = (e) => {
    if (isRotatingCamera.current) {
      const deltaX = e.movementX;
      const deltaY = e.movementY;
      const rotationSpeed = 0.005;

      let newRotationY = cameraRef.current.rotation.y - deltaX * rotationSpeed;
      newRotationY = Math.max(
        Math.min(newRotationY, originalRotationY.current + 1.396),
        originalRotationY.current - 1.396
      );

      let newRotationX = cameraRef.current.rotation.x - deltaY * rotationSpeed;
      const verticalLimit = 0.03;
      newRotationX = Math.max(
        Math.min(newRotationX, originalRotationX.current + verticalLimit),
        originalRotationX.current - verticalLimit
      );

      cameraRef.current.rotation.y = newRotationY;
      cameraRef.current.rotation.x = newRotationX;
    }
  };

  const handleMouseUp = (e) => {
    if (e.button === 2) {
      isRotatingCamera.current = false;
      soundEndRef.current.play();

      soundStartIndex.current = (soundStartIndex.current + 1) % soundStartFiles.length;
      soundStartRef.current.src = soundStartFiles[soundStartIndex.current];
    }
  };

  useEffect(() => {
    gl.domElement.addEventListener("contextmenu", (e) => e.preventDefault());
    gl.domElement.addEventListener("mousedown", handleMouseDown);
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("mouseup", handleMouseUp);

    const soundTimeout = setTimeout(() => {
      const audio = new Audio("/assets/sounds/Scenes C1/1.1.1.mp3");
      audio.play();
    }, 1000);

     // Iniciar la reproducción del sonido después de 6 segundos
     const soundTimeout2 = setTimeout(() => {
      const audio = new Audio("/assets/sounds/BodyFall.mp3");
      audio.play();
    }, 15000);


    return () => {
      gl.domElement.removeEventListener("contextmenu", (e) => e.preventDefault());
      gl.domElement.removeEventListener("mousedown", handleMouseDown);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("mouseup", handleMouseUp);
      clearTimeout(soundTimeout);
    };
  }, [gl.domElement]);

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => {
      let startTime = Date.now();
      const duration = 7000; // 7 seconds
      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = elapsed / duration;
        setOpacity(1 - progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }, 5000);

    return () => clearTimeout(fadeOutTimeout);
  }, []);

  return (
    <group>
      <mesh scale={[2, 2, 2]}>
        <primitive object={roomModel.scene}>
          <meshBasicMaterial transparent opacity={opacity} />
        </primitive>
      </mesh>

      {/* Plano oscuro frente a la cámara */}
      <mesh scale={[100, 100, 1]} position={[0, 0, -1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#000000" transparent opacity={opacity} />
      </mesh>
    </group>
  );
};

export default BedroomC2;
