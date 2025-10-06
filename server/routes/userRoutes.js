import express from "express";
import {
  addCredits,
  createCheckoutSession,
  loginUser,
  registerUser,
  userCredits,
} from "../controllers/userControllers.js";
import { userAuth } from "../middlewares/auth.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/credits", userAuth, userCredits);
userRoute.post("/create-checkout-session", userAuth, createCheckoutSession);
userRoute.post("/add-credits", userAuth, addCredits);

export default userRoute;
