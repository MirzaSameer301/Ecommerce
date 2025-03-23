import React from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ShoppingOrderPlaced = () => {
  return (
    <div className="flex justify-center items-center w-full mt-20">
      <div className="flex flex-col items-center justify-between rounded border-1 p-4">
        <div className="flex flex-col items-center justify-center gap-8">
          <h2 className="text-lg text-center sm:text-2xl font-semibold">
            Your Order has been placed successfully
          </h2>
          <span className="text-7xl sm:text-8xl">
            <IoCheckmarkDoneCircleOutline />
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full items-center gap-8 mt-4">
          <Link to={'/shop/home'} className="bg-black text-white font-semibold p-2 rounded hover:opacity-80 cursor-pointer">
            Continue to Shopping
          </Link>
          <Link to={'/shop/account'} className="bg-black text-white font-semibold p-2 rounded hover:opacity-80 cursor-pointer">
            Check Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingOrderPlaced;
