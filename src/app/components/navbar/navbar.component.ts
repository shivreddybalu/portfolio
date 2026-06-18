import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
  nav: any[] = [];
  resume = '';
  resumeUrl = '';
  scrolled = false;
  menuOpen = false;
  private isBrowser: boolean;

  displayedName = '';
  currentLang = '';
  langColor = 'text-violet-400';
  animClass = 'anim-slide-up';
  isAnimating = false;

  private names = [
    { text: 'Balu Shivareddy',     lang: 'English',   color: 'text-violet-400',  anim: 'anim-slide-up'    },
    { text: 'బాలు శివారెడ్డి',       lang: 'Telugu',    color: 'text-emerald-400', anim: 'anim-zoom-in'     },
    { text: 'बालू शिवारेड्डी',        lang: 'Hindi',     color: 'text-orange-400',  anim: 'anim-rotate-in'   },
    { text: 'பாலு சிவாரெட்டி',        lang: 'Tamil',     color: 'text-rose-400',    anim: 'anim-blur-in'     },
    { text: 'ಬಾಲು ಶಿವಾರೆಡ್ಡಿ',        lang: 'Kannada',   color: 'text-amber-400',   anim: 'anim-bounce-in'   },
    { text: 'ബാലു ശിവാരെഡ്ഡി',        lang: 'Malayalam', color: 'text-cyan-400',    anim: 'anim-flip-y'      },
    { text: 'বালু শিভারেড্ডি',         lang: 'Bengali',   color: 'text-pink-400',    anim: 'anim-wave-in'     },
    { text: 'બાલુ શિવારેડ્ડી',        lang: 'Gujarati',  color: 'text-lime-400',    anim: 'anim-slide-left'  },
    { text: 'ਬਾਲੂ ਸ਼ਿਵਾਰੈੱਡੀ',        lang: 'Punjabi',   color: 'text-sky-400',     anim: 'anim-slide-right' },
    { text: 'ବାଲୁ ଶିଭାରେଡ୍ଡି',         lang: 'Odia',      color: 'text-fuchsia-400', anim: 'anim-fade-drop'   },
  ];

  private nameIndex = 0;
  private timer: any;

  constructor(
    private data: DataService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.data.getPortfolio().subscribe(p => {
      this.nav = p.nav;
      this.resume = p.resume;
      // Handle base href for GitHub Pages deployment
      const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
      this.resumeUrl = baseHref === '/' ? this.resume : `${baseHref}${this.resume}`;
    });
    if (this.isBrowser) {
      this.setName(0);
      this.timer = setTimeout(() => this.cycleNextName(), 2500);
    }
  }

  setName(index: number) {
    const n = this.names[index];
    this.displayedName = n.text;
    this.currentLang   = n.lang;
    this.langColor     = n.color;
    this.animClass     = n.anim;
  }

  cycleNextName() {
    this.isAnimating = true;
    setTimeout(() => {
      this.nameIndex = (this.nameIndex + 1) % this.names.length;
      this.setName(this.nameIndex);
      this.isAnimating = false;
      this.timer = setTimeout(() => this.cycleNextName(), 2200);
    }, 400);
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.isBrowser) this.scrolled = window.scrollY > 50;
  }

  navigate(route: string) {
    this.menuOpen = false;
    this.router.navigateByUrl(route);
  }

  isHome(route: string) { return route === '/'; }
  ngOnDestroy() { clearTimeout(this.timer); }
}
