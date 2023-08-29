import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fbAuth: AngularFireAuth,
    private route: Router
  ) {}

  login(username: string, password: string) {
    return this.fbAuth.signInWithEmailAndPassword(username, password);
  }

  logout() {
    this.fbAuth.signOut().then(() => {
      this.route.navigate(['./Login']);
    });
  }

}
