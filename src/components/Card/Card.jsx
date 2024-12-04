import React from "react";
import backImage from "../../assets/img/backimage.png";

const Card = ({ children, onBack }) => {
    return (
        <div
            className="relative bg-EFF0F3 rounded-2xl shadow-[4px_4px_10px_rgba(3,4,94,0.6)] p-6 w-full max-w-md mx-auto"
        >
            {/* Flecha para regresar */}
            <button
                onClick={onBack}
                className="absolute top-4 left-4 cursor-pointer"
                aria-label="Volver"
            >
                <img src={backImage} alt="Volver" className="h-16 w-16" /> {/* Aumentado el tamaño */}
            </button>

            {/* Contenido dinámico */}
            {children}
        </div>
    );
};

export default Card;