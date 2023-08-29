import { Component } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { faBookmark, faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  
  faRightFromBracket = faRightFromBracket;

  constructor(public auhtService: AuthService) {}

  menuItems: MenuItem[] = [
    {
      name: 'Home',
      icon: faHouse,
      link: './Home'
    },
    {
      name: 'Favorites',
      icon: faBookmark,
      link: './Favorites'
    },
  ];
}
