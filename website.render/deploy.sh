#!/bin/bash

# Scalebreakers - Quick Deployment Script
# Usage: bash deploy.sh

set -e

echo "🚀 Scalebreakers Deployment to Supabase"
echo "======================================="

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please copy .env.example to .env and fill in your values"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install || npm install

# Run database migrations
echo "🗄️  Running database migrations..."
npm run db:push

# Seed database
echo "🌱 Seeding sample data..."
npx tsx seed.ts

# Build the project
echo "🔨 Building project..."
npm run build

# Show deployment info
echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Push code to GitHub: git push origin main"
echo "2. Visit Supabase Dashboard: https://supabase.com/dashboard/project/wbufsbofxkwdgpkiuiut"
echo "3. Connect GitHub repository in Settings → GitHub Deployments"
echo "4. Monitor deployment in Supabase Dashboard"
echo ""
echo "🎉 Your Scalebreakers site will be live soon!"
