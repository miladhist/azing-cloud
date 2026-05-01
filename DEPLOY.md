# Deploy to Vercel

## Initial Setup (One-time)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Link project** (from this directory):
   ```bash
   cd azing-astro
   vercel link
   ```
   - Select "Add to Existing Project" or create new
   - Project name: `azing-cloud`

## Deploy

### Option A: Git Push (Recommended)
Push to GitHub, Vercel auto-deploys.

### Option B: CLI Deploy
```bash
cd azing-astro
vercel --prod
```

## Post-Deploy (SEO)

Ping Google Search Console after every deploy:
```bash
curl "https://www.google.com/ping?sitemap=https://azing.cloud/sitemap-index.xml"
```

## Environment Variables (if needed)

In Vercel Dashboard → Project Settings → Environment Variables:
- `SITE_URL` = `https://azing.cloud`

## Custom Domain

In Vercel Dashboard:
1. Go to Project → Settings → Domains
2. Add `azing.cloud`
3. Follow DNS instructions (Hostinger: A record → 76.76.21.21)

## Build Settings (Already Configured)

Build Command: `npm run build`
Output Directory: `dist`
Install Command: `npm install`
