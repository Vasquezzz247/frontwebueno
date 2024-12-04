import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateAppointment = () => {
    const [formData, setFormData] = useState({
        title: "",
        start: "",
        end: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState("");

    useEffect(() => {
        // Obtener el token desde localStorage
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            console.error("No se encontró un token en localStorage.");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post(
                "https://backendweb-pzlb.onrender.com/api/citas/create",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage("¡Cita creada exitosamente!");
            setFormData({
                title: "",
                start: "",
                end: "",
                description: "",
            });
        } catch (error) {
            console.error("Error al crear la cita:", error);
            setErrorMessage(
                error.response?.data?.error || "Hubo un error al crear la cita."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                maxWidth: "600px",
                margin: "auto",
            }}
        >
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                Crear Cita
            </h1>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            border: "1px solid #d1d5db",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>
                        Fecha y hora de inicio:
                    </label>
                    <input
                        type="datetime-local"
                        name="start"
                        value={formData.start}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            border: "1px solid #d1d5db",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>
                        Fecha y hora de fin:
                    </label>
                    <input
                        type="datetime-local"
                        name="end"
                        value={formData.end}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            border: "1px solid #d1d5db",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>
                        Descripción:
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            border: "1px solid #d1d5db",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        border: "none",
                    }}
                >
                    {loading ? "Creando..." : "Crear Cita"}
                </button>
            </form>

            {successMessage && (
                <p style={{ color: "green", marginTop: "1rem" }}>{successMessage}</p>
            )}
            {errorMessage && (
                <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>
            )}
        </div>
    );
};

export default CreateAppointment;
