import { uploadImageUtil } from "../helpers/cloudinary.js";
import Product from "../models/Product.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await uploadImageUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: "Failed to add product",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const productsList = await Product.find({});
    res.status(200).json({
      success: true,
      data: productsList,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: "Error Occured whlie fetching products",
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: "Failed to update product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: "Failed to add product",
    });
  }
};
