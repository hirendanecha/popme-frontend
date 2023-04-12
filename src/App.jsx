import React, { lazy, Suspense, useReducer } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import "./css/style.css";

// Importing pages
const Layout = lazy(() => import("./containers/DefaultLayout"));
const ShareLayout = lazy(() => import("./containers/ShareLayout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const EmailVerify = lazy(() => import("./pages/EmailVerify"));
const CheckoutStatus = lazy(() => import("./pages/CheckoutStatus"));

function App() {
  const { userToken: token } = useSelector((state) => state.auth);
  // console.log({token});
  // const token = localStorage.getItem("token");
  // console.log("token",!token)
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

        <Route path="/*" element={<ShareLayout />} />

        {/* Place new routes over this */}
        <Route path="/app/*" element={<Layout />} />

        <Route path="/callback" element={<CheckoutStatus />} />

        {/* <Route
          path="/*"
          element={
            <Navigate to={token ? "/app/dashboard" : "/login"} replace />
          }
        /> */}

        <Route
          path="/*"
          element={
            <Navigate to={token ? "/app/workspaces" : "/login"} replace />
          }
        />
        {/* <Route
          path="/"
          element={
            <Navigate to={token ? "/app/dashboard" : "/login"} replace />
          }
        /> */}

        <Route
          path="/"
          element={
            <Navigate to={token ? "/app/workspaces" : "/login"} replace />
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
