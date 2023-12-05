import React from "react";
import { useGLTF } from "@react-three/drei";

const Bed = () => {
    const bedModel = useGLTF("/assets/models/bed/scene.gltf");
    console.log(bedModel);

    return (
        <group>
            <primitive object={bedModel.scene} />
        </group>
    );
};

export default Bed;
