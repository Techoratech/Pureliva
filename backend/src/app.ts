import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

import { env } from "./config/env.js";
import { corsMiddleware } from "./config/cors.js";
import { generalLimiter } from "./middleware/rateLimit.js";
import { notFoundHandler } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/error.js";
import { apiRouter } from "./routes/index.js";

export const createApp = (): Application => {
  const app = express();

  // 1. Trust proxy for Render / Cloudflare deployment
  app.set("trust proxy", 1);

  // 2. Security Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    })
  );

  // 3. CORS
  app.use(corsMiddleware);

  // 4. Request Logging
  if (env.NODE_ENV !== "test") {
    app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  }

  // 5. Body Parsers & Cookie Parser
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cookieParser());

  // 6. Data Sanitization against NoSQL query injection & HTTP Parameter Pollution
  app.use(mongoSanitize());
  app.use(hpp());

  // 7. Gzip Compression
  app.use(compression());

  // 8. General Rate Limiter for all routes
  app.use(generalLimiter);

  // 9. Root Health Check for Render and Uptime Monitors
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok", app: "Pureliva Foods API" });
  });

  // 10. API v1 Routes
  app.use("/api/v1", apiRouter);

  // 11. 404 Handler
  app.use(notFoundHandler);

  // 12. Central Error Handler
  app.use(errorHandler);

  return app;
};
