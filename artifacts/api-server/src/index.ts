import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Resolve paths to find atlas-credentials.env
const pathsToTry = [
  path.resolve(import.meta.dirname, "../../../atlas-credentials.env"),
  path.resolve(import.meta.dirname, "../../atlas-credentials.env"),
  path.resolve(import.meta.dirname, "../atlas-credentials.env"),
  path.resolve(import.meta.dirname, "./atlas-credentials.env"),
];

for (const p of pathsToTry) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
    break;
  }
}
dotenv.config();

import app from "./app";
import { logger } from "./lib/logger";
import { connectDb } from "@workspace/db";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function startServer() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }
    await connectDb(mongoUri);
    logger.info("Connected to MongoDB");

    app.listen(port, () => {
      logger.info({ port }, "Server listening");
    });
  } catch (err) {
    logger.error({ err }, "Failed to start server");
    process.exit(1);
  }
}

startServer();
