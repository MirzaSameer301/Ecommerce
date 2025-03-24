import React, { useState,useEffect } from "react";
import { Dialog } from "../ui/dialog";
import OrderDetailsDialog from "./OrderDetailsDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/adminOrderSlice";

const AdminOrdersView = () => {
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  const handleGetOrderDetails = (getId) => {
    dispatch(getOrderDetailsForAdmin(getId));
  };

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenOrderDetails(true);
    }
  }, [orderDetails]);

  const handleCloseDialog = () => {
    setOpenOrderDetails(false);
    dispatch(resetOrderDetails());
  };

  return (
    <div>
      <h2 className="text-xl font-bold p-4">Orders History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead className="sr-only">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList &&
            orderList.length > 0 &&
            orderList.map((orderItem) => (
              <TableRow key={orderItem._id}>
                <TableCell>{orderItem._id}</TableCell>
                <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                <TableCell>
                  <span
                    className={`${
                      orderItem.orderStatus === "rejected"
                        ? "bg-red-600"
                        : orderItem.orderStatus === "confirmed"
                        ? "bg-green-600"
                        : "bg-black"
                    } p-1 rounded-lg text-white`}
                  >
                    {orderItem.orderStatus}
                  </span>
                </TableCell>
                <TableCell>${orderItem.totalAmount}</TableCell>
                <TableCell>
                  <Dialog
                    open={openOrderDetails}
                    onOpenChange={handleCloseDialog}
                  >
                    <button
                      onClick={() => handleGetOrderDetails(orderItem._id)}
                      className="bg-black text-white font-semibold p-2 rounded hover:opacity-80 cursor-pointer"
                    >
                      Details
                    </button>
                    {orderDetails && (
                      <OrderDetailsDialog orderDetails={orderDetails} />
                    )}
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrdersView;
