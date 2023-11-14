import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRafLoop } from "react-use";


const LimitsBedroom = () => {
    const walls = [
        { position: { x: -2.89409022321951664, y: 6.011216491752187, z: -14.909690848615181 }, width: 15, height: 5, depth: 0.8 },
        { position: { x: 4 , y: 6 , z: -12.5 }, width: 3, height: 5, depth: 0.8 },
      ];
  
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
}

export default LimitsBedroom;
