# 📘 GitHub Actions Workflow Explanation

## File: `.github/workflows/deploy.yml`

This file automates the deployment of your Angular portfolio to GitHub Pages. Here's what each section does:

---

## 🔍 Complete Breakdown

### 1. Workflow Name
```yaml
name: Deploy to GitHub Pages
```
**What it does:** Names your workflow "Deploy to GitHub Pages"  
**Where to see it:** GitHub repo → Actions tab → You'll see this name

---

### 2. Trigger Events
```yaml
on:
  push:
    branches: [ main ]
  workflow_dispatch:
```

**What it does:**
- `push: branches: [ main ]` - Automatically runs when you push code to the `main` branch
- `workflow_dispatch:` - Allows you to manually trigger deployment from GitHub Actions tab

**Example:**
```bash
git push  # This triggers automatic deployment
```

---

### 3. Permissions
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

**What it does:** Grants the workflow necessary permissions:
- `contents: read` - Read your repository files
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Authenticate the deployment

**Why needed:** GitHub Pages requires these permissions for secure deployment

---

## 🏗️ Job 1: Build

### Step 1: Checkout Code
```yaml
- name: Checkout
  uses: actions/checkout@v4
```

**What it does:** Downloads your repository code to the GitHub runner (virtual machine)  
**Think of it as:** Making a copy of your code in the cloud

---

### Step 2: Setup Node.js
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'
```

**What it does:**
- Installs Node.js version 18
- Caches npm packages for faster builds (reuses previously downloaded packages)

**Why Node 18:** Angular requires Node.js to build

---

### Step 3: Install Dependencies
```yaml
- name: Install dependencies
  run: npm ci
```

**What it does:** Installs all packages from `package-lock.json`  
**Why `npm ci` not `npm install`:**
- `npm ci` is faster
- Uses exact versions from package-lock.json
- Better for production builds

**Equivalent to running locally:**
```bash
npm ci
```

---

### Step 4: Build Angular App
```yaml
- name: Build
  run: npm run build -- --base-href=/ShivApp/
```

**What it does:**
- Runs your build script from `package.json`
- Sets `--base-href=/ShivApp/` for proper routing on GitHub Pages

**Breaking it down:**
- `npm run build` → Runs Angular build command
- `--` → Passes additional arguments
- `--base-href=/ShivApp/` → Sets the base URL path

**IMPORTANT:** Change `/ShivApp/` to match your repository name!

**Example URLs:**
- Repo name: `portfolio` → Use `--base-href=/portfolio/`
- Repo name: `my-site` → Use `--base-href=/my-site/`

**What it creates:**
- Production-ready files in `dist/shiv-app/browser/`
- Optimized, minified code ready for deployment

---

### Step 5: Upload Build Artifact
```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: dist/shiv-app/browser
```

**What it does:**
- Takes the built files from `dist/shiv-app/browser`
- Packages them for GitHub Pages deployment
- Makes them available for the deploy job

**Think of it as:** Zipping your website files for delivery

---

## 🚀 Job 2: Deploy

```yaml
deploy:
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  runs-on: ubuntu-latest
  needs: build
```

**What it does:**
- `environment: github-pages` - Uses GitHub Pages environment
- `url: ${{ ... }}` - Captures and displays your live site URL
- `needs: build` - **Waits for build job to complete successfully**

---

### Deploy Step
```yaml
- name: Deploy to GitHub Pages
  id: deployment
  uses: actions/deploy-pages@v4
```

**What it does:**
- Takes the uploaded artifact from build job
- Deploys it to GitHub Pages
- Makes your site live!

**Result:** Your site is accessible at `https://username.github.io/repo-name/`

---

## 🎯 Complete Workflow Flow

```
1. You push code to GitHub
   ↓
2. GitHub Actions triggers
   ↓
3. BUILD JOB starts
   ├─ Checkout code
   ├─ Install Node.js 18
   ├─ Install dependencies (npm ci)
   ├─ Build Angular app (npm run build)
   └─ Upload built files
   ↓
4. DEPLOY JOB starts (after build succeeds)
   ├─ Takes uploaded files
   └─ Deploys to GitHub Pages
   ↓
5. Your site is LIVE! 🎉
```

---

## ⏱️ Timeline

Typical deployment takes **2-5 minutes:**
- Checkout: ~5 seconds
- Setup Node: ~10 seconds
- Install dependencies: ~30-60 seconds
- Build: ~30-90 seconds
- Upload: ~5 seconds
- Deploy: ~30 seconds

---

## 📊 Where to Monitor

### GitHub Actions Tab
1. Go to your repo on GitHub
2. Click **Actions** tab
3. See all workflow runs
4. Click any run to see detailed logs

### What You'll See:
- ✅ Green checkmark = Success
- ❌ Red X = Failed (click to see error)
- 🟡 Yellow dot = Running

---

## � Customization Options

### Change Node Version
```yaml
node-version: '20'  # Use Node 20 instead of 18
```

### Change Trigger Branch
```yaml
on:
  push:
    branches: [ develop ]  # Deploy from develop branch
```

### Add Environment Variables
```yaml
- name: Build
  run: npm run build
  env:
    NODE_ENV: production
    API_KEY: ${{ secrets.API_KEY }}
```

### Build for Multiple Branches
```yaml
on:
  push:
    branches: [ main, develop, staging ]
```

---

## � Common Issues & Solutions

### Issue 1: Build Fails
**Error:** `npm ci` fails  
**Solution:** 
- Delete `package-lock.json` locally
- Run `npm install`
- Commit new `package-lock.json`

### Issue 2: 404 on Deployed Site
**Error:** Site shows 404  
**Solution:** 
- Check `--base-href=/REPO_NAME/` matches your actual repo name
- Make sure repo is PUBLIC

### Issue 3: Blank Page
**Error:** Deployed site is blank  
**Solution:**
- Check browser console for errors
- Verify base-href is correct
- Check if all assets are loading

### Issue 4: Permission Denied
**Error:** Workflow can't deploy  
**Solution:**
- Go to repo Settings → Actions → General
- Under "Workflow permissions"
- Select "Read and write permissions"

---

## 💡 Key Concepts

### CI/CD (Continuous Integration/Continuous Deployment)
This workflow implements CI/CD:
- **Continuous Integration:** Automatically builds your code when you push
- **Continuous Deployment:** Automatically deploys if build succeeds

### GitHub Actions
- Free for public repositories
- Runs on GitHub's servers (runners)
- Uses Ubuntu Linux virtual machines

### Artifact
- The built files packaged for deployment
- Temporarily stored by GitHub
- Passed between jobs

---

## ✅ Best Practices

1. **Always test locally first:**
   ```bash
   npm run build
   ```

2. **Check build output:**
   - Verify `dist/shiv-app/browser/` exists
   - Check for error messages

3. **Use semantic commit messages:**
   ```bash
   git commit -m "feat: add contact form"
   git commit -m "fix: resolve chatbot issue"
   git commit -m "docs: update README"
   ```

4. **Monitor first deployment:**
   - Watch Actions tab closely
   - Check for any warnings

---

## 🎓 What You've Learned

After understanding this workflow, you know:
✅ How GitHub Actions works  
✅ How Angular apps are built for production  
✅ How CI/CD pipelines work  
✅ How to deploy to GitHub Pages  
✅ How to troubleshoot deployment issues  

---

## 🔗 Useful Links

- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Angular Build Docs:** https://angular.io/guide/deployment
- **Workflow Syntax:** https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions

---

## 📝 Summary

This workflow is a powerful automation tool that:
1. **Listens** for code changes (git push)
2. **Builds** your Angular app automatically
3. **Tests** the build (fails if errors)
4. **Deploys** to GitHub Pages
5. **Notifies** you of success/failure

**Result:** Push code → Wait 3 minutes → Site is live! 🚀

---

**You now have professional-level deployment automation! 🎉**
