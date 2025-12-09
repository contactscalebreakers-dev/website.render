# Scalebreakers - Supabase Deployment Guide

## ✅ Completed Conversions

### 1. Database Migration: MySQL → PostgreSQL
- **Status**: ✅ COMPLETE
- **Changes Made**:
  - seed.ts: Converted from mysql2 to postgres-js driver
  - Removed mysql2 from package.json dependencies
  - PostgreSQL already configured in drizzle.config.ts
  - All schema files remain PostgreSQL-compatible

### 2. Environment Configuration
- **Status**: ✅ COMPLETE
- **Files Updated**:
  - .env: Created with Supabase credentials
  - .env.example: Updated with Supabase connection template

### 3. Git Repository
- **Status**: ✅ COMPLETE
- **Repository**: Initialized locally with all source code

## 🚀 Next Steps: Deploy to Supabase

### Option A: Deploy via GitHub (Recommended)

1. **Create GitHub Repository**:
   \\\ash
   # After creating repo on github.com
   git remote add origin https://github.com/YOUR_USERNAME/scalebreakers.git
   git branch -M main
   git push -u origin main
   \\\

2. **Connect Supabase to GitHub**:
   - Go to: https://supabase.com/dashboard/project/wbufsbofxkwdgpkiuiut
   - Settings → GitHub Deployments
   - Connect your GitHub repository
   - Enable automatic deployments on push to main

3. **Environment Variables in Supabase**:
   - Dashboard → Settings → Environment Variables
   - Add all variables from .env file:
     - DATABASE_URL (already set)
     - SUPABASE_URL
     - SUPABASE_ANON_KEY
     - STRIPE_SECRET_KEY
     - NODE_ENV

4. **Deploy**:
   - Push to main branch
   - Supabase will automatically build and deploy

### Option B: Manual Deployment

1. **Install Supabase CLI**:
   \\\ash
   npm install -g supabase
   \\\

2. **Link Project**:
   \\\ash
   supabase projects list
   supabase link --project-ref wbufsbofxkwdgpkiuiut
   \\\

3. **Run Migrations**:
   \\\ash
   npm run db:push
   \\\

4. **Seed Database**:
   \\\ash
   npm run seed
   \\\

5. **Build & Deploy**:
   \\\ash
   npm run build
   \\\

## 📋 Your Project Details

- **Project ID**: wbufsbofxkwdgpkiuiut
- **Project URL**: https://wbufsbofxkwdgpkiuiut.supabase.co
- **Database**: PostgreSQL (auto-managed by Supabase)
- **Auth**: Supabase Auth (ready to use)
- **Storage**: S3-compatible with AWS credentials
- **Functions**: Ready for serverless deployments

## 🔑 Important Security Notes

⚠️ **DO NOT commit .env file to GitHub!** It's already in .gitignore

Store sensitive data in Supabase Dashboard:
1. Go to Settings → Environment Variables
2. Add all secrets
3. Reference in code via process.env.*

## 📦 Build Configuration

- **Frontend**: Vite + React
- **Backend**: Express.js + tRPC
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL via Supabase
- **Build Command**: \
pm run build\
- **Start Command**: \
pm run start\

## ✨ Features Already Configured

✅ Stripe Integration (payments, webhooks)
✅ Email Notifications (Nodemailer)
✅ AWS S3 Storage (portfolio uploads)
✅ Database Seeding (sample data)
✅ Authentication ready (Supabase Auth)

## 🧪 Testing Locally

\\\ash
# Install dependencies
pnpm install

# Start development server
npm run dev

# Run database migrations
npm run db:push

# Seed sample data
npx tsx seed.ts

# Run tests
npm run test
\\\

## 🚨 Troubleshooting

**Issue**: DATABASE_URL connection fails
- **Fix**: Verify password doesn't have special characters, URL encode if needed
- Example: \postgresql://postgres:password%40with%40symbols@....\

**Issue**: Migrations don't apply
- **Fix**: Check drizzle.config.ts dialect is set to 'postgresql'
- Run: \
pm run db:push\

**Issue**: Seed script fails
- **Fix**: Ensure database schema is created first with migrations
- Run: \
pm run db:push && npx tsx seed.ts\

## 📞 Next Actions

1. Push code to GitHub
2. Create GitHub PAT (Personal Access Token)
3. Connect Supabase to GitHub repo
4. Add environment variables to Supabase
5. Monitor first deployment in Supabase Dashboard
