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

  trendingMovies: Movie[] = [];

  constructor (
    public authService: AuthService,
    private tmdbService: TMDBService
  ) {}
  
  ngOnInit(): void {
    this.tmdbService.getTrendingMovies().subscribe({
      next: (movies: Movie[]) => this.trendingMovies = movies
    });
  }
}
