import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gray-950 flex items-center justify-center text-center px-6">
      <div>
        <p class="text-8xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">404</p>
        <h1 class="text-2xl font-bold text-white mt-4 mb-2">Page Not Found</h1>
        <p class="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
        <a routerLink="/"
          class="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:from-violet-500 hover:to-purple-500 transition-all">
          ← Back to Home
        </a>
      </div>
    </div>
  `
})
export class NotFoundComponent {}
