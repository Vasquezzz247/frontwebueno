import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCheckAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Recupera el token desde localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          setUser(null); // Asegura que el usuario sea null si no hay token
          return;
        }

        // Verifica la autenticación llamando a tu API
        const { data } = await axios.get('https://backendweb-pzlb.onrender.com/api/auth/check', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Si la respuesta contiene un usuario, actualiza el estado
        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Authentication check failed:', error.response?.data?.error || error.message);
        setUser(null); // Limpia el estado del usuario si ocurre un error
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    // Llama a la función para verificar la autenticación
    checkAuth();
  }, []); // Se ejecuta una sola vez cuando el componente se monta

  return {
    user,
    loading,
  };
};
