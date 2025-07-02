import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/shopProductSlice";
import StarRatingComponent from "./StarRatingComponent";
import { addReview, getReviews } from "@/store/productReviewSlice";
import { toast } from "sonner";

const ProductDetailsDialog = ({
  open,
  setOpen,
  productDetails,
  handleAddToCart,
}) => {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.shopReview);
  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);
  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };
  if (!productDetails) {
    return null;
  }
  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast("Review added successfully!");
      }
    });
  };
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <div>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-screen md:max-h-[33rem] overflow-auto">
          <div className="relative overflow-hidden rounded-lg w-full max-h-[28rem]">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
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
            <div className="flex items-center gap-4 mt-2">
              <StarRatingComponent rating={averageReview} />
              <p>{averageReview.toFixed(1)}</p>
            </div>
            <div className="bg-gray-900 hover:opacity-85 cursor-pointer w-full p-2 text-white mt-4 font-semibold rounded text-center">
              <button
                className="outline-none cursor-pointer animate-bounce"
                onClick={() =>
                  handleAddToCart(productDetails._id, productDetails.totalStock)
                }
              >
                Add to Cart
              </button>
            </div>
            <br />
            <hr />
            <div className="max-h-[300px] overflow-auto ">
              <h2 className="font-semibold text-lg text-gray-700 py-2">
                Reviews
              </h2>
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-600 text-white font-semibold h-9 w-9 items-center justify-center flex rounded-full cursor-pointer">
                          {review.userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col ">
                          <StarRatingComponent rating={review.reviewValue} />
                          <p className="text-xs text-gray-600">
                            {review.userName}
                          </p>
                        </div>
                      </div>
                      <div className=" w-full">{review.reviewMessage}</div>
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-center w-full">No Reviews</h2>
              )}

              <div className="w-full flex flex-col justify-center gap-4 mt-6 md:mb-36">
                <h2 className="font-semibold">Give Your Review here</h2>
                <div className="items-center flex w-full">
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>
                <input
                  className="border rouneded w-2/3 p-2"
                  type="text"
                  value={reviewMsg}
                  onChange={(e) => setReviewMsg(e.target.value)}
                  placeholder="Write a review..."
                />
                <button
                  onClick={handleAddReview}
                  disabled={reviewMsg.trim() === ""}
                  className={`text-white text-sm font-medium p-2 rounded cursor-pointer hover:opacity-85 ${
                    reviewMsg.trim() === ""
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black"
                  }`}
                >
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
