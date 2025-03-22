import React from "react";
import { DialogContent } from "../ui/dialog";

const OrderDetailsDialog = () => {
  return (
    <DialogContent className="max-h-[500px] overflow-auto">
      <div className="grid gap-8">
        <div className="grid gap-2">
          <div className="flex justify-between items-center mt-6">
            <p className="font-medium">Order ID</p>
            <label>1234</label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Order Date</p>
            <label>12/03/2024</label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Order Status</p>
            <label>Pending</label>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">Order Price</p>
            <label>$234</label>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h2 className="font-bold">Order Details</h2>
            <div className="flex justify-between items-center mt-2">
              <p className="font-medium">Title:</p>
              <label>product one</label>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="font-medium">Quantity:</p>
              <label>3</label>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="font-medium">Price:</p>
              <label>$235</label>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h2 className="font-bold">Shipping Info</h2>
            <div className="grid gap-0.5">
              <p className="">Address</p>
              <p className="">City</p>
              <p className="">Pincode</p>
              <p className="">Phone</p>
              <p className="">Notes</p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default OrderDetailsDialog;
