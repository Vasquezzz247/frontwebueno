import React, { useState } from "react";
import NavbarDoc from "../../components/Navbar/navbarDoc.jsx";
import Footer from "../../components/Footer/footer.jsx";
import Calendar2 from "../../components/Calendar/calendar2.jsx";
import CreateAppointment from "../../components/Calendar/CalendarDoc.jsx";

const DocDoctor = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
            <NavbarDoc />

            {/* Contenido principal */}
            <div
                className={`flex-grow flex justify-center items-center transition-opacity duration-300 ${
                    showModal ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                <Calendar2 />
            </div>

            

            {/* Botón flotante */}
            <button
                className="fixed bottom-5 right-5 bg-[#84AFF5] text-white p-4 rounded-full shadow-lg hover:bg-[#6b9de3] transition duration-200"
                onClick={toggleModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </button>

            {/* Modal para CreateAppointment */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                            onClick={toggleModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <CreateAppointment />
                            
                    </div>
                </div>
                
            )}
        </div>
    );
};

export default DocDoctor;
