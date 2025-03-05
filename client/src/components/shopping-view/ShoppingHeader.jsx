import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiThunderstore } from "react-icons/si";
import { GrCart } from "react-icons/gr";
import { shoppingViewHeaderMenuItems } from "./config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { FaHamburger, FaUserAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { logoutUser } from "@/store/authSlice";

const UserProfileAndCart = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-2 px-3 md:p-0 md:items-center">
      <div className="border rounded-full h-9 w-9 p-2 text-lg">
        <GrCart />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="bg-black text-white font-semibold h-9 w-9 items-center justify-center flex rounded-full cursor-pointer">
            {user.userName[0].toUpperCase()}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className={`w-56`}>
          <DropdownMenuLabel>Logged in as {user.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to={"/shop/account"} className="flex items-center gap-2">
              <FaUserAlt className="text-black" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <MdLogout className="text-black" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const MenuItems = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 font-medium md:text-sm ">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          key={menuItem.id}
          to={menuItem.path}
          className="hover:bg-gray-100 md:hover:bg-background p-3 md:p-0 "
        >
          {menuItem.label}
        </Link>
      ))}
    </div>
  );
};
const ShoppingHeader = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="border-b sticky z-40 top-0 p-4">
      <div className="flex items-center justify-between px-4 md:px-6">
        <Link
          to={"/shop/home"}
          className="flex items-center gap-1 font-bold text-2xl"
        >
          <SiThunderstore />
          Ecommerce
        </Link>
        <div className="hidden md:block">
          <MenuItems />
        </div>
        <div className="hidden md:block">
          <UserProfileAndCart user={user} />
        </div>
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <GiHamburgerMenu className="text-xl" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <MenuItems />
              <UserProfileAndCart user={user} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
