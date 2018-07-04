import { Route } from '@angular/router';

export const routes: Route[] = [
  // {
  //   path: '',
  //   loadChildren: './tinder/tinder.module#TinderModule'
  // },
  {
    path: '',
    redirectTo: '/targets/1',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'users/:userId',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'targets/:targetId',
    loadChildren: './tinder/tinder.module#TinderModule'
  }
];
