import asyncHandler from "express-async-handler";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, address, phone } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
      address,
      phone,
      isAdmin: false,
    });
    if (user) {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, address, phone } = req.body;
  try {
    const user = await UserModel.findById(req.user._id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.address = address || user.address;
      user.phone = phone || user.phone;
      const updateUser = await user.save();

      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        password: updateUser.password,
        address: updateUser.address,
        phone: updateUser.phone,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const updateProfileUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { name, email, address, phone, isAdmin } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.address = address || user.address;
      user.phone = phone || user.phone;
      user.isAdmin = isAdmin ?? user.isAdmin;

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin user");
      }
      await UserModel.deleteOne(user);
      res.json({ message: "User delete successfully" });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await UserModel.findById(req.user._id);
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "Password changed" });
    } else {
      res.status(401);
      res.json({ message: "Invalid old password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  registerUser,
  loginUser,
  updateProfile,
  updateProfileUser,
  deleteUser,
  changePassword,
  getAllUser,
  getUserById
};
