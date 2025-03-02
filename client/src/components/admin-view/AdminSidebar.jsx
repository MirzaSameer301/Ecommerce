import { Icon } from "lucide-react";
import React from "react";
import { ImStatsBars } from "react-icons/im";
import { MdOutlineDashboard } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaSitemap } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <MdProductionQuantityLimits />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <FaSitemap />,
  },
];

const AdminSidebar = ({ setOpenSideBar }) => {
  const navigate = useNavigate();
  return (
    <div className={`py-10 md:py-6 border-r-1 flex flex-col gap-10`}>
      <div
        className="left-56 top-2 p-2 text-2xl fixed md:hidden"
        onClick={() => setOpenSideBar(false)}
      >
        <RxCross2 />
      </div>
      <div className="px-10 flex gap-2 text-2xl font-extrabold items-center justify-center">
        <ImStatsBars />
        <h1 className="">Admin Panel</h1>
      </div>
      <div className="flex flex-1 flex-col gap-2 font-semibold">
        {adminSidebarMenuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              navigate(`${item.path}`);
              setOpenSideBar(false);
            }}
            className="cursor-pointer px-10 py-4 flex gap-2 justify-start items-center hover:bg-gray-200"
          >
            <span>{item.icon}</span>
            <h2>{item.label}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
