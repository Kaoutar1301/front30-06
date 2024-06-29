import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home-component`
  { path: '**', redirectTo: '/home' },

  // other routes...
];
