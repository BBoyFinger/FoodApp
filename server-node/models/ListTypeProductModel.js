import mongoose from "mongoose";

const ListTypeProductSchema = mongoose.Schema(
  {
    name: String,
    img: String,
    cloudinary_id: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ListTypeproduct", ListTypeProductSchema);
