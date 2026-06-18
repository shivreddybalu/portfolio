import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService } from '../../services/data.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './skills.component.html'
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  skillGroups: any[] = [];
  private observer!: IntersectionObserver;
  private isBrowser: boolean;
  
  @ViewChildren('skillBar') skillBars!: QueryList<ElementRef>;

  constructor(
    private data: DataService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() { 
    this.data.getSkills().subscribe(s => {
      this.skillGroups = s;
      // Initialize all skill levels to 0 for animation
      this.skillGroups.forEach(group => {
        group.items.forEach((skill: any) => {
          skill.currentLevel = 0;
          skill.targetLevel = skill.level;
        });
      });
    });
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const barElement = entry.target as HTMLElement;
          const targetLevel = parseInt(barElement.getAttribute('data-level') || '0');
          this.animateBar(barElement, targetLevel);
          this.observer.unobserve(barElement);
        }
      });
    }, { threshold: 0.2 });

    // Observe all skill bars
    this.skillBars.forEach(bar => {
      this.observer.observe(bar.nativeElement);
    });
  }

  private animateBar(element: HTMLElement, targetLevel: number) {
    let currentLevel = 0;
    const duration = 1500; // 1.5 seconds
    const increment = targetLevel / (duration / 16); // ~60fps
    
    const animate = () => {
      currentLevel += increment;
      if (currentLevel >= targetLevel) {
        element.style.width = `${targetLevel}%`;
      } else {
        element.style.width = `${currentLevel}%`;
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
