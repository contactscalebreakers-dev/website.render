# Scale Breakers Website - Admin & Developer Guide

## 🚨 CRITICAL SETUP (Do this first!)

To prevent having to redo this setup again, follow these steps exactly.

### 1. Environment Secrets (`.env`)
Create a file named `.env` in the root folder (where this file is). Copy and paste the following content. **You must fill in the KEYS** using your real values from Supabase and Stripe.

```env
# DATABASE (Get this from your Supabase Project Settings -> Database -> Connection String -> URI)
# Format: postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-ID].supabase.co:5432/postgres
DATABASE_URL=

# STRIPE PAYMENTS (Get these from Stripe Dashboard -> Developers -> API Keys)
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# ADMIN ACCESS
# This is the password you will use to log in to /admin/login
ADMIN_PASSWORD=mysecurepassword

# APP SETTINGS
NODE_ENV=development
VITE_APP_TITLE="Scale Breakers"
```

### 2. Database Seeding (Fixes "Empty Pages")
If your Workshop or Product pages are empty, run this command in your terminal:
```bash
npm run seed:prod
```
This populates the database with the initial workshops, products, and portfolio items.

### 3. Start the Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 👑 ADMIN DASHBOARD GUIDE

This website has a built-in admin panel to manage content without touching code.

**Login URL:** `/admin/login` (e.g., http://localhost:3000/admin/login)
**Password:** The one you set in `.env` (default is `mysecurepassword` if you copied above).

### 🛍️ Managing Products (Shop)
1.  Click **"Products"** on the dashboard.
2.  **Add Product**: Click the "Add Product" button.
    *   **Image URL**: Use a path like `/portfolio-character.webp` or an external URL.
    *   **Category**: Choose "3d-model", "canvas", etc.
    *   **Price**: Enter the number (e.g., `350`).
3.  **Edit/Delete**: Use the icons next to each item in the list.

### 📅 Managing Workshops
1.  Click **"Workshops"** on the dashboard.
2.  **Add Workshop**:
    *   **Date**: Select from the calendar.
    *   **Capacity**: Standard is `23`.
    *   **Location**: Default is "B.Y.O. - 2-4 Edmundstone Street".
3.  **Note**: Adding a workshop here automatically makes it available for booking.

### 🎨 Managing Portfolio
1.  Click **"Portfolio"** on the dashboard.
2.  Add items here to show them on the `/portfolio` page.
3.  **Categories**: "murals", "3d-models", etc.

### 📝 Viewing Bookings
1.  Click **"Bookings"** on the dashboard.
2.  See who has paid and signed up for workshops.
3.  Filter by **Confirmed** (paid) or **Pending**.

---

## 🛠️ TROUBLESHOOTING

*   **"Database connection error"**: Check your `DATABASE_URL` in `.env`. Ensure your password has no special characters that break the URL (or encode them).
*   **"Stripe checkout fails"**: Check your `STRIPE_SECRET_KEY` in `.env`.
*   **"Changes aren't showing"**: Refresh the page. If running locally, check the terminal for errors.
*   **"GitHub rejected verify"**: Ensure `.env` is listed in your `.gitignore` file.

## 📦 DEPLOYMENT

When ready to go live (e.g. on Render or Vercel):
1.  Add all the Environment Variables from your `.env` to the hosting provider's "Environment Variables" section.
2.  Run the build command: `npm run build`.
3.  Start command: `npm run start`.


## Supabase Admin OAuth (Render)

Set these environment variables on Render:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- VITE_ADMIN_EMAIL_ALLOWLIST (comma-separated emails allowed to access admin)
- ADMIN_EMAIL_ALLOWLIST (same list for server-side checks)
- VITE_ADMIN_OAUTH_PROVIDER (default: google)

In Supabase Auth settings, add Redirect URLs:
- https://YOUR-RENDER-DOMAIN/admin/dashboard
- http://localhost:5173/admin/dashboard
