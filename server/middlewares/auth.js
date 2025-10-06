import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing. Please login again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token payload." });
    }

    req.user = { userId: decoded.id };
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};
