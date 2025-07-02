import { deleteCartItem, updateCartQuantity } from "@/store/cartSlice";
import React from "react";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const CartItemsContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.userCart);
  const { productList} = useSelector(
    (state) => state.shopProducts
  );

  

  const dispatch = useDispatch();
  const handleDeleteCartItem = (getCartItem) => {
    dispatch(
      deleteCartItem({ userId: user.id, productId: getCartItem.productId })
    ).then((data) => {
      if (data.payload.success) {
        toast("Cart Item deleted successfully");
      }
    });
  };

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem.productId
        );
        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem.productId
        );
        
        const getTotalStock = productList[getCurrentProductIndex].totalStock;
        if (indexOfCurrentItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast.error(`Only ${getQuantity} Items can be added to cart`, {
              style: {
                backgroundColor: "red",
                color: "white",
              },
            });

            return;
          }
        }
      }
    }
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast("Cart item is updated successfully");
      }
    });
  };
  return (
    <div className="flex m-4 items-center">
      <div className="w-20 h-20 rounded overflow-hidden">
        <img
          className="w-full object-cover h-full"
          src={cartItem.image}
          alt={cartItem.title}
        />
      </div>
      <div className="flex-1 space-y-4 p-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{cartItem.title}</h3>
          <span
            onClick={() => handleDeleteCartItem(cartItem)}
            className="text-sm text-gray-500 hover:text-black cursor-pointer"
          >
            <FaTrash />
          </span>
        </div>
        <div className="flex gap-4 items-center justify-between font-medium text-gray-600">
          <div className="">
            <button
              className={`border py-0.5 px-2 cursor-pointer`}
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
              disabled={cartItem.quantity === 1}
            >
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
              className="border py-0.5 px-2 cursor-pointer"
            >
              +
            </button>
          </div>
          <div className="font-medium text-black">
            $
            {(cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
              cartItem?.quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemsContent;
