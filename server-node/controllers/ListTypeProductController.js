import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary/cloudinary.js";
import ListTypeProductModel from "../models/ListTypeProductModel.js";

const getAllTypeProduct = asyncHandler(async (req, res) => {
  try {
    const allType = await ListTypeProductModel.find({});
    res.json(allType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const createNewTypeProduct = asyncHandler(async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "dev_setups",
    });
    const type = await ListTypeProductModel.create({
      name: req.body.name,
      img: result.secure_url,
      cloudinary_id: result.public_id,
    });
    if (type) {
      res.status(201).send({ type });
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getAllTypeProduct, createNewTypeProduct };
