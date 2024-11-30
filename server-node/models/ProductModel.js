import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String },
    comment: { type: String },
    star: { type: Number },
  },
  {
    timestamps: true,
  }
);

const replieCommentProduct = mongoose.Schema({
  content: { type: String },
  isAdmin: Boolean,
  nameUser: { type: String },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const commentProduct = mongoose.Schema({
  author: { type: String },
  status: String,
  isAdmin: Boolean,
  avatar: { type: String },
  content: { type: String },
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  replies: [replieCommentProduct],
});

const Product = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    type: { type: String, required: true },
    image: { type: String },
    amount: Number,
    stock: { type: Number, required: true },
    cloudinary_id: { type: String },

    rating: { type: Number },
    numReviews: { type: Number },
    blog: String,

    reviews: [reviewSchema],
    comments: [commentProduct],
  },
  {
    timestamps: true,
  }
);
Product.index({ name: "text" });

export default mongoose.model("Product", Product);
