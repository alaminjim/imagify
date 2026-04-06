import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./config/mongodb.js";
import userRoute from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

// 1. Strict Environment Variable Validation
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
// This ensures that for every request (especially cold starts on Vercel),
// the database is fully connected before processing the query.
const dbMiddleware = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB MIDDLEWARE ERROR:", err.message);
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
};

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://imagify-ai-generate-3223.netlify.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Apply strict checks and DB connection to all API routes
app.use("/api", dbMiddleware);

app.use("/api/user", userRoute);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("Imagify API is working gracefully.");
});

// Start Server with pre-flight checks
if (checkEnvVars()) {
  app.listen(PORT, () => {
    console.log(`Server is running on port---> ${PORT}`);
  });
} else {
  console.log("Server halted due to missing configuration.");
}

export default app;
