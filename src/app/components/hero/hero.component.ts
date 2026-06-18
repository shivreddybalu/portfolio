import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent implements OnInit, OnDestroy {
  portfolio: any = {};
  displayedTitle = '';
  particles: { x: number; y: number; size: number; duration: number; delay: number; color: string }[] = [];

  private titles = ['Angular Developer', 'UI Enthusiast'];
  private titleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: any;

  constructor(
    private data: DataService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    this.data.getPortfolio().subscribe(p => {
      this.portfolio = p;
      this.titles[0] = p.title || this.titles[0];
    });
    if (isPlatformBrowser(this.platformId)) {
      this.typeWriter();
      this.generateParticles();
    }
  }

  generateParticles() {
    const colors = ['rgba(139,92,246,0.6)', 'rgba(6,182,212,0.6)', 'rgba(167,139,250,0.5)', 'rgba(103,232,249,0.5)'];
    this.particles = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 8,
      color: colors[i % colors.length]
    }));
  }

  typeWriter() {
    const current = this.titles[this.titleIndex];
    if (this.isDeleting) {
      this.displayedTitle = current.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.displayedTitle = current.substring(0, this.charIndex + 1);
      this.charIndex++;
    }
    let speed = this.isDeleting ? 60 : 100;
    if (!this.isDeleting && this.charIndex === current.length) {
      speed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.titleIndex = (this.titleIndex + 1) % this.titles.length;
      speed = 400;
    }
    this.timer = setTimeout(() => this.typeWriter(), speed);
  }

  navigate(route: string) { this.router.navigateByUrl(route); }
  ngOnDestroy() { clearTimeout(this.timer); }
}
