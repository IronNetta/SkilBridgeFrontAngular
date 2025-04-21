import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'mentors',
    loadComponent: () => import('./features/mentors/pages/mentor-list/mentor-list.component').then(m => m.MentorListComponent)
  },
];
