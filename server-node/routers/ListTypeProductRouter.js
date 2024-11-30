import express from "express";
import {
  createNewTypeProduct,
  getAllTypeProduct,
} from "../controllers/ListTypeProductController.js";
import { upload } from "../untils/untils.js";

const ListTypeProductRouter = express.Router();

ListTypeProductRouter.get("/", getAllTypeProduct);
ListTypeProductRouter.post(
  "/create",
  upload.single("image"),
  createNewTypeProduct
);
// ListTypeProductRouter.delete("/delete/:id", deleteTypeProduct);

export default ListTypeProductRouter;
