import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary/cloudinary.js";
import ProductModel from "../models/ProductModel.js";
import { PinComment } from "../untils/untils.js";

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(400);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "cloudinary_phone",
    });
    const product = new ProductModel({
      name: req.body.name,
      price: req.body.price,
      salePrice: req.body.salePrice,
      amount: req.body.amount,
      stock: req.body.stock,
      type: req.body.type || "iphone",
      image: result.secure_url,
      cloudinary_id: result.public_id,
      rating: 0,
    });
    const newProduct = await product.save();
    if (newProduct) {
      res.status(201).send(newProduct);
    } else {
      res.status(400);
      throw new Error("Invalid product data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    amount,
    stock,
    price,
    salePrice,
    type,
  } = req.body;
  try {
    const product = await ProductModel.findById(req.body._id);
    await cloudinary.uploader.destroy(product.cloudinary_id);
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    if (product) {
      product.name = name || product.name;
      product.amount = amount || product.amount;

      product.price = price || product.price;
      product.salePrice = salePrice || product.salePrice;
      product.stock = stock || product.stock;
      product.type = type || product.type;
      product.image = result?.secure_url || product.image;
      product.rating = product.rating;
      product.cloulinary_id = result?.public_id || product.cloudinary_id;
      const updateProduct = await product.save();
      if (updateProduct) {
        res.json(updateProduct);
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      await ProductModel.deleteOne(product);
      res.json({ message: "Product delete successfully" });
    } else {
      res.json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const searchProduct = asyncHandler(async (req, res) => {
  try {
    const name = req.query.name;
    const product = await ProductModel.find({
      name: { $regex: name, $options: 'i' }, // Sử dụng $regex để tìm kiếm không phân biệt chữ hoa, thường
    });

    product.length > 0 ? res.json(product) : res.json({ message: "No product found" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const filterProductByType = asyncHandler(async (req, res) => {
  try {
    const filterProductByType = await ProductModel.find({
      type: req.params.type,
    }).limit(5);

    res.json(filterProductByType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const RateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      const existsUser = product.reviews.find((x) => x.name === req.body.name);
      if (existsUser) {
        res.json({ message: "You already rated this product" });
      } else {
        product.reviews.push(req.body);
        const updateProduct = await product.save();
        res.json(updateProduct);
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const CommentProduct = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      product.comments.push(req.body);
      const updateCommentProduct = await product.save();
      res.send(updateCommentProduct);
    } else {
      res.status(400).send({ message: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const RepCommentProduct = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      const indexComment = product.comments.findIndex(
        (item) => item._id == req.body.idComment
      );
      product.comments[indexComment].replies.push(req.body);

      await product.save();
      res.json(product);
    } else {
      res.status(400).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PinCommentProduct = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      const indexComment = product.comments.findIndex(
        (item) => item._id == req.body.idComment
      );
      product.comments[indexComment] = req.body;
      PinComment(product.comments, indexComment, 0);

      await product.save();
      res.json(product);
    } else {
      res.status(400).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const BlogProduct = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById({ _id: req.params.id });

    if (product) {
      product.blog = req.body.blogContent;
      await product.save();
      res.json(product);
    } else {
      res.json({ message: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PaginationProduct = asyncHandler(async (req, res) => {
  const perPage = 4;
  const page = parseInt(req.params.page) || 1;
  try {
    const products = await ProductModel.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await ProductModel.countDocuments().exec();

    res.json({
      products: products,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const filterProductByRandomField = asyncHandler(async (req, res) => {
  try {
    const products = await ProductModel.find(req.body);
    if (products) {
      res.json(products);
    } else {
      res.json({ message: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  filterProductByType,
  deleteProduct,
  searchProduct,
  RateProduct,
  CommentProduct,
  RepCommentProduct,
  PinCommentProduct,
  BlogProduct,
  PaginationProduct,
  filterProductByRandomField,
};
