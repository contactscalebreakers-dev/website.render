# DEPLOYMENT QUICK START

## Your Credentials (Already Configured)

Supabase Project URL:
https://wbufsbofxkwdgpkiuiut.supabase.co

Database Connection:
postgresql://postgres:deex1er.!!@wbufsbofxkwdgpkiuiut.supabase.co:5432/postgres

## 3-Step Deployment

### Step 1: Push to GitHub
\\\ash
git remote add origin https://github.com/YOUR_USERNAME/scalebreakers.git
git branch -M main
git push -u origin main
\\\

### Step 2: Connect Supabase to GitHub
1. Visit: https://supabase.com/dashboard/project/wbufsbofxkwdgpkiuiut
2. Go to: Settings > Integrations > GitHub Deployments
3. Click 'Connect Repository'
4. Select 'YOUR_USERNAME/scalebreakers'
5. Authorize Supabase

### Step 3: Configure Environment Variables
1. In Supabase Dashboard, go to Settings > Environment Variables
2. Add these variables:
   - STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
   - SUPABASE_URL=https://wbufsbofxkwdgpkiuiut.supabase.co
   - SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   - NODE_ENV=production

## Database Is Ready!

Your Supabase PostgreSQL database has:
- Portfolio Items table
- Products table (3D models, canvases, workshops)
- Users table
- Workshops table
- Newsletter subscriptions
- All pre-configured and ready

## What Changed

MySQL -> PostgreSQL
- seed.ts updated
- mysql2 removed from package.json
- postgres-js driver configured
- Drizzle ORM configured for PostgreSQL
- All schema compatible with PostgreSQL

## Local Testing

\\\ash
pnpm install          # Install packages
npm run db:push       # Apply migrations
npx tsx seed.ts       # Seed sample data
npm run dev           # Start dev server
\\\

## After Deployment

Your site will automatically:
1. Build on GitHub push
2. Deploy to Supabase
3. Run database migrations
4. Seed sample data
5. Be live within 2-5 minutes

## GitHub Deployment Status

Check here: https://github.com/YOUR_USERNAME/scalebreakers/deployments

## Supabase Dashboard

Monitor your deployment:
https://supabase.com/dashboard/project/wbufsbofxkwdgpkiuiut

## Support

README in project root has full documentation
SUPABASE-DEPLOYMENT.md has detailed instructions
MIGRATION-COMPLETE.md shows all changes made
