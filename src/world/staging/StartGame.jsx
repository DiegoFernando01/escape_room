import React, { useState, useEffect } from "react";

const GameStartMessage = () => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(false);
    }, 10000);
  }, []);

  return (
    <div className={`game-start-message ${showMessage ? "visible" : "hidden"}`}>
      <p>Press left click to walk and press right click to turn</p>
    </div>
  );
};

export default GameStartMessage;
