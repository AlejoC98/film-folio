import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { 
  faBookmark, 
  faHouse, 
  faRightFromBracket, 
  faMagnifyingGlass,
  faEye,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-top-bar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  
  faRightFromBracket = faRightFromBracket;
  faMagnifyingGlass = faMagnifyingGlass;  
  faEye = faEye;
  faBars = faBars;

  constructor(
    public auhtService: AuthService,
    public modalService: ModalService
  ) {}    

  menuItems: MenuItem[] = [
    {
      name: 'Home',
      icon: faHouse,
      link: ['/Home']
    },
    {
      name: 'Watchlist',
      icon: faBookmark,
      link: ['/Watchlist']
    },
    {
      name: 'Watched',
      icon: faEye,
      link: ['/Watched']
    },
  ];

  toggleMenu() {
    document.querySelector('.mobile-container')?.classList.toggle('show');
    document.querySelector('.burger-menu')?.classList.toggle('show');
  }
  
}
