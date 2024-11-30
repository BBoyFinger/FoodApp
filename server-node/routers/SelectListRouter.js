import express from "express";
import {
  createOptionByProperty,
  deleteSelectOption,
  getAllOptionByproperty,
  getSelectOptionById,
  UpdateSelectOption,
} from "../controllers/SelectListController.js";

const SelectListrouter = express.Router();

SelectListrouter.post("/create", createOptionByProperty);
SelectListrouter.get("/", getAllOptionByproperty);
SelectListrouter.get("/detail/:id", getSelectOptionById);
SelectListrouter.delete("/delete/:id", deleteSelectOption);
SelectListrouter.put("/update/:id", UpdateSelectOption);

export default SelectListrouter;
