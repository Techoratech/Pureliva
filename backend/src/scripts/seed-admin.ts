import bcrypt from "bcryptjs";
import { connectDB, disconnectDB } from "../config/db.js";
import { Admin } from "../models/Admin.js";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

async function seedAdmin() {
  try {
    await connectDB();

    const email = env.ADMIN_EMAIL;
    const password = env.ADMIN_PASSWORD;

    if (!email || !password) {
      logger.error("ADMIN_EMAIL and ADMIN_PASSWORD must be defined in .env to run seed:admin");
      process.exit(1);
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      logger.info(`Admin with email ${email} already exists. Skipping.`);
      await disconnectDB();
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const admin = new Admin({
      name: "Pureliva Admin",
      email: email.toLowerCase(),
      passwordHash,
      role: "admin",
    });

    await admin.save();
    logger.info(`✅ Admin created successfully: ${admin.email}`);

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    logger.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
