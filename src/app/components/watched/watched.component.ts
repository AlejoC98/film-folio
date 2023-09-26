import { Component, OnInit } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, forkJoin } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { TMDBService } from 'src/app/services/tmdb.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.scss']
})
export class WatchedComponent implements OnInit {

  watchedMovies: Movie[] = [];

  faTrashCan = faTrashCan;

  constructor(
    private tmdbService: TMDBService,
    private spinner: NgxSpinnerService
  ) {}

  remove(movie_id: number): void {
    const movie = movie_id.toString();
    this.tmdbService.removeMovieFromList('Watched', movie).subscribe({
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
    this.tmdbService.getUserMovies('Watched').subscribe({
      next: (movies: Array<any>) => {

        if (movies !== undefined && movies.length > 0) {
          const observables: Observable<Movie>[] = movies.map((movieId: string) => {
            return this.tmdbService.getMovieDetails(movieId);
          });
          
          forkJoin(observables).subscribe((movieDetails: Movie[]) => {
            this.watchedMovies = movieDetails;
          });
        } else {
          this.watchedMovies = [];
        }
        this.spinner.hide();
      }
    });
  }
}
