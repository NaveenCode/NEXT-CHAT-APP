import mongoose from "mongoose";
import "colors";

// Safely read the MongoDB URI from env
const URL: string | undefined = process.env.MONGODB_URI;

if (!URL) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

export const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(URL);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`.yellow);
  } catch (error) {
    console.log("❌ Failed to connect to database:", error);
    // process.exit(1);
  }
};
