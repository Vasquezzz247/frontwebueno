import React, { useContext, useState } from "react";
import logoSinBackground from "../../assets/img/logoSinBackground.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "../../components/Card/Card";
import { FaCheckCircle } from "react-icons/fa";
import "./signup.css";

export default function Registration() {
    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const {
        name,
        email,
        password,
        confirmPassword,
        formState,
        onInputChange,
        onResetForm,
    } = useForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const onSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            // Añadimos el rol predeterminado "patient" directamente en el envío
            const userPayload = { ...formState, role: "patient" };
            const resp = await axios.post("https://backendweb-pzlb.onrender.com/api/auth/sign_up", userPayload, {
                headers: {
                    "Content-type": "application/json",
                },
            });

            const data = resp.data;

            if (data?.error) {
                setUser(null);
                toast.error(data?.error);
            } else {
                setUser(data?.user);
                localStorage.setItem("token", data?.token); // Guardar el token en localStorage
                onResetForm();
                setShowSuccessMessage(true); // Mostrar mensaje de éxito
                setTimeout(() => {
                    setShowSuccessMessage(false); // Ocultar el mensaje después de 3 segundos
                    navigate("/"); // Redirigir a la raíz
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Error en la solicitud");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 relative">
            {/* Logo en la esquina superior izquierda */}
            <div className="absolute top-4 left-4">
                <img className="h-16" src={logoSinBackground} alt="Logo" />
            </div>

            {/* Contenido principal */}
            <div className="flex flex-col items-center justify-center h-screen">
                <Card onBack={() => navigate("/")}>
                    <div className="pt-16">
                        <h3 className="text-center font-bold text-xl mb-4">Registrarse</h3>
                        {loading ? (
                            <p>...Loading</p>
                        ) : (
                            <form onSubmit={onSearchSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    required
                                    onChange={onInputChange}
                                    placeholder="Nombre completo"
                                    className="bg-gray-300 block w-full mb-4 px-3 py-2 rounded-md"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={onInputChange}
                                    placeholder="Correo electrónico"
                                    className="bg-gray-300 block w-full mb-4 px-3 py-2 rounded-md"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={onInputChange}
                                    placeholder="Contraseña"
                                    className="bg-gray-300 block w-full mb-4 px-3 py-2 rounded-md"
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    value={confirmPassword}
                                    onChange={onInputChange}
                                    placeholder="Confirmar contraseña"
                                    className="bg-gray-300 block w-full mb-4 px-3 py-2 rounded-md"
                                />
                                <button
                                    type="submit"
                                    className="w-full mx-auto bg-blue-500 text-white py-2 rounded-md font-semibold"
                                >
                                    ÚNETE
                                </button>
                            </form>
                        )}
                        <p className="text-center text-gray-500 mt-4">O</p>
                        <Link to="/login">
                            <p className="text-center text-blue-500 hover:underline mt-2">
                                Inicia sesión
                            </p>
                        </Link>
                    </div>
                </Card>
            </div>

            {/* Mensaje de éxito */}
            {showSuccessMessage && (
                <div className="success-message">
                    <FaCheckCircle className="success-icon" />
                    <p>Registrado correctamente</p>
                </div>
            )}
        </div>
    );
}
