import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ErrorPageComponent } from '../core/error-page/error-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './auth-guard.service';


const authRoutes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found'} //last one on array on Routes, means every single unknown path
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  providers: [AuthGuard],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
