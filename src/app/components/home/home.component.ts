import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { AuthService } from 'src/app/services/auth.service';
import { TMDBService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularMovies: Movie[] = [];

  constructor (
    public authService: AuthService,
    private tmdbService: TMDBService
  ) {
    this.tmdbService.createSession();
  }
  
  ngOnInit(): void {
    this.tmdbService.getPopularMovie().then((res) => {
      this.popularMovies = res.data.results;
      console.log(res.data.results);
    }).catch((err) => {
      console.log(err);
    })
  }
}
