import ShoppingAddress from "@/components/shopping-view/ShoppingAddress";
import ShoppingOrders from "@/components/shopping-view/ShoppingOrders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const ShoppingAccount = () => {
  return (
    <div>
      <div className=""></div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <ShoppingAddress />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
