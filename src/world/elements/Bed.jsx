import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

const Bed = (props) => {
  const { nodes, materials } = useGLTF("/assets/models/bed/bed.glb");
  const bedRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const handleBedClick = () => {
    // Lógica de interacción con la cama al hacer clic
    console.log("Cama clickeada");
    // Puedes llamar a funciones adicionales o realizar acciones específicas aquí.
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    // Cambiar la intensidad de la luz al pasar el ratón sobre la cama
    const bedObject = bedRef.current;
    if (bedObject) {
      bedObject.material.emissiveIntensity = isHovered ? 5 : 5;
    }
  }, [isHovered]);

  return (
    <group {...props} dispose={null}>
      <group
        rotation={[-Math.PI / 2, 0, 1.68]}
        scale={0.033}
        onPointerOver={handleMouseOver}
        onPointerOut={handleMouseOut}
        onClick={handleBedClick}
      >
        <group position={[-160.962, -185.359, -10]}>
          <mesh
            ref={bedRef}
            onClick={handleBedClick}
            visible={false} // Hacer invisible para el renderizado, pero aún detectar clics
          />
          <planeGeometry args={[5000]} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.fabric}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.fabric}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.fabric}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials.fabric}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_7.geometry}
            material={materials.Wood_polish}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials.Wood_polish_black}
          />
        </group>
      </group>
    </group>
  );
};

export default Bed;
useGLTF.preload("/assets/models/bed/bed.glb");
