import { Component } from '@angular/core';
import { ProjectsComponent } from '../../components/projects/projects.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [ProjectsComponent],
  template: `<div class="pt-20"><app-projects></app-projects></div>`
})
export class ProjectsPageComponent {}
