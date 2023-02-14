import React from "react";
import Notifications from "./Notifications";
import { useSelector } from "react-redux";

function Header({ sidebarOpen, setSidebarOpen }) {

  const { pageTitle } = useSelector((state) => state.header);

  return (
    <header className='sticky top-0 bg-white border-b border-slate-200 z-30 shadow-shadow-headerShadow'>
      <div className='px-4 py-3 lg:px-6'>
        <div className='flex items-center justify-between h-16 -mb-px'>
          {/* Header: Left side */}
          <div className='flex'>
            {/* Hamburger button */}
            <button
              className='text-slate-500 hover:text-slate-600 lg:hidden'
              aria-controls='sidebar'
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className='sr-only'>Open sidebar</span>
              <svg
                className='w-6 h-6 fill-current'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect x='4' y='5' width='16' height='2' />
                <rect x='4' y='11' width='16' height='2' />
                <rect x='4' y='17' width='16' height='2' />
              </svg>
            </button>

            <div className="flex">
              <h4 className="text-primary-main text-3xl font-bold ml-3 lg:ml-0">{pageTitle || "Page title"}</h4>
            </div>
          </div>



          {/* Header: Right side */}
          <div className='flex items-center'>
            <Notifications />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
