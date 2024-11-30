import asyncHandler from "express-async-handler";
import SelectListModel from "../models/SelectListModel.js";

const createOptionByProperty = asyncHandler(async (req, res) => {
  try {
    const SelectListItem = await SelectListModel.create({
      name: req.body.name,
      property: req.body.property,
      options: req.body.options,
    });
    if (SelectListItem) {
      res.status(201).send(SelectListItem);
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getAllOptionByproperty = asyncHandler(async (req, res) => {
  try {
    const SelectList = await SelectListModel.find({});
    if (SelectList) {
      res.json(SelectList);
    } else {
      res.json({ error: "no select list" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const UpdateSelectOption = asyncHandler(async (req, res) => {
  try {
    const UpdateSelect = await SelectListModel.findById({ _id: req.params.id });
    if (UpdateSelect) {
      UpdateSelect.name = req.body.name || UpdateSelect.name;
      UpdateSelect.property = req.body.property || UpdateSelect.property;
      UpdateSelect.options = req.body.options || UpdateSelect.options;
      await UpdateSelect.save();
      res.json(UpdateSelect);
    } else {
      res.status(404);
      throw new Error("not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getSelectOptionById = asyncHandler(async (req, res) => {
  try {
    const UpdateSelect = await SelectListModel.findById({ _id: req.params.id });
    if (UpdateSelect) {
      res.json(UpdateSelect);
    } else {
      res.json({ message: "no select " });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteSelectOption = asyncHandler(async (req, res) => {
  try {
    const Select = await SelectListModel.findById({ _id: req.params.id });
    if (Select) {
      await SelectListModel.deleteOne(Select);
      res.json({ msg: "deleted select" });
    } else {
      res.json({ message: "not found " });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  createOptionByProperty,
  getAllOptionByproperty,
  UpdateSelectOption,
  getSelectOptionById,
  deleteSelectOption,
};
