import React from "react";

const ShoppingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) => {
  return (
    <div className="w-full border-1 shadow-sm rounded-md">
      <div
        className="cursor-pointer"
        onClick={() => handleGetProductDetails(product._id)}
      >
        <div className="object-cover overflow-hidden rounded-t-md relative">
          {product.totalStock === 0 ? (
            <span
              className={` bg-red-500 px-2 text-xs text-white rounded-2xl font-semibold py-1 absolute top-2 left-2`}
            >
              Out of Stock
            </span>
          ) : product.totalStock < 10 ? (
            <span
              className={` bg-red-500 px-2 text-xs text-white rounded-2xl font-semibold py-1 absolute top-2 left-2`}
            >
              {`Only ${product.totalStock} items are left`}
            </span>
          ) : null}
          <img
            src={product.image}
            alt={product.title}
            className="h-60 w-full"
          />
        </div>
        <div className="flex flex-col gap-2 p-2">
          <h2 className="font-semibold line-clamp-1">{product.title}</h2>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>{product.category}</p>
            <p className="">{product.brand}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className={`${product.salePrice ? "line-through" : ""}`}>
              ${product.price}
            </p>
            <p
              className={`font-medium ${
                product.salePrice > 0 ? "block" : "hidden"
              }`}
            >
              ${product.salePrice}
            </p>
          </div>
        </div>
      </div>
      {product.totalStock === 0 ? (
        <div className="p-2">
          <button
            className="bg-gray-900 opacity-65  w-full p-2 text-white font-semibold rounded  cursor-not-allowed"
          >
            Out of Stock
          </button>
        </div>
      ) : (
        <div className="p-2">
          <button
            onClick={() => handleAddToCart(product._id, product.totalStock)}
            className="bg-gray-900 w-full p-2 text-white font-semibold rounded hover:opacity-85 cursor-grab"
          >
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingProductTile;
