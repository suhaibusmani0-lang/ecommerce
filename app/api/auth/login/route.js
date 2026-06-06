import { connectDB } from "@/lib/databaseConnection";
import UserModel from "@/models/User.model";
import bcrypt from "bcrypt";

function jsonResponse(status, message, data = null) {
  return Response.json({ ok: status < 400, message, data }, { status });
}

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();
    const { email, password } = payload || {};

    if (!email || !password) {
      return jsonResponse(400, "Email and password are required");
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return jsonResponse(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return jsonResponse(401, "Invalid email or password");
    }

    return jsonResponse(200, "Login successful", {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return jsonResponse(
      500,
      error instanceof Error ? error.message : "Internal Server Error"
    );
  }
}
