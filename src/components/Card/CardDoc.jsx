import React from "react";
//import backImage from "../../assets/img/backimage.png";

const CardDoc = ({ children, onBack }) => {
    return (
        <div
            className="relative bg-EFF0F3 rounded-2xl shadow-[4px_4px_10px_rgba(3,4,94,0.6)] p-6 w-full max-w-md mx-auto"
        >
            {/* Contenido dinámico */}
            {children}
        </div>
    );
};

export default CardDoc;