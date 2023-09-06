import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isTMDBAuthenticated = false;
  // public readonly userCredentials = {} | undefined;

  constructor(
    private fbAuth: AngularFireAuth,
    private route: Router
  ) { }

  setAuthenticated(value: boolean) {
    this.isTMDBAuthenticated = value;
  }

  isAuthenticatedUser(): boolean {
    return this.isTMDBAuthenticated;
  }

  login(username: string, password: string): Promise<any> {
    return this.fbAuth.signInWithEmailAndPassword(username, password);
  }

  logout() {
    this.fbAuth.signOut().then(() => {
      this.route.navigate(['./Login']);
    });
  }

}
