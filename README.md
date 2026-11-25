# Pureliva Foods — Full Stack E-Commerce & B2B Portal

Production web application and REST API for **Pureliva Foods by Patidar Enterprises** (Khandwa, Madhya Pradesh).

Natural seed varieties: Flax Seeds, Seed Mix, Chia Seeds, Sunflower Seeds, and Pumpkin Seeds.

---

## 1. Architecture Overview

- **Frontend (`/`)**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Lenis Smooth Scroll, Lucide Icons. Deployed on **Vercel**.
- **Admin Panel (`/admin`)**: Integrated admin portal inside the React SPA featuring lazy-loaded dashboards, order fulfillment drawer, product CRUD with price/stock control, B2B lead management, CSV export, and password security.
- **Backend (`backend/`)**: Node.js 20, Express, TypeScript, Mongoose (MongoDB Atlas), Resend (primary) + Hostinger SMTP (fallback) email pipeline, Zod validation, Rate Limiting, HTTP-only secure cookie authentication. Deployed on **Render**.

---

## 2. Quick Start Guide

### Step 1: Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Configure Environment Variables

1. **Frontend**: Create `.env` from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Contains:
   ```
   VITE_API_URL=http://localhost:5000/api/v1
   ```

2. **Backend**: Create `backend/.env` from `backend/.env.example`:
   ```bash
   cp backend/.env.example backend/.env
   ```
   Fill in your MongoDB Atlas URI, JWT Secret (min 48 characters), Resend API Key, and Admin credentials.

### Step 3: Run Database Seeds
```bash
cd backend
# 1. Create the default administrator account
npm run seed:admin

# 2. Import the 5 seed products with initial pricing & stock
npm run seed:products
cd ..
```

### Step 4: Run Development Servers
Open two terminal windows:

- **Terminal 1 (Backend)**:
  ```bash
  cd backend
  npm run dev
  ```
  Runs on `http://localhost:5000` (Health: `http://localhost:5000/api/v1/health`)

- **Terminal 2 (Frontend)**:
  ```bash
  npm run dev
  ```
  Runs on `http://localhost:5173`

---

## 3. Product Catalog & Offline Resilience

- Products are fetched dynamically from the MongoDB API (`GET /api/v1/products`) with in-memory caching.
- **Fail-safe fallback**: If the backend is offline or slow, the frontend automatically falls back silently to static data in `src/data/products.ts`. The public customer-facing website **never breaks** or shows empty pages.
- Prices can be customized dynamically anytime directly from the **Admin Panel** (`/admin/products`).

---

## 4. Admin Portal User Guide (`/admin`)

The admin portal is private and excluded from search engines (`noindex`):

1. Navigate to `http://localhost:5173/admin` (or `https://purelivafoods.com/admin`).
2. Log in using your `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
3. **Dashboard (`/admin`)**:
   - Executive KPI cards: Total orders, today's order count, total revenue, pending orders, new enquiries.
   - Interactive 7-day order trend chart.
   - Fulfillment status breakdown.
4. **Orders Management (`/admin/orders`)**:
   - Search by order number, customer name, mobile phone, or city.
   - Filter by status: `new`, `confirmed`, `packed`, `shipped`, `delivered`, `cancelled`.
   - Click the eye icon on any order to open the **Order Detail Drawer**: view items, address, one-click WhatsApp button, and update fulfillment status with optional customer notification emails.
   - Export all filtered orders to CSV in one click.
5. **Products Management (`/admin/products`)**:
   - Update selling price (₹), MRP (₹), and inventory stock quantities.
   - Toggle product visibility (`Active` / `Hidden`).
   - Create new products or edit existing ones.
6. **Bulk Enquiries (`/admin/enquiries`)**:
   - Review B2B wholesale and export leads submitted via `/bulk-export`.
   - Update lead stages: `new` → `contacted` → `quoted` → `closed`.
   - Direct WhatsApp and Email links to each business prospect.
7. **Contact Messages (`/admin/messages`)**:
   - Customer feedback and support queries from `/contact`.
8. **Subscribers (`/admin/subscribers`)**:
   - List of opt-in newsletter subscribers with CSV export.
9. **Settings (`/admin/settings`)**:
   - Update admin login password.
   - Real-time API and database connectivity diagnostics.

---

## 5. Deployment Guide

### Backend on Render
1. Create a Web Service connected to your repository with root directory `backend`.
2. Render uses `backend/render.yaml` automatically:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/server.js`
   - **Health Check Path**: `/api/v1/health`
3. Add environment variables in Render Dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL` & `ADMIN_PASSWORD`
   - `CLIENT_URLS=https://purelivafoods.com,https://www.purelivafoods.com`
   - `RESEND_API_KEY` & `ADMIN_NOTIFY_EMAIL`
   - `SMTP_USER` & `SMTP_PASS`
4. **Atlas Network Access**: Allow `0.0.0.0/0` in MongoDB Atlas Network Access.
5. **Uptime Ping**: Set up a free monitor on UptimeRobot or Cron-Job pinging `/api/v1/health` every 5–10 minutes to prevent cold starts on Render's free tier.

### Frontend on Vercel
1. Set the Environment Variable in Vercel:
   ```
   VITE_API_URL=https://<your-render-service>.onrender.com/api/v1
   ```
2. Redeploy. All routing rewrites are already handled by `vercel.json`.

---

## 6. Verification & Testing

- **Backend Test Suite**:
  ```bash
  cd backend
  npm test
  ```
  Runs 13 end-to-end integration tests using Vitest + Supertest + in-memory database.
- **Frontend Typecheck & Build**:
  ```bash
  npm run build
  ```
  Compiles TypeScript and bundles production chunks with zero errors.
- **Postman Collection**:
  Import `backend/postman/pureliva.postman_collection.json` and `backend/postman/pureliva.postman_environment.json` for ready-to-test API requests.
