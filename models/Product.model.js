import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: { type: String, default: "" },
  color: { type: String, default: "" },
  stock: { type: Number, default: 0 },
  sku: { type: String, default: "" },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, default: null },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  images: [{ type: String }],
  badge: { type: String, enum: ["New", "Sale", ""], default: "" },
  variants: [variantSchema],
  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  ratings: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
}, { timestamps: true });

const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema, "products");
export default ProductModel;
