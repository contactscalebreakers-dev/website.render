# DATABASE + STRIPE SETUP GUIDE
**For:** Scale Breakers Website
**Date:** December 5, 2024

---

## ✅ WHAT WE JUST FIXED

1. **Products → Shop** renamed everywhere (Header, Footer, page title)
2. **Shop page** now clearly differentiated from Portfolio:
   - Shop = Green header, "available for purchase right now"
   - Portfolio = Gray header, "work by Scale Breakers" with SOLD badges
3. **Forms** = All 5 forms are correctly specialized, no changes needed

---

## 🗄️ STEP 1: DATABASE SETUP (PlanetScale - Free MySQL)

### Why PlanetScale?
- ✅ Free tier (1 database, 5GB storage, 1 billion row reads/month)
- ✅ MySQL compatible (matches your current setup)
- ✅ No credit card needed for free tier
- ✅ Auto-scaling, backups included
- ✅ Works with Drizzle ORM (already configured)

### Setup Instructions:

1. **Create Account**
   - Go to: https://planetscale.com/
   - Sign up with GitHub or email
   - No credit card required

2. **Create Database**
   - Click "New database"
   - Name: `scalebreakers-prod`
   - Region: Choose closest to Brisbane (Sydney or Singapore)
   - Click "Create database"

3. **Get Connection String**
   - Click your database name
   - Go to "Connect" tab
   - Click "Create password"
   - Name it: `production-app`
   - Select "Prisma" format (works with Drizzle)
   - Copy the connection string
   
   It will look like:
   ```
   mysql://username:password@aws.connect.psdb.cloud/scalebreakers-prod?sslaccept=strict
   ```

4. **Update Your .env File**
   ```env
   DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/scalebreakers-prod?sslaccept=strict"
   ```

5. **Push Schema to Database**
   ```bash
   npm run db:push
   ```
   
   This creates all your tables (products, workshops, bookings, etc.)

6. **Seed Initial Data**
   ```bash
   node seed.ts
   ```
   
   This populates:
   - 14 products (including lizard painting)
   - 6 workshops
   - 8 portfolio items

7. **Verify Database**
   - Go back to PlanetScale dashboard
   - Click "Console" tab
   - Run query: `SELECT * FROM products;`
   - You should see your lizard painting + other products

---

## 💳 STEP 2: STRIPE SETUP (Payment Processing)

### Why Stripe?
- ✅ Industry standard for online payments
- ✅ No monthly fees (only 2.9% + 30¢ per transaction)
- ✅ Already integrated in your codebase
- ✅ Test mode for development

### Setup Instructions:

1. **Create Stripe Account**
   - Go to: https://stripe.com/
   - Sign up with email
   - Choose "Platform or marketplace" when asked
   - Complete business verification (name, address, bank details)

2. **Get API Keys (Test Mode)**
   - Go to: https://dashboard.stripe.com/test/apikeys
   - You'll see:
     - **Publishable key** (starts with `pk_test_`)
     - **Secret key** (starts with `sk_test_`) - Click "Reveal"
   
   Copy BOTH keys

3. **Add to .env File**
   ```env
   # Stripe Keys (Test Mode)
   STRIPE_SECRET_KEY="sk_test_your_secret_key_here"
   VITE_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"
   ```

4. **Test Stripe Integration**
   - Run your app: `npm run dev`
   - Go to Shop page: `http://localhost:3000/products`
   - Click "Add to Cart" on lizard painting
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any 5-digit ZIP
   
   If payment goes through → Stripe is configured! ✅

5. **Check Stripe Dashboard**
   - Go to: https://dashboard.stripe.com/test/payments
   - You should see your test payment

6. **Switch to Live Mode (When Ready)**
   - Complete Stripe account verification
   - Go to: https://dashboard.stripe.com/apikeys (no /test)
   - Get LIVE keys (start with `pk_live_` and `sk_live_`)
   - Update .env with live keys
   - Deploy to production

---

## 📧 STEP 3: EMAIL CONFIGURATION (Contact Forms)

### Option A: Gmail SMTP (Free, Easiest)

1. **Enable 2-Factor Authentication**
   - Go to: https://myaccount.google.com/security
   - Turn on "2-Step Verification"

2. **Create App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other" → Type "Scale Breakers Site"
   - Click "Generate"
   - Copy the 16-character password (no spaces)

3. **Add to .env**
   ```env
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER="contact.scalebreakers@gmail.com"
   SMTP_PASS="your-16-char-app-password"
   ```

4. **Update Server Email Config**
   File: `server/email/config.ts` (or wherever nodemailer is configured)
   
   ```typescript
   const transporter = nodemailer.createTransporter({
     host: process.env.SMTP_HOST,
     port: parseInt(process.env.SMTP_PORT || "587"),
     secure: process.env.SMTP_SECURE === "true",
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS,
     },
   });
   ```

5. **Test Forms**
   - Fill out contact form
   - Check `contact.scalebreakers@gmail.com` inbox
   - Should receive email with form submission

### Option B: SendGrid (Recommended for Production)

- More reliable delivery
- Better spam filtering
- Free tier: 100 emails/day
- Setup: https://sendgrid.com/

---

## 🖼️ STEP 4: IMAGE UPLOAD SETUP

### Current State:
Your codebase uses AWS S3 for image uploads (AdminProducts page)

### Option A: Keep AWS S3

1. **Create AWS Account**
   - Go to: https://aws.amazon.com/
   - Free tier: 5GB storage, 20,000 GET requests/month

2. **Create S3 Bucket**
   - Go to S3 Console
   - Click "Create bucket"
   - Name: `scalebreakers-images`
   - Region: ap-southeast-2 (Sydney)
   - Uncheck "Block all public access"
   - Create bucket

3. **Create IAM User**
   - Go to IAM Console
   - Create user: `scalebreakers-app`
   - Attach policy: `AmazonS3FullAccess`
   - Create access key
   - Copy Access Key ID and Secret Access Key

4. **Add to .env**
   ```env
   AWS_ACCESS_KEY_ID="your_access_key"
   AWS_SECRET_ACCESS_KEY="your_secret_key"
   AWS_REGION="ap-southeast-2"
   AWS_BUCKET_NAME="scalebreakers-images"
   ```

### Option B: Cloudinary (Easier, Free Tier)

1. **Create Account**
   - Go to: https://cloudinary.com/
   - Free tier: 25GB storage, 25GB bandwidth/month

2. **Get Credentials**
   - Dashboard shows:
     - Cloud name
     - API Key  
     - API Secret

3. **Add to .env**
   ```env
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   ```

4. **Update Code**
   - Replace S3 upload code with Cloudinary SDK
   - Much simpler API
   - Auto image optimization

**Recommendation:** Use Cloudinary - simpler, free tier is generous, auto-optimizes images

---

## 🚀 COMPLETE .ENV TEMPLATE

Create this file: `.env` (copy from .env.example and fill in)

```env
# ===== DATABASE =====
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/scalebreakers-prod?sslaccept=strict"

# ===== STRIPE (Test Mode - switch to live_ keys for production) =====
STRIPE_SECRET_KEY="sk_test_your_secret_key_here"
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"

# ===== EMAIL (Gmail SMTP) =====
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER="contact.scalebreakers@gmail.com"
SMTP_PASS="your-16-char-app-password"

# ===== IMAGE UPLOADS (Choose one) =====
# Option A: AWS S3
AWS_ACCESS_KEY_ID="your_access_key"
AWS_SECRET_ACCESS_KEY="your_secret_key"
AWS_REGION="ap-southeast-2"
AWS_BUCKET_NAME="scalebreakers-images"

# Option B: Cloudinary (recommended)
# CLOUDINARY_CLOUD_NAME="your_cloud_name"
# CLOUDINARY_API_KEY="your_api_key"
# CLOUDINARY_API_SECRET="your_api_secret"

# ===== JWT SECRET (generate random 32-char string) =====
JWT_SECRET="generate-a-random-32-character-string-here"

# ===== APP CONFIG =====
PORT=3000
NODE_ENV=development
VITE_APP_TITLE="Scale Breakers"
```

---

## 🧪 TESTING CHECKLIST

After setting up database + Stripe + email:

### Database Tests:
- [ ] Run `npm run db:push` - no errors
- [ ] Run `node seed.ts` - see "Seeded X items" messages
- [ ] Check PlanetScale console - tables exist with data
- [ ] Visit Shop page - lizard painting shows up
- [ ] Visit Portfolio - sold items show up

### Stripe Tests:
- [ ] Visit Shop page
- [ ] Click "Add to Cart" on lizard painting
- [ ] Use test card: 4242 4242 4242 4242
- [ ] Payment succeeds
- [ ] Check Stripe dashboard - payment appears

### Email Tests:
- [ ] Fill out Contact form
- [ ] Check inbox - email received
- [ ] Fill out Mural service form
- [ ] Check inbox - email received with mural details
- [ ] Repeat for all 5 forms

### Image Upload Tests (if needed):
- [ ] Go to `/admin/products`
- [ ] Upload image for new product
- [ ] Image saves successfully
- [ ] Image displays on Shop page

---

## ⚠️ COMMON ISSUES & FIXES

### "Error connecting to database"
- Check DATABASE_URL is correct
- Check PlanetScale connection hasn't expired
- Check SSL settings in connection string
- Try adding `?ssl={"rejectUnauthorized":true}` to URL

### "Stripe publishable key not found"
- Make sure VITE_ prefix is on publishable key
- Restart dev server after adding .env variables
- Check .env file is in project root

### "Forms not sending emails"
- Check Gmail app password has no spaces
- Check 2FA is enabled on Gmail account
- Check SMTP credentials in .env
- Check server console for nodemailer errors

### "Images not uploading"
- Check S3/Cloudinary credentials
- Check bucket/cloud name is correct
- Check IAM permissions for S3
- Check file size limits

---

## 📝 NEXT STEPS AFTER SETUP

1. **Test everything locally** following checklist above
2. **Fix any voice consistency** issues (I/me → Scale Breakers)
3. **Delete unused files** (About.tsx, HireMe.tsx, etc.)
4. **Deploy to Render.com** following deployment guide
5. **Switch Stripe to live mode** when ready for real sales
6. **Add real portfolio images** to replace placeholders
7. **Monitor first week** for any errors or issues

---

## 🆘 NEED HELP?

If you hit any issues:

1. **Check the error message** - Usually tells you what's wrong
2. **Check .env file** - Most issues are incorrect credentials
3. **Check server logs** - `npm run dev` shows errors in terminal
4. **Test one service at a time** - Don't set up everything at once
5. **Use test modes** - Stripe test mode, PlanetScale test database

**Priority Order:**
1. Database first (can't do anything without data)
2. Email second (forms are critical for leads)
3. Stripe third (only if selling lizard painting now)
4. Images last (can use placeholders temporarily)

---

END OF SETUP GUIDE
