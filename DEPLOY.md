# 🚀 How to Publish Your Website Online (Free)

## Step 1: Create a GitHub Account
1. Go to https://github.com/signup
2. Choose a username (e.g., "musa-sheikh")
3. Verify your email

## Step 2: Create a Vercel Account (connects to GitHub)
1. Go to https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel

## Step 3: Push Code to GitHub
Once you have accounts, run these commands in your terminal at `C:\Users\Musa\musa-portfolio`:

```bash
# Login to GitHub CLI
gh auth login

# Create a GitHub repo
gh repo create musa-portfolio --public --push --source=.

# Deploy to Vercel
npx vercel --prod --yes
```

Vercel will automatically detect Next.js and build the site. After ~2 minutes you'll get a live URL like `https://musa-portfolio.vercel.app`.

---

**For now** — open **http://localhost:3000** to see the full website running locally.
