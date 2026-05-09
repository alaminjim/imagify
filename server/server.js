import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import compression from "compression";
import connectDB from "./config/mongodb.js";
import userRoute from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

// 1. Performance Middlewares
app.use(compression()); // Compress all responses
app.use(express.json({ limit: '1mb' }));
app.use(morgan("dev"));

// 2. Strict Environment Variable Validation
const requiredEnvVars = [
  "MONGODB_URI",
  "JWT_SECRET",
  "CLIPDROP_API_KEY",
  "STRIPE_SECRET_KEY",
];

const checkEnvVars = () => {
  const missing = requiredEnvVars.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    console.error("FATAL ERROR: Missing environment variables:", missing.join(", "));
    return false;
  }
  return true;
};

// 2. Database Connection Middleware
// This ensures that for every request (especially cold starts on Render),
// the database is fully connected before processing the query.
const ensureDBConnection = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Database connection failed. Please try again." 
    });
  }
};

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Apply database connection middleware to all API routes
app.use("/api", ensureDBConnection);

// Apply routes after database middleware
app.use("/api/user", userRoute);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("Imagify API is working gracefully.");
});

// Health check endpoint to warm up the server
app.get("/health", async (req, res) => {
  try {
    await connectDB();
    res.json({ 
      status: "healthy", 
      database: "connected",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: "unhealthy", 
      database: "disconnected",
      error: error.message 
    });
  }
});

// Start Server with pre-flight checks and DB connection
if (checkEnvVars()) {
  // Pre-warm database connection
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port---> ${PORT}`);
        console.log(`Health check available at: http://localhost:${PORT}/health`);
      });
    })
    .catch((err) => {
      console.error("Failed to connect to DB:", err.message);
      process.exit(1);
    });
} else {
  console.log("Server halted due to missing configuration.");
}

export default app;
