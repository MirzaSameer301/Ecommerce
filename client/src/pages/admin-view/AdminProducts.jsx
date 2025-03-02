import ProductImageUpload from "@/components/admin-view/ProductImageUpload";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState } from "react";

const AdminProducts = () => {
  const [openProductBar, setOpenProductBar] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
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
        <SheetContent side="right" className={`max-w-md`}>
          <SheetHeader>
            <SheetTitle className={`text-xl font-bold text-center my-2`}>
              Add New Product
            </SheetTitle>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadImageUrl={uploadImageUrl}
              setUploadImageUrl={setUploadImageUrl}
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
