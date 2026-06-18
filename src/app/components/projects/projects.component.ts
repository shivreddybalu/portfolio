import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  showAll = false;
  constructor(private data: DataService) {}
  ngOnInit() { this.data.getProjects().subscribe(p => this.projects = p); }
  get displayed() { return this.showAll ? this.projects : this.projects.slice(0, 3); }
}
