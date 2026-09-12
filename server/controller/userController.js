import User from "../models/user.js";

// Create Trainer or Trainee
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    // Validate role
    if (!["Trainer", "Trainee"].includes(role)) {
      return res.status(400).json({
        message: "Only Trainer or Trainee accounts can be created here",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      status,
    });

    res.status(201).json({
      message: `${role} created successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};

// Get all Trainers and Trainees
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["Trainer", "Trainee"] },
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// Get a single user
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

// Update Trainer or Trainee
export const updateUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "Admin") {
      return res.status(403).json({
        message: "Admin account cannot be updated here",
      });
    }

    if (role && !["Trainer", "Trainee"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = password ?? user.password;
    user.role = role ?? user.role;
    user.status = status ?? user.status;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
};

// Delete Trainer or Trainee
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "Admin") {
      return res.status(403).json({
        message: "Admin account cannot be deleted",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

//get trainer trainee (all trainees for now)

export const getTrainerTrainees = async (req, res) => {
  try {
    const trainees = await User.find({
      role: "Trainee",
      status: "Active",
    }).select("-password");

    res.status(200).json(trainees);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch trainees",
      error: error.message,
    });
  }
};
