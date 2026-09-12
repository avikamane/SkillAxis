import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const loginUser = async (req, res) => {
  console.log("LOGIN CONTROLLER REACHED");
  console.log("Request body:", req.body);
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // User not found
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check account status
    if (user.status === "Inactive") {
      return res.status(403).json({
        message: "Your account is inactive. Please contact the Admin.",
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("Login email:", user.email);
    console.log("Stored password starts with:", user.password.substring(0, 7));

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // Send response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
