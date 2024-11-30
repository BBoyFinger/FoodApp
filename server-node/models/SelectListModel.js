import mongoose from "mongoose";

const SelectList = mongoose.Schema(
  {
    name: String,
    property: String,
    options: Array,
  },
  {
    timestamp: true,
  }
);

export default mongoose.model("SelectList", SelectList);
