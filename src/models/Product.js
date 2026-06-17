// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   images: [String], // Array of image URLs
//   category: { type: String, default: "Skincare" },
//   stock: { type: Number, default: 10 },
// }, { timestamps: true });

// export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // [String] থেকে বদলে String করা হয়েছে
  category: { type: String, default: "Skincare" },
  stock: { type: Number, default: 10 },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);