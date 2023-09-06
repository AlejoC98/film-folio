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
  movieRate: number = 0;
  releaseDate: Date = new Date();
  ratingDisplay: number = 0;
  movie: Movie | undefined;
  movieTrailer: MovieTrailer | undefined;
  movieCast: MovieCast[] = [];
  movieReviews: MovieReviews[] = [];

  // Forms
  movieReviewFc = new FormControl('');

  getYoutubeEmbedURL(): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${this.movieTrailer?.key}?controls=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onRatingSet(rating: number): void {
    this.tmdbService.createMovieRating(this.movieID, rating);
  }

  submitMovieReview(): void {
    this.tmdbService.createMovieReview('sdfsdfvc', {username: 'alejo'}, this.movieReviewFc.value!);
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
        // Movie Reviews
        this.tmdbService.getMovieReviews(this.movieID).subscribe({
          next: (reviews: MovieReviews[]) => this.movieReviews = reviews
        });
      }
    });

  }

}
