import React from "react";
const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];
const ProductForm = ({ formData, setFormData,handleSubmit,editProductId}) => {
  return (
    <form onSubmit={handleSubmit}>
      {addProductFormElements.map((field) => {
        if (field.componentType === "input") {
          return (
            <div key={field.name} className="flex flex-col gap-1">
              <label htmlFor={field.name} className="font-bold">
                {field.label}
              </label>
              <input
                id={field.name}
                className="p-2 border rounded-lg w-full placeholder:text-sm"
                placeholder={field.placeholder}
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                required
              />
            </div>
          );
        }

        if (field.componentType === "textarea") {
          return (
            <div key={field.name} className="flex flex-col gap-1">
              <label htmlFor={field.name} className="font-bold">
                {field.label}
              </label>
              <textarea
                id={field.name}
                className="p-2 border rounded-lg w-full placeholder:text-sm"
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                required
              />
            </div>
          );
        }

        if (field.componentType === "select") {
          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label htmlFor={field.name} className="font-bold">
                {field.label}
              </label>
              <select
                id={field.name}
                className="p-2 border rounded-lg w-full placeholder:text-sm"
                value={formData[field.name] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                required
              >
                <option value="" disabled>
                  Select {field.label.toLowerCase()}
                </option>
                {field.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return null;
      })}

      <button type="submit" className="bg-black w-full p-2 text-white font-semibold hover:opacity-85 my-2">
        {editProductId ? "Edit":"Add"}
      </button>
    </form>
  );
};

export default ProductForm;
