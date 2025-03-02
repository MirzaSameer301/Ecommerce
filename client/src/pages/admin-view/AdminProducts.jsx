import ProductForm from "@/components/admin-view/ProductForm";
import ProductImageUpload from "@/components/admin-view/ProductImageUpload";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState } from "react";

const initialState={
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
}

const AdminProducts = () => {
  const [openProductBar, setOpenProductBar] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [formData, setFormData] = useState(initialState);

  const handleSubmit=(e)=>{
    e.preventDefault();
    
  }
  
  return (
    <div>
      <button
        onClick={() => setOpenProductBar(true)}
        className="bg-black p-4 rounded text-white font-semibold hover:opacity-75"
      >
        Create Product
      </button>
      <Sheet
        open={openProductBar}
        onOpenChange={() => {
          setOpenProductBar(false);
        }}
      >
        <SheetContent side="right" className={`overflow-auto max-w-md flex flex-col gap-4 mx-auto p-4`}>
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
            <ProductForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}/>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
