# 🔐 Security Setup Guide

## ✅ What We Fixed

Your repository was blocking pushes because API keys were committed in Git history. We've successfully:

1. ✅ Removed all secrets from Git history using `git filter-branch`
2. ✅ Force pushed the cleaned history to GitHub
3. ✅ Verified `.gitignore` is protecting environment files
4. ✅ Your deployment now uses GitHub Secrets (secure method)

## 🔑 GitHub Secret Configuration

### Required Secret: `GEMINI_API_KEY`

Your GitHub Actions workflow needs this secret to build and deploy your app.

**To add/verify the secret:**

1. Go to your repository: https://github.com/shivreddybalu/portfolio
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** (or edit existing)
4. Name: `GEMINI_API_KEY`
5. Value: Your actual Gemini API key
6. Click **Add secret**

**Get your Gemini API Key:**
- Visit: https://makersuite.google.com/app/apikey
- Create or copy your API key
- Paste it into GitHub Secrets

## 🏗️ How Environment Files Work Now

### Local Development (Your Computer)

The environment files exist locally but are **ignored by Git**:

- `src/environments/environment.ts` - Development config
- `src/environments/environment.prod.ts` - Production config

**Current status:** These files have empty `geminiApiKey: ''` values.

**For local testing with chatbot:**
1. Open `src/environments/environment.ts`
2. Replace empty string with your API key: `geminiApiKey: 'YOUR_KEY_HERE'`
3. Save and test locally
4. **NEVER commit these changes** (Git will ignore them automatically)

### GitHub Actions Deployment (Automated)

When you push to GitHub:
1. Workflow checks out code (environment files are NOT included)
2. Workflow creates environment files from the `GEMINI_API_KEY` secret
3. Builds the app with the real API key
4. Deploys to GitHub Pages

See `.github/workflows/deploy.yml` lines 29-31:
```yaml
- name: Create environment files
  run: |
    echo "export const environment = { production: false, geminiApiKey: '${{ secrets.GEMINI_API_KEY }}' };" > src/environments/environment.ts
    echo "export const environment = { production: true, geminiApiKey: '${{ secrets.GEMINI_API_KEY }}' };" > src/environments/environment.prod.ts
```

## 📋 Deployment Checklist

Before your next deployment:

- [ ] GitHub Secret `GEMINI_API_KEY` is configured
- [ ] Repository Settings → Pages → Source is set to "GitHub Actions"
- [ ] `.github/workflows/deploy.yml` has correct `--base-href=/portfolio/`
- [ ] Push to main branch to trigger deployment

## 🚨 Important Security Rules

### ✅ DO:
- Keep API keys in GitHub Secrets for deployment
- Use empty strings in local environment files (they're ignored)
- Add real keys only for local testing (Git will ignore)
- Use environment variables or secret management for production

### ❌ DON'T:
- Never commit files with real API keys
- Never share your API keys in code, screenshots, or chat
- Never disable `.gitignore` rules for environment files
- Never force push without understanding what you're removing

## 🔄 If You Need to Update Your API Key

1. **For GitHub deployment:** Update the `GEMINI_API_KEY` secret in GitHub
2. **For local testing:** Edit your local `environment.ts` file (won't be committed)

## 🆘 Troubleshooting

### "Push declined due to repository rule violations"
- This means you're trying to commit secrets
- Check what files you're committing: `git status`
- Make sure `.gitignore` includes environment files
- If history is already tainted, contact me for help

### "GEMINI_API_KEY is undefined in deployed app"
- Verify the secret is set in GitHub Settings → Secrets
- Check workflow logs in Actions tab
- Ensure secret name matches exactly: `GEMINI_API_KEY`

### "Chatbot not working locally"
- Add your real API key to `src/environments/environment.ts`
- Restart your dev server
- Check browser console for API errors

## 📚 Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Gemini API Key Management](https://makersuite.google.com/app/apikey)
- [Git Security Best Practices](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)

---

**Your repository is now secure! 🎉**

Current remote: `https://github.com/shivreddybalu/portfolio.git`
Last successful push: Cleaned history without secrets
