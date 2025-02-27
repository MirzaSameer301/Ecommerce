import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AdminLayout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <div
        className={`fixed top-0 left-0 h-full md:h-screen bg-white shadow-md translate-transform transform duration-300 md:relative md:translate-x-0 ${
          !openSideBar ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <AdminSidebar setOpenSideBar={setOpenSideBar} />
      </div>

      <div className="flex flex-1 flex-col">
        <AdminHeader setOpenSideBar={setOpenSideBar} />
        <main className="flex-1 flex p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
