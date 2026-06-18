import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Balu | Angular Developer'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component').then(m => m.AboutPageComponent),
    title: 'About | Balu'
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills-page.component').then(m => m.SkillsPageComponent),
    title: 'Skills | Balu'
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects-page.component').then(m => m.ProjectsPageComponent),
    title: 'Projects | Balu'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component').then(m => m.ContactPageComponent),
    title: 'Contact | Balu'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 | Balu'
  }
];
