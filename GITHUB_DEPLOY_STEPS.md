# 🚀 GitHub Pages Deployment - Step by Step Guide

## Prerequisites

### 1. Install Git (if not installed)
- Download Git from: https://git-scm.com/download/win
- Install with default settings
- Restart your terminal/VS Code after installation

### 2. Create GitHub Account
- Go to: https://github.com
- Sign up if you don't have an account

---

## 📝 Deployment Steps

### Step 1: Initialize Git Repository

Open terminal in your project folder and run:

```bash
git init
git add .
git commit -m "Initial commit - Balu's Portfolio"
```

### Step 2: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `portfolio` (or `ShivApp`)
3. Description: "Balu Sivaiah - Angular Portfolio Website"
4. **Keep it Public** (required for free GitHub Pages)
5. **Don't** initialize with README (we already have files)
6. Click "Create repository"

### Step 3: Connect Local Repo to GitHub

Copy the commands from GitHub (will look like this):

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

### Step 4: Update Deploy Workflow

The workflow file is already created at `.github/workflows/deploy.yml`

**IMPORTANT:** Update line 29 in the workflow file if your repo name is NOT "ShivApp":

```yaml
# Change this line:
run: npm run build -- --base-href=/ShivApp/

# To (if your repo is named "portfolio"):
run: npm run build -- --base-href=/portfolio/
```

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: Select **GitHub Actions**
5. Save

### Step 6: Trigger Deployment

The deployment will start automatically when you push to main branch.

You can also trigger it manually:
1. Go to **Actions** tab in your repository
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

### Step 7: Wait for Deployment

- Go to **Actions** tab
- Watch the deployment progress (takes 2-5 minutes)
- Green checkmark = Success ✅

### Step 8: Access Your Live Site

Your site will be available at:

```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

**Example:**
- If username is `balusivaiah`
- And repo is `portfolio`
- URL will be: `https://balusivaiah.github.io/portfolio/`

---

## 🔄 Making Updates

When you make changes to your code:

```bash
# Save your changes in VS Code
git add .
git commit -m "Update: description of changes"
git push

# GitHub Actions will automatically rebuild and deploy!
```

---

## 🛠️ Troubleshooting

### Problem: Git command not found
**Solution:** Install Git from https://git-scm.com/download/win and restart terminal

### Problem: Permission denied
**Solution:** Set up SSH or use Personal Access Token
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select `repo` scope
4. Use token as password when pushing

### Problem: Build fails in GitHub Actions
**Solution:** 
1. Check the Actions tab for error details
2. Common fix: Update Node version in `deploy.yml` if needed
3. Make sure `package.json` has all dependencies

### Problem: 404 error on deployed site
**Solution:** 
1. Make sure repository is **Public**
2. Check GitHub Pages is enabled (Settings → Pages)
3. Verify the base-href matches your repo name

### Problem: Blank page after deployment
**Solution:** Check the base-href in deploy.yml:
```yaml
run: npm run build -- --base-href=/YOUR_REPO_NAME/
```

---

## 📱 Custom Domain (Optional)

If you want a custom domain like `www.balusivaiah.com`:

1. Buy a domain from Namecheap, GoDaddy, etc.
2. In GitHub repo: Settings → Pages → Custom domain
3. Add your domain (e.g., `www.balusivaiah.com`)
4. In your domain registrar, add DNS records:
   ```
   Type: CNAME
   Host: www
   Value: YOUR_USERNAME.github.io
   ```

---

## ✅ Quick Command Reference

```bash
# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub (and trigger deploy)
git push

# View git history
git log --oneline

# Check remote URL
git remote -v
```

---

## 🎉 After Successful Deployment

Your portfolio will be live! Share it on:

✅ **LinkedIn** - Add to Featured section and profile URL
✅ **Resume** - Add under contact information
✅ **GitHub Profile** - Pin the repository
✅ **Email Signature** - Include portfolio link
✅ **Job Applications** - Include in cover letters

---

## 📧 Need More Help?

### Useful Resources:
- GitHub Pages Docs: https://docs.github.com/en/pages
- Git Basics: https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- GitHub Actions: https://docs.github.com/en/actions

### Common GitHub URLs:
- Your profile: `https://github.com/YOUR_USERNAME`
- Your repos: `https://github.com/YOUR_USERNAME?tab=repositories`
- Actions: `https://github.com/YOUR_USERNAME/REPO_NAME/actions`

---

**Good luck! Your portfolio will be live soon! 🚀**
