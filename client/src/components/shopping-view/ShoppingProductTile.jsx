import React from "react";

const ShoppingProductTile = ({ product }) => {
  return (
    <div className="w-full border-1 shadow-sm rounded-md">
      <div className="object-cover overflow-hidden rounded-t-md relative">
        <span className={`${product.salePrice > 0 ?"block":"hidden"} bg-red-500 px-2 text-xs text-white rounded-2xl font-semibold py-1 absolute top-2 left-2`}>
          Sale
        </span>
        <img src={product.image} alt={product.title} className="h-60 w-full" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-semibold">{product.title}</h2>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>{product.category}</p>
          <p className="">{product.brand}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className={`${product.salePrice ? "line-through" : ""}`}>
            ${product.price}
          </p>
          <p className={`font-medium ${product.salePrice>0 ?"block":'hidden'}`}>${product.salePrice}</p>
        </div>
        <div className="">
          <button className="bg-gray-900 w-full p-2 text-white font-semibold rounded hover:opacity-85">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingProductTile;
