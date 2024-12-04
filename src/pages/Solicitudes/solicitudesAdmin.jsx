import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/Navbar/navbarAdmin";
import Footer from "../../components/Footer/footer";

const SolicitudesAdmin = () => {
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState("all");
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const token = localStorage.getItem("token");

    // Fetch solicitudes based on filter
    const fetchRequests = async () => {
        try {
            const url =
                filter === "all"
                    ? "https://backendweb-pzlb.onrender.com/api/solicitudes/all"
                    : `https://backendweb-pzlb.onrender.com/api/solicitudes?status=${filter}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRequests(response.data.requests);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    // Fetch data on component mount and when filter changes
    useEffect(() => {
        fetchRequests();
    }, [filter]);

    // Mostrar notificación temporal
    const showTemporaryNotification = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000); // Ocultar después de 3 segundos
    };

    // Handle approve request
    const handleApprove = async (id, status) => {
        if (status === "approved") {
            showTemporaryNotification("La solicitud ya está aprobada.");
            return;
        }

        try {
            await axios.patch(
                `https://backendweb-pzlb.onrender.com/api/solicitudes/${id}`,
                { status: "approved" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            showTemporaryNotification("Solicitud aprobada exitosamente.");
            fetchRequests();
        } catch (error) {
            console.error("Error approving request:", error);
            showTemporaryNotification("Hubo un error al aprobar la solicitud.");
        }
    };

    // Handle delete request
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://backendweb-pzlb.onrender.com/api/solicitudes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            showTemporaryNotification("Solicitud eliminada exitosamente.");
            fetchRequests();
        } catch (error) {
            console.error("Error deleting request:", error);
            showTemporaryNotification("Hubo un error al eliminar la solicitud.");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Navbar */}
            <NavbarAdmin />

            {/* Notificación flotante con animación */}
            <div
                style={{
                    position: "fixed",
                    top: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#fff",
                    border: "1px solid #10b981",
                    borderRadius: "8px",
                    padding: "1rem 2rem",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000,
                    display: showNotification ? "flex" : "none",
                    alignItems: "center",
                    gap: "0.5rem",
                    opacity: showNotification ? 1 : 0,
                    transition: "opacity 0.5s, transform 0.5s",
                    transform: showNotification
                        ? "translate(-50%, 0)"
                        : "translate(-50%, -20px)",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#10b981"
                    style={{ width: "24px", height: "24px" }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span style={{ color: "#10b981", fontWeight: "bold" }}>{notificationMessage}</span>
            </div>

            {/* Contenido principal */}
            <div style={{ flex: 1, padding: "1rem", backgroundColor: "#F7F9FC" }}>
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
                        Solicitudes de Doctores
                    </h1>

                    {/* Filtros */}
                    <div style={{ marginBottom: "1rem", textAlign: "center" }}>
                        <button
                            style={{
                                margin: "0 0.5rem",
                                padding: "0.5rem 1rem",
                                backgroundColor: filter === "all" ? "#84AFF5" : "#f3f4f6",
                                color: filter === "all" ? "#fff" : "#374151",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                            onClick={() => setFilter("all")}
                        >
                            Todas
                        </button>
                        <button
                            style={{
                                margin: "0 0.5rem",
                                padding: "0.5rem 1rem",
                                backgroundColor: filter === "pending" ? "#84AFF5" : "#f3f4f6",
                                color: filter === "pending" ? "#fff" : "#374151",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                            onClick={() => setFilter("pending")}
                        >
                            Pendientes
                        </button>
                        <button
                            style={{
                                margin: "0 0.5rem",
                                padding: "0.5rem 1rem",
                                backgroundColor: filter === "approved" ? "#84AFF5" : "#f3f4f6",
                                color: filter === "approved" ? "#fff" : "#374151",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                            onClick={() => setFilter("approved")}
                        >
                            Aprobadas
                        </button>
                    </div>

                    {/* Tabla de solicitudes */}
                    <div style={{ border: "1px solid #000", borderRadius: "5px" }}>
                        {requests.length > 0 ? (
                            requests.map((request, index) => (
                                <div
                                    key={request._id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "0.5rem 1rem",
                                        borderBottom:
                                            index !== requests.length - 1
                                                ? "1px solid #000"
                                                : "none",
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <p>
                                            <strong>Doctor:</strong> {request.doctorId.name} (
                                            {request.doctorId.email})
                                        </p>
                                        <p>
                                            <strong>Descripción:</strong> {request.description}
                                        </p>
                                        <p>
                                            <strong>Estado:</strong> {request.status}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        <button
                                            style={{
                                                padding: "0.5rem",
                                                backgroundColor: "#10b981",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => handleApprove(request._id, request.status)}
                                        >
                                            Aprobar
                                        </button>
                                        <button
                                            style={{
                                                padding: "0.5rem",
                                                backgroundColor: "#ef4444",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => handleDelete(request._id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: "center", padding: "1rem" }}>
                                No hay solicitudes disponibles.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default SolicitudesAdmin;
