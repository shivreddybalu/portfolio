import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private geminiApiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent';
  private apiKey = environment.geminiApiKey;
  
  // Context about Balu for the AI
  private systemContext = `You are Shiv AI, an intelligent assistant for Balu Sivaiah's portfolio website.

About Balu Sivaiah:
- Name: Balu Sivaiah
- Title: Software Engineer – Angular & Frontend Developer
- Tagline: 4+ years building scalable Angular apps | Migrated AngularJS → Angular 19 | 40% performance boost
- Location: Hyderabad, India
- Email: balushivareddy@gmail.com
- Phone: +91 9010944657
- LinkedIn: https://www.linkedin.com/in/balu-sivaiah-47a4531a8

Professional Summary:
Software Engineer with 4+ years of experience in frontend development specializing in Angular, TypeScript, and modern UI frameworks. Proven track record of improving application performance by 40% through large-scale migration from AngularJS to Angular 19. Passionate about delivering scalable, high-quality solutions by leveraging expertise in UI optimization, testing frameworks, and seamless API integrations.

Current Experience:
- Company: Tech Mahindra
- Role: Software Engineer
- Project: Nissan – Application Modernization
- Duration: Dec 2021 – Present
- Key Achievements:
  * Migrated enterprise apps from AngularJS/Angular 4 to Angular 17–20, delivering 40% performance improvement
  * Built reusable components, services, and pipes in TypeScript with RxJS and NgRx
  * Achieved 90%+ code coverage using Karma and Jasmine
  * Integrated RESTful APIs with Java/Spring Boot backends
  * Used AWS Kiro with Autopilot and Supervised Modes for AI-driven development
  * Applied Spec-Driven Development and MCP (Model Context Protocol)

Skills (organized by category):

Frontend Development:
- Angular 12+ (95% proficiency)
- TypeScript (92%)
- JavaScript (90%)
- RxJS (88%)
- NgRx (85%)
- Standalone Components (88%)

UI & Styling:
- Angular Material (92%)
- Tailwind CSS (88%)
- AG Grid (85%)
- HTML5 / CSS3 (95%)
- SCSS (88%)

Testing & Tools:
- Karma & Jasmine (90%)
- Git & Bitbucket (88%)
- Jenkins (70%)
- AWS Monitoring (78%)
- VS Code (95%)

AI & Cloud:
- AWS Kiro (85%)
- Amazon Q (85%)
- GitHub Copilot (82%)
- MCP Integration (78%)
- AWS Practitioner (88%)

Certifications:
- AWS Certified Cloud Practitioner (May 2024 – May 2027)

Education:
- B.Tech – Computer Science
- Bharath Institute of Higher Education and Research, Chennai, India
- May 2017 – May 2021

Your role:
- PRIMARY: Answer questions about Balu's skills, experience, projects, and background accurately
- SECONDARY: You can answer general questions on any topic - technology, science, current events, weather, entertainment, etc.
- Be helpful, professional, and friendly for all types of questions
- For portfolio questions: Guide visitors to relevant sections (Skills, Projects, About, Contact)
- For general questions: Provide helpful, accurate answers naturally
- Keep responses concise but informative (2-4 sentences)
- When asked about Balu's skills, provide accurate details from the skills list above
- If a general question relates to Balu's expertise, you can mention it naturally
- You're an AI assistant on a portfolio site, so you can chat about anything while representing Balu professionally

Remember: Maintain a warm, professional, and helpful tone for all conversations.`;

  constructor(private http: HttpClient) {}

  /**
   * Send message to Gemini AI and get response
   */
  sendMessage(userMessage: string): Observable<string> {
    // Check if API key is configured and valid
    if (!this.apiKey || this.apiKey === 'YOUR_GEMINI_API_KEY_HERE' || this.apiKey.length < 30) {
      console.warn('Gemini API key not configured or invalid. Using fallback responses.');
      return of(this.getFallbackResponse(userMessage));
    }

    const prompt = `${this.systemContext}

User Question: ${userMessage}

Please provide a helpful response as Shiv AI:`;

    const body = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 200,
        topP: 0.8,
        topK: 40
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${this.geminiApiUrl}?key=${this.apiKey}`;

    return this.http.post<any>(url, body, { headers }).pipe(
      map(response => {
        console.log('Gemini API Response:', response);
        if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
          return response.candidates[0].content.parts[0].text.trim();
        }
        throw new Error('Invalid response format from Gemini API');
      }),
      catchError(error => {
        console.error('Gemini API Error:', error);
        console.error('Error Status:', error.status);
        console.error('Error Details:', error.error);
        
        // Provide helpful error message based on status
        if (error.status === 400) {
          console.error('Bad Request - Check API key format or request structure');
        } else if (error.status === 403) {
          console.error('Forbidden - API key may be invalid or restricted');
        } else if (error.status === 429) {
          console.error('Rate limit exceeded - Too many requests');
        }
        
        return of(this.getFallbackResponse(userMessage));
      })
    );
  }

  /**
   * Fallback responses when API is not available
   */
  private getFallbackResponse(input: string): string {
    const lowerInput = input.toLowerCase();

    const responses: { [key: string]: string } = {
      'hello': 'Hi there! 👋 I\'m Shiv AI, Balu\'s intelligent assistant. How can I help you today?',
      'hi': 'Hello! 👋 I\'m here to answer questions about Balu. What would you like to know?',
      'skills': 'Balu is proficient in:\n• Frontend: Angular 12+, TypeScript, JavaScript, RxJS, NgRx\n• UI/Styling: Angular Material, Tailwind CSS, AG Grid, SCSS\n• Testing: Karma & Jasmine (90%+ coverage)\n• AI/Cloud: AWS Kiro, Amazon Q, GitHub Copilot, AWS Certified\n\nWould you like more details?',
      'experience': 'Balu has 4+ years of professional experience as a Software Engineer at Tech Mahindra, specializing in Angular development. He successfully migrated enterprise apps from AngularJS to Angular 19, achieving a 40% performance improvement and 90%+ test coverage.',
      'projects': 'Balu has worked on the Nissan Application Modernization project at Tech Mahindra, focusing on migrating legacy applications to modern Angular versions with 40% performance gains. Check out the Projects section for more details!',
      'contact': 'You can reach Balu through:\n• Email: Available in the Contact section\n• LinkedIn: Check the footer\n• Contact Form: Fill out the form below\n\nFeel free to reach out!',
      'education': 'Balu holds a B.Tech in Computer Science from Bharath Institute of Higher Education and Research, Chennai (May 2017 – May 2021). He is also AWS Certified Cloud Practitioner (valid until May 2027).',
      'hire': 'Great! Balu is currently available for new opportunities. Please head to the Contact section to send a message or download his resume from the About section.',
      'location': 'Balu is based in Hyderabad, India and is open to remote opportunities worldwide.',
      'help': 'I can help you with:\n• Information about Balu\'s skills and experience\n• Details about his projects\n• Contact information\n• Educational background\n\nWhat would you like to know?',
      'who': 'Balu Sivaiah is a passionate Software Engineer with 4+ years of experience specializing in Angular and frontend development. He currently works at Tech Mahindra on the Nissan Application Modernization project.',
      'what': 'Balu creates scalable Angular applications with modern technologies like TypeScript, RxJS, NgRx, Angular Material, and Tailwind CSS. He specializes in application modernization and performance optimization.',
      'available': 'Yes! Balu is currently available for new opportunities and open to remote work worldwide.',
      'resume': 'You can download Balu\'s resume from the About section. Just scroll down to find the download button!',
      'thanks': 'You\'re welcome! 😊 Is there anything else you\'d like to know?',
      'bye': 'Goodbye! 👋 Feel free to come back if you have more questions. Have a great day!'
    };

    // Check for keyword matches
    for (const [key, response] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }

    // Default response
    return 'That\'s a great question! I can help you with information about Balu\'s skills, experience, projects, education, and contact details. What would you like to know?';
  }

  /**
   * Check if API is configured
   */
  isApiConfigured(): boolean {
    return this.apiKey !== 'YOUR_GEMINI_API_KEY_HERE' && 
           this.apiKey.length > 30 &&
           this.apiKey.startsWith('AIza');
  }
}
