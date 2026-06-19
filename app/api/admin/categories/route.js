import { connectDB } from "@/lib/databaseConnection";
import { requireAdmin, jsonRes } from "@/lib/adminMiddleware";
import CategoryModel from "@/models/Category.model";

export async function GET() {
  try {
    await connectDB();
    const categories = await CategoryModel.find().sort({ createdAt: -1 });
    return jsonRes(200, "Categories fetched", categories);
  } catch (e) {
    return jsonRes(500, e.message);
  }
}

export async function POST(req) {
  const deny = await requireAdmin();
  if (deny) return deny;
  try {
    await connectDB();
    const { name, slug, image, description } = await req.json();
    if (!name || !slug) return jsonRes(400, "Name and slug are required");
    const exists = await CategoryModel.findOne({ slug });
    if (exists) return jsonRes(400, "Slug already exists");
    const category = await CategoryModel.create({ name, slug, image, description });
    return jsonRes(201, "Category created", category);
  } catch (e) {
    return jsonRes(500, e.message);
  }
}
