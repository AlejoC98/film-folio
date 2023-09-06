import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieCast, MovieReviews, MovieTrailer } from 'src/app/interfaces/movie';
import { TMDBService } from 'src/app/services/tmdb.service';
import { faChevronLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


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
    private sanitizer: DomSanitizer
  ) {
    this.movieID = this.route.snapshot.params['id'];
  }

  @Input()

  faChevronLeft = faChevronLeft;
  faPaperPlane = faPaperPlane;
  movieRate: number = 0;
  releaseDate: Date = new Date();
  
  movie: Movie | undefined;
  movieTrailer: MovieTrailer | undefined;
  movieCast: MovieCast[] = [];
  movieReviews: MovieReviews[] = [];

  getYoutubeEmbedURL(): SafeResourceUrl {

    const url = `https://www.youtube.com/embed/${this.movieTrailer?.key}?controls=0`;
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
