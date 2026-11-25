import dotenv from "dotenv";
import { z } from "zod";

// Load .env if present
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(5000),
  CLIENT_URLS: z.string().default("http://localhost:5173,https://purelivafoods.com,https://www.purelivafoods.com"),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_SECRET: z.string().min(48, "JWT_SECRET must be at least 48 characters long for security"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  COOKIE_DOMAIN: z.string().optional().default(""),

  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),

  RESEND_API_KEY: z.string().optional().default(""),
  MAIL_FROM: z.string().default("Pureliva Foods <info@purelivafoods.com>"),
  ADMIN_NOTIFY_EMAIL: z.string().email().optional(),

  SMTP_HOST: z.string().default("smtp.hostinger.com"),
  SMTP_PORT: z.coerce.number().default(465),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((val) => val === "true" || val === "1")
    .default("true"),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),

  R2_ACCOUNT_ID: z.string().optional().default(""),
  R2_ACCESS_KEY_ID: z.string().optional().default(""),
  R2_SECRET_ACCESS_KEY: z.string().optional().default(""),
  R2_BUCKET: z.string().optional().default(""),
  R2_PUBLIC_URL: z.string().optional().default(""),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", JSON.stringify(parsed.error.format(), null, 2));
  throw new Error("Invalid or missing environment variables. Please check your .env file.");
}

export const env = {
  ...parsed.data,
  clientOrigins: parsed.data.CLIENT_URLS.split(",").map((url) => url.trim().replace(/\/$/, "")),
};
