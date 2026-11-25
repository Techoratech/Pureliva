# Pureliva Foods — Production Backend API

High-performance, secure REST API engine built for **Pureliva Foods by Patidar Enterprises** (Khandwa, Madhya Pradesh).

---

## 1. Tech Stack Overview

- **Runtime & Framework**: Node.js 20, Express, TypeScript (strict mode)
- **Database**: MongoDB Atlas with Mongoose ODM (Atomic Counter sequencing, indexed queries)
- **Validation**: Strict schema validation with `Zod` on bodies, queries, and route params
- **Authentication**: JWT token embedded in an `httpOnly`, `secure`, `SameSite=None` cookie with `bcryptjs` password hashing
- **Security Middleware**: `helmet`, `cors` origin-allowlisting, `express-rate-limit`, `express-mongo-sanitize`, `hpp`, `cookie-parser`, `compression`, `morgan`
- **Email Service**: Dual delivery system — **Resend** (primary, `info@purelivafoods.com`) with automated failover to **Hostinger SMTP** (`smtp.hostinger.com`)
- **Automated Tests**: Unit & integration tests with `vitest` + `supertest` + `mongodb-memory-server`

---

## 2. Directory Structure

```
backend/
├── src/
│   ├── config/             # Environment validation, MongoDB connection, CORS allow-lists
│   ├── models/             # Mongoose Models (Admin, Product, Order, Counter, ContactMessage, BulkEnquiry, Subscriber)
│   ├── controllers/        # Request handlers (auth, orders, products, enquiries, stats)
│   ├── routes/             # REST route registrations (/api/v1 prefix)
│   ├── middleware/         # Security guards (auth, rate limits, zod validator, error, notFound)
│   ├── services/           # Mailer service (Resend + Hostinger), Order processing, Token management
│   ├── emails/             # Mobile-responsive HTML email templates (Brand Green #1B4332)
│   ├── validators/         # Zod schemas with Indian phone/pincode & bot honeypot checks
│   ├── scripts/            # Database seed scripts (seed-admin.ts, seed-products.ts)
│   ├── utils/              # ApiError class, async controller wrapper, logger
│   ├── app.ts              # Express application factory & security middleware pipeline
│   └── server.ts           # Database connection & HTTP server lifecycle
├── tests/                  # Integration test suite (Vitest + Supertest)
├── postman/                # Postman Collection & Environment JSON
├── render.yaml             # Render infrastructure-as-code specification
└── tsconfig.json
```

---

## 3. Environment Variables Reference

Create a file named `.env` in the `backend/` directory using `backend/.env.example` as a template:

```bash
NODE_ENV=development
PORT=5000
CLIENT_URLS=http://localhost:5173,https://purelivafoods.com,https://www.purelivafoods.com

# MongoDB Atlas
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/pureliva?retryWrites=true&w=majority

# Auth (Generate a random 48+ char string)
JWT_SECRET=your_super_secret_jwt_key_at_least_48_characters_long_for_security
JWT_EXPIRES_IN=7d
COOKIE_DOMAIN=

# Seed admin (used by `npm run seed:admin`)
ADMIN_EMAIL=admin@purelivafoods.com
ADMIN_PASSWORD=change_this_secure_password_123

# Email Delivery - Resend (Primary)
RESEND_API_KEY=re_123456789
MAIL_FROM="Pureliva Foods <info@purelivafoods.com>"
ADMIN_NOTIFY_EMAIL=info@purelivafoods.com

# Email Delivery - Hostinger SMTP (Automatic Fallback)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@purelivafoods.com
SMTP_PASS=your_hostinger_smtp_password
```

---

## 4. Setup & Running Locally

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Seed the Database
Ensure your `MONGO_URI` is set in `backend/.env`:
```bash
# Seed initial admin user from ADMIN_EMAIL / ADMIN_PASSWORD
npm run seed:admin

# Seed 5 product catalog items (Flax Seeds, Seed Mix, Chia Seeds, Sunflower, Pumpkin)
npm run seed:products
```

### Step 3: Run in Development Mode
```bash
npm run dev
```
API will start on `http://localhost:5000`. Health check available at `http://localhost:5000/api/v1/health`.

### Step 4: Run Tests
```bash
npm test
```

### Step 5: Build for Production
```bash
npm run build
npm start
```

---

## 5. API Endpoints Map (`/api/v1`)

### Public Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health and uptime status |
| `GET` | `/products` | List all active seed products (sorted by display order) |
| `GET` | `/products/:slug` | Retrieve single product details by slug |
| `POST` | `/orders` | Submit order (recomputes DB prices, decrements stock, sends emails) |
| `GET` | `/orders/track` | Public non-sensitive tracking (`?orderNumber=...&phone=...`) |
| `POST` | `/contact` | Submit contact inquiry (honeypot + min-submit time spam check) |
| `POST` | `/bulk-enquiry` | Submit B2B wholesale / export inquiry |
| `POST` | `/newsletter/subscribe` | Register newsletter email |

### Admin Endpoints (Require Auth Cookie or Bearer Token)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/admin/auth/login` | Sign in (5 attempts / 15m rate limit, sets httpOnly cookie) |
| `POST` | `/admin/auth/logout` | Clears auth cookie |
| `GET` | `/admin/auth/me` | Current admin profile |
| `PATCH`| `/admin/auth/change-password` | Update admin password |
| `GET` | `/admin/stats` | Executive KPI stats + 7-day volume chart |
| `GET` | `/admin/orders` | Paginated orders with search & status filters (`?export=csv`) |
| `PATCH`| `/admin/orders/:id/status`| Update status ("confirmed", "packed", "shipped", etc.) |
| `GET` | `/admin/products` | All products including inventory and pricing |
| `POST` | `/admin/products` | Create product |
| `PUT` | `/admin/products/:id` | Full product edit |
| `PATCH`| `/admin/products/:id` | Quick price, MRP, stock, or active state toggle |
| `DELETE`| `/admin/products/:id` | Delete product |
| `GET` | `/admin/contact-messages` | Review contact messages |
| `GET` | `/admin/bulk-enquiries` | Review B2B bulk export leads |
| `GET` | `/admin/subscribers` | List opt-in subscribers (`?export=csv`) |

---

## 6. Deployment Guide

### A. Deploy Backend to Render

1. Log in to your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Blueprint** (or **Web Service** if connecting manually).
3. Connect your repository. Render detects `render.yaml`:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/server.js`
   - **Health Check Path**: `/api/v1/health`
4. In the Render Environment tab, add your secret values:
   - `MONGO_URI`
   - `JWT_SECRET` (Render can auto-generate or use random 48+ chars)
   - `ADMIN_EMAIL` & `ADMIN_PASSWORD`
   - `RESEND_API_KEY`
   - `ADMIN_NOTIFY_EMAIL`
   - `SMTP_USER` & `SMTP_PASS`
   - `CLIENT_URLS`: `https://purelivafoods.com,https://www.purelivafoods.com`

> [!IMPORTANT]
> **MongoDB Atlas Network Access**: Render web services run on dynamic IPs without a fixed static IP on the standard plan. In MongoDB Atlas, go to **Network Access** → **Add IP Address** → Select **Allow Access from Anywhere (`0.0.0.0/0`)**. Atlas enforces authentication via your database username & password.

> [!TIP]
> **Uptime Monitor**: The Render free instance will sleep after 15 minutes of inactivity. Set up a free 5-minute ping on [UptimeRobot](https://uptimerobot.com) targeting `https://<your-render-url>/api/v1/health` to keep it warm and responsive.

### B. Deploy Frontend to Vercel

1. In the Vercel Dashboard, go to your Pureliva project settings → **Environment Variables**.
2. Add:
   ```
   VITE_API_URL=https://<your-render-backend-url>/api/v1
   ```
3. Trigger a redeploy.
4. **Cookie & Subdomain Note**: In production, cookies are configured with `SameSite=None; Secure=True`, which works seamlessly across domains (e.g., from `purelivafoods.com` to `*.onrender.com`). For best practice and branding, you can also map a CNAME record like `api.purelivafoods.com` to Render.

### C. Verify Resend Domain for 100% Deliverability

To ensure customer invoices and notifications arrive directly in the inbox without spam flags:
1. Log in to [Resend](https://resend.com) → **Domains** → **Add Domain** (`purelivafoods.com`).
2. Add the generated DNS records into your DNS manager (Hostinger / Cloudflare):
   - **DKIM** (TXT / CNAME)
   - **SPF** (TXT)
   - **MX / DMARC**
3. Once verified, all automated emails will be dispatched from `Pureliva Foods <info@purelivafoods.com>`. If Resend encounters any quota or connectivity issue, the server automatically fails over to Hostinger SMTP.
