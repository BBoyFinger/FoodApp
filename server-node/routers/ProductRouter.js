import express from "express";
import {
  addProduct,
  BlogProduct,
  CommentProduct,
  deleteProduct,
  filterProductByRandomField,
  filterProductByType,
  getAllProduct,
  getProductById,
  PaginationProduct,
  PinCommentProduct,
  RateProduct,
  RepCommentProduct,
  searchProduct,
  updateProduct,
} from "../controllers/ProductController.js";
import { admin, protect } from "../middlewares/Auth.js";
import { upload } from "../untils/untils.js";

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProduct);
ProductRouter.get("/:type", filterProductByType);
ProductRouter.get("/detail/:id", getProductById);
ProductRouter.get("/pagination/:page", PaginationProduct);
ProductRouter.post("/filter/random", filterProductByRandomField);
ProductRouter.get("/search/product", searchProduct)

ProductRouter.post("/rate/:id", RateProduct);
ProductRouter.post("/comment/:id", CommentProduct);
ProductRouter.post("/pin/comment/:id", PinCommentProduct);
ProductRouter.post("/rep/comment/:id", RepCommentProduct);

// private router admin
ProductRouter.post(
  "/add-product",
  upload.single("image"),
  protect,
  admin,
  addProduct
);
ProductRouter.post("/blog/:id", protect, admin, BlogProduct);

ProductRouter.put(
  "/update",
  upload.single("image"),
  protect,
  admin,
  updateProduct
);
ProductRouter.delete(
  "/delete/:id",
  upload.single("image"),
  protect,
  admin,
  deleteProduct
);

export default ProductRouter;
