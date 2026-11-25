import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin, IAdmin } from "../models/Admin.js";

export interface AuthRequest extends Request {
  admin?: IAdmin;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const authenticateAdmin = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined = undefined;

    // 1. Check cookies first (standard web admin flow)
    if (req.cookies && req.cookies.pureliva_admin_token) {
      token = req.cookies.pureliva_admin_token;
    }

    // 2. Fallback to Authorization: Bearer token header (useful for API/Postman tests)
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "Authentication required. Please log in.");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    if (!decoded || !decoded.id) {
      throw new ApiError(401, "Invalid or expired session. Please log in again.");
    }

    const admin = await Admin.findById(decoded.id).select("-passwordHash");
    if (!admin) {
      throw new ApiError(401, "Admin account no longer exists.");
    }

    req.admin = admin;
    next();
  } catch (error: any) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      next(new ApiError(401, "Session has expired or is invalid. Please log in again."));
    } else {
      next(error);
    }
  }
};
