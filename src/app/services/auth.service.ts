import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isTMDBAuthenticated = false;
  public userCredentials!: User;
  private GoogleProvider = new GoogleAuthProvider();

  constructor(
    private fbAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private route: Router
  ) {}

  GoogleAuth() {
    this.fbAuth.signInWithPopup(this.GoogleProvider).then((res) => {
      this.userCredentials = {
        displayName: res.user!.displayName,
        email: res.user!.email,
        emailVerified: res.user!.emailVerified,
        isAnonymous: res.user!.isAnonymous,
        metadata: res.user!.metadata,
        phoneNumber: res.user!.phoneNumber,
        photoURL: res.user!.photoURL,
        providerData: res.user!.providerData,
        providerId: res.user!.providerId,
        refreshToken: res.user!.refreshToken,
        tenantId: res.user!.tenantId,
        uid: res.user!.uid,
      };

      this.route.navigate(['./Home']);

    }).catch((error) => {
      console.log(error);
    });
  }



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

  async register(firstname: string, lastname: string, email: string, phone: string, password: string, profile: File): Promise<void> {

    // const regStatus = await this.fbAuth.createUserWithEmailAndPassword(email, password);

    // if (regStatus) {
    //   regStatus.user!.displayName = `${firstname} ${lastname}`;
    //   regStatus.user!.phoneNumber = phone;
    // }

    // console.log(this.storage);

  }

}
