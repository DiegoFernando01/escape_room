// SceneC1.jsx
import React, { useState, useEffect } from 'react';
import './SceneC1.css';

const SceneC1 = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowButton(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="scene-container">
        {showButton && <button className="Button1">Tomar medicina para dormir</button>}
        </div>
    );
};

export default SceneC1;
