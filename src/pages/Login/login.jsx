import React, { useContext, useState } from 'react';
import imageLogin from '../Login/image1.png';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Login() {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password, formState, onInputChange, onResetForm } = useForm({
    email: '',
    password: '',
  });

  const onSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        'https://backendweb-pzlb.onrender.com/api/auth/login',
        formState,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (data?.error) {
        setUser(null);
        toast.error(data.error);
      } else {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        toast.success(data.message);

        switch (data.role) {
          case 'doctor':
            navigate('/homedoc', { replace: true });
            break;
          case 'admin':
            navigate('/homeadmin', { replace: true });
            break;
          case 'patient':
          default:
            navigate('/home', { replace: true });
            break;
        }

        onResetForm();
        window.location.reload();
      }
    } catch (error) {
      const { response } = error;

      const message = response?.status === 401
        ? "Credenciales incorrectas"
        : response?.status === 400
        ? "Error en los datos proporcionados"
        : response?.status === 500
        ? "Error del servidor"
        : "Algo salió mal";

      toast.error(message || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post('https://backendweb-pzlb.onrender.com/api/auth/google_login', {
        token: credentialResponse.credential,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        toast.success("Inicio de sesión exitoso con Google");
        //navigate('/home', { replace: true });

        switch (data.role) {
          case 'doctor':
            navigate('/homedoc', { replace: true });
            break;
          case 'admin':
            navigate('/homeadmin', { replace: true });
            break;
          case 'patient':
          default:
            navigate('/home', { replace: true });
            break;
        }

        window.location.reload();
      }
    } catch (error) {
      toast.error("Error al autenticar con Google");
    }
  };

  const handleGoogleError = () => {
    toast.error("Error al iniciar sesión con Google");
  };

  return (
    <GoogleOAuthProvider clientId="209309879981-6latp8uflfn4lf787mmjoh38v76fhige.apps.googleusercontent.com">
      <section className="h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Imagen del lado izquierdo */}
        <div className="h-screen">
          <img
            src={imageLogin}
            alt="Sample"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Formulario del lado derecho */}
        <div className="flex flex-col justify-center items-center px-10">
          <div className="w-full max-w-sm">
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-black-500">
                Iniciar Sesión
              </p>
            </div>

            {loading ? (
              <p>...Loading</p>
            ) : (
              <form onSubmit={onSearchSubmit}>
                <input
                  className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onInput={onInputChange}
                  placeholder="Email Address"
                />

                <input
                  className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onInput={onInputChange}
                  placeholder="Password"
                />

                <div className="mt-4 flex justify-between font-semibold text-sm">
                  <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                    <input className="mr-1" type="checkbox" />
                    <span>Recuérdame</span>
                  </label>
                  <a
                    className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>

                <div className="flex items-center justify-center text-center md:text-left ">
                  <button
                    className="mt-4 bg-84AFF5 hover:bg-84AFF5 px-4 py-2 text-white uppercase rounded text-xs tracking-wider w-full"
                    type="submit"
                  >
                    Iniciar Sesion
                  </button>
                </div>
              </form>
            )}
            <div className="mt-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                className="w-full"
              />
            </div>

            <Link to="/signup">
              <div className="mt-4 font-semibold text-sm text-center md:text-left text-slate-500">
                No tienes una cuenta?{' '}
                <a
                  className="text-B5D4E9 hover:underline hover:underline-offset-4"
                  href="#"
                >
                  Regístrate
                </a>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
}

export default Login;
