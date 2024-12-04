import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import "./calendar.css";

const localizer = momentLocalizer(moment);

const Calendar2 = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("https://backendweb-pzlb.onrender.com/api/citas/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const allEvents = response.data.appointments.map((appointment) => ({
                    ...appointment,
                    start: new Date(appointment.start),
                    end: new Date(appointment.end),
                    title:
                        `${appointment.title} - Doctor: ${appointment.doctorName}` +
                        (appointment.patientName
                            ? ` - Paciente: ${appointment.patientName}`
                            : " - Sin paciente"),
                }));
                setEvents(allEvents);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchEvents();
    }, [token]);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    const handleBookAppointment = async () => {
        if (!selectedEvent) return;

        try {
            const response = await axios.post(
                `https://backendweb-pzlb.onrender.com/api/citas/book/${selectedEvent._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Cita reservada exitosamente!");

            setEvents((prevEvents) =>
                prevEvents.map((evt) =>
                    evt._id === selectedEvent._id
                        ? { ...evt, status: "booked", patientName: "Juan Pérez" }
                        : evt
                )
            );
            setSelectedEvent(null);
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Hubo un error al reservar la cita.");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                padding: "1rem",
                position: "relative", // Para manejar la superposición
            }}
        >
            {/* Contenedor del Calendario */}
            <div
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    maxWidth: "1200px",
                    padding: "1rem",
                    transition: "opacity 0.3s",
                    opacity: selectedEvent ? 0 : 1, // Se hace invisible cuando hay un evento seleccionado
                    pointerEvents: selectedEvent ? "none" : "auto", // Desactiva la interacción
                }}
            >
                <h1
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: "1rem",
                    }}
                >
                    Consultas Disponibles
                </h1>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                        height: "500px",
                        backgroundColor: "#f9fafb",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                    className="rbc-calendar"
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={() => ({
                        style: {
                            width: "100%", // Ancho completo
                            backgroundColor: "#93c5fd",
                            border: "1px solid #3b82f6",
                            borderRadius: "4px",
                            color: "#1e3a8a",
                            padding: "4px",
                            fontSize: "0.85rem",
                            textAlign: "center",
                        },
                    })}
                />
            </div>

            {/* Modal de Confirmación */}
            {selectedEvent && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10, // Asegurar que esté sobre el calendario
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "1.5rem",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                            maxWidth: "500px",
                            width: "100%",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "1.25rem",
                                fontWeight: "bold",
                                marginBottom: "1rem",
                            }}
                        >
                            Confirmar Reserva
                        </h2>
                        <p style={{ marginBottom: "1rem" }}>
                            ¿Deseas reservar la cita:
                            <strong> "{selectedEvent.title}"</strong>? <br />
                            Estado: <strong>{selectedEvent.status}</strong>
                        </p>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button
                                style={{
                                    backgroundColor: "#f3f4f6",
                                    color: "#374151",
                                    borderRadius: "4px",
                                    padding: "0.5rem 1rem",
                                    marginRight: "0.5rem",
                                    cursor: "pointer",
                                }}
                                onClick={() => setSelectedEvent(null)}
                            >
                                Cancelar
                            </button>
                            <button
                                style={{
                                    backgroundColor: "#3b82f6",
                                    color: "#fff",
                                    borderRadius: "4px",
                                    padding: "0.5rem 1rem",
                                    cursor: "pointer",
                                }}
                                onClick={handleBookAppointment}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar2;
