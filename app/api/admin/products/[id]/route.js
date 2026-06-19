import { connectDB } from "@/lib/databaseConnection";
import { requireAdmin, jsonRes } from "@/lib/adminMiddleware";
import ProductModel from "@/models/Product.model";

export async function GET(_, { params }) {
  try {
    await connectDB();
    const product = await ProductModel.findById(params.id).populate("category", "name slug");
    if (!product) return jsonRes(404, "Product not found");
    return jsonRes(200, "Product fetched", product);
  } catch (e) {
    return jsonRes(500, e.message);
  }
}

export async function PUT(req, { params }) {
  const deny = await requireAdmin();
  if (deny) return deny;
  try {
    await connectDB();
    const body = await req.json();
    const product = await ProductModel.findByIdAndUpdate(params.id, body, { new: true, runValidators: true }).populate("category", "name slug");
    if (!product) return jsonRes(404, "Product not found");
    return jsonRes(200, "Product updated", product);
  } catch (e) {
    return jsonRes(500, e.message);
  }
}

export async function DELETE(_, { params }) {
  const deny = await requireAdmin();
  if (deny) return deny;
  try {
    await connectDB();
    await ProductModel.findByIdAndDelete(params.id);
    return jsonRes(200, "Product deleted");
  } catch (e) {
    return jsonRes(500, e.message);
  }
}
