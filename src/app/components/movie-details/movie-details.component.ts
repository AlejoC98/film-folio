import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieCast, MovieReviews, MovieTrailer } from 'src/app/interfaces/movie';
import { TMDBService } from 'src/app/services/tmdb.service';
import { faChevronLeft, faEye, faPaperPlane, faPlay, faPlus, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-movie-details',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  private movieID: string = '';
  public visible = false;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TMDBService,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService
  ) {
    this.movieID = this.route.snapshot.params['id'];
  }

  @Input()

  // Icons
  faChevronLeft = faChevronLeft;
  faPaperPlane = faPaperPlane;
  faPlay = faPlay;
  faPlus = faPlus;
  faCirclePlay = faCirclePlay;
  faX = faX;
  faEye = faEye;
  faXmark = faXmark;

  // Variables
  watched: boolean = false;
  watchlist: boolean = false;
  movieRate: number | undefined;
  releaseDate: Date | undefined;
  ratingDisplay: number | undefined;
  movie: Movie | undefined;
  movieTrailer: MovieTrailer[] = [];
  movieCast: MovieCast[] = [];
  globalMovieReviews: MovieReviews[] = [];
  localMovieReviews: MovieReviews[] = [];
  movieBudget: string | undefined;
  movieRevenue: string | undefined;

  selectTrailer: MovieTrailer | undefined;

  // Forms
  movieReviewFc = new FormControl('');

  toggleLiveDemo(selected?: MovieTrailer) {
    this.visible = !this.visible;
    this.selectTrailer = selected;    

    if (selected == undefined) {
      document.getElementById('video')?.setAttribute('src', '');
    }

  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  getYoutubeEmbedURL(key?: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${key}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onRatingSet(rating: number): void {
    this.tmdbService.createMovieRating(this.movieID, rating);
    this.movieRate = rating;
  }

  submitMovieReview(): void {
    this.tmdbService.createMovieReview(this.movieID, this.movieReviewFc.value!, this.movieRate);
    this.movieReviewFc.reset();
  }

  handleWatched() {
    this.tmdbService.addUserMovies(this.movieID, 'Watched').subscribe({
      next: (status: boolean) => {
        if (status) {
          Swal.fire({
            title: '',
            text: 'Successfully added to the watched list',
            icon: 'success',
            confirmButtonText: 'close'
          });
        }
      }
    })
  }

  handleMyList() {
    this.tmdbService.addUserMovies(this.movieID, 'Watchlist').subscribe({
      next: (status: boolean) => {
        if (status) {
          Swal.fire({
            title: '',
            text: 'Successfully added to the watch list',
            icon: 'success',
            confirmButtonText: 'close'
          });
        }
      }
    })
  }

  handleRemoveList(): void {
    this.tmdbService.removeMovieFromList('Watchlist', this.movieID).subscribe({
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

    this.tmdbService.getMovieDetails(this.movieID).subscribe({
      next: (movie: Movie) => {
        window.scrollTo(0, 0);

        this.movie = movie;

        this.tmdbService.getUserMovies().subscribe({
          next: (movies: any) => {
            if (movies != undefined) {
              movies = Object(movies);
              this.watched = movies.Watched.includes(this.movieID) ? true : false
              this.watchlist = movies.Watchlist.includes(this.movieID) ? true : false
            }
          }
        });

        this.releaseDate = new Date(movie.release_date);

        const floatBudget = movie.budget.toFixed(2);
        
        const floatRevenue = movie.revenue.toFixed(2);

        this.movieBudget = parseFloat(floatBudget).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        this.movieRevenue = parseFloat(floatRevenue).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        // Getting movie trailer
        this.tmdbService.getMovieTrailer(this.movieID).subscribe(trailers => {
          this.movieTrailer = trailers;
        });
        // Movie cast
        this.tmdbService.getMovieCast(this.movieID).subscribe({
          next: (cast: MovieCast[]) => this.movieCast = cast
        });
        // Global Movie Reviews
        this.tmdbService.getGlobalMovieReviews(this.movieID).subscribe({
          next: (reviews: MovieReviews[]) => this.globalMovieReviews = reviews
        });
        // Local Movie Reviews
        this.tmdbService.getLocalMovieReviews(this.movieID).subscribe({
          next: (reviews: any) => {
            this.localMovieReviews = reviews != undefined ? reviews.reviews : [];
          }
        });
        // Get movie rates
        this.tmdbService.getMovieRating(this.movieID).subscribe({
          next: (rate: number) => {
            this.ratingDisplay = rate;
            this.movieRate = rate;
          }
        });

        this.spinner.hide();
      }
    });

  }

}
