import React,{useState} from "react";
import { DialogContent } from "../ui/dialog";

const statusOptions= [
  { id: "pending", label: "Pending" },
  { id: "inProcess", label: "In Process" },
  { id: "inShipping", label: "In Shipping" },
  { id: "rejected", label: "Rejected" },
  { id: "dilvered", label: "Dilvered" },
];
const OrderDetailsDialog = () => {
  const [status, setStatus] = useState("")
  const handleUpdateStatus=(e)=>{
    e.preventDefault();
  }
  
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
        <form onSubmit={handleUpdateStatus} className="grid gap-4">
          <label className="font-medium">Update Order Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border rounded-md w-full"
          >
            {statusOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-black text-white font-semibold p-2 rounded hover:opacity-80 disabled:opacity-50"
           
          >
           Update Status
          </button>
        </form>
      </div>
    </DialogContent>
  );
};

export default OrderDetailsDialog;
