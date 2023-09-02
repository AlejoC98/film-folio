import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, Genre } from 'src/app/interfaces/movie';
import { TMDBService } from 'src/app/services/tmdb.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-details',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TMDBService
  ) {}

  @Input()

  faChevronLeft = faChevronLeft;
  
  movie: Movie = {
    adult : false,
    backdrop_path : '',
    belongs_to_collection : null,
    budget : 0,
    genres : [{
      id: 0,
      name: ''
    }],
    homepage : '',
    id : 0,
    imdb_id : '',
    original_language : '',
    original_title : '',
    overview : '',
    popularity : 0,
    poster_path : '',
    production_companies : Object,
    production_countries : [],
    release_date : '',
    revenue : 0,
    runtime : 0,
    spoken_languages : [],
    status : '',
    tagline : '',
    title : '',
    video : false,
    vote_average : 0,
    vote_count : 0,
  };

  ngOnInit(): void {
    this.tmdbService.findMovieDetails(this.route.snapshot.params['id']).then(async (res) => {
      this.movie = res.data;
      // console.log(res.data.genres[0].name);
      console.log(this.movie.genres[0].name);
      let video = await this.tmdbService.getMovieTrailer(this.route.snapshot.params['id']);
      document.getElementById('video')?.setAttribute(
        'src', 
        // `https://www.youtube.com/embed/${ video.key }?controls=0&autoplay=1&mute=1&playsinline=1&loop=1`
        `https://www.youtube.com/embed/${ video.key }?controls=0`
      );
    }).catch((err) => {
      console.log(err);
    });
  }

}
