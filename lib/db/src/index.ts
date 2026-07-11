import mongoose from "mongoose";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  console.warn("Could not set custom DNS servers:", e);
}

export async function connectDb(uri?: string) {
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is required.");
  }
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }
}

export const db = mongoose.connection;

export * from "./schema";
export * from "./schema/models";
export * from "./schema/counter";
