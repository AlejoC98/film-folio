import { Observable, catchError, map, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Movie, MovieCast, MovieReviews, MovieTrailer } from '../interfaces/movie';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TMDBService {

  private headers: HttpHeaders;
  private token: string | undefined;
  sessionID: string  | undefined;

  private params: HttpParams = new HttpParams()
  .append('language', 'en-US')
  .append('page', '1');

  constructor(
    private http: HttpClient,
    private db: AngularFirestore
  ) {
    this.headers = new HttpHeaders({
      Accept: 'application/json:charset=utf-8',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + environment.TMDB.access_token
    });
  }

  updateSessionId(id: string): void {
    this.sessionID = id;
  }

  // createSessionToken(): void {
  //   this.http.get('https://api.themoviedb.org/3/authentication/token/new', {
  //     headers: this.headers
  //   }).subscribe({
  //     next: (token: any) => {
  //       this.token = token.request_token;
        
  //       this.headers.append('content-type', 'application/json');

  //       window.open(`https://www.themoviedb.org/authenticate/${this.token}?redirect_to=http://localhost:4200/TMDBCallback`, '_self');
  //     }
  //   })
  // }

  // createSessionID(token: string): Observable<any> {

  //   const body = { request_token: token };

  //   return this.http.post('https://api.themoviedb.org/3/authentication/session/new', body, {
  //     headers: this.headers,
  //   }).pipe(
  //     catchError((error) => {
  //       console.log(error);
  //       return throwError(error);
  //     })
  //   );
  // }

  getTrendingMovies(): Observable<any> {
    return this.http.get<Movie[]>('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
      headers: this.headers
    }).pipe(
      map((response: any) => {
        return response.results;
      })
    )
  }

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

  getMovieReviews(id: string): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`, {
      headers: this.headers
    }).pipe(
      map((response: any) => {
        return response.results;
      })
    )
  }

  createMovieRating(id: string, rate: number): void {

    this.db.collection('movie-rates').add({
      'movie_id': id,
      'rate': rate
    });
  }

  createMovieReview(id: string, user: Object, comment: string): void {
    this.db.collection('movie-reviews').add({
      'movie_id': id,
      'reviews': [
        {
          'user': user,
          'review': comment
        }
      ]
    });
  }

}