import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./config/mongodb.js";
import userRoute from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://imagify-ai-generate-3223.netlify.app",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));

await connectDB();

app.use("/api/user", userRoute);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("api is working");
});

app.listen(PORT, () => {
  console.log(`server is running port---> ${PORT}`);
});
