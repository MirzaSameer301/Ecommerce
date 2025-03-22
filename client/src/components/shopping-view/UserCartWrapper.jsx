import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartItemsContent from "./CartItemsContent";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ setOpenCartSheet, cartItems }) => {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  return (
    <div>
      <SheetContent className="md:max-w-md max-w-sm overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cartItems && cartItems.length > 0
            ? cartItems.map((cartItem) => (
                <CartItemsContent key={cartItems._id} cartItem={cartItem} />
              ))
            : null}
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex justify-between font-bold text-xl p-4">
            <span>Total</span>
            <span>${totalCartAmount}</span>
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="bg-black cursor-pointer text-white font-semibold items-center p-2 m-2 rounded hover:opacity-85"
        >
          CheckOut
        </button>
      </SheetContent>
    </div>
  );
};

export default UserCartWrapper;
