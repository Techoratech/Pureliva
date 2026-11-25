import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { logger } from "./utils/logger.js";

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    const app = createApp();

    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Pureliva Server running in [${env.NODE_ENV}] mode on port ${env.PORT}`);
      logger.info(`Health check available at http://localhost:${env.PORT}/api/v1/health`);
    });

    // Graceful shutdown handlers
    const shutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        logger.info("HTTP server closed.");
        await disconnectDB();
        process.exit(0);
      });

      // Force close if graceful shutdown takes too long
      setTimeout(() => {
        logger.error("Could not close connections in time, forcefully shutting down");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
