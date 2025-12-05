# Scale Breakers Website - TODO

## Current Features (Completed)
- [x] Homepage with hero section and glitch effects
- [x] Navigation with social media icons
- [x] Workshops page with detailed workshop information
- [x] Shop page with product listings
- [x] Portfolio section with artwork gallery
- [x] Mural Service page with custom request form
- [x] Newsletter signup functionality
- [x] Admin products management interface
- [x] NDIS and Special Needs support section
- [x] Design overhaul with Helvetica font and background distortion
- [x] Updated workshop pricing ($20 each, $30 pair)
- [x] Nested anchor tag errors fixed

## Current Tasks (Completed)
- [x] Analyze hand-drawn workshop illustrations and match to workshops
- [x] Replace workshop images with hand-drawn artwork
- [x] Add 3D Integration section after final workshop
- [x] Embed 3D MP4 videos (autoplay, loop, muted)
- [x] Optimize portfolio images for fast loading
- [x] Implement lazy loading for portfolio images
- [x] Refine workshop and portfolio layout and spacing
- [x] Improve portfolio typography and hover effects
- [x] Verify responsive design on all devices
- [x] Test all sections for performance and visual consistency
- [x] 3D Scanning & Digital Modelling section with video embeds verified

## Deployment & Finalization
- [ ] Deploy to custom domain scalebreakers.space
- [ ] Set up GitHub repository
- [ ] Configure Netlify deployment
- [ ] Monitor analytics and user engagement

## Project Complete ✓
All core features implemented and tested. Website is production-ready for deployment.



### Bug Fixes & Updates
- [x] Remove duplicate workshops (each workshop appears twice)
- [x] Reorder 3D videos - move orange shark video to middle position
- [x] Move 3D Scanning & Digital Modelling section to homepage (under main title)
- [x] Change section title to "Our Services"



## New Features
- [ ] Create dedicated "Our Services" page with detailed information
- [ ] Add "Learn More" button linking from homepage "Our Services" section to new page



## PRIORITY TASKS (Completed)
- [x] TASK 1: Fix Shop and Portfolio Image Display (square 1:1 for shop, 4:3 for portfolio, object-fit: cover)
- [x] TASK 2: Add Services Dropdown to Navigation (SERVICES menu with 3D Scanning & Murals)
- [x] TASK 3: Create Services Pages (/services hub, /services/3d-scanning, /services/murals)
- [x] TASK 4: Add Hero Video to Homepage (YouTube Shorts: https://www.youtube.com/shorts/Fb95uqE8BVQ)

## Current Issues
- [x] Fix Services dropdown - make it responsive and interactive (now working with hover on desktop and click on mobile)



## Workshop Information Updates (PRIORITY)
- [ ] Update all workshops: capacity 23, duration 2 hours
- [ ] Update pricing: $15 each or $30 for pair
- [ ] Add location: B.Y.O. at 2-4 Edmundstone Street, West End
- [ ] Add note: Participants take home creation, all materials provided
- [ ] Update database workshop records with correct info


## PHASE 1: FIX SYNTAX ERRORS (COMPLETED)
- [x] Fixed syntax error in server/routers.ts (email router placement)
- [x] Verified build compiles without errors
- [x] Dev server running successfully

## PHASE 2: EMAIL BACKEND & FORMS (COMPLETED)
- [x] Set up email service (Nodemailer installed)
- [x] Create email tRPC procedure for sending emails (procedures defined)
- [x] Wire Contact form to send emails to contact.scalebreakers@gmail.com
- [x] Wire Services3DScanning form to send emails to contact.scalebreakers@gmail.com
- [x] Test email submissions with vitest (5 tests passing)
- [x] Create integration tests for email flows

## PHASE 3: SERVICES DROPDOWN & PAGES (COMPLETED)
- [x] Add Services dropdown to Header with 3 options
- [x] Create /services/3d-scanning page with form
- [x] Create /services/murals page redirect
- [x] Create /services/3d-modelling page with form
- [x] Add service pages to App.tsx routes
- [x] All service pages have email integration

## PHASE 5: EMAIL CONFIRMATIONS (PENDING)
- [ ] Add email confirmation to workshop booking procedure
- [ ] Create email template for booking confirmations
- [ ] Send confirmation with workshop details and payment instructions
- [ ] Test booking email flow

## PHASE 6: ADMIN DASHBOARD (COMPLETED)
- [x] Create /admin/bookings page with full UI
- [x] Display all workshop bookings in table with sorting
- [x] Add status management (pending, confirmed, cancelled)
- [x] Add delete/edit functionality via tRPC mutations
- [x] Protect admin routes with authentication (role check)
- [x] Add filter tabs for status filtering
- [x] Add summary statistics cards
- [x] Create vitest tests for admin bookings functions

## PHASE 7: STRIPE PAYMENT PROCESSING (IN PROGRESS)
- [ ] Set up Stripe account and API keys
- [ ] Install Stripe npm packages (stripe, @stripe/react-stripe-js)
- [ ] Create payment intent tRPC procedure for products
- [ ] Create payment intent tRPC procedure for workshop bookings
- [ ] Create payment intent tRPC procedure for service enquiries
- [ ] Add Stripe payment form to shop product pages
- [ ] Add Stripe payment form to workshop booking page
- [ ] Add Stripe payment form to service enquiry pages (3D Scanning, 3D Modelling, Murals)
- [ ] Handle payment success/failure callbacks
- [ ] Create payment confirmation emails
- [ ] Test payment flow with Stripe test cards
- [ ] Set up webhook handling for payment events
