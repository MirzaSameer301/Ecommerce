import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar - Fixed and Non-Scrollable */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-md transition-transform duration-300 md:relative md:translate-x-0 ${
          openSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar setOpenSideBar={setOpenSideBar} />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex flex-1 flex-col h-screen">
        <AdminHeader setOpenSideBar={setOpenSideBar} />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
