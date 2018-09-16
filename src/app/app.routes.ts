import { Routes } from '@angular/router';
import { RestaurantComponent } from './components/restaurant/restaurant.component';

export const AppRoutes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantComponent
  },
  {
    path: '',
    redirectTo: '/restaurants',
    pathMatch: 'full'
  }
];
