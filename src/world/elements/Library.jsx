import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

const Library = (props) => {
  const { nodes, materials } = useGLTF("/assets/models/library/library.glb");
  const libraryRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const handleLibraryClick = () => {
    console.log("Librero clickeado");
    playAudio("/assets/sounds/Scenes C2/C2_3.mp3");
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const playAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.play();
  };

  useEffect(() => {
    const libraryObject = libraryRef.current;
    if (libraryObject) {
      libraryObject.children.forEach((child) => {
        if (child.isMesh) {
          child.material.emissiveIntensity = isHovered ? 5 : 0;
        }
      });
    }
  }, [isHovered]);

  return (
    <group {...props} dispose={null}>
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        scale={2.8}
        onPointerOver={handleMouseOver}
        onPointerOut={handleMouseOut}
        onClick={handleLibraryClick}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          {nodes.Object_4 && (
            <mesh
              ref={libraryRef}
              onClick={handleLibraryClick}
              visible={false}
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.Ladder}
              position={[-0.254, 2.499, -0.199]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[0.775, 1.246, 0.775]}
            />
          )}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_6.geometry}
                    material={materials.Blibliotheque}
                    position={[-0.035, 1.326, -0.2]}
                    scale={[0.193, 1.469, 1.238]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_8.geometry}
                    material={materials.Livre5}
                    position={[-0.065, 1.435, -1.302]}
                    rotation={[0.253, 0, 0]}
                    scale={[0.136, 0.108, 1.22]}
                />
                <planeGeometry args={[5000]}/>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_10.geometry}
                    material={materials.Livre7}
                    position={[-0.065, 1.399, 0.574]}
                    rotation={[1.064, 0, 0]}
                    scale={[0.136, 0.108, 1.22]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_12.geometry}
                    material={materials.Livre1}
                    position={[-0.065, -0.024, 0.273]}
                    rotation={[-Math.PI, 0, -Math.PI]}
                    scale={[-0.136, 0.108, 1.22]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_14.geometry}
                    material={materials.Ladder}
                    position={[-0.49, 1.203, 0.91]}
                    rotation={[0, 0, 1.431]}
                    scale={[1.391, 0.027, 0.027]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_16.geometry}
                    material={materials.Livre2}
                    position={[-0.065, 0.554, -0.2]}
                    rotation={[-Math.PI, 0, -Math.PI]}
                    scale={[-0.136, 0.108, 1.22]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_18.geometry}
                    material={materials.Livre4}
                    position={[-0.065, -0.029, 0.994]}
                    rotation={[-2.888, 0, -Math.PI]}
                    scale={[-0.136, 0.108, 1.22]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_20.geometry}
                    material={materials["livre_ex-nihilo"]}
                    position={[-0.065, -0.029, 0.994]}
                    rotation={[-2.888, 0, -Math.PI]}
                    scale={[-0.136, 0.108, 1.22]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_22.geometry}
                    material={materials.Livre6}
                    position={[-0.065, 1.139, -0.186]}
                    rotation={[-2.978, 0, -Math.PI]}
                    scale={[-0.136, 0.108, 1.22]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_24.geometry}
                    material={materials.Livre7}
                    position={[-0.065, 1.716, 0.467]}
                    rotation={[0.11, 0, 0]}
                    scale={[0.136, 0.108, 1.22]}
                />
                </group>
            </group>
            </group>
    );
}
export default Library;
useGLTF.preload("/assets/models/library/library.glb");

