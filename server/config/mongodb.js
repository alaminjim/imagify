import mongoose from "mongoose";

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    // Check if connection is still alive
    if (mongoose.connection.readyState === 1) {
      return cachedConnection;
    }
    cachedConnection = null;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  // Optimized connection options for faster performance
  const opts = {
    dbName: "imagify",
    bufferCommands: true, // Allow Mongoose to buffer commands temporarily
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    heartbeatFrequencyMS: 10000, // Check connection health every 10 seconds
    retryWrites: true, // Retry writes if they fail
    w: 'majority' // Write concern for better reliability
  };

  try {
    console.time("mongodb_connection");
    cachedConnection = await mongoose.connect(process.env.MONGODB_URI, opts);
    console.timeEnd("mongodb_connection");
    console.log("🔥 Database Connected Successfully");
    return cachedConnection;
  } catch (err) {
    cachedConnection = null;
    console.error("Database connection failed:", err.message);
    throw err;
  }
};

export default connectDB;
