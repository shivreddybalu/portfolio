# 🤖 Real-Time AI Chatbot Setup Guide

## Overview
Your chatbot is now powered by **Google Gemini AI** - a free, powerful AI that provides intelligent, context-aware responses about your portfolio!

## 🚀 Quick Setup (2 minutes)

### Step 1: Get Your Free Gemini API Key

1. Visit: **https://makersuite.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy your API key (looks like: `AIzaSy...`)

### Step 2: Add API Key to Your Project

Open: `src/environments/environment.ts`

Replace this line:
```typescript
geminiApiKey: 'YOUR_GEMINI_API_KEY_HERE'
```

With your actual key:
```typescript
geminiApiKey: 'AIzaSy...' // Your actual key
```

### Step 3: Also Update Production Environment

Open: `src/environments/environment.prod.ts`

Add the same API key there too.

### Step 4: Test It!

1. Run your app: `ng serve`
2. Open the chatbot
3. Look for **"LIVE"** badge next to "Shiv AI"
4. Ask a question!

## ✨ Features

### Real-Time AI Responses
- Intelligent understanding of questions
- Context-aware about your portfolio
- Natural conversation flow
- Personalized to Balu Shivareddy's profile

### Fallback Mode
- If API key is not configured, chatbot works with predefined responses
- Seamless experience either way
- No errors shown to users

### Smart Context
The AI knows about:
- Your skills (Angular, React, Node.js, etc.)
- Your experience (5+ years)
- Your projects
- Your location (Hyderabad, India)
- Your availability (open for opportunities)
- Your education & certifications

## 🔒 Security Notes

### ⚠️ Important: API Key Security

**For Portfolio Websites (Public):**
Since this is a portfolio site, the API key will be exposed in the browser. Google Gemini has:
- **Free tier limits**: 60 requests per minute
- **API key restrictions**: You can restrict by HTTP referrer (your domain)

**To Restrict Your API Key:**
1. Go to Google Cloud Console
2. Find your API key
3. Add "Application restrictions" → "HTTP referrers"
4. Add your domain: `https://yourdomain.com/*`

**For Production (Recommended):**
Create a simple backend proxy:
```typescript
// backend/api/chat.ts
export default async function handler(req, res) {
  const response = await fetch('https://generativelanguage.googleapis.com/...', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...req.body,
      key: process.env.GEMINI_API_KEY // Key stays on server
    })
  });
  return res.json(await response.json());
}
```

Then update `ai.service.ts` to call your backend instead.

## 🎨 Customization

### Modify AI Personality

Edit `src/app/services/ai.service.ts` - find `systemContext`:

```typescript
private systemContext = `You are Shiv AI, an intelligent assistant...

Your role:
- Be [funny/professional/casual/technical]
- Focus on [specific topics]
- Always mention [key points]
`;
```

### Adjust Response Length

In `ai.service.ts`, modify:
```typescript
generationConfig: {
  temperature: 0.7,      // Creativity (0-1)
  maxOutputTokens: 200,  // Response length
  topP: 0.8,             // Diversity
  topK: 40               // Options considered
}
```

### Add Conversation Memory

Currently, each message is independent. To add memory:

```typescript
// Store conversation history
private conversationHistory: any[] = [];

sendMessage(userMessage: string): Observable<string> {
  this.conversationHistory.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  const body = {
    contents: this.conversationHistory,
    // ... rest of config
  };
  
  // After getting response, add to history
  this.conversationHistory.push({
    role: 'model',
    parts: [{ text: aiResponse }]
  });
}
```

## 📊 Usage & Limits

### Free Tier (Google Gemini)
- **60 requests per minute**
- **1,500 requests per day**
- **Unlimited** monthly quota

This is more than enough for a portfolio site!

### Monitor Usage
Check usage at: https://makersuite.google.com/app/apikey

## 🐛 Troubleshooting

### "Quick Responses" Instead of "Powered by Gemini AI"
- Check if API key is added correctly
- Make sure no extra spaces or quotes
- Restart the dev server

### Getting Errors in Console
- Check API key is valid
- Verify internet connection
- Check Gemini API status: https://status.cloud.google.com/

### Rate Limit Errors
- You've hit the 60 requests/minute limit
- Wait a minute and try again
- Consider adding rate limiting on frontend

### CORS Errors
- Gemini API supports browser requests
- If issues persist, consider backend proxy

## 🚀 Alternative AI Services

Want to use a different AI? Easy to switch!

### OpenAI (ChatGPT)
```typescript
private apiUrl = 'https://api.openai.com/v1/chat/completions';
// Similar structure, different endpoint
```

### Anthropic (Claude)
```typescript
private apiUrl = 'https://api.anthropic.com/v1/messages';
// Different request format
```

### Cohere
```typescript
private apiUrl = 'https://api.cohere.ai/v1/generate';
// Alternative AI provider
```

## 📝 Testing

Test your chatbot with these questions:
- "What are Balu's skills?"
- "Tell me about his experience"
- "What projects has he worked on?"
- "How can I contact him?"
- "Is he available for hire?"

The AI should provide intelligent, contextual responses!

## 🎉 You're Done!

Your portfolio now has a real AI-powered chatbot that can:
- Answer questions intelligently
- Understand context
- Provide personalized information
- Convert visitors to contacts

Enjoy! 🚀
