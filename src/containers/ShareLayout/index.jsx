import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../../pages/404";
import PreviewPage from "../../pages/PreviewPage";
import WidgetShare from "../../pages/WidgetShare";

const SuspenseContent = () => {
  <>Loading...</>;
};

const ShareLayout = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <Suspense fallback={<SuspenseContent />}>
        <Routes>
          {token && <Route path="/share/:id" element={<WidgetShare />} />}
          {token && <Route path="/preview/:id" element={<PreviewPage />} />}

          {/* Redirecting unknown url to 404 page */}
          <Route path="/not-found" element={<NotFound />} />
          <Route
            path="*"
            element={<Navigate to={token ? "/not-found" : "/login"} replace />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default ShareLayout;
