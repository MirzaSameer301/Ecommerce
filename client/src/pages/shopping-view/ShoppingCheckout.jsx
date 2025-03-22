import CartItemsContent from "@/components/shopping-view/CartItemsContent";
import ShoppingAddress from "@/components/shopping-view/ShoppingAddress";
import React from "react";
import { useSelector } from "react-redux";
import account from "../../assets/account.jpg";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.userCart);
  console.log(cartItems);
  const totalCartAmount =
    cartItems && cartItems.items.length > 0
      ? cartItems.items.reduce(
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
    <div className="flex flex-col">
      <div className="relative h-[300px] overflow-hidden mb-3">
        <img
          src={account}
          alt="account image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ShoppingAddress />
        <div className="">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <CartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between font-bold text-xl p-4">
              <span>Total</span>
              <span>${totalCartAmount}</span>
            </div>
          </div>
          <div className="w-full p-2">
            <button className="bg-black w-full p-2 text-white font-bold cursor-pointer rounded hover:opacity-80">Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
