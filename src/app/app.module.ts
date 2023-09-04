import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { CoreuiModule } from './modules/coreui/coreui.module';
import { LoginComponent } from './components/login/login.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CardComponent } from './components/card/card.component';
import { ListGroupComponen } from './components/list-group/list-group.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { NgxStarsModule } from 'ngx-stars';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopBarComponent,
    HomeComponent,
    CarouselComponent,
    CardComponent,
    ListGroupComponen,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreuiModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxStarsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
