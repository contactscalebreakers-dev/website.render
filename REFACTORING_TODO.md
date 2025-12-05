# Scale Breakers Website Refactoring - Complete TODO List

## PROJECT GOAL
Clean up and restructure the entire website to clearly present three main offerings:
- Urban art & mural commissions
- Collectible / 3D art products
- Workshops & creative programs (including NDIS & council work)

---

## PHASE 1: NAVIGATION & PAGE STRUCTURE ✅ COMPLETE

### 1.1 Restructure Main Navigation ✅
- [x] Update Header component to show: Home | Workshops | Products | Hire Me | About/Portfolio | Contact
- [x] Remove old navigation items (Shop, Mural Service, Services dropdown)
- [x] Ensure mobile hamburger menu works with new nav structure
- [x] Test navigation on desktop and mobile

### 1.2 Update App.tsx Routes ✅
- [x] Keep: Home, Workshops, Products, HireMe, About/Portfolio, Contact
- [x] Remove/redirect: /shop, /mural-service, /services, /services/3d-scanning, /services/murals
- [x] Ensure 404 page handles broken routes gracefully
- [x] Add /ndis route (optional but referenced in docs)

---

## PHASE 2: HOME PAGE ✅ COMPLETE

### 2.1 Hero Section ✅
- [x] Create hero with summary of: urban art, murals, collectible figurines/3D art, workshops in Adelaide
- [x] Remove all images (text-only for now)
- [x] Add primary CTA button: "Explore Workshops" → /workshops
- [x] Add secondary CTA button: "Hire Me for Murals" → /hire-me

### 2.2 Feature Tiles Section ✅
- [x] Create 3 feature tiles linking to:
  - Workshops
  - Products
  - Hire Me
- [x] Each tile: title, short description, link button
- [x] Remove any images from tiles

### 2.3 Selected Work Section (TEXT ONLY) ✅
- [x] Create text-only "Selected Work" strip
- [x] Include: project names + links to relevant pages
- [x] No images
- [x] Links to: Workshops, Products, Hire Me, About/Portfolio

### 2.4 Newsletter Signup ✅
- [x] Keep existing newsletter form (verify it works)
- [x] Ensure proper styling and validation

---

## PHASE 3: WORKSHOPS PAGE ✅ COMPLETE

### 3.1 Hero Section ✅
- [x] Title: "Workshops & Creative Programs in Adelaide"
- [x] Subtitle: "For individuals, NDIS participants, schools, councils and community groups."
- [x] Two buttons:
  - "View public workshops"
  - "NDIS, councils & schools"

### 3.2 Public Workshops Section ✅
- [x] List workshop types as cards/sections (street art basics, character design, intro to 3D, etc.)
- [x] Each workshop: title, description, target level, duration, "Book/Enquire" CTA
- [x] Remove all images
- [x] Ensure text-only layout is clean and scannable

### 3.3 NDIS & Support Workers Section ✅
- [x] Use NDIS documents to write plain-language section explaining:
  - Services for self-managed and plan-managed NDIS participants
  - Support for goals: social participation, skills, confidence, community access
  - Key accessibility features: pre-visit planning, visual supports, sensory-aware setup, safety
- [x] Format: 1-2 paragraphs + bullet points
- [x] CTA button: "Enquire about NDIS-friendly sessions"
- [x] Link to /ndis page if available

### 3.4 Councils, Schools & Community Programs Section ✅
- [x] Explain services for:
  - Local councils
  - Youth programs
  - Schools and community organisations
- [x] Mention: youth engagement, public art programs, safe street art, collaborative murals, co-design
- [x] CTA button: "Request a program proposal"

### 3.5 Credentials & Safety Section ✅
- [x] Summarise key checks and documents:
  - Working With Children Check / Police Check
  - ABN details
  - Relevant certificates / accessibility practices
- [x] Add download links/buttons to:
  - NDIS Service Descriptor PDF
  - Short Service Agreement PDF
  - Invoice Template PDF
  - ABN PDF
- [x] Note that detailed docs available on request

### 3.6 Gallery / Testimonials (TEXT ONLY) ✅
- [x] Remove all images
- [x] Create 2-4 example workshops/programs as text blocks:
  - Name
  - Who it was for
  - 1-2 sentence description
- [x] Add 1-3 short testimonials if available (text only)

---

## PHASE 4: PRODUCTS PAGE

### 4.1 Page Structure
- [ ] Create Products page with sections:
  - Featured Pieces
  - Collectible Figurines
  - Urban Dioramas
  - Original Artwork

### 4.2 Remove Duplicates
- [ ] Audit all products in database
- [ ] Identify and remove duplicated products (same name/slug/content)
- [ ] Keep only one version of each product
- [ ] Update product count in database

### 4.3 Product Display
- [ ] Each product: title, short description, price, "Add to cart" or "View product" button
- [ ] Remove all product images (comment out image components)
- [ ] Keep layout text-only and clean
- [ ] Ensure cart functionality still works

### 4.4 Ensure Shop-Only Content
- [ ] Verify Products page only shows shop elements (products, prices, CTAs)
- [ ] Remove any portfolio or commission content from this page

---

## PHASE 5: HIRE ME PAGE

### 5.1 Hero Section
- [ ] Title: "Hire Me for Murals, 3D and Urban Visuals"
- [ ] Summary: mural commissions, 3D character/toy work, scanning and digital projects
- [ ] Remove all images

### 5.2 Murals Section
- [ ] Describe mural services for:
  - Businesses
  - Councils / community spaces
  - Homes / studios
- [ ] Include "How it works" (brief → concept → sketch → final artwork)
- [ ] CTA button: "Request a mural / project quote"

### 5.3 3D & Digital Services Section
- [ ] Group together:
  - 3D scanning
  - 3D sculpting / modelling
  - 3D character design
  - Animation / AR / VR capabilities (if applicable)
- [ ] Keep concise and benefit-focused for clients
- [ ] CTA button: "Enquire about a 3D / digital project"

### 5.4 Mini Portfolio (TEXT ONLY)
- [ ] Create 3-5 key example projects as text entries:
  - Project name / type
  - 1-2 sentence description
- [ ] No images
- [ ] Optional: link to relevant pages (Products, Workshops)

---

## PHASE 6: ABOUT / PORTFOLIO PAGE

### 6.1 About Section
- [ ] Short bio for Scale Breakers
- [ ] What I do: murals, figurines/3D, workshops
- [ ] Short note on style, values, community focus
- [ ] Remove all images

### 6.2 Portfolio Section (TEXT ONLY)
- [ ] Create subsections:
  - Murals & Urban Art: 3-6 entries (name + 1-2 sentence description)
  - 3D / Toys / Dioramas: 3-6 entries
  - Workshops & Programs: 3-6 entries (reference NDIS/council/community work)
- [ ] Each entry can link to relevant page (Workshops, Hire Me, Products)
- [ ] No images

---

## PHASE 7: CONTACT PAGE

### 7.1 Page Structure
- [ ] Intro text: "Got a project, question or idea? Reach out."
- [ ] Contact form with fields:
  - Name (required)
  - Email (required, validated)
  - What you're interested in (dropdown: Workshop / Mural / 3D / NDIS / Council / Products / Other)
  - Message (required)
- [ ] Form validation and success/failure messages
- [ ] Display contact email
- [ ] Optional: social media links

### 7.2 Form Functionality
- [ ] Verify form submits successfully
- [ ] Ensure email notifications work
- [ ] Add success message after submission
- [ ] Add error handling for failed submissions

---

## PHASE 8: NDIS INTEGRATION

### 8.1 NDIS Content Standardization
- [ ] Use consistent terminology across site:
  - "NDIS & Community Access" or "NDIS & Support Workers" (choose one)
  - "Councils, Schools & Community Programs"
- [ ] Ensure Workshops page NDIS section matches /ndis page (if exists)
- [ ] Verify all NDIS copy is based on provided documents

### 8.2 NDIS Page (/ndis)
- [ ] Create or update /ndis page with:
  - Overview of NDIS-friendly services
  - Link to Workshops page NDIS section
  - Download links for:
    - NDIS Service Descriptor
    - Short Service Agreement
    - Invoice Template
    - ABN proof
  - Contact/enquiry CTA

### 8.3 NDIS Document Integration
- [ ] Review and extract key points from:
  - ScaleBreakers_Accessibility_NDIS_FINAL.rtf
  - NDIS_Quickstart_Service_Descriptor.docx
  - NDIS_IMPLEMENTATION_SUMMARY.md
  - NDIS_Short_Service_Agreement.docx
  - NDIS_Invoice_Template_PlanManaged.docx
  - abndetailsdocument.pdf
- [ ] Incorporate into Workshops page and /ndis page

---

## PHASE 9: FORMATTING & CLEANUP

### 9.1 Remove All Images
- [ ] Audit all pages for image components
- [ ] Comment out or remove:
  - `<img>` tags
  - `<Image>` components
  - Background images
  - Image galleries
  - Portfolio image displays
- [ ] Verify site is text-only

### 9.2 Remove Duplicate Content
- [ ] Identify repeated workshop descriptions across pages
- [ ] Identify repeated mural blurbs
- [ ] Keep one canonical version, link to it from other pages
- [ ] Remove redundant sections

### 9.3 Normalize Heading Hierarchy
- [ ] Ensure one `<h1>` per page
- [ ] Use `<h2>` for main sections
- [ ] Use `<h3>` for subsections
- [ ] Verify hierarchy is consistent across all pages

### 9.4 Normalize Spacing & Layout
- [ ] Ensure consistent spacing between sections
- [ ] Consistent padding/margins across pages
- [ ] Consistent component styling
- [ ] Test responsive design on mobile/tablet/desktop

### 9.5 Clean Up Routing
- [ ] Remove old routes: /shop, /mural-service, /services, /services/3d-scanning, /services/murals
- [ ] Ensure 404 page handles old URLs gracefully
- [ ] Update internal links to use new routes
- [ ] Test all navigation links work

### 9.6 Verify Functionality
- [ ] Forms work (Contact, enquiries)
- [ ] Cart functionality works (if applicable)
- [ ] Newsletter signup works
- [ ] All CTAs link to correct pages
- [ ] No console errors

---

## PHASE 10: SEO & GLOBAL UI

### 10.1 SEO Optimization
- [ ] Add descriptive `<title>` tags to each page:
  - Home: "Scale Breakers | Urban Art, Murals & Workshops in Adelaide"
  - Workshops: "Urban Art Workshops & Creative Programs in Adelaide | Scale Breakers"
  - Products: "Collectible Art & 3D Figurines | Scale Breakers"
  - Hire Me: "Mural Commissions & 3D Art Services | Scale Breakers"
  - About/Portfolio: "About Scale Breakers | Urban Artist & Workshop Creator"
  - Contact: "Contact Scale Breakers | Mural & Workshop Enquiries"
- [ ] Add meta descriptions to each page
- [ ] Verify heading hierarchy (one h1 per page)

### 10.2 Footer
- [ ] Create consistent footer across all pages with:
  - Brand name: "Scale Breakers"
  - ABN line: "ABN [number]"
  - Key nav links: Workshops, Products, Hire Me, NDIS, Contact
  - Contact email: contact.scalebreakers@gmail.com
  - Social links: Instagram, Facebook (optional)
- [ ] Ensure footer appears on all pages
- [ ] Test footer responsiveness

### 10.3 Mobile Navigation
- [ ] Ensure hamburger menu works on mobile
- [ ] All nav items visible and tappable
- [ ] All pages reachable from mobile nav
- [ ] Test on various mobile devices/sizes

### 10.4 Find & Fix Broken Links
- [ ] Audit all internal links
- [ ] Fix any broken links
- [ ] Update links to use new routes
- [ ] Ensure old routes redirect to new ones (or 404)
- [ ] Test all links work

---

## PHASE 11: FORMS & VALIDATION

### 11.1 Contact Form
- [ ] Name field: required
- [ ] Email field: required, email validation
- [ ] Interest dropdown: required
- [ ] Message field: required
- [ ] Submit button: clear CTA text
- [ ] Success message: "Thank you! We'll be in touch soon."
- [ ] Error message: "Something went wrong. Please try again."

### 11.2 Workshop Enquiry Forms
- [ ] Identify all workshop enquiry forms
- [ ] Ensure required fields are marked
- [ ] Add validation (email, required fields)
- [ ] Add success/failure messages
- [ ] Test form submission

### 11.3 Project/Mural Enquiry Forms
- [ ] Identify all project enquiry forms (Hire Me page)
- [ ] Ensure required fields are marked
- [ ] Add validation
- [ ] Add success/failure messages
- [ ] Test form submission

### 11.4 Form Backend
- [ ] Verify all forms submit to correct email/backend
- [ ] Ensure submissions are logged/tracked
- [ ] Test email notifications work
- [ ] No errors in console after submission

---

## PHASE 12: STYLE & TONE

### 12.1 Content Review
- [ ] Review all copy for tone: clear, grounded, friendly
- [ ] Remove corporate jargon
- [ ] Keep wording short and scannable
- [ ] Use headings and bullet points heavily
- [ ] Prioritize clarity around Workshops and NDIS/council offerings

### 12.2 Accuracy Check
- [ ] Verify all services match what's actually offered
- [ ] Base everything on existing content and NDIS documents
- [ ] Do NOT invent services
- [ ] Ensure NDIS claims are accurate (not claiming to be fully registered if not true)

---

## PHASE 13: BUILD & TESTING

### 13.1 Build Project
- [ ] Run `pnpm build`
- [ ] Verify no build errors
- [ ] Verify no TypeScript errors
- [ ] Verify no console warnings

### 13.2 Manual Testing
- [ ] Test all pages load correctly
- [ ] Test all navigation links work
- [ ] Test all forms submit successfully
- [ ] Test responsive design (mobile/tablet/desktop)
- [ ] Test all CTAs link to correct pages
- [ ] Test footer appears on all pages

### 13.3 Accessibility Check
- [ ] Verify semantic HTML (nav, main, footer, etc.)
- [ ] Check heading hierarchy
- [ ] Verify color contrast
- [ ] Test keyboard navigation
- [ ] Test with screen reader (if possible)

---

## PHASE 14: FINAL DELIVERABLES

### 14.1 Summary Document
- [ ] Document all pages/sections changed
- [ ] Document where NDIS-related copy was added/updated
- [ ] Document which products/sections were removed or consolidated
- [ ] List any remaining TODOs or limitations
- [ ] Provide deployment instructions

### 14.2 Save Checkpoint
- [ ] Commit all changes to git
- [ ] Save webdev checkpoint
- [ ] Create deployment-ready version

### 14.3 Deployment
- [ ] Push to GitHub
- [ ] Deploy to Netlify (frontend)
- [ ] Deploy to Vercel (backend)
- [ ] Verify live site works correctly

---

## NOTES & CONSTRAINTS

- **Text-only for now**: All images removed temporarily. User will re-insert later.
- **No broken functionality**: Preserve forms, cart, core features.
- **NDIS accuracy**: Base all NDIS content on provided documents. Don't overstate credentials.
- **Tone**: Clear, grounded, friendly. No corporate jargon.
- **Routing**: Update routes to match new structure. Handle old routes gracefully.
- **Responsive**: Maintain mobile-first design. Test on all screen sizes.

---

## COMPLETION CHECKLIST

- [ ] All pages restructured per spec
- [ ] All images removed (text-only)
- [ ] All duplicate products removed
- [ ] All forms working with validation
- [ ] All navigation updated and tested
- [ ] NDIS content integrated properly
- [ ] SEO basics implemented
- [ ] Footer added to all pages
- [ ] Build successful (no errors)
- [ ] All pages tested (desktop & mobile)
- [ ] Summary document created
- [ ] Ready for deployment

---

**Last Updated:** November 2025
**Status:** Ready to begin refactoring
