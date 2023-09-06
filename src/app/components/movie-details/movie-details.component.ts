import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieCast, MovieTrailer } from 'src/app/interfaces/movie';
import { TMDBService } from 'src/app/services/tmdb.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-movie-details',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TMDBService,
    private sanitizer: DomSanitizer
  ) {}

  @Input()

  faChevronLeft = faChevronLeft;
  movieRate: number = 0;
  releaseDate: Date = new Date();
  
  movie: Movie | undefined;
  movieTrailer: MovieTrailer | undefined;
  movieCast: MovieCast[] = [];

  getYoutubeEmbedURL(): SafeResourceUrl {

    const url = `https://www.youtube.com/embed/${this.movieTrailer?.key}?controls=0`;
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.tmdbService.getMovieDetails(this.route.snapshot.params['id']).subscribe({
      next: (movie: Movie) => {
        this.movie = movie;
        // Getting movie trailer
        this.tmdbService.getMovieTrailer(this.route.snapshot.params['id']).subscribe(trailers => {
          this.movieTrailer = trailers[Math.floor(Math.random() * trailers.length)];
        });
        // Movie cast
        this.tmdbService.getMovieCast(this.route.snapshot.params['id']).subscribe({
          next: (cast: MovieCast[]) => this.movieCast = cast
        });
      }
    });

  }

}
