import mongoose from "mongoose";

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) return cachedConnection;

  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  // Pre-configured connection options
  const opts = {
    dbName: "imagify",
    bufferCommands: true, // Allow Mongoose to buffer commands temporarily
  };

  try {
    cachedConnection = await mongoose.connect(process.env.MONGODB_URI, opts);
    console.log("🔥 Database Connected Successfully");
    return cachedConnection;
  } catch (err) {
    cachedConnection = null;
    throw err;
  }
};

export default connectDB;
