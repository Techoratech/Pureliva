import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/Admin.js";
import { generateToken, setAuthCookie, clearAuthCookie } from "../services/token.service.js";
import { AuthRequest } from "../middleware/auth.js";

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Generic error to avoid exposing account existence
  const genericAuthError = new ApiError(401, "Invalid email or password");

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) {
    throw genericAuthError;
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    throw genericAuthError;
  }

  // Update last login
  admin.lastLoginAt = new Date();
  await admin.save();

  // Generate token and set HTTP-only cookie
  const token = generateToken({
    id: admin._id.toString(),
    email: admin.email,
    role: admin.role,
  });

  setAuthCookie(res, token);

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLoginAt: admin.lastLoginAt,
      },
      token, // Also return in body for testing/bearer token support
    },
  });
});

export const adminLogout = asyncHandler(async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const getAdminMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      admin: req.admin,
    },
  });
});

export const changeAdminPassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const adminId = req.admin?._id;

  const admin = await Admin.findById(adminId);
  if (!admin) {
    throw new ApiError(404, "Admin account not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!isMatch) {
    throw new ApiError(400, "Current password is incorrect");
  }

  const salt = await bcrypt.genSalt(10);
  admin.passwordHash = await bcrypt.hash(newPassword, salt);
  await admin.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});
