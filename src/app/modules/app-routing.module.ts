import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '',  redirectTo: 'Login', pathMatch: 'full'},
  { path: 'Login', component: LoginComponent, canActivate: [ authGuard ] },
  { path: 'Home', component: HomeComponent, canActivate: [ authGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
