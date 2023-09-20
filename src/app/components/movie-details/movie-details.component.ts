import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieCast, MovieReviews, MovieTrailer } from 'src/app/interfaces/movie';
import { TMDBService } from 'src/app/services/tmdb.service';
import { faChevronLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-movie-details',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  private movieID: string = '';

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TMDBService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.movieID = this.route.snapshot.params['id'];
  }

  @Input()

  // Icons
  faChevronLeft = faChevronLeft;
  faPaperPlane = faPaperPlane;

  // Variables
  movieRate: number | undefined;
  releaseDate: Date = new Date();
  ratingDisplay: number | undefined;
  movie: Movie | undefined;
  movieTrailer: MovieTrailer | undefined;
  movieCast: MovieCast[] = [];
  globalMovieReviews: MovieReviews[] = [];
  localMovieReviews: MovieReviews[] = [];

  // Forms
  movieReviewFc = new FormControl('');

  getYoutubeEmbedURL(): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${this.movieTrailer?.key}?controls=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onRatingSet(rating: number): void {
    this.tmdbService.createMovieRating(this.movieID, rating);
    this.movieRate = rating;
  }

  submitMovieReview(): void {
    let data = this.tmdbService.createMovieReview(this.movieID, this.movieReviewFc.value!, this.movieRate);
    let newReview: MovieReviews = data;
    this.localMovieReviews.push(newReview);

    this.movieReviewFc.reset();
  }

  ngOnInit(): void {
    this.tmdbService.getMovieDetails(this.movieID).subscribe({
      next: (movie: Movie) => {
        this.movie = movie;
        // Getting movie trailer
        this.tmdbService.getMovieTrailer(this.movieID).subscribe(trailers => {
          this.movieTrailer = trailers[Math.floor(Math.random() * trailers.length)];
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
            this.localMovieReviews = reviews.reviews;
            // console.log(reviews.reviews);
          }
        });
        // Get movie rates
        this.tmdbService.getMovieRating(this.movieID).subscribe({
          next: (rate: number) => {
            this.ratingDisplay = rate;
            this.movieRate = rate;
          }
        });
      }
    });

  }

}
