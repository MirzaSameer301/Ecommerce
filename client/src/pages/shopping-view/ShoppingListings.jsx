import { filterOptions } from "@/components/shopping-view/config";
import React from "react";

const ShoppingListings = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 ">
      {/* Sidebar Filters */}
      <div className="p-6 shadow-sm">
        <h1 className="text-lg font-semibold mb-4">Filters</h1>
        <hr />
        {Object.keys(filterOptions).map((filterKey) => (
          <div key={filterKey} className="my-4">
            <h3 className=" font-semibold capitalize">{filterKey}</h3>
            <ul className="space-y-2 mt-2">
              {filterOptions[filterKey].map((item) => (
                <li key={item.id}>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="checkbox" className="accent-black" />
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="mt-4"/>
          </div>
        ))}
      </div>

      {/* Product Listings */}
      <div className="">
        {/* Product cards will be added here */}
        <p className="text-center text-gray-500">Product Listings Here</p>
      </div>
    </div>
  );
};

export default ShoppingListings;
