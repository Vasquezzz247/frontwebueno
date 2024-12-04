import React, { useState } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/Navbar/navbarAdmin.jsx";
import Footer from "../../components/Footer/footer.jsx";
import CardDoc from "../../components/Card/CardDoc.jsx";

const HomeAdmin = () => {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);
    const [newRole, setNewRole] = useState("");
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    // Buscar usuario por correo
    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://backendweb-pzlb.onrender.com/api/users/users?email=${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data.user);
            setMessage(""); // Limpiar mensaje
        } catch (error) {
            console.error(error);
            setMessage("Usuario no encontrado o error al buscar.");
            setUser(null);
        }
    };

    // Actualizar rol de usuario
    const handleRoleUpdate = async () => {
        try {
            await axios.patch(
                `http://localhost:3000/api/users/users/${user._id}`,
                { role: newRole },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage("Rol actualizado exitosamente.");
            setUser({ ...user, role: newRole }); // Actualizar estado local
        } catch (error) {
            console.error(error);
            setMessage("Error al actualizar el rol.");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <NavbarAdmin />
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F7F9FC",
                }}
            >
                <CardDoc>
                    <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
                        Administrar Roles de Usuarios
                    </h3>
                    <input
                        type="text"
                        placeholder="Correo del usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            padding: "0.5rem",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            width: "100%",
                            marginBottom: "1rem",
                        }}
                    />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button
                            onClick={handleSearch}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#84AFF5",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginBottom: "1rem",
                            }}
                        >
                            Buscar Usuario
                        </button>
                    </div>
                    {message && <p style={{ color: "red", textAlign: "center" }}>{message}</p>}
                    {user && (
                        <div>
                            <p>
                                <strong>Usuario:</strong> {user.name}
                            </p>
                            <p>
                                <strong>Correo:</strong> {user.email}
                            </p>
                            <p>
                                <strong>Rol Actual:</strong> {user.role}
                            </p>
                            <select
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                style={{
                                    padding: "0.5rem",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    width: "100%",
                                    marginBottom: "1rem",
                                }}
                            >
                                <option value="">Selecciona un nuevo rol</option>
                                <option value="admin">Admin</option>
                                <option value="doctor">Doctor</option>
                                <option value="patient">Paciente</option>
                            </select>
                            <button
                                onClick={handleRoleUpdate}
                                style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#10b981",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Actualizar Rol
                            </button>
                        </div>
                    )}
                </CardDoc>
            </div>
            <Footer />
        </div>
    );
};

export default HomeAdmin;
