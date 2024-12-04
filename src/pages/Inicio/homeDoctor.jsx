import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NavbarDoc from "../../components/Navbar/navbarDoc.jsx";
import Footer from "../../components/Footer/footer.jsx";
import CardDoc from "../../components/Card/CardDoc.jsx";

const HomeDoctor = () => {
    const [email, setEmail] = useState(""); // Para almacenar el correo ingresado
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUserFilesByEmail = async () => {
        if (!email.trim()) {
            toast.error("Por favor, ingresa un correo electrónico.");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Por favor, inicia sesión para continuar.");
                setLoading(false);
                return;
            }

            // Llamada al backend
            const response = await axios.get(`https://backendweb-pzlb.onrender.com/api/files/search`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { email }, // Enviar el correo como parámetro
            });

            setFiles(response.data.files);
            toast.success("Imágenes obtenidas correctamente.");
        } catch (error) {
            console.error("Error al obtener imágenes:", error);
            const message = error.response?.data?.error || "Error al obtener las imágenes.";
            if (error.response?.status === 404) {
                toast.error("No se encontraron archivos para este correo.");
            } else if (error.response?.status === 400) {
                toast.error("Correo electrónico inválido.");
            } else {
                toast.error(message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen justify-between bg-gray-100">
            <NavbarDoc />
            <main className="flex-grow flex flex-col items-center justify-center">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Ingresa el correo del usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md shadow-sm w-64"
                    />
                    <button
                        onClick={fetchUserFilesByEmail}
                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Buscar Imágenes"}
                    </button>
                </div>

                {loading ? (
                    <p>Cargando imágenes...</p>
                ) : files.length > 0 ? (
                    <CardDoc>
                        <h2 className="text-xl font-bold mb-4">Imágenes del Paciente</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {files.map((file, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <img
                                        src={`https://backendweb-pzlb.onrender.com${file.path}`}
                                        alt={file.name}
                                        className="rounded shadow"
                                    />
                                    <p className="mt-2 text-sm font-medium">{file.name}</p>
                                </div>
                            ))}
                        </div>
                    </CardDoc>
                ) : (
                    <p>No hay imágenes para mostrar.</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default HomeDoctor;
