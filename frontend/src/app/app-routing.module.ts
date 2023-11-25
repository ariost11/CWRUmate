import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './shared/auth/auth.guard'

const routes: Routes = [
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent/*, canActivate:[AuthGuard]*/},
  {path: 'messages', component: MessagesComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
