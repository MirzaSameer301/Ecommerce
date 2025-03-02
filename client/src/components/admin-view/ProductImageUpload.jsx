import React, { useRef,useEffect } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import {CiFileOn} from "react-icons/ci"
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadImageUrl,
  setUploadImageUrl,
  imageLoadingState,
  setImageLoadingState
}) => {
  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setImageFile(selectedFile);
  };
  const imageRef = useRef();

  const handleDragOver=(e)=>{
    e.preventDefault();
  }

  const handleDrop=(e)=>{
    e.preventDefault();
    const droppedFile=e.dataTransfer.files?.[0];
    setImageFile(droppedFile);
  }

  const handleRemoveImage=()=>{
    setImageFile(null);
    if(imageRef.current){
        imageRef.current.value='';
    }
  }
  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:3000/api/admin/products/upload-image",
      data
    );

    if(response.data.success){
      setUploadImageUrl(response.data.result.url);
      setImageLoadingState(false)
    }
    
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md">
      <label className="font-bold">Upload Image</label>
      <div className="" onDragOver={handleDragOver} onDrop={handleDrop}>
        <input
          type="file"
          id="image-upload"
          ref={imageRef}
          className="hidden"
          required
          onChange={handleChange}
        />
        {!imageFile ? (
          <label
            htmlFor="image-upload"
            className="flex flex-col justify-center items-center mt-2 h-32 w-full bg-gray-50 rounded-lg border-2 border-dashed font-medium"
          >
            <IoCloudDownloadOutline className="text-4xl"/>
            <p>drag & drop here or click to select</p>
          </label>
        ) : imageLoadingState?(<Skeleton className={`h-14 bg-gray-200`}/>):(
          <div className="flex justify-between items-center p-6 rounded-lg shadow-sm">
            <CiFileOn className="text-3xl"/>
            <span className="font-medium text-gray-700">{imageFile.name}</span>
            <button onClick={handleRemoveImage} className="hover:bg-gray-100"><RxCross2/></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
