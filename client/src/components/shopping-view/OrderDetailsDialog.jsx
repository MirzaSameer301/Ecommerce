import React from "react";
import { DialogContent } from "../ui/dialog";

const OrderDetailsDialog = ({ orderDetails }) => {
  console.log(orderDetails);

  return (
    <DialogContent className="max-h-[500px] overflow-auto">
      <div className="grid gap-8">
        <div className="grid gap-2">
          <div className="flex justify-between items-center mt-6">
            <p className="font-medium">Order ID</p>
            <label>{orderDetails._id}</label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Order Date</p>
            <label>{orderDetails.orderDate.split("T")[0]}</label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Order Status</p>
            <label className={`${
                      orderDetails.orderStatus === "rejected"
                        ? "bg-red-600"
                        : orderDetails.orderStatus === "confirmed"
                        ? "bg-green-600"
                        : "bg-black"
                    } p-1 rounded-lg text-white`}>{orderDetails.orderStatus}</label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Order Price</p>
            <label>${orderDetails.totalAmount}</label>
          </div>
        </div>
        <div className="grid gap-4">
          <h2 className="font-bold">Order Details</h2>
          {orderDetails.cartItems.map((cartItem) => (
            <div className="flex items-center gap-10">
              <div className="overflow-hidden h-14 w-14">
                <img
                  src={cartItem.image}
                  alt={cartItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-4 justify-between items-center mt-2">
                  <p className="font-medium">Title:</p>
                  <label>{cartItem.title}</label>
                </div>
                <div className="flex gap-4 justify-between items-center mt-2">
                  <p className="font-medium">Quantity:</p>
                  <label>{cartItem.quantity}</label>
                </div>
                <div className="flex gap-4 justify-between items-center mt-2">
                  <p className="font-medium">Price:</p>
                  <label>${cartItem.price}</label>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h2 className="font-bold">Shipping Info</h2>
            <div className="grid gap-0.5">
              <p className="">{orderDetails.addressInfo.address}</p>
              <p className="">{orderDetails.addressInfo.city}</p>
              <p className="">{orderDetails.addressInfo.pincode}</p>
              <p className="">{orderDetails.addressInfo.phone}</p>
              <p className="">{orderDetails.addressInfo.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default OrderDetailsDialog;
