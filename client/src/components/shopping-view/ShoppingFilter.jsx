import React from "react";
import { filterOptions } from "./config";

const ShoppingFilter = ({ filters, handleFilter }) => {
  return (
    <div>
      {Object.keys(filterOptions).map((filterKey) => (
        <div key={filterKey} className="my-4">
          <h3 className=" font-semibold capitalize">{filterKey}</h3>
          <ul className="space-y-2 mt-2">
            {filterOptions[filterKey].map((item) => (
              <li key={item.id}>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={
                      filters &&
                      filters[filterKey] &&
                      filters[filterKey].includes(item.id)
                    }
                    onChange={()=>handleFilter(filterKey,item.id)}
                    className="accent-black"
                  />
                  {item.label}
                </label>
              </li>
            ))}
          </ul>
          <hr className="mt-4" />
        </div>
      ))}
    </div>
  );
};

export default ShoppingFilter;
