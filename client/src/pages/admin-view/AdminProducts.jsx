import ProductForm from "@/components/admin-view/ProductForm";
import ProductImageUpload from "@/components/admin-view/ProductImageUpload";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
} from "@/store/adminProductSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductTitle from "@/components/admin-view/AdminProductTitle";

const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openProductBar, setOpenProductBar] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [editProductId, setEditProductId] = useState(null);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  const handleSubmit = (e) => {
    e.preventDefault();
    editProductId !== null
      ? dispatch(editProduct({id:editProductId, formData})).then((data) => {
          if (data.payload.success) {
            dispatch(fetchAllProducts());
            setFormData(initialState);
            setEditProductId(null);
            setOpenProductBar(false);
            toast("Product Updated Successfully");
          }
        })
      : dispatch(addProduct({ ...formData, image: uploadImageUrl })).then(
          (data) => {
            if (data.payload.success) {
              dispatch(fetchAllProducts());
              setFormData(initialState);
              setImageFile(null);
              setOpenProductBar(false);
              toast("Product Added Successfully");
            }
          }
        );
  };

  useEffect(() => {
    dispatch(fetchAllProducts()).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId))
  };

  
  return (
    <div>
      <div className="">
        <div className="w-full flex justify-end">
          <button
            onClick={() => setOpenProductBar(true)}
            className="bg-black p-3 rounded text-white font-semibold hover:opacity-75"
          >
            Create Product
          </button>
        </div>
        <div className="my-2 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productList.length > 0 &&
            productList.map((product) => (
              <AdminProductTitle
                product={product}
                setFormData={setFormData}
                setEditProductId={setEditProductId}
                handleDelete={handleDelete}
                setOpenProductBar={setOpenProductBar}
              />
            ))}
        </div>
      </div>

      <Sheet
        open={openProductBar}
        onOpenChange={() => {
          setOpenProductBar(false);
          setEditProductId(null);
          setFormData(initialState);
        }}
      >
        <SheetContent
          side="right"
          className={`overflow-auto max-w-md flex flex-col gap-4 mx-auto p-4`}
        >
          <SheetHeader>
            <SheetTitle className={`text-xl font-bold text-center`}>
              Add New Product
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadImageUrl={uploadImageUrl}
            setUploadImageUrl={setUploadImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
          />
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            editProductId={editProductId}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
