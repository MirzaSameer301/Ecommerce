import CartItemsContent from "@/components/shopping-view/CartItemsContent";
import ShoppingAddress from "@/components/shopping-view/ShoppingAddress";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import account from "../../assets/account.jpg";
import { toast } from "sonner";
import { confirmOrder, createNewOrder } from "@/store/orderSlice";
import { useNavigate } from "react-router-dom";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.userCart);
  const { user } = useSelector((state) => state.auth);
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleCheckOut = () => {
    if (selectedAddress === null) {
      toast.error("please select the address first!", {
        style: {
          backgroundColor: "#ff4d4f", 
          color: "#fff",           
        },
      });
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!", {
        style: {
          backgroundColor: "#ff4d4f", 
          color: "#fff",             
        },
      });
      return
    }

    if (isCashOnDelivery) {
      const newOrder = {
        userId: user.id,
        cartId: cartItems._id,
        cartItems: cartItems.items.map((cartItem) => ({
          productId: cartItem.productId,
          title: cartItem.title,
          image: cartItem.image,
          price: cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price,
          quantity: cartItem.quantity,
        })),
        addressInfo: {
          addressId: selectedAddress._id,
          address: selectedAddress.address,
          city: selectedAddress.city,
          pincode: selectedAddress.pincode,
          phone: selectedAddress.phone,
          notes: selectedAddress.notes,
        },
        orderStatus: "pending",
        paymentMethod: "cashOnDelivery",
        paymentStatus: "unpaid",
        totalAmount: totalCartAmount,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
      };
      dispatch(createNewOrder(newOrder)).then((data) => {
        if (data.payload.success) {
          dispatch(confirmOrder(data.payload.orderId)).then((data) => {
            if (data.payload.success) {
              navigate("/shop/order-placed");
            }
          });
        }
      });
    } else {
      toast.error("please select a payment method first!", {
        style: {
          backgroundColor: "#ff4d4f", 
          color: "#fff",             
        },
      });
      return;
    }
  };

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
        <ShoppingAddress
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
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
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="cashOnDelivery"
                checked={isCashOnDelivery}
                onChange={() => setIsCashOnDelivery(!isCashOnDelivery)}
                className="mr-2"
              />
              <label htmlFor="cashOnDelivery" className="text-lg font-semibold">
                Cash on Delivery
              </label>
            </div>
            <button
              onClick={handleCheckOut}
              className="bg-black w-full p-2 text-white font-bold cursor-pointer rounded hover:opacity-80"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
