import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective],
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  portfolio: any = {};
  year = new Date().getFullYear();
  private isBrowser: boolean;

  constructor(
    private data: DataService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.data.getPortfolio().subscribe(p => this.portfolio = p);
  }

  navigate(route: string) {
    this.router.navigateByUrl(route);
  }

  scrollTop() {
    if (this.isBrowser) window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
