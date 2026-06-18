import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import portfolio from '../../assets/data/portfolio.json';
import skills from '../../assets/data/skills.json';
import projects from '../../assets/data/projects.json';

@Injectable({ providedIn: 'root' })
export class DataService {
  getPortfolio(): Observable<any> {
    return of(portfolio);
  }

  getSkills(): Observable<any[]> {
    return of(skills);
  }

  getProjects(): Observable<any[]> {
    return of(projects);
  }
}
