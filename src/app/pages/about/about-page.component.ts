import { Component } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [AboutComponent],
  template: `<div class="pt-20"><app-about></app-about></div>`
})
export class AboutPageComponent {}
