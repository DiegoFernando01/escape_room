import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const Bucket = (props) => {
    const { nodes, materials } = useGLTF("/assets/models/bucket/bucket.glb");
    return ( 
        <group {...props} dispose={null}>
        <group scale={0.47}>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.Paint_Bucket_Grp_UV}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.Paint_Bucket_Grp_UV}
        />
        </group>
        </group>
    );
}
export default Bucket;
useGLTF.preload("/assets/models/bucket/bucket.glb");

