import React, { useState } from "react";
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

const ShoppingOrders = () => {
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
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
          <TableRow>
            <TableCell>1234456</TableCell>
            <TableCell>23/01/2020</TableCell>
            <TableCell>InProcess</TableCell>
            <TableCell>$389</TableCell>
            <TableCell>
              <Dialog
                open={openOrderDetails}
                onOpenChange={setOpenOrderDetails}
              >
                <button
                  onClick={() => setOpenOrderDetails(true)}
                  className="bg-black text-white font-semibold p-2 rounded hover:opacity-80 cursor-pointer"
                >
                  Details
                </button>
                <OrderDetailsDialog />
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ShoppingOrders;
