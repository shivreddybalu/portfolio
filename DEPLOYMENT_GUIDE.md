# 🚀 Deployment Guide - Balu's Portfolio

This guide will help you deploy your Angular portfolio to get a live URL.

---

## ✅ Pre-Deployment Checklist

Before deploying, make sure:
- [ ] API key is configured in `environment.prod.ts`
- [ ] Build works locally: `npm run build`
- [ ] All files are committed to Git
- [ ] `.gitignore` includes `node_modules/`, `dist/`, `.angular/`

---

## 🌟 Option 1: Netlify (EASIEST - Recommended)

### Steps:

1. **Create Netlify Account**
   - Go to: https://www.netlify.com
   - Sign up with GitHub (recommended)

2. **Deploy via Drag & Drop (Quickest)**
   ```bash
   # Build your project
   npm run build
   
   # The build output will be in: dist/shiv-app/browser
   ```
   - Go to: https://app.netlify.com/drop
   - Drag the `dist/shiv-app/browser` folder
   - Your site is live instantly!

3. **Deploy via Git (Automatic Updates)**
   - Push your code to GitHub
   - Go to Netlify Dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist/shiv-app/browser`
   - Click "Deploy site"

4. **Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Or use the free Netlify subdomain: `your-site.netlify.app`

**✅ You'll get a URL like:** `https://balu-portfolio.netlify.app`

---

## 🔷 Option 2: Vercel

### Steps:

1. **Create Vercel Account**
   - Go to: https://vercel.com
   - Sign up with GitHub

2. **Deploy via CLI**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Build your project
   npm run build
   
   # Deploy
   vercel
   
   # Follow the prompts:
   # - Set up and deploy? Yes
   # - Which scope? Your account
   # - Link to existing project? No
   # - Project name? shiv-app
   # - Directory? ./
   # - Override settings? No
   ```

3. **Deploy via Git (Automatic)**
   - Push your code to GitHub
   - Go to: https://vercel.com/new
   - Import your repository
   - Vercel auto-detects Angular settings
   - Click "Deploy"

**✅ You'll get a URL like:** `https://shiv-app.vercel.app`

---

## 📘 Option 3: GitHub Pages (Free with GitHub)

### Steps:

1. **Push to GitHub**
   ```bash
   # Initialize git if not done
   git init
   git add .
   git commit -m "Initial commit"
   
   # Create GitHub repo and push
   git remote add origin https://github.com/YOUR_USERNAME/ShivApp.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repo → Settings → Pages
   - Source: GitHub Actions
   - The workflow file (`.github/workflows/deploy.yml`) will automatically deploy

3. **Update Repository Name in Workflow**
   - If your repo name is different from "ShivApp", update line in `.github/workflows/deploy.yml`:
   ```yaml
   run: npm run build -- --base-href=/YOUR_REPO_NAME/
   ```

**✅ You'll get a URL like:** `https://YOUR_USERNAME.github.io/ShivApp/`

---

## 🎯 Option 4: Firebase Hosting (Google's Platform)

### Steps:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   
   # Select:
   # - Use an existing project or create new
   # - Public directory: dist/shiv-app/browser
   # - Configure as single-page app: Yes
   # - Set up automatic builds: No
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

**✅ You'll get a URL like:** `https://your-project.web.app`

---

## 🌐 Option 5: Render (Free Tier)

### Steps:

1. **Create Render Account**
   - Go to: https://render.com
   - Sign up with GitHub

2. **Create New Static Site**
   - Dashboard → New → Static Site
   - Connect your GitHub repository
   - Build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist/shiv-app/browser`
   - Click "Create Static Site"

**✅ You'll get a URL like:** `https://shiv-app.onrender.com`

---

## 🔐 Important: Environment Variables

For **Netlify** or **Vercel**, you can set environment variables:

### Netlify:
- Site settings → Environment variables
- Add: `GEMINI_API_KEY` = `your_key_here`

### Vercel:
- Project settings → Environment Variables
- Add: `GEMINI_API_KEY` = `your_key_here`

**Note:** Your API key is currently in `environment.prod.ts`. For better security, consider using environment variables on the hosting platform.

---

## 📝 Quick Comparison

| Platform | Speed | Custom Domain | Build Time | Best For |
|----------|-------|---------------|------------|----------|
| **Netlify** | ⚡⚡⚡ | Free | Fast | Beginners, Quick Deploy |
| **Vercel** | ⚡⚡⚡ | Free | Fast | Modern Apps, Great DX |
| **GitHub Pages** | ⚡⚡ | Free (with setup) | Medium | Open Source Projects |
| **Firebase** | ⚡⚡⚡ | Free | Fast | Google Ecosystem |
| **Render** | ⚡⚡ | Free | Medium | Full-stack Apps |

---

## 🎉 Recommended Path (Quickest)

1. **Build your app:**
   ```bash
   npm run build
   ```

2. **Go to Netlify Drop:**
   - Visit: https://app.netlify.com/drop
   - Drag `dist/shiv-app/browser` folder
   - Done! You'll get a URL instantly

3. **Claim your site:**
   - Create Netlify account
   - Claim the deployed site
   - Change site name to something like: `balu-portfolio`

---

## 🐛 Troubleshooting

### Build Fails:
```bash
# Clear cache and rebuild
rm -rf node_modules dist .angular
npm install
npm run build
```

### 404 Errors on Refresh:
- Make sure `netlify.toml` or `vercel.json` is present
- These files handle Angular routing properly

### API Key Not Working:
- Check `environment.prod.ts` has the correct key
- Verify the key is valid at: https://makersuite.google.com/app/apikey

---

## 📧 Need Help?

If you face issues:
1. Check build logs on the hosting platform
2. Test build locally: `npm run build`
3. Check browser console for errors

---

## ✅ After Deployment

Once deployed, your portfolio will be live at a URL like:
- `https://balu-portfolio.netlify.app`
- `https://shiv-app.vercel.app`
- `https://yourusername.github.io/ShivApp/`

Share this URL on:
- LinkedIn profile
- Resume
- Email signature
- GitHub profile

**Good luck with your deployment! 🚀**
