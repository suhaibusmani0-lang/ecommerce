import mongoose from "mongoose";
function getMongoErrorMessage(error) {
  const message = error instanceof Error ? error.message : String(error);

  if (/Could not connect to any servers in your MongoDB Atlas cluster/i.test(message)) {
    return "MongoDB Atlas connection failed. Add your current IP address to Atlas Network Access (whitelist) or use a reachable MongoDB URI.";
  }

  if (/ENOTFOUND|ECONNREFUSED|EAI_AGAIN|timed out/i.test(message)) {
    return "MongoDB connection failed. Check the URI, internet access, and Atlas network access settings.";
  }

  return message;
}
const rawMongoUri = process.env.MONGODB_URI || "";
const MONGODB_URL = rawMongoUri
  .replace(/^MONGODB_URI\s*=/i, "")
  .trim()
  .replace(/^['"]|['"]$/g, "");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  if (!MONGODB_URL) {
    throw new Error("MONGODB_URI is not set in the environment. Add your Atlas connection string to .env.local.");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "ecommerce",
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw new Error(getMongoErrorMessage(error));
  }
};