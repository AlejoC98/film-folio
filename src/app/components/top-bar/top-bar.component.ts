import { Component } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { faBookmark, faHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
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
