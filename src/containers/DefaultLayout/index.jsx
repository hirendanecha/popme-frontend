import React, { useState } from "react";
import Content from "./sections/Content";
import Header from "./sections/Header";
import NotificationBar from "./sections/NotificationBar";
import Sidebar from "./sections/Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className='flex h-screen overflow-hidden'>
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden h-screen'>
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <Content />
          </main>
        </div>
      </div>
      <NotificationBar />
    </>
  );
};

export default Layout;
