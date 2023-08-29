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
}
