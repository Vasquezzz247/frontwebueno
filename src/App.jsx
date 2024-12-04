import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import Home from './pages/Inicio/ini';
import HomeDoctor from './pages/Inicio/homeDoctor';
import HomeAdmin from './pages/Inicio/homeAdmin';
import Doc from './pages/Documento/doc';
import Cal from './pages/Calendario/cal';
//import Perfil from './components/Perfil/perfil';
import CalDoctor from './pages/Calendario/calDoctor';
import Solicitudes from './pages/Solicitudes/Solicitudes'
import SolicitudesAdmin from './pages/Solicitudes/solicitudesAdmin'
import Registration from './pages/Login/signup';
import RoleProtectedRoute from './components/roleProtectedRoute/roleProtectedRoute';
import { useCheckAuth } from './hooks/useCheckAuth';

function App() {
  const { user, loading } = useCheckAuth();
  const role = localStorage.getItem('role');

  if (loading) {
    return <p>...Loading</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Registration />} />

        {/* Rutas protegidas */}
        {user && (
          <>
            {/* Rutas de paciente */}
            <Route
              path="/home"
              element={
                <RoleProtectedRoute role={role} allowedRoles={['patient', 'admin']}>
                  <Home />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/doc"
              element={
                <RoleProtectedRoute role={role} allowedRoles={['patient', 'admin']}>
                  <Doc />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/cal"
              element={
                <RoleProtectedRoute role={role} allowedRoles={['patient', 'admin']}>
                  <Cal />
                </RoleProtectedRoute>
              }
            />


            {/* Rutas de doctor */}
            <Route
              path="/homedoc"
              element={
                <RoleProtectedRoute role={role} allowedRoles={['doctor', 'admin']}>
                  <HomeDoctor />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/calDoctor"
              element={
                <RoleProtectedRoute role={role} allowedRoles={['doctor', 'admin']}>
                  <CalDoctor />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/solicitudes"
              element={
                <RoleProtectedRoute role={role} allowedRoles={['doctor', 'admin']}>
                  <Solicitudes />
                </RoleProtectedRoute>
              }
            />
            {/* Rutas de admin */}
            <Route
              path="/homeadmin"
              element={
                <RoleProtectedRoute role={role} allowedRoles={['admin']}>
                  <HomeAdmin />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/solicitudesAdmin"
              element={
                <RoleProtectedRoute role={role} allowedRoles={['admin']}>
                  <SolicitudesAdmin />
                </RoleProtectedRoute>
              }
            />
          </>
        )}

        {/* Redirección por defecto */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
