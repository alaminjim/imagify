import express from "express";
import {
  createCheckoutSession,
  loginUser,
  registerUser,
  userCredits,
  verifyPayment,
} from "../controllers/userControllers.js";
import { userAuth } from "../middlewares/auth.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/credits", userAuth, userCredits);
userRoute.post("/create-checkout-session", userAuth, createCheckoutSession);
userRoute.post("/verify-payment", userAuth, verifyPayment);

export default userRoute;
