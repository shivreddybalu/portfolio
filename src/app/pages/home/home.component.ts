import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, SkillsComponent, ProjectsComponent, ContactComponent],
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-skills></app-skills>
    <app-projects></app-projects>
    <app-contact></app-contact>
  `
})
export class HomeComponent {}
