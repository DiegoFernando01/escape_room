import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const Chair = (props) => {
    const { nodes, materials } = useGLTF("/assets/models/chair/rustic_chair.glb");
    return(
    <group {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 1]} scale={0.0035}>
            <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.lambert7SG}
            />
        </group>
        </group>

    );
}
export default Chair;
useGLTF.preload("/assets/models/chair/rustic_chair.glb");