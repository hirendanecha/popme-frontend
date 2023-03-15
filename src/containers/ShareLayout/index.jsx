import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../../pages/404";
import PreviewPage from "../../pages/PreviewPage";
import WidgetShare from "../../pages/WidgetShare";

const SuspenseContent = () => {
  <>Loading...</>;
};

const ShareLayout = () => {
  // const token = localStorage.getItem("token");

  return (
    <>
      <Suspense fallback={<SuspenseContent />}>
        <Routes>
          <Route path="/share/:id" element={<WidgetShare />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default ShareLayout;
