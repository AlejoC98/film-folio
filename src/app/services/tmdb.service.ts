import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Movie, MovieCast, MovieTrailer } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class TMDBService {

  private headers: HttpHeaders;

  private params: HttpParams = new HttpParams()
  .append('language', 'en-US')
  .append('page', '1');

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + environment.TMDB.access_token
    });
  }

  getTrendingMovies(): Observable<any> {
    return this.http.get<Movie[]>('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
      headers: this.headers
    }).pipe(
      map((response: any) => {
        return response.results;
      })
    )
  }

  // async createSession() {
  //   const response = await axios.get('https://api.themoviedb.org/3/authentication/token/new', {
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: 'Bearer ' + environment.TMDB.access_token
  //     }
  //   });

  //   await axios.post('https://api.themoviedb.org/3/authentication/session/new', {
  //     headers: {
  //       Accept: 'application/json',
  //       contentType: 'application/json',
  //       Authorization: 'Bearer ' + environment.TMDB.access_token
  //     },
  //     body: JSON.stringify({ request_token: response.data.request_token })
  //   }).then((res) => {
  //     // console.log(res.data);
  //   }).catch((err) => {
  //     // console.log(err);
  //   })

  // }

  search(keyword: string): Observable<any> {

    this.params = this.params.set('query', keyword);

    return this.http.get<Movie[]>('https://api.themoviedb.org/3/search/movie', { 
      params: this.params, 
      headers: this.headers
    }).pipe(
      map((response: any) => {
        return response.results;
      })
    )
  }

  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
      headers: this.headers
    });
  }

  getMovieTrailer(id: string): Observable<any> {
    return this.http.get<MovieTrailer[]>(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
      headers: this.headers
    }).pipe(
      map((response: any) => {
        if (response.results && Array.isArray(response.results)) {
          return response.results.filter((trailer: any) => trailer.type === 'Trailer');
        } else {
          return [];
        }
      })
    );
  }

  getMovieCast(id: string): Observable<any> {
    return this.http.get<MovieCast[]>(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
      headers: this.headers
    }).pipe(
      map((response: any) => {
        return response.cast;
      })
    )
  }

}