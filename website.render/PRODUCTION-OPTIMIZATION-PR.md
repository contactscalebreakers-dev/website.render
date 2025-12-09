# Production Optimization & Social Media Integration

This PR implements production-ready features for better SEO, social media sharing, and deployment reliability.

## Changes Overview

### 1. Environment Variable Management ✅

**Files Modified:**
- `.env.example` - Added frontend environment variables
- `.env.production.example` - New production config template
- `vite.config.ts` - Added HTML transformation plugin

**New Variables:**
```env
VITE_APP_TITLE="Scale Breakers — Designer Toys & Murals"
VITE_APP_LOGO="/logo.png"
VITE_ANALYTICS_ENDPOINT=""
VITE_ANALYTICS_WEBSITE_ID=""
```

**Why:** Ensures proper title rendering and prevents `%VITE_APP_TITLE%` appearing in production builds.

---

### 2. Social Media Meta Tags ✅

**Files Modified:**
- `client/index.html` - Added comprehensive Open Graph and Twitter Card meta tags

**Features:**
- Open Graph tags for Facebook, LinkedIn, Discord
- Twitter Card tags for proper preview cards
- SEO-optimized meta description
- 1200x630px social preview image reference

**Preview URLs:**
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Inspector: https://www.linkedin.com/post-inspector/

---

### 3. Social Preview Image Setup ✅

**Files Created:**
- `client/public/social-preview.txt` - Instructions for creating preview image

**Requirements:**
- Dimensions: 1200x630 pixels
- Format: JPG or PNG (< 5MB)
- Content: Brand, designer toys, or mural showcase

**To Do:**
1. Create your 1200x630px image in Canva/Figma/Photoshop
2. Save as `client/public/social-preview.jpg`
3. Include your logo and tagline

---

### 4. Build Safeguard System ✅

**Files Modified:**
- `vite.config.ts` - Added `buildSafeguard()` plugin

**Purpose:**
- Prevents deployment with unprocessed environment variables
- Fails build if `%VITE_*%` placeholders remain in HTML
- Provides clear error messages

**Example Error:**
```
❌ BUILD FAILED: Unprocessed environment variables found in HTML:
  - %VITE_APP_TITLE%
  - %VITE_ANALYTICS_ENDPOINT%

Please set these variables in your .env file or Render dashboard.
```

---

### 5. Prerendering Support (Optional) 📦

**Files Modified:**
- `package.json` - Added `vite-plugin-prerender` to devDependencies
- `vite.config.ts` - Added commented prerender configuration

**To Enable:**
1. Uncomment the import:
   ```ts
   import prerender from "vite-plugin-prerender";
   ```

2. Uncomment the plugin configuration:
   ```ts
   prerender({
     staticDir: path.resolve(import.meta.dirname, 'dist/public'),
     routes: ['/', '/portfolio', '/work-with-me', '/workshops', '/murals']
   })
   ```

3. Run `pnpm install` to install the plugin

**Benefits:**
- Better SEO (search engines see rendered HTML)
- Faster initial page loads
- Social media crawlers get complete content

---

## Deployment Instructions

### For Render.com (Current Setup)

1. **Add Environment Variables in Render Dashboard:**
   ```
   VITE_APP_TITLE="Scale Breakers — Designer Toys & Murals"
   VITE_APP_LOGO="/logo.png"
   ```

2. **Deploy:**
   - Push to GitHub
   - Render auto-deploys
   - Build safeguard will verify all variables

### For Vercel

1. **In Project Settings > Environment Variables, add:**
   ```
   VITE_APP_TITLE="Scale Breakers — Designer Toys & Murals"
   VITE_APP_LOGO="/logo.png"
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

---

## Testing Checklist

### Before Merging:
- [ ] `pnpm install` runs successfully
- [ ] `pnpm run build` completes without errors
- [ ] No `%VITE_*%` placeholders in `dist/public/index.html`
- [ ] Title shows "Scale Breakers — Designer Toys & Murals" in browser tab

### After Deployment:
- [ ] Test social preview on Facebook Debugger
- [ ] Test social preview on Twitter Card Validator
- [ ] Verify meta tags with View Page Source
- [ ] Check og:image loads correctly

---

## File Structure

```
├── .env.example                      # Updated with VITE_* vars
├── .env.production.example           # NEW: Production config template
├── client/
│   ├── index.html                    # Updated with social meta tags
│   └── public/
│       └── social-preview.txt        # NEW: Image creation guide
├── package.json                      # Added vite-plugin-prerender
└── vite.config.ts                    # Added plugins for env vars & safeguard
```

---

## Next Steps

1. **Create Social Preview Image:**
   - Use Canva, Figma, or Photoshop
   - 1200x630px with your best work + branding
   - Save as `client/public/social-preview.jpg`

2. **Set Environment Variables in Render:**
   - Dashboard > Environment tab
   - Add `VITE_APP_TITLE` and other variables

3. **Optional - Enable Prerendering:**
   - Uncomment prerender plugin in `vite.config.ts`
   - Run `pnpm install`
   - Redeploy

---

## Questions?

- Environment variables not working? Check Render dashboard settings
- Social preview not showing? Use Facebook Debugger to clear cache
- Build failing? Check build logs for specific error messages

---

**PR Author:** Claude  
**Date:** December 5, 2025  
**Status:** Ready for Review ✅
