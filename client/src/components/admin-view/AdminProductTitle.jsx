import React from "react";

const AdminProductTitle = ({
  product,
  setFormData,
  setEditProductId,
  handleDelete,
  setOpenProductBar,
}) => {
  return (
    <div className="w-full max-w-sm border-1 shadow-sm rounded-b-md">
      <div className="object-cover overflow-hidden rounded-t-md">
        <img src={product.image} alt={product.title} className="h-56 w-full" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-semibold">{product.title}</h2>
        <div className="flex justify-between items-center">
          <p className={`${product.salePrice ? "line-through" : ""}`}>
            ${product.price}
          </p>
          <p className={`font-medium ${product.salePrice>0 ?"block":'hidden'}`}>${product.salePrice}</p>
        </div>
        <div className="flex justify-between items-center">
          <button onClick={()=>{
            setOpenProductBar(true);
            setFormData(product);
            setEditProductId(product._id);
          }} className="bg-black p-2 text-white font-semibold rounded hover:opacity-85">
            Edit
          </button>
          <button onClick={()=>{
            handleDelete(product._id)
          }} className="bg-black p-2 text-white font-semibold rounded hover:opacity-85">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductTitle;
