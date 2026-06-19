import { connectDB } from "@/lib/databaseConnection";
import { requireAdmin, jsonRes } from "@/lib/adminMiddleware";
import ProductModel from "@/models/Product.model";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (category) query.category = category;

    const [products, total] = await Promise.all([
      ProductModel.find(query).populate("category", "name slug").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      ProductModel.countDocuments(query),
    ]);
    return jsonRes(200, "Products fetched", { products, total, page, pages: Math.ceil(total / limit) });
  } catch (e) {
    return jsonRes(500, e.message);
  }
}

export async function POST(req) {
  const deny = await requireAdmin();
  if (deny) return deny;
  try {
    await connectDB();
    const body = await req.json();
    const { name, slug, price, category } = body;
    if (!name || !slug || !price || !category) return jsonRes(400, "Name, slug, price and category are required");
    const exists = await ProductModel.findOne({ slug });
    if (exists) return jsonRes(400, "Slug already exists");
    const product = await ProductModel.create(body);
    return jsonRes(201, "Product created", product);
  } catch (e) {
    return jsonRes(500, e.message);
  }
}
