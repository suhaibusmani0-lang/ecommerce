import { getSession } from "@/lib/auth";

export function jsonRes(status, message, data = null) {
  return Response.json({ ok: status < 400, message, data }, { status });
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session?.userId) return jsonRes(401, "Not authenticated");
  if (session.role !== "admin") return jsonRes(403, "Admin access required");
  return null;
}
