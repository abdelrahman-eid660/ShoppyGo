import { Routes } from '@angular/router';

export const routes: Routes = [
  {path : 'user' , loadChildren : ()=> import('./features/users/users.module').then(user => user.UserModule)},
  { path: '', redirectTo: 'user', pathMatch: 'full' },
];
