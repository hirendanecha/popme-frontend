import React, { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./css/style.css";
import { useAuth } from "./hooks/useAuth";

// Importing pages
const Layout = lazy(() => import("./containers/DefaultLayout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  const token = useAuth();
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/register' element={<Register />} />

      {/* Place new routes over this */}
      <Route path='/app/*' element={<Layout />} />

      <Route
        path='*'
        element={<Navigate to={token ? "/app/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
