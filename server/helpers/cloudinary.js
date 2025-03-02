import { v2 as cloudinary } from "cloudinary";

import multer from "multer";

const storage = multer.memoryStorage();

cloudinary.config({
  cloud_name: "dkn5lrvhc",
  api_key: "676256567716268",
  api_secret: process.env.API_SECRET
});

export const uploadImageUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
};

export const upload = multer({ storage });
