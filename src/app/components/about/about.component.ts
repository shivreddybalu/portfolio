import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  portfolio: any = {};
  resumeUrl = '';
  
  constructor(private data: DataService) {}
  
  ngOnInit() {
    this.data.getPortfolio().subscribe(p => {
      this.portfolio = p;
      // Handle base href for GitHub Pages deployment
      const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
      this.resumeUrl = baseHref === '/' ? p.resume : `${baseHref}${p.resume}`;
    });
  }
}
