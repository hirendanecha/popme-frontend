import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ShareLayout from "./containers/ShareLayout";
import "./css/style.css";

// Importing pages
const Layout = lazy(() => import("./containers/DefaultLayout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const EmailVerify = lazy(() => import("./pages/EmailVerify"));

function App() {
  const token = localStorage.getItem("token");

  const publicRoutes = [
    {
      path: "/login",
      name: "Login",
      element: Login,
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      element: ForgotPassword,
    },
    {
      path: "/forgot-password/:token",
      name: "ForgotPassword",
      element: ForgotPassword,
    },
    {
      path: "/register",
      name: "Register",
      element: Register,
    },
    {
      path: "/verify/email/:token",
      name: "VerifyEmail",
      element: EmailVerify,
    },
  ];

  return (
    <Suspense fallback={<>Loading... </>}>
      <Routes>
        {!token &&
          publicRoutes.map(({ path, element: E, ...props }, index) => (
            <Route path={path} element={<E />} {...props} key={index} />
          ))}

        {/* Place new routes over this */}
        <Route path="/app/*" element={<Layout />} />
        {/* <Route path="/share/*" element={<ShareLayout />} /> */}
        <Route path="/*" element={<ShareLayout />} />

        <Route
          path="*"
          element={
            <Navigate to={token ? "/app/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
