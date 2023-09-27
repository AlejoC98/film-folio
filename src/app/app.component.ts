import { Component } from '@angular/core';
import { faMagnifyingGlass, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth.service';
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchModalComponent]
})
export class AppComponent {
  title = 'FilmFolio';

  constructor(
    public auhtService: AuthService,
    public searchModal: SearchModalComponent,
    public modalService: ModalService,
  ) {}

  faXmark = faXmark;
  faMagnifyingGlass = faMagnifyingGlass;
  faRightFromBracket = faRightFromBracket;

  toggleMenu() {
    document.querySelector('.mobile-container')?.classList.toggle('show');
    document.querySelector('.burger-menu')?.classList.toggle('show');
  }

  openModal() {
    this.modalService.toggleModal();
    this.toggleMenu();
  }

  logOut() {
    document.querySelector('.mobile-container')?.classList.toggle('show');
    this.auhtService.logout();
  }
  
}
