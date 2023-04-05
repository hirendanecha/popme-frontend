import React, { Suspense, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../../../pages/404";
import routes from "../../../routes";

const SuspenseContent = () => {
  <>Loading...</>;
};

const Content = () => {
  const mainContentRef = useRef(null);
  const token = localStorage.getItem("token");
  const { pageTitle } = useSelector((state) => state.header);
  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [pageTitle]);
  return (
    <div className="drawer-content flex flex-col h-[calc(100vh-88px)]">
      <main
        className="flex-1 overflow-y-auto"
        // style={{ overflowY: "-webkit-paged-y" }}
        ref={mainContentRef}
      >
        {/* <main className="flex-1 overflow-y-auto" ref={mainContentRef}> */}

        <Suspense fallback={<SuspenseContent />}>
          <Routes>
            {token &&
              routes.map((route, key) => {
                return (
                  <Route
                    key={key}
                    exact={true}
                    path={`${route.path}`}
                    element={<route.component />}
                  />
                );
              })}

            {/* Redirecting unknown url to 404 page */}
            <Route path="/not-found" element={<NotFound />} />
            <Route
              path="*"
              element={
                <Navigate to={token ? "/not-found" : "/login"} replace />
              }
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default Content;
