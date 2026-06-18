import { Component } from '@angular/core';
import { SkillsComponent } from '../../components/skills/skills.component';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [SkillsComponent],
  template: `<div class="pt-20"><app-skills></app-skills></div>`
})
export class SkillsPageComponent {}
