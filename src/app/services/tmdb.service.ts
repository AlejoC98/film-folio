import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TMDBService {

  constructor() {}

  getPopularMovie() {
    return axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {language: 'en-US', page: '1'},
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + environment.TMDB.access_token
      }
    });
  }

  async createSession() {
    const response = await axios.get('https://api.themoviedb.org/3/authentication/token/new', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + environment.TMDB.access_token
      }
    });

    await axios.post('https://api.themoviedb.org/3/authentication/session/new', {
      headers: {
        Accept: 'application/json',
        contentType: 'application/json',
        Authorization: 'Bearer ' + environment.TMDB.access_token
      },
      body: JSON.stringify({ request_token: response.data.request_token })
    }).then((res) => {
      // console.log(res.data);
    }).catch((err) => {
      // console.log(err);
    })

  }

  search(keyword: string) {
    return axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        query: keyword,
        language: 'en-US',
        page: '1'
      },
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + environment.TMDB.access_token
      }
    });
  }

  findMovieDetails(id: string) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + environment.TMDB.access_token
      },
    });
  }

  async getMovieTrailer(id: string) {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + environment.TMDB.access_token
      },
    }).then((res) => {
      return res.data.results.find((video: { type: Object; }) => video.type === 'Trailer');
    }).catch((err) => {
      console.log(err);
    });
  }
}