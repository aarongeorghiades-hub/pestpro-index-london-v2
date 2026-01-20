# PestPro Index London v2

London's neutral pest control directory - a Next.js application featuring 483 providers with comprehensive filtering and search capabilities.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel

## Pages

### 1. Homepage (`/`)
- Hero with dark blue gradient and 3-layer overlay effects
- Stats: 481 residential, 457 commercial, 328 verified reviews
- Three category cards with premium shadows
- Trust section highlighting neutrality commitment

### 2. Residential (`/residential`)
- 481 providers from Supabase
- 20 pest type filters + 7 service feature filters
- Featured providers (4.8+ rating, 30+ reviews) with gold border
- Top-rated providers (4.5+ rating, 30+ reviews) with navy border
- London skyline hero image at 95% opacity
- PDF section linking to £1.99 DIY guide

### 3. Commercial (`/commercial`)
- 457 providers filtered by `business_commercial = true`
- Kitchen cleaning hero background
- Similar filter system to residential
- Provider cards with certification badges

### 4. Products (`/products`)
- Amazon Associates integration (ID: pestpro-index-21)
- 38 products across 10 pest types
- Dark blue gradient hero matching homepage
- Overlapping card at -mt-20
- Links to Lemon Squeezy for £1.99 DIY guide

## Database Structure

**Table:** `Providers`

**Key Columns:**
- `business_residential` (boolean) - Filter for residential page
- `business_commercial` (boolean) - Filter for commercial page
- `google_rating`, `google_review_count` - For featured/top-rated logic
- 20 pest type booleans: `pest_mice`, `pest_rats`, `pest_bed_bugs`, etc.
- 7 service feature booleans: `service_eco_friendly`, `service_emergency_24_7`, etc.

## Environment Variables

Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=https://ertsaqajwyoywxgkgfjq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Design Notes

- **Header:** Sticky navbar with white logo oval (210×70px)
- **Shadows:** Premium 4-layer shadows on cards for depth
- **Colors:** Dark blue gradients (`from-[#1e293b] via-[#1e3a8a] to-[#2563eb]`)
- **Typography:** Ultra-bold headers (font-black, tracking-tighter)
- **Cards:** Rounded-[32px] with -mt-36/-mt-20 overlaps

## Deployment Ready

✅ All pages created with production code
✅ Images optimized and in /public
✅ Supabase client configured
✅ Environment variables set
✅ Dependencies installed

**Next Step:** Push to GitHub and deploy on Vercel
# Deployment trigger
# Force redeploy v2
# Deployment fix - Tue Jan 20 13:21:24 EST 2026
