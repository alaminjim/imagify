import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  mongoose.connection.on("connected", () => {
    console.log("Database Connected");
  });
  await mongoose.connect(process.env.MONGODB_URI, { dbName: "imagify" });
};

export default connectDB;
