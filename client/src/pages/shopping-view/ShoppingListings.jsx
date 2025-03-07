import ShoppingProductTile from "@/components/shopping-view/ShoppingProductTile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchFilteredProducts } from "@/store/shopProductSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbArrowsDownUp } from "react-icons/tb";
import ShoppingFilter from "@/components/shopping-view/ShoppingFilter";
import { sortOptions } from "@/components/shopping-view/config";
import { createSearchParams, useSearchParams } from "react-router-dom";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
};

const ShoppingListings = () => {
  const { productList } = useSelector((state) => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const categorySearchParam = searchParams.get("category");

  const handleSort = (value) => {
    setSort(value);
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchFilteredProducts({filterParams:filters,sortParams:sort}));
    }
  }, [dispatch, sort, filters]);

  const handleFilter = (getSectionId, getCurrentOption) => {
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      copyFilters = { ...copyFilters, [getSectionId]: [getCurrentOption] };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption);
      } else {
        copyFilters[getSectionId].splice(getCurrentOption, 1);
      }
    }
    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 ">
      {/* Sidebar Filters */}
      <div className="p-6 shadow-sm">
        <h1 className="text-lg font-semibold mb-4">Filters</h1>
        <hr />
        <ShoppingFilter filters={filters} handleFilter={handleFilter} />
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
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {sortOptions.map((sortitem) => (
                  <DropdownMenuRadioItem value={sortitem.id} key={sortitem.id}>
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
            <ShoppingProductTile key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListings;
