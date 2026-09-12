import express from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getTrainerTrainees,
} from "../controller/userController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/users", protect, authorizeRoles("Admin"), createUser);

router.get("/users", protect, authorizeRoles("Admin"), getUsers);

router.get("/users/:id", protect, authorizeRoles("Admin"), getUserById);

router.put("/users/:id", protect, authorizeRoles("Admin"), updateUser);

router.delete("/users/:id", protect, authorizeRoles("Admin"), deleteUser);

router.get(
  "/trainer/trainees",
  protect,
  authorizeRoles("Trainer"),
  getTrainerTrainees,
);

export default router;
