import {
  fetchFilteredProducts,
  fetchProductDetails,
} from "@/store/shopProductSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import { FaArrowLeft, FaArrowRight, FaOdnoklassniki } from "react-icons/fa6";
import { IoFootsteps, IoManSharp, IoWoman } from "react-icons/io5";
import { BiSolidWatch } from "react-icons/bi";
import { CgAdidas } from "react-icons/cg";
import { SiHandm, SiNike, SiPuma, SiZara } from "react-icons/si";
import { FaWolfPackBattalion } from "react-icons/fa";
import ShoppingProductTile from "@/components/shopping-view/ShoppingProductTile";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetailsDialog";
import { addToCart, fetchCartItems } from "@/store/cartSlice";
import { toast } from "sonner";

const featureImageList = [
  { image: image1, title: "image1" },
  { image: image2, title: "image2" },
  { image: image3, title: "image3" },
];
const categories = [
  { id: "men", label: "Men", icon: <IoManSharp /> },
  { id: "women", label: "Women", icon: <IoWoman /> },
  { id: "kids", label: "Kids", icon: <FaOdnoklassniki /> },
  { id: "accessories", label: "Accessories", icon: <BiSolidWatch /> },
  { id: "footwear", label: "Footwear", icon: <IoFootsteps /> },
];
const brands = [
  { id: "nike", label: "Nike", icon: <SiNike /> },
  { id: "adidas", label: "Adidas", icon: <CgAdidas /> },
  { id: "puma", label: "Puma", icon: <SiPuma /> },
  { id: "levi", label: "Levi's", icon: <FaWolfPackBattalion /> },
  { id: "zara", label: "Zara", icon: <SiZara /> },
  { id: "h&m", label: "H&M", icon: <SiHandm /> },
];
export const ShoppingHome = () => {
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    dispatch(
      fetchFilteredProducts({
        filters: {},
        sortBy: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + featureImageList.length) % featureImageList.length
    );
  };

  const handleNavigateToListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  };
  const handleAddToCart = (getCurrentProductId) => {
    dispatch(
      addToCart({
        userId: user.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(fetchCartItems(user.id));
        toast("Product is added to cart");
      }
    });
  };
  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };
  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Image Slider */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <div
          className={`flex w-full h-full transition-transform duration-1000`}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {featureImageList.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          <FaArrowRight />
        </button>
      </div>
      <div className="min-h-[500px]">
        <div className="bg-gray-50 py-12">
          <div className="mx-auto px-4 container">
            <h1 className="text-3xl text-center font-bold mb-8">
              Shop By Category
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <div
                  className="flex items-center justify-center rounded-lg cursor-pointer transition-shadow gap-2 font-semibold text-lg hover:shadow-lg border p-8"
                  key={category.id}
                  onClick={() =>
                    handleNavigateToListingPage(category, "category")
                  }
                >
                  <span className="text-xl">{category.icon}</span>
                  {category.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <section className="bg-gray-50 py-12">
          <div className="mx-auto px-4 container">
            <h1 className="text-3xl text-center font-bold mb-8">
              Shop By Brands
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {brands.map((brand) => (
                <div
                  className="flex items-center justify-center rounded-lg cursor-pointer transition-shadow gap-2 font-semibold text-lg hover:shadow-lg border p-8"
                  key={brand.id}
                  onClick={() => handleNavigateToListingPage(brand, "brand")}
                >
                  <span className="text-xl">{brand.icon}</span>
                  {brand.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <section className="min-h-[500px]">
        <h1 className="text-3xl text-center font-bold mb-8">
          Feature Products
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-4">
          {productList.map((product) => (
            <div className="">
              <ShoppingProductTile
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
                handleGetProductDetails={handleGetProductDetails}
              />
            </div>
          ))}
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};
