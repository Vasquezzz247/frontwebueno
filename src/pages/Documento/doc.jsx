import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer.jsx";
import Dropzone from "../../components/Dropzone/dropzone.jsx";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFiles = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Por favor, inicia sesión para continuar.");
                setLoading(false);
                return;
            }

            // Llamada usando Axios
            const response = await axios.get("https://backendweb-pzlb.onrender.com/api/files/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Manejo de respuesta
            setFiles(response.data.files);
            toast.success("Imágenes obtenidas correctamente.");
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.error || "Error al obtener las imágenes.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <header className="flex-shrink-0">
                <Navbar />
            </header>

            <main className="flex-grow flex flex-col items-center justify-center">
                <Dropzone />

                {files.length > 0 && (
                    <div className="mt-6 w-full max-w-2xl bg-white rounded-lg shadow p-4">
                        <h2 className="text-xl font-bold mb-4">Imágenes Subidas</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {files.map((file, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <img
                                        src={`http://localhost:3000${file.path}`}
                                        alt={file.name}
                                        className="rounded shadow"
                                    />
                                    <p className="mt-2 text-sm font-medium">{file.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <button
                onClick={fetchFiles}
                className="fixed bottom-16 right-16 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                disabled={loading}
            >
                {loading ? "Cargando..." : "Obtener Imágenes"}
            </button>

            <footer className="flex-shrink-0">
                <Footer />
            </footer>
        </div>
    );
};

export default Home;
