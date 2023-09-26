import { Component } from '@angular/core';
import { faMagnifyingGlass, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FilmFolio';

  constructor(
    public auhtService: AuthService,
  ) {}

  faXmark = faXmark;
  faMagnifyingGlass = faMagnifyingGlass;
  faRightFromBracket = faRightFromBracket;

  toggleMenu() {
    document.querySelector('.mobile-container')?.classList.toggle('show');
    document.querySelector('.burger-menu')?.classList.toggle('show');
  }

}
