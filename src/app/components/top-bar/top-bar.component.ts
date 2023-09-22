import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { 
  faBookmark, 
  faHouse, 
  faRightFromBracket, 
  faMagnifyingGlass, 
  faX, 
  faEye
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { TMDBService } from 'src/app/services/tmdb.service';
import { FormControl } from '@angular/forms';
import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-top-bar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  
  faRightFromBracket = faRightFromBracket;
  faMagnifyingGlass = faMagnifyingGlass;
  faX = faX;
  faEye = faEye;

  constructor(
    public auhtService: AuthService,
    private tmdbService: TMDBService
  ) {}

  keyword = new FormControl('');

  searchContent: Movie[] | undefined;

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
    {
      name: 'Watched',
      icon: faEye,
      link: './Watched'
    },
  ];

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  serachMovie() {
    this.tmdbService.search(this.keyword.value!).subscribe({
      next: (movies: Movie[]) => {
        this.searchContent = movies;
        console.log(movies);
      }
    });

    // this.tmdbService.search(this.keyword.value!).then((res) => {
    //   this.searchContent = res.data.results;
    // }).catch((err) => {
    //   console.log(err);
    // })
  }
}
