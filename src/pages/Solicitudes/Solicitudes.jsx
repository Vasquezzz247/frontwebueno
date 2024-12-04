import React, { useState } from "react";
import axios from "axios";
import CardDoc from "../../components/Card/CardDoc.jsx";
import Footer from "../../components/Footer/footer.jsx";
import NavbarDoc from "../../components/Navbar/navbarDoc.jsx";

const Solicitudes = () => {
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token"); // Obtener el token de localStorage
        if (!token) {
            setMessage("Error: No se encontró un token de autenticación.");
            return;
        }

        try {
            const response = await axios.post(
                "https://backendweb-pzlb.onrender.com/api/solicitudes/",
                { description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
                    },
                }
            );

            setMessage(response.data.message); // Mensaje del backend
            setDescription(""); // Limpiar la descripción después de enviar
            setShowSuccess(true); // Mostrar notificación de éxito

            // Ocultar la notificación después de 3 segundos
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        } catch (error) {
            setMessage(
                error.response?.data?.error || "Error al enviar la solicitud."
            );
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <NavbarDoc />
            <div className="flex-grow flex justify-center items-center">
                <CardDoc>
                    <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
                        ¿Tienes algún problema?
                    </h2>
                    <p className="text-gray-600 text-center mb-4">
                        Crea una solicitud
                    </p>
                    <div className="mb-6">
                        <textarea
                            placeholder="Describe tu problema aquí..."
                            className="w-full h-24 border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#84AFF5] focus:border-transparent"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center mb-4">
                        <button
                            className="bg-[#84AFF5] text-white px-4 py-2 rounded-md shadow hover:bg-[#6b9de3] transition duration-200"
                            onClick={handleSubmit}
                        >
                            Mandar Solicitud
                        </button>
                    </div>
                    {message && !showSuccess && (
                        <p className="text-center text-sm text-red-500">
                            {message}
                        </p>
                    )}
                </CardDoc>
            </div>
            {showSuccess && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 px-6 py-4 rounded shadow-lg flex items-center">
                    <svg
                        className="h-6 w-6 text-green-500 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 5.707 10.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-gray-700 font-medium">{message}</span>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Solicitudes;
