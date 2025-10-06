import express from "express";
import {
  loginUser,
  registerUser,
  userCredits,
} from "../controllers/userControllers.js";
import { userAuth } from "../middlewares/auth.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/credits", userAuth, userCredits);

export default userRoute;
