# AI Chatbot Component

## Features

### 🤖 **Smart Responses**
- Intelligent FAQ system with keyword matching
- Natural language understanding
- Context-aware responses
- Multiple response variations

### 💬 **Interactive UI**
- Beautiful gradient design matching portfolio theme
- Smooth animations and transitions
- Typing indicators
- Message timestamps
- Quick action buttons

### 🎨 **Design Elements**
- Floating chat button with pulse animation
- Minimizable chat window
- Glassmorphism effects
- Gradient backgrounds
- Custom scrollbar
- Responsive design

### 📱 **User Experience**
- Welcome notification on page load
- Chat history preservation
- Clear chat functionality
- Quick suggestion buttons
- Real-time typing feedback
- Online status indicator

## Supported Queries

The chatbot can answer questions about:

- **Skills & Technologies**: "What are your skills?", "Tell me about technologies"
- **Experience**: "What's your experience?", "How many years?"
- **Projects**: "Show me your projects", "What have you built?"
- **Education**: "What's your education?", "Where did you study?"
- **Contact**: "How can I contact?", "What's your email?"
- **Availability**: "Are you available?", "Can I hire you?"
- **Resume**: "Can I see your resume?", "Download CV"
- **General**: "Hello", "Hi", "Help", "Thanks", "Bye"

## Customization

### Adding New Responses

Edit the `faqResponses` object in `chatbot.component.ts`:

```typescript
private faqResponses: { [key: string]: string } = {
  'keyword': 'Your response here',
  // Add more keywords and responses
};
```

### Styling

Modify `chatbot.component.scss` for custom styling:
- Change colors in the gradient classes
- Adjust animation timings
- Customize scrollbar appearance

### AI Integration (Optional)

To integrate with real AI APIs like OpenAI, Gemini, or Claude:

1. Add your API key to environment files
2. Replace `generateResponse()` method with API call
3. Handle streaming responses for real-time typing effect

Example:
```typescript
private generateResponse(input: string): Observable<string> {
  return this.http.post('YOUR_AI_API_ENDPOINT', {
    prompt: input,
    // API parameters
  });
}
```

## Future Enhancements

- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Chat history persistence (localStorage)
- [ ] File attachment support
- [ ] Rich media responses (images, links)
- [ ] Integration with backend analytics
- [ ] Real AI/ML integration
- [ ] Sentiment analysis
- [ ] Conversation context memory
