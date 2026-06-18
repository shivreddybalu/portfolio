# 🚀 Balu Sivaiah - Portfolio Website

[![Deploy to GitHub Pages](https://github.com/Balureddhi/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Balureddhi/portfolio/actions/workflows/deploy.yml)

> Modern Angular portfolio showcasing skills, projects, and professional experience

## 🌟 Live Demo

🔗 **[View Live Portfolio](https://balureddhi.github.io/portfolio/)**

## 📋 About

Professional portfolio website built with **Angular 17** featuring:
- 🎨 Modern, responsive design with Tailwind CSS
- 🤖 AI-powered chatbot using Google Gemini API
- ⚡ Fast performance with Angular standalone components
- 🎭 Smooth animations and interactive UI
- 📱 Mobile-first responsive design

## 🛠️ Technologies

- **Frontend:** Angular 17, TypeScript
- **Styling:** Tailwind CSS, SCSS, Angular Material
- **AI Integration:** Google Gemini API (gemini-2.0-flash)
- **State Management:** RxJS
- **Build Tool:** Angular CLI
- **Deployment:** GitHub Pages with GitHub Actions
- **Testing:** Karma, Jasmine

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Balureddhi/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp src/environments/environment.prod.template.ts src/environments/environment.prod.ts
# Add your Gemini API key in environment.prod.ts
```

### Development Server

```bash
# Start development server
ng serve

# Navigate to http://localhost:4200/
```

### Build

```bash
# Build for production
npm run build

# Build output will be in dist/shiv-app/browser/
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── components/     # UI Components
│   │   │   ├── hero/
│   │   │   ├── about/
│   │   │   ├── skills/
│   │   │   ├── projects/
│   │   │   ├── contact/
│   │   │   └── chatbot/    # AI Chatbot
│   │   ├── services/       # Services
│   │   │   ├── ai.service.ts
│   │   │   └── data.service.ts
│   │   └── directives/     # Custom Directives
│   ├── assets/             # Static Assets
│   │   └── data/           # JSON Data
│   └── environments/       # Environment Config
├── .github/
│   └── workflows/          # CI/CD Pipeline
└── docs/                   # Documentation

```

## 🤖 AI Chatbot Features

- Powered by Google Gemini API (gemini-2.0-flash model)
- Answers questions about skills, experience, and projects
- Provides general knowledge responses
- Fallback responses when API is unavailable
- Professional and friendly conversation

## 🔧 Configuration

### Environment Variables

Create `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  geminiApiKey: 'YOUR_GEMINI_API_KEY_HERE'
};
```

Get your API key: https://makersuite.google.com/app/apikey

## 📦 Deployment

This project uses GitHub Actions for automatic deployment to GitHub Pages.

Every push to `main` branch triggers:
1. Build process
2. Automated deployment
3. Live site update

See `.github/workflows/deploy.yml` for CI/CD configuration.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Balu Sivaiah**
- Email: balushivareddy@gmail.com
- LinkedIn: [Balu Sivaiah](https://www.linkedin.com/in/balu-sivaiah-47a4531a8)
- GitHub: [@Balureddhi](https://github.com/Balureddhi)

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Google for Gemini API
- Tailwind CSS for utility-first styling
- GitHub for hosting and CI/CD

---

⭐ **Star this repo if you find it helpful!**

📧 **Contact me for freelance opportunities or collaborations**
