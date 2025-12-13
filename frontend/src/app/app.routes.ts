import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { CartComponent } from './pages/cart/cart';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'Alejandro Showcase - Full Stack Developer',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Carrito - Alejandro Showcase',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
