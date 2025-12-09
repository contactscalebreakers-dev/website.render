# SCALE BREAKERS WEBSITE - COMPREHENSIVE AUDIT & DEPLOYMENT GUIDE
**Generated:** December 5, 2024
**Site:** www.scalebreakers.space
**Stack:** React 19, Express, tRPC, MySQL, Stripe

---

## ✅ FIXES COMPLETED TODAY

1. ✅ Workshops.tsx - Added missing Link import (prevented runtime error)
2. ✅ Services3DScanning.tsx - Removed duplicate Header component
3. ✅ Services3DModelling.tsx - Removed duplicate Header component  
4. ✅ Services3DScanning.tsx - Removed duplicate Footer (standalone footer section)
5. ✅ Services3DModelling.tsx - Removed duplicate Footer (standalone footer section)
6. ✅ Services.tsx - Added 3rd card for 3D Modelling service (was missing link from Services landing)
7. ✅ Services3DModelling.tsx - Added pricing tiers ($500-1k, $1-3k, $3k+)
8. ✅ Portfolio.tsx - Completely rewritten as clean 3-section showcase (removed service pitches, CTAs, "Digital Services" section)
9. ✅ Portfolio.tsx - Integrated database products with SOLD badges and 1/1 markers
10. ✅ Portfolio.tsx - Hidden all 18 placeholder image grids
11. ✅ App.tsx - Removed HireMe route completely
12. ✅ Footer.tsx - Updated links (removed /hire-me, added proper service links)

---

## 🚨 CRITICAL ISSUES - MUST FIX BEFORE DEPLOYMENT

### 1. VOICE CONSISTENCY - MIXED BRANDING
**Problem:** Site switches between "I/me" (personal) and "Scale Breakers/we" (business)

**Current state:**
- ✅ Home: "Scale Breakers offers..." (business voice)
- ✅ Portfolio: "Work by Scale Breakers" (business voice)
- ⚠️ Services pages: Mixed voices
- ⚠️ Contact: Needs consistency check

**Action Required:** Standardize to "Scale Breakers" throughout (business brand voice)

### 2. DATABASE CONNECTION - NOT CONFIGURED
**Problem:** MySQL connection string still has placeholder values

**Current .env.example:**
```
DATABASE_URL=mysql://example-user:example-password@localhost:3306/main
```

**Action Required:**
1. Create MySQL database (see deployment section)
2. Update DATABASE_URL in .env with real credentials
3. Run `npm run db:push` to create tables
4. Run seed.ts to populate initial data

### 3. PRODUCTS PAGE - NOW REDUNDANT
**Problem:** Products page still exists and routed, but all products moved to Portfolio

**Current state:**
- /products route still active in App.tsx
- Products.tsx still has full shopping cart UI
- Footer links to /products
- Navigation may link to /products

**Options:**
A) **Remove completely** (recommended) - Delete route, update all links to /portfolio
B) **Redirect to Portfolio** - Change route to redirect
C) **Repurpose** - Make it a "Shop" page for future sales with "Coming Soon" message

**Recommended:** Option A - Remove completely since all past work is in Portfolio

---

## ⚠️ HIGH-PRIORITY ISSUES

### 4. STRIPE INTEGRATION - NOT CONFIGURED
**Files affected:** Products.tsx, AdminProducts.tsx
**Problem:** Stripe keys not in .env, cart functionality won't work

**Action Required:**
1. Get Stripe API keys from dashboard
2. Add to .env:
```
STRIPE_SECRET_KEY=sk_test_xxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```
3. Test checkout flow or remove cart buttons if not selling yet

### 5. EMAIL SERVICE - NOT CONFIGURED  
**Files affected:** Contact.tsx, ServicesMurals.tsx, Services3DScanning.tsx, Services3DModelling.tsx
**Problem:** All contact forms use nodemailer but no email credentials configured

**Current forms:**
- Contact page - Generic contact
- ServicesMurals - Mural commission requests
- Services3DScanning - 3D scan requests
- Services3DModelling - 3D model requests
- Workshops - NDIS booking form

**Action Required:**
1. Configure SMTP in server/email configuration
2. OR integrate with email service (SendGrid, Mailgun, etc.)
3. Test all 5 forms

### 6. IMAGE UPLOADS - S3 NOT CONFIGURED
**Problem:** AWS S3 credentials in .env.example but not set up

**Action Required:**
1. Either set up AWS S3 bucket
2. OR switch to free alternative (Cloudinary, Vercel Blob)
3. Test product image uploads in admin

---

## 🧹 FILES TO DELETE (UNUSED/DEAD CODE)

### Pages (client/src/pages/)
- ❌ **About.tsx** - Not routed, /about redirects to Portfolio
- ❌ **HireMe.tsx** - Route removed, redundant with Services
- ❌ **ComponentShowcase.tsx** - Development tool only

### Root Level
- ❌ **REFACTORING_TODO.md** - Development notes
- ❌ **todo.md** - Development notes
- ❌ **.gitkeep** - Empty placeholder file

**Action:** Delete these 6 files before deployment

---

## 📊 CONTENT ISSUES

### 7. Portfolio Placeholders
**Status:** Hidden in comments (good interim solution)
**Sections affected:**
- Street Art & Murals (6 placeholders)
- Workshop Highlights (8 placeholders)

**Options:**
A) Leave hidden until real images available
B) Remove placeholder divs entirely
C) Add 2-3 real images per section

**Recommended:** Option A - Leave as-is until images ready

### 8. Workshop Dates Missing
**File:** Workshops.tsx
**Problem:** Cards show duration, capacity, price but no actual dates

**Current:** "8 weeks" but no "Next Session: Jan 15"
**Impact:** Users can't plan attendance

**Solutions:**
- Add date fields to database schema
- Show "Next Session: [date]" on cards
- OR add simple "Contact for next session date" text

### 9. Voice/Tone Inconsistencies (Beyond brand name)
**Files to review:**
- Services3DScanning.tsx - Check for "I/me"
- Services3DModelling.tsx - Check for "I/me"  
- ServicesMurals.tsx - Check for "I/me"

---

## 🚀 DEPLOYMENT GUIDE - FREE HOSTING

### WHY RAILWAY FAILED LAST TIME
Railway.app issues:
- Requires credit card even for free tier
- MySQL costs money on Railway
- $5/month minimum for production apps
- Complex pricing that adds up

### RECOMMENDED: RENDER.COM (100% FREE)

**Why Render:**
✅ Truly free tier (no credit card)
✅ Free PostgreSQL database (or use MySQL via PlanetScale)
✅ Auto-deploys from GitHub
✅ Custom domain support (free SSL)
✅ 750 hours/month free (enough for 24/7 uptime)

---

## 📋 STEP-BY-STEP DEPLOYMENT TO RENDER.COM

### STEP 1: Prepare Database
**Option A: PlanetScale (MySQL - Recommended)**
1. Go to planetscale.com
2. Sign up free
3. Create database "scalebreakers"
4. Get connection string
5. Update DATABASE_URL in .env

**Option B: Render PostgreSQL (Free, but requires schema changes)**
1. Render auto-provides free PostgreSQL
2. Need to convert Drizzle schema from MySQL to PostgreSQL
3. More work but completely free

**Recommended:** Use PlanetScale for MySQL (stays free, matches current setup)

### STEP 2: Prepare Code for Deployment
1. **Update .env.example** with all required vars:
```env
# Database
DATABASE_URL=mysql://user:pass@host:3306/scalebreakers

# Stripe (if using)
STRIPE_SECRET_KEY=sk_live_xxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact.scalebreakers@gmail.com
SMTP_PASS=your-app-password

# JWT
JWT_SECRET=generate-random-32-char-string

# App
PORT=3000
NODE_ENV=production
```

2. **Add build script check** to package.json:
```json
"scripts": {
  "build": "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "NODE_ENV=production node dist/index.js"
}
```

3. **Create render.yaml** in root:
```yaml
services:
  - type: web
    name: scalebreakers
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm run start
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET  
        generateValue: true
      - key: NODE_ENV
        value: production
```

### STEP 3: Deploy to Render
1. Push code to GitHub repository
2. Go to render.com/dashboard
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Render auto-detects Node.js
6. Add environment variables from .env
7. Click "Create Web Service"
8. Wait 3-5 minutes for first deploy

### STEP 4: Connect Custom Domain (www.scalebreakers.space)
1. In Render dashboard, click your service
2. Go to "Settings" tab
3. Scroll to "Custom Domains"
4. Click "Add Custom Domain"
5. Enter: `www.scalebreakers.space`
6. Render provides DNS records to add
7. Go to your domain registrar (where you bought scalebreakers.space)
8. Add these DNS records:
```
Type: CNAME
Name: www
Value: [your-app].onrender.com
```
9. Wait 10-60 minutes for DNS propagation
10. Render auto-provisions free SSL certificate

### STEP 5: Database Setup
After first deploy:
```bash
# SSH into Render container (via Render Shell)
npm run db:push  # Creates tables
node seed.ts     # Seeds initial data
```

---

## 🔧 ALTERNATIVE: VERCEL + PLANETSCALE (ALSO FREE)

**Pros:**
- Even easier than Render
- Faster deployments
- Better developer experience

**Cons:**
- Serverless functions (need to restructure Express API)
- More complex for full-stack apps

**Setup:**
1. Convert Express routes to Vercel serverless functions
2. Deploy frontend to Vercel (free)
3. Database on PlanetScale (free)
4. Custom domain via Vercel settings

**Recommended for Scale Breakers:** Stick with Render - simpler for full-stack Express apps

---

## 📝 PRE-DEPLOYMENT CHECKLIST

### Code Cleanup
- [ ] Delete About.tsx, HireMe.tsx, ComponentShowcase.tsx
- [ ] Delete REFACTORING_TODO.md, todo.md, .gitkeep
- [ ] Remove /products route OR repurpose page
- [ ] Standardize all voice to "Scale Breakers"
- [ ] Test all forms locally

### Configuration
- [ ] Set up MySQL database (PlanetScale recommended)
- [ ] Add all environment variables to .env
- [ ] Configure email service (SMTP or SendGrid)
- [ ] Set up Stripe OR remove cart buttons
- [ ] Set up S3 OR switch to Cloudinary/Vercel Blob

### Testing
- [ ] Test locally: `npm run dev`
- [ ] Test build: `npm run build && npm run start`
- [ ] Test all navigation links
- [ ] Test all 5 contact forms
- [ ] Test workshop booking flow
- [ ] Test admin pages (if using)

### Deployment
- [ ] Push clean code to GitHub
- [ ] Deploy to Render.com
- [ ] Run database migrations
- [ ] Seed initial data
- [ ] Connect www.scalebreakers.space domain
- [ ] Test live site thoroughly
- [ ] Monitor error logs first 24 hours

---

## 🎯 RECOMMENDED PRIORITY ORDER

**Day 1 (Critical - 2 hours):**
1. Delete unused files (5 min)
2. Fix voice consistency to "Scale Breakers" (30 min)
3. Set up PlanetScale MySQL database (15 min)
4. Configure environment variables (20 min)
5. Decide on /products route (remove or redirect) (10 min)
6. Test locally end-to-end (40 min)

**Day 2 (Deploy - 1 hour):**
1. Push to GitHub (5 min)
2. Deploy to Render.com (10 min)
3. Connect domain DNS (15 min)
4. Run database setup (10 min)
5. Final testing (20 min)

**Day 3 (Polish - Optional):**
1. Add real portfolio images
2. Set up Stripe if selling products
3. Configure email properly
4. Add workshop dates

---

## 🆘 TROUBLESHOOTING

### "Cannot connect to database"
- Check DATABASE_URL format
- Ensure PlanetScale connection is allowed from Render IP
- Check SSL settings in connection string

### "Forms not sending"
- Check SMTP credentials
- Check nodemailer configuration in server
- Test with console.log to see if form data arrives

### "Build fails on Render"
- Check build logs in Render dashboard
- Ensure all dependencies in package.json
- Check Node version compatibility

### "Domain not connecting"
- Wait longer (DNS can take 1-2 hours)
- Check DNS records match Render's exactly
- Try without www first (scalebreakers.space)
- Clear browser cache

### "Site loads but no data"
- Check if database migrations ran
- Check if seed script executed
- Check database connection in logs
- Verify DATABASE_URL in Render environment variables

---

## 📞 NEXT STEPS

1. **Review this audit document thoroughly**
2. **Make decisions** on:
   - Keep or remove /products route
   - When to add real portfolio images  
   - Use Stripe or remove cart functionality
3. **Follow Day 1 checklist** above
4. **Deploy following the Render.com guide**
5. **Test live site** and monitor for issues

**Questions?** Re-read the relevant section above or ask for clarification on specific issues.

**Ready to deploy?** Start with Day 1 checklist and work through systematically.

---

## 📊 SITE STRUCTURE SUMMARY

**Current Routes:**
- / → Home
- /workshops → Workshops (with NDIS booking)
- /products → Products (⚠️ REDUNDANT - recommend removing)
- /portfolio → Portfolio (clean showcase + database products)
- /about → Portfolio (redirect)
- /contact → Contact
- /services → Services (landing with 3 cards)
- /services/murals → ServicesMurals (with pricing, form)
- /services/3d-scanning → Services3DScanning (with form)
- /services/3d-modelling → Services3DModelling (with pricing, form)
- /admin/products → AdminProducts (product management)
- /admin/bookings → AdminBookings (workshop bookings)

**Database Tables:**
- products (14 items)
- workshops (6 items)
- portfolio_items (8 items)
- bookings
- users/sessions (if auth enabled)

**External Services Needed:**
- MySQL database (PlanetScale free)
- Email service (SMTP or SendGrid)
- File storage (S3 or Cloudinary)
- Stripe (optional, if selling)
- Domain DNS (pointing to Render)

---

END OF AUDIT REPORT