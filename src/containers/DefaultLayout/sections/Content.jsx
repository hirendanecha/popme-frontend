import React, { Suspense, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../../pages/404";
import routes from "../../../routes";

const SuspenseContent = () => {
  <>Loading...</>;
};

const Content = () => {
  const mainContentRef = useRef(null);
  const { pageTitle } = useSelector((state) => state.header);
  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [pageTitle]);
  return (
    <div className='drawer-content flex flex-col '>
      <main
        className='flex-1 overflow-y-auto'
        ref={mainContentRef}
      >
        <Suspense fallback={<SuspenseContent />}>
          <Routes>
            {routes.map((route, key) => {
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
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default Content;
