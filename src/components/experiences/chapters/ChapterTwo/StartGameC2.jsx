import React, { useState, useEffect } from "react";
import "./GameStartMessageC2.css";

const GameStartMessageC1 = () => {
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
            }, 9000);
        }, 8000);
        }, 10000);
    }, []);

    return (
        <div>
        <div className={`black-screen ${showBlackScreen ? "visible" : "hidden"}`}>
            <p>Dia 1: La consecuencia de William</p>
        </div>
        <div className={`game-start-message ${showMessage ? "visible" : "hidden"}`}>
            <p>Presiona clic derecho para girar y selecciona la opción correcta para William</p>
        </div>
        </div>
    );
};

export default GameStartMessageC1;
