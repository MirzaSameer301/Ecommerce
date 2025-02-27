import { logoutUser } from "@/store/authSlice";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

const AdminHeader = ({ setOpenSideBar }) => {
  const dispatch=useDispatch();
  const handleLogout=()=>{
    dispatch(logoutUser());
  }
  return (
    <header>
      <div className="flex justify-between shadow-sm p-4">
        <button
          onClick={() => setOpenSideBar(true)}
          className="flex md:hidden text-white w-10 rounded text-xl items-center justify-center bg-black p-2"
        >
          <GiHamburgerMenu />
        </button>
        <div className="flex flex-1 justify-end">
          <button onClick={handleLogout} className="flex gap-2 justify-center items-center bg-black p-3 rounded text-white font-semibold">
            Logout
            <IoLogOutOutline className="font-bold text-2xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
