import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const Bed = (props) => {
  const { nodes, materials } = useGLTF("/assets/models/bed/bed.glb");
  return (
    <group {...props} dispose={null}>
    <group rotation={[-Math.PI / 2, 0, 1.68]} scale={0.033}>
      <group position={[-160.962, -185.359, -10]}>
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
}
export default Bed;
useGLTF.preload("/assets/models/bed/bed.glb");

