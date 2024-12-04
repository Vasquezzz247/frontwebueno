import React, { useContext, useState } from "react";
import logoSinBackground from "../../assets/img/logoSinBackground.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Cookies from "js-cookie";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import Card from "../../components/Card/Card";

export default function LoginHealthPersonnel() {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    healthPersonnelCode,
    email,
    password,
    formState,
    onInputChange,
    onResetForm,
  } = useForm({
    healthPersonnelCode: "",
    email: "",
    password: "",
  });

  const onSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const resp = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await resp.json();

      if (data?.error) {
        setUser(null);
        toast.error(data?.error);
      } else {
        setUser(data?.user);
        Cookies.set("token", data?.token);
        toast.success(data?.message);
        onResetForm();
      }
    } catch (error) {
      console.error(error);
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

      {/* Contenedor centrado con la Card */}
      <div className="flex flex-col items-center justify-center h-screen">
        <Card onBack={() => navigate("/")}>
          {/* Añadimos padding superior para separar el contenido */}
          <div className="pt-16">
            <h3 className="text-center font-bold text-xl mb-4">
              INICIA SESIÓN COMO PERSONAL DE SALUD
            </h3>
            {loading ? (
              <p>...Loading</p>
            ) : (
              <form onSubmit={onSearchSubmit}>
                <input
                  className="bg-gray-300 block w-full mb-4 px-3 py-2 rounded-md"
                  type="text"
                  name="healthPersonnelCode"
                  required
                  value={healthPersonnelCode}
                  onChange={onInputChange}
                  placeholder="Código (id)"
                />
                <input
                  className="bg-gray-300 block w-full mb-4 px-3 py-2 rounded-md"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={onInputChange}
                  placeholder="Correo electrónico"
                />
                <input
                  className="bg-gray-300 block w-full mb-4 px-3 py-2 rounded-md"
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={onInputChange}
                  placeholder="Contraseña"
                />
                <button
                  className="w-full mx-auto bg-84AFF5 text-white py-2 rounded-md font-semibold"
                  type="submit"
                >
                  ENTRAR
                </button>
              </form>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
