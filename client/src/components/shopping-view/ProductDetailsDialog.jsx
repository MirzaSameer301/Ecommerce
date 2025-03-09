import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { FaStar } from "react-icons/fa6";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const handleDialogClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-[40vw] overflow-hidden">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="">
            <div>
              <h1 className="text-2xl font-bold">{productDetails?.title}</h1>
              <p className="text-xl mb-5 mt-4">{productDetails?.description}</p>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold text-gray-700 mb-4">
              <p>{productDetails.category}</p>
              <p>{productDetails.brand}</p>
            </div>
            <div className="flex items-center justify-between">
              <p
                className={`text-xl font-bold text-primary ${
                  productDetails?.salePrice > 0 ? "line-through" : ""
                }`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-xl font-bold">
                  ${productDetails?.salePrice}
                </p>
              ) : null}
            </div>
            <br />
            <hr />
            <div className="max-h-[300px] overflow-auto ">
              <h2 className="font-semibold text-lg text-gray-700 py-2">
                Reviews
              </h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-600 text-white font-semibold h-9 w-9 items-center justify-center flex rounded-full cursor-pointer">
                    U
                  </div>
                  <div className="flex items-center">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                <div className="text-sm w-full">
                  tygufsjdhjfjkgbv mhsgvdbsn hgsgdf,c bjhsfl bfhbhvlnf jhgsjg
                  vbv
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-600 text-white font-semibold h-9 w-9 items-center justify-center flex rounded-full cursor-pointer">
                    U
                  </div>
                  <div className="flex items-center">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                <div className="text-sm w-full">
                  tygufsjdhjfjkgbv mhsgvdbsn hgsgdf,c bjhsfl bfhbhvlnf jhgsjg
                  vbv
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-600 text-white font-semibold h-9 w-9 items-center justify-center flex rounded-full cursor-pointer">
                    U
                  </div>
                  <div className="flex items-center">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                <div className="text-sm w-full">
                  tygufsjdhjfjkgbv mhsgvdbsn hgsgdf,c bjhsfl bfhbhvlnf jhgsjg
                  vbv
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-600 text-white font-semibold h-9 w-9 items-center justify-center flex rounded-full cursor-pointer">
                    U
                  </div>
                  <div className="flex items-center">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                <div className="text-sm w-full">
                  tygufsjdhjfjkgbv mhsgvdbsn hgsgdf,c bjhsfl bfhbhvlnf jhgsjg
                  vbv
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-600 text-white font-semibold h-9 w-9 items-center justify-center flex rounded-full cursor-pointer">
                    U
                  </div>
                  <div className="flex items-center">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                <div className="text-sm w-full">
                  tygufsjdhjfjkgbv mhsgvdbsn hgsgdf,c bjhsfl bfhbhvlnf jhgsjg
                  vbv
                </div>
              </div><div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-600 text-white font-semibold h-9 w-9 items-center justify-center flex rounded-full cursor-pointer">
                    U
                  </div>
                  <div className="flex items-center">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                <div className="text-sm w-full">
                  tygufsjdhjfjkgbv mhsgvdbsn hgsgdf,c bjhsfl bfhbhvlnf jhgsjg
                  vbv
                </div>
              </div>
              <div className="w-full flex justify-center gap-4 mt-6 mb-12">
                <input
                  className="border rouneded w-2/3 p-2"
                  type="text"
                  placeholder="Write a review..."
                />
                <button className="bg-black text-white text-sm font-medium px-2 hover:opacity-85 rounded">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailsDialog;
