import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);

try {
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("✅ MONGODB CONNECTED!");
  console.log("Database:", mongoose.connection.name);

  await mongoose.disconnect();
} catch (error) {
  console.log("\n❌ CONNECTION FAILED");
  console.log("Name:", error.name);
  console.log("Message:", error.message);
  console.log("Code:", error.code);

  if (error.reason) {
    console.log("\nReason:");
    console.log(error.reason);
  }
}