import { Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const COOKIE_NAME = "pureliva_admin_token";

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function setAuthCookie(res: Response, token: string): void {
  const isProd = env.NODE_ENV === "production";
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd, // Must be true in production for SameSite=None
    sameSite: isProd ? "none" : "lax", // Allows cross-site cookie between Render API and Vercel Frontend
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
    ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
  });
}

export function clearAuthCookie(res: Response): void {
  const isProd = env.NODE_ENV === "production";
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
  });
}
