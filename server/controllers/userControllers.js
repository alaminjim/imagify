import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

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

    // Prevent purchasing same plan twice
    if (user.purchasedPlans.includes(planId)) {
      return res
        .status(400)
        .json({ success: false, message: "Plan already purchased" });
    }

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
      success_url: `${process.env.FRONTEND_URL}/payment-success?userId=${user._id}&planId=${planId}&credits=${planDetails.credits}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("createCheckoutSession error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addCredits = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    const planCredits = {
      Basic: 100,
      Advanced: 500,
      Business: 5000,
    };

    if (!planCredits[planId]) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid planId" });
    }

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Check if plan already purchased
    if (user.purchasedPlans.includes(planId)) {
      return res
        .status(400)
        .json({ success: false, message: "Plan already purchased" });
    }

    // Add credits & purchased plan
    user.creditBalance += planCredits[planId];
    user.purchasedPlans.push(planId);

    await user.save();

    res.json({
      success: true,
      message: `Added ${planCredits[planId]} credits`,
      creditBalance: user.creditBalance,
      purchasedPlans: user.purchasedPlans,
    });
  } catch (error) {
    console.error("addCredits error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
