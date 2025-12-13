import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { CartComponent } from './pages/cart/cart';
import { ThankYouComponent } from './pages/thank-you/thank-you';

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
    path: 'thank-you',
    component: ThankYouComponent,
    title: 'Gracias por tu Interés - Alejandro Showcase',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
