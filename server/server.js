import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./config/mongodb.js";
import userRoute from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

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
app.options("*", cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRoute);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("api is working");
});

// Connect to Database and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server is running on port---> ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
