import React, { useState, useEffect } from "react";
import ModalComp from "../../components/Modal";
import Content from "./sections/Content";
import Header from "./sections/Header";
import NotificationBar from "./sections/NotificationBar";
import Sidebar from "./sections/Sidebar";
import { socket } from "../../services/socketCon";

const Layout = () => {
  // socket.on("connect", () => {
  //   console.log(socket.connected); // true
  // });

  // socket.on("connect", () => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  // });

  useEffect(() => {
    socket.on("connect", () => {
      // console.log(socket.connected);
    });
    return () => {};
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden h-screen">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <Content />
          </main>
        </div>

        <ModalComp />
      </div>
      <NotificationBar />
    </>
  );
};

export default Layout;
