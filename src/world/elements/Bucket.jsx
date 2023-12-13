import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const Bucket = (props) => {
  const { nodes, materials } = useGLTF("/assets/models/bucket/bucket.glb");
  const bucketRef = useRef();

  const handleBucketClick = () => {
    // Enviar la señal al componente principal (ChapterOneExperience) de que el cubo fue clickeado
    props.onBucketClick();
  };

  return (
    <group {...props} dispose={null} onClick={handleBucketClick}>
      <group scale={0.47}>
        <mesh
          ref={bucketRef}
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
};

export default Bucket;
useGLTF.preload("/assets/models/bucket/bucket.glb");
