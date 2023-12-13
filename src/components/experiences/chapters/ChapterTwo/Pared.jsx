import React, { useRef, useState } from "react";

const Pared = (props) => {
  const paredRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const handleParedClick = () => {
    console.log("Pared clickeada");
    props.onParedClick(); // Llama a la función proporcionada por el padre
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <mesh
      {...props}
      ref={paredRef}
      onPointerOver={handleMouseOver}
      onPointerOut={handleMouseOut}
      onClick={handleParedClick}
    >
      <boxGeometry args={[0.1, 6, 5]} />
      <meshStandardMaterial color={isHovered ? 0xff0000 : 0xffff00} transparent opacity={0.0} />
    </mesh>
  );
};

export default Pared;
