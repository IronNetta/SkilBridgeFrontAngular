import { Routes } from '@angular/router';
import { isConnectedGuard } from './features/shared/guards/is-connected.guard';

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
    loadComponent: () => import('./features/mentors/pages/mentor-list/mentor-list.component').then(m => m.MentorListComponent),
    canActivate: [isConnectedGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/user/pages/profil/profil.component').then(m => m.ProfilComponent),
    canActivate: [isConnectedGuard]
  },
  {
    path: 'mentor/availabilities',
    loadComponent: () => import('./features/mentors/calendar/mentor-availability-calendar/mentor-availability-calendar.component').then(m => m.MentorAvailabilityCalendarComponent),
    canActivate: [isConnectedGuard]
  }

];
