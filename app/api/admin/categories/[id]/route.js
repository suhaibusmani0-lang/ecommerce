import { connectDB } from "@/lib/databaseConnection";
import { requireAdmin, jsonRes } from "@/lib/adminMiddleware";
import CategoryModel from "@/models/Category.model";

export async function GET(_, { params }) {
  try {
    await connectDB();
    const category = await CategoryModel.findById(params.id);
    if (!category) return jsonRes(404, "Category not found");
    return jsonRes(200, "Category fetched", category);
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
    const category = await CategoryModel.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!category) return jsonRes(404, "Category not found");
    return jsonRes(200, "Category updated", category);
  } catch (e) {
    return jsonRes(500, e.message);
  }
}

export async function DELETE(_, { params }) {
  const deny = await requireAdmin();
  if (deny) return deny;
  try {
    await connectDB();
    await CategoryModel.findByIdAndDelete(params.id);
    return jsonRes(200, "Category deleted");
  } catch (e) {
    return jsonRes(500, e.message);
  }
}
