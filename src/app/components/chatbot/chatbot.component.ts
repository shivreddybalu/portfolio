import { Component, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AiService } from '../../services/ai.service';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  isOpen = false;
  isMinimized = false;
  userInput = '';
  messages: Message[] = [];
  isTyping = false;
  isBrowser: boolean;
  private shouldScroll = false;
  isApiConfigured = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient,
    private aiService: AiService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.isApiConfigured = this.aiService.isApiConfigured();
    
    // Welcome message
    setTimeout(() => {
      if (!this.isOpen) {
        this.showWelcomeNotification();
      }
    }, 3000);
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  showWelcomeNotification() {
    // This would show a subtle notification
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.addBotMessage('Hello! 👋 I\'m Shiv AI, Balu\'s intelligent assistant. How can I help you today?');
      this.shouldScroll = true;
    }
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage: Message = {
      text: this.userInput,
      sender: 'user',
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    this.shouldScroll = true;
    
    const input = this.userInput;
    this.userInput = '';

    // Show typing indicator
    this.isTyping = true;

    // Call AI service for real-time response
    this.aiService.sendMessage(input).subscribe({
      next: (response) => {
        this.isTyping = false;
        this.addBotMessage(response);
        this.shouldScroll = true;
      },
      error: (error) => {
        console.error('AI Error:', error);
        this.isTyping = false;
        this.addBotMessage('Sorry, I\'m having trouble connecting right now. Please try again or use the contact form to reach Balu directly.');
        this.shouldScroll = true;
      }
    });
  }

  private generateResponse(input: string): string {
    // This method is no longer used but kept for reference
    return 'Connected to real-time AI!';
  }

  private addBotMessage(text: string) {
    const botMessage: Message = {
      text,
      sender: 'bot',
      timestamp: new Date()
    };
    this.messages.push(botMessage);
  }

  private scrollToBottom() {
    if (this.isBrowser && this.messagesContainer) {
      try {
        const container = this.messagesContainer.nativeElement;
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 100);
      } catch (err) { 
        console.error('Scroll error:', err);
      }
    }
  }

  clearChat() {
    this.messages = [];
    this.addBotMessage('Chat cleared! How can I help you?');
    this.shouldScroll = true;
  }
}
