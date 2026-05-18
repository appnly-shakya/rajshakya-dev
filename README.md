# rajshakya.dev

Personal portfolio site for Raj Shakya — Google Workspace & Cloud Infrastructure Expert.

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import the repo
4. Deploy (no build settings needed — it's a static HTML site)
5. Go to Vercel project → Settings → Domains → Add `rajshakya.dev`
6. In GoDaddy DNS, add:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`

Site will be live in ~5 minutes after DNS propagation.

## Customize

- Update LinkedIn URL in footer and CTA section
- Update Upwork profile URL in footer  
- Replace `raj@rajshakya.dev` with your actual email
- Add Calendly link when ready
