import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'Alejandro Showcase - Full Stack Developer',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
