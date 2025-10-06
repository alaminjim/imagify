import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import transactionModel from "../models/transactionModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ----------- USER AUTH -----------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        creditBalance: user.creditBalance,
        purchasedPlans: user.purchasedPlans,
      },
    });
  } catch (error) {
    console.error("registerUser error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        creditBalance: user.creditBalance,
        purchasedPlans: user.purchasedPlans,
      },
    });
  } catch (error) {
    console.error("loginUser error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const userCredits = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name, purchasedPlans: user.purchasedPlans },
    });
  } catch (error) {
    console.error("userCredits error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ----------- CREATE CHECKOUT SESSION -----------
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { planId } = req.body;

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    let planDetails;
    switch (planId) {
      case "Basic":
        planDetails = { credits: 100, amount: 10 };
        break;
      case "Advanced":
        planDetails = { credits: 500, amount: 50 };
        break;
      case "Business":
        planDetails = { credits: 5000, amount: 250 };
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid planId" });
    }

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (user.purchasedPlans.includes(planId))
      return res
        .status(400)
        .json({ success: false, message: "Plan already purchased" });

    // create checkout session with client_reference_id and metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${planId} Plan`,
              description: `${planDetails.credits} credits`,
            },
            unit_amount: planDetails.amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      client_reference_id: user._id.toString(),
      metadata: { planId: planId },
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("createCheckoutSession error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ----------- VERIFY PAYMENT & ADD CREDITS -----------
export const verifyPayment = async (req, res) => {
  try {
    const { session_id } = req.body;
    if (!session_id)
      return res
        .status(400)
        .json({ success: false, message: "Missing session_id" });

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res
        .status(400)
        .json({ success: false, message: "Payment not completed" });
    }

    const userId = session.client_reference_id;
    const planId = session.metadata.planId;

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Credits calculation
    let creditsToAdd;
    switch (planId) {
      case "Basic":
        creditsToAdd = 100;
        break;
      case "Advanced":
        creditsToAdd = 500;
        break;
      case "Business":
        creditsToAdd = 5000;
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid planId" });
    }

    // update user credits & purchasedPlans
    user.creditBalance += creditsToAdd;
    if (!user.purchasedPlans.includes(planId)) user.purchasedPlans.push(planId);
    await user.save();

    // save transaction
    const transaction = new transactionModel({
      user: user._id,
      planId,
      credits: creditsToAdd,
      amount: session.amount_total / 100,
      status: "success",
    });
    await transaction.save();

    res.json({
      success: true,
      message: `Added ${creditsToAdd} credits`,
      creditBalance: user.creditBalance,
    });
  } catch (error) {
    console.error("verifyPayment error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
