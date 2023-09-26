import { Component, OnInit } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, forkJoin } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { TMDBService } from 'src/app/services/tmdb.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  watchList: Movie[] = [];

  faTrashCan = faTrashCan;

  constructor(
    private tmdbService: TMDBService,
    private spinner: NgxSpinnerService
  ) {}

  remove(movie_id: number): void {
    const movie = movie_id.toString();
    this.tmdbService.removeMovieFromList('Watchlist', movie).subscribe({
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
    this.tmdbService.getUserMovies('Watchlist').subscribe({
      next: (movies: Array<any>) => {

        if (movies !== undefined && movies.length > 0) {
          const observables: Observable<Movie>[] = movies.map((movieId: string) => {
            return this.tmdbService.getMovieDetails(movieId);
          });
          
          forkJoin(observables).subscribe((movieDetails: Movie[]) => {
            this.watchList = movieDetails;
          });
        } else {
          this.watchList = [];
        }
        this.spinner.hide();
      }
    });
  }

}
