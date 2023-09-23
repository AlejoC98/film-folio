import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { TMDBService } from 'src/app/services/tmdb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-watched-movies',
  templateUrl: './watched-movies.component.html',
  styleUrls: ['./watched-movies.component.scss']
})
export class WatchedMoviesComponent implements OnInit {

  watchedMovies: Movie[] = [];

  faTrashCan = faTrashCan;

  constructor(
    private tmdbService: TMDBService,
    private spinner: NgxSpinnerService
  ) {}

  remove(movie_id: number): void {
    const movie = movie_id.toString();
    this.tmdbService.removeWatched(movie).subscribe({
      next: (res: boolean) => {
        if (res) {
          Swal.fire({
            title: 'Removed!',
            text: 'Movie removed',
            icon: 'warning',
            confirmButtonText: 'Close'
          });
        }
      }
    })
  }
  
  ngOnInit(): void {
    this.spinner.show();
    this.tmdbService.getWatchedMovies().subscribe({
      next: (movies: Array<any>) => {
        const observables: Observable<Movie>[] = movies.map((movieId: string) => {
          return this.tmdbService.getMovieDetails(movieId);
        });
        
        forkJoin(observables).subscribe((movieDetails: Movie[]) => {
          this.watchedMovies = movieDetails;
          this.spinner.hide();
        });
      }
    })
  }

}
