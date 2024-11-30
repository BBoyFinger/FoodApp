import mongoose from "mongoose";

const User = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    isAdmin: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", User);
