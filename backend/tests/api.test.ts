import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

let mongoServer: MongoMemoryServer;
let app: any;
let adminCookie: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  process.env.NODE_ENV = "test";
  process.env.MONGO_URI = uri;
  process.env.JWT_SECRET = "super_secret_test_jwt_key_that_is_at_least_48_characters_long_for_security";

  // Connect mongoose
  await mongoose.connect(uri);

  // Dynamic import of app and models so env is set
  const { createApp } = await import("../src/app.js");
  const { Product } = await import("../src/models/Product.js");
  const { Admin } = await import("../src/models/Admin.js");

  app = createApp();

  // Seed a product
  await Product.create({
    id: "flax-seeds",
    slug: "flax-seeds",
    name: "Flax Seeds",
    titleWithVariant: "Flax Seeds – Roasted & Salted (100g)",
    type: "Roasted & Salted",
    sku: "PUR-FLX-100",
    price: 99,
    mrp: 120,
    stock: 100,
    isActive: true,
    sortOrder: 1,
    keyStats: [],
    nutrients: [],
    images: { bowl: "", packFront: "", packBack: "" },
  });

  // Seed an admin
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("adminpassword123", salt);
  await Admin.create({
    name: "Test Admin",
    email: "admin@purelivafoods.com",
    passwordHash,
    role: "admin",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe("Pureliva Foods API Tests", () => {
  it("GET /health returns 200 OK", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET /api/v1/health returns database status", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.database).toBe("connected");
  });

  it("GET /api/v1/products returns active products list", async () => {
    const res = await request(app).get("/api/v1/products");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].slug).toBe("flax-seeds");
  });

  it("GET /api/v1/products/:slug returns a single product", async () => {
    const res = await request(app).get("/api/v1/products/flax-seeds");
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Flax Seeds");
  });

  it("POST /api/v1/orders creates an order and ignores client manipulated prices", async () => {
    const res = await request(app)
      .post("/api/v1/orders")
      .send({
        customer: {
          name: "Rahul Sharma",
          phone: "9876543210",
          email: "customer@example.com",
        },
        address: {
          line1: "123 Green Avenue, Sector 5",
          city: "Indore",
          state: "Madhya Pradesh",
          pincode: "452001",
        },
        items: [
          {
            slug: "flax-seeds",
            quantity: 2,
            unitPrice: 1, // Client trying to send ₹1 price
          },
        ],
        paymentMethod: "WhatsApp",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.orderNumber).toMatch(/^PUR-\d{4}-\d{6}$/);
    // Server must compute 2 * 99 = ₹198, ignoring ₹1
    expect(res.body.data.total).toBe(198);
    expect(res.body.data.whatsappMessage).toContain(res.body.data.orderNumber);
  });

  it("GET /api/v1/orders/track tracks order by orderNumber + phone", async () => {
    // 1. Create order
    const orderRes = await request(app)
      .post("/api/v1/orders")
      .send({
        customer: {
          name: "Amit Verma",
          phone: "9123456789",
          email: "amit@example.com",
        },
        address: {
          line1: "Plot 42, Civil Lines",
          city: "Khandwa",
          state: "Madhya Pradesh",
          pincode: "450001",
        },
        items: [{ slug: "flax-seeds", quantity: 1 }],
      });

    const orderNumber = orderRes.body.data.orderNumber;

    // 2. Track with matching phone
    const trackRes = await request(app)
      .get(`/api/v1/orders/track?orderNumber=${orderNumber}&phone=9123456789`);

    expect(trackRes.status).toBe(200);
    expect(trackRes.body.data.orderNumber).toBe(orderNumber);
    expect(trackRes.body.data.status).toBe("new");
    // Verify no private customer details leaked
    expect(trackRes.body.data.customer).toBeUndefined();
  });

  it("POST /api/v1/contact saves contact message and rejects bot honeypot", async () => {
    // Legitimate submission
    const res = await request(app)
      .post("/api/v1/contact")
      .send({
        name: "Pooja Patel",
        email: "pooja@example.com",
        phone: "9876543211",
        subject: "Retail Inquiry",
        message: "Do you have wholesale packs?",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    // Bot submission with honeypot filled
    const botRes = await request(app)
      .post("/api/v1/contact")
      .send({
        name: "Bot Spammer",
        email: "bot@spam.com",
        message: "Buy cheap crypto",
        _hp: "bot_filled_value",
      });

    expect(botRes.status).toBe(400);
  });

  it("POST /api/v1/bulk-enquiry saves bulk enquiry", async () => {
    const res = await request(app)
      .post("/api/v1/bulk-enquiry")
      .send({
        name: "John Smith",
        company: "Apex Global Foods",
        country: "United Arab Emirates",
        product: "Chia Seeds",
        quantity: "5 Metric Tons",
        email: "john@apexglobal.ae",
        phone: "+971501234567",
        message: "Need CIF Jebel Ali quotation",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("POST /api/v1/newsletter/subscribe handles newsletter subscriptions", async () => {
    const res = await request(app)
      .post("/api/v1/newsletter/subscribe")
      .send({ email: "subscriber@example.com" });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("Admin routes reject unauthenticated requests with 401", async () => {
    const res = await request(app).get("/api/v1/admin/stats");
    expect(res.status).toBe(401);
  });

  it("POST /api/v1/admin/auth/login logs in admin and sets cookie", async () => {
    const res = await request(app)
      .post("/api/v1/admin/auth/login")
      .send({
        email: "admin@purelivafoods.com",
        password: "adminpassword123",
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.admin.email).toBe("admin@purelivafoods.com");

    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    adminCookie = cookies[0];
  });

  it("GET /api/v1/admin/stats returns statistics with admin cookie", async () => {
    const res = await request(app)
      .get("/api/v1/admin/stats")
      .set("Cookie", adminCookie);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalOrders).toBeGreaterThanOrEqual(1);
    expect(res.body.data.chartData).toHaveLength(7);
  });

  it("GET /api/v1/admin/orders lists orders and allows status updates", async () => {
    const listRes = await request(app)
      .get("/api/v1/admin/orders")
      .set("Cookie", adminCookie);

    expect(listRes.status).toBe(200);
    const orderId = listRes.body.data.orders[0]._id;

    // Update status
    const updateRes = await request(app)
      .patch(`/api/v1/admin/orders/${orderId}/status`)
      .set("Cookie", adminCookie)
      .send({
        status: "confirmed",
        note: "Payment verified, order ready for packing",
        notifyCustomer: false,
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.data.status).toBe("confirmed");
  });

  it("PATCH /api/v1/admin/products/:id toggles active status and updates stock", async () => {
    // Get existing product
    const prodRes = await request(app)
      .get("/api/v1/admin/products")
      .set("Cookie", adminCookie);

    expect(prodRes.status).toBe(200);
    expect(prodRes.body.data.length).toBeGreaterThan(0);
    const targetProduct = prodRes.body.data[0];

    // Patch status
    const patchRes = await request(app)
      .patch(`/api/v1/admin/products/${targetProduct._id}`)
      .set("Cookie", adminCookie)
      .send({
        isActive: !targetProduct.isActive,
        stock: 450,
      });

    expect(patchRes.status).toBe(200);
    expect(patchRes.body.success).toBe(true);
    expect(patchRes.body.data.isActive).toBe(!targetProduct.isActive);
    expect(patchRes.body.data.stock).toBe(450);
  });
});
