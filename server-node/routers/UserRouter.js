import express from "express";
import {
  changePassword,
  deleteUser,
  getAllUser,
  getUserById,
  loginUser,
  registerUser,
  updateProfile,
  updateProfileUser,
} from "../controllers/UserController.js";
import { admin, protect } from "../middlewares/Auth.js";

const UserRouter = express.Router();

//****************Public Route******************
UserRouter.post("/add-user", registerUser);
UserRouter.post("/login", loginUser);

UserRouter.put("/update", protect, updateProfile);
UserRouter.put("/update/:id", updateProfileUser);
UserRouter.delete("/delete/:id", protect, admin, deleteUser);
UserRouter.put("/password", protect, changePassword);

UserRouter.get("/detail/:id", getUserById);
UserRouter.get("/", protect, admin, getAllUser);

export default UserRouter;
