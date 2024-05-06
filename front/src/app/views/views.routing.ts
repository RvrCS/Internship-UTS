import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views.component';
import { ErrorComponent } from './error/error.component';
import { AuthService, LoginService } from '../shared/loginService';
import { GetSessionUser } from '../constants/functions';

let routes: Routes = [];


routes = [
  {
    path: '',
    component: ViewsComponent,
    pathMatch: 'full',
  },
  {
    path: 'app', loadChildren: () => import('./app/app.module').then(m => m.AppModule),
    // canActivate: [AuthService]
  },
  // {
  //   path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  //   canActivate: [LoginService]
  // },
  { path: 'error', component: ErrorComponent },

  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
