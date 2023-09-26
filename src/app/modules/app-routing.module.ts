import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { authGuard } from '../guards/auth.guard';
import { MovieDetailsComponent } from '../components/movie-details/movie-details.component';
import { TmdbcallbackComponent } from '../components/tmdbcallback/tmdbcallback.component';
import { AuthComponent } from '../components/auth/auth.component';
import { SignupComponent } from '../components/signup/signup.component';
import { WatchlistComponent } from '../components/watchlist/watchlist.component';
import { WatchedComponent } from '../components/watched/watched.component';

const routes: Routes = [
  // { path: '',  redirectTo: 'Login', pathMatch: 'full'},
  { path: '', component: AuthComponent, canActivate: [ authGuard ]},
  { path: 'Login', component: LoginComponent, canActivate: [ authGuard ] },
  { path: 'SignUp', component: SignupComponent, canActivate: [ authGuard ] },
  { path: 'Home', component: HomeComponent, canActivate: [ authGuard ] },
  { path: 'Movie/:id', component: MovieDetailsComponent },
  { path: 'Watchlist', component: WatchlistComponent },
  { path: 'Watched', component: WatchedComponent },
  { path: 'TMDBCallback', component: TmdbcallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }