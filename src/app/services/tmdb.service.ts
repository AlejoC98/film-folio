import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Movie, MovieCast, MovieReviews, MovieTrailer } from '../interfaces/movie';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TMDBService {

  private headers: HttpHeaders;
  private token: string | undefined;
  sessionID: string | undefined;

  private params: HttpParams = new HttpParams()
    .append('language', 'en-US')
    .append('page', '1');

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private authService: AuthService
  ) {
    this.headers = new HttpHeaders({
      Accept: 'application/json:charset=utf-8',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + environment.TMDB.access_token
    });

    this.authService.AuthStatus();
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
          // return response.results.filter((trailer: any) => trailer.type === 'Trailer');
          return response.results;
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

  getGlobalMovieReviews(id: string): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`, {
      headers: this.headers
    }).pipe(
      map((response: any) => {
        return response.results;
      })
    )
  }

  getLocalMovieReviews(movieId: string): Observable<any> {
    const reviewCollection = this.db.collection('movie-reviews', ref => ref.where('movie_id', '==', movieId));

    return reviewCollection.get().pipe(
      map((data: any) => {
        if (!data.empty) {
          const doc = data.docs;
          return doc[0].data();
        }
      })
    )
  }

  createMovieReview(movieId: string, comment: string, rate: number | undefined) {

    const insert = {
      'id': '',
      'updated_at': new Date().toLocaleDateString('en-US'),
      'url': '',
      'userui': this.authService.currentUser?.uid,
      'author': this.authService.currentUser?.displayName,
      'author_details': {
        'avatar_path': this.authService.currentUser?.photoURL,
        'rating': rate != undefined ? rate : 0
      },
      'content': comment,
      'created_at': new Date().toLocaleDateString('en-US')
    }

    const query = this.db.collection('movie-reviews', ref => ref.where('movie_id', '==', movieId));

    query.get().subscribe(querySnapshot => {
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const currentData = Object(doc.data());
        let currentUserReview = currentData.reviews.find((u: { userui: string | null; }) => u.userui === this.authService.currentUser!.uid);

        currentData.reviews.push(insert);
        // if (!currentUserReview) {
        // }

        doc.ref.update({
          reviews: currentData.reviews
        });
      } else {
        this.db.collection('movie-reviews').add({
          'movie_id': movieId,
          'reviews': [insert]
        });
      }
    })

    return insert;
  }

  getMovieRating(movieId: string): Observable<number> {

    const rateCollection = this.db.collection('movie-rates', ref => ref.where('movie_id', '==', movieId));

    return rateCollection.get().pipe(
      map((data: any) => {
        if (!data.empty) {
          const doc = data.docs;
          const currentData = Object(doc[0].data());

          return currentData.rate;
        }
        return 0;
      })
    )

  }

  createMovieRating(id: string, rate: number): void {
    const query = this.db.collection('movie-rates', ref => ref.where('movie_id', '==', id));
    query.get().subscribe(querySnapshot => {
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const currentData = Object(doc.data());
        let currentUserRate = currentData.users.find((u: { userui: string | null; }) => u.userui === this.authService.currentUser!.uid);

        if (!currentUserRate) {
          currentData.users.push({
            'userui': this.authService.currentUser!.uid,
            'rate': rate
          });
        } else {
          currentUserRate.rate = rate;
        }

        let calculateRate = currentData.rate + rate;

        calculateRate = calculateRate / currentData.users.length;

        // Updating rate
        doc.ref.update({
          rate: calculateRate,
          users: currentData.users
        });
      } else {
        this.db.collection('movie-rates').add({
          'movie_id': id,
          'rate': rate,
          'users': [
            {
              'userui': this.authService.currentUser!.uid,
              'rate': rate
            }
          ]
        });
      }
    });
  }

  addToWatched(movie_id: string): Observable<any> {
    const query = this.db.collection(
      'users-watched',
      ref => ref.where('userui', '==', this.authService.currentUser?.uid)
    );

    return query.get().pipe(
      map(querySnapshot => {
        if (querySnapshot.empty) {
          this.db.collection('users-watched').add({
            'userui': this.authService.currentUser?.uid,
            'movies': [
              movie_id
            ]
          });
        } else {
          const doc = querySnapshot.docs[0];
          const currentData = Object(doc.data());
          currentData.movies.push(movie_id);
          doc.ref.update({
            movies: currentData.movies
          });
        }

        return true;
      })
    )
  }

  getWatchedMovies(): Observable<any> {
    return this.db.collection(
      'users-watched',
      ref => ref.where('userui', '==', this.authService.currentUser?.uid)
    ).valueChanges().pipe(
      switchMap(querySnapshot => {
        
        const watched = Object(querySnapshot[0]);

        return of(watched.movies);
      })
    )
  }

  removeWatched(movie_id: string): Observable<any> {
    const query = this.db.collection(
      'users-watched',
      ref => ref.where('userui', '==', this.authService.currentUser?.uid)
    );
    return query.get().pipe(
      map(querySnapshot => {
        const doc = querySnapshot.docs[0];
        const watchedMovies = Object(doc.data());

        const newMovies = watchedMovies.movies.filter((item: string) => item != movie_id);

        doc.ref.update({
          movies: newMovies
        });

        return true;
      })
    )

  }

}