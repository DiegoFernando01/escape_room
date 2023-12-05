import React, { useState, useEffect } from "react";
import "./GameStartMessage.css";

const GameStartMessage = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [showBlackScreen, setShowBlackScreen] = useState(true);

    useEffect(() => {
        // Mostrar la pantalla negra durante 6 segundos
        setTimeout(() => {
        setShowBlackScreen(false);
        // Mostrar el mensaje de inicio después de ocultar la pantalla negra
        setTimeout(() => {
            setShowMessage(true);
            // Ocultar el mensaje después de 8 segundos
            setTimeout(() => {
            setShowMessage(false);
            }, 5000);
        }, 45000);
        }, 6000);
    }, []);

    return (
        <div>
        <div className={`black-screen ${showBlackScreen ? "visible" : "hidden"}`}>
            <p>Day 0: William's decision</p>
        </div>
        <div className={`game-start-message ${showMessage ? "visible" : "hidden"}`}>
            <p>Press left click to walk and press right click to turn</p>
        </div>
        </div>
    );
};

export default GameStartMessage;
