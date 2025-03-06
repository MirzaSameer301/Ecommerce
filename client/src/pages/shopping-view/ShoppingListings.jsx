import { filterOptions } from "@/components/shopping-view/config";
import ShoppingProductTile from "@/components/shopping-view/ShoppingProductTile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchFilteredProducts } from "@/store/shopProductSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbArrowsDownUp } from "react-icons/tb";

const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

const ShoppingListings = () => {
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFilteredProducts());
  }, [dispatch]);
  console.log(productList);

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
            <hr className="mt-4" />
          </div>
        ))}
      </div>
      <div className="m-2">
        <div className="flex items-center justify-between py-2">
          <p className="text-lg font-semibold">All Products</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="text-sm flex items-center gap-2 border p-2 font-medium">
                <span>Sort by</span>
                <TbArrowsDownUp />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup>
                {sortOptions.map((sortitem)=>(
                  <DropdownMenuRadioItem key={sortitem.id}>
                    {sortitem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <hr />
        <br />
        {/* Product Listings */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {productList.map((product) => (
            <ShoppingProductTile product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListings;
