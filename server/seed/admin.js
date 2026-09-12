import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    let admin = await User.findOne({
      email: "admin@skillaxis.com",
    });

    if (admin) {
      // Reset the password using plaintext.
      // The User model will hash it automatically.
      admin.name = "SkillAxis Admin";
      admin.password = "admin123";
      admin.role = "Admin";
      admin.status = "Active";

      await admin.save();

      console.log("Admin account reset successfully!");
      console.log("Email:", admin.email);
      console.log("Password:", "admin123");

      process.exit(0);
    }

    admin = await User.create({
      name: "SkillAxis Admin",
      email: "admin@skillaxis.com",
      password: "admin123",
      role: "Admin",
      status: "Active",
    });

    console.log("Admin created successfully!");
    console.log("Email:", admin.email);
    console.log("Password:", "admin123");

    process.exit(0);
  } catch (error) {
    console.error("Error creating/resetting Admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
