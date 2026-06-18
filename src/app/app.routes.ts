import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Shiv Kumar | Angular Developer'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component').then(m => m.AboutPageComponent),
    title: 'About | Shiv Kumar'
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills-page.component').then(m => m.SkillsPageComponent),
    title: 'Skills | Shiv Kumar'
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects-page.component').then(m => m.ProjectsPageComponent),
    title: 'Projects | Shiv Kumar'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component').then(m => m.ContactPageComponent),
    title: 'Contact | Shiv Kumar'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 | Shiv Kumar'
  }
];
