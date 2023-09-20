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
  private GoogleProvider = new GoogleAuthProvider();
  public currentUser: User | undefined;

  constructor(
    private fbAuth: AngularFireAuth,
    private fbStorage: AngularFireStorage,
    private route: Router
  ) {
    this.fbAuth.authState.subscribe((user) => {
      this.currentUser = user!;
    })
  }

  GoogleAuth() {
    this.fbAuth.signInWithPopup(this.GoogleProvider).then((res) => {
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

  async login(username: string, password: string): Promise<any> {
    const credentials = await this.fbAuth.signInWithEmailAndPassword(username, password);
    this.currentUser = credentials.user!;
    console.log(credentials.user);
    return credentials;
  }

  logout() {
    this.fbAuth.signOut().then(() => {
      this.route.navigate(['./Login']);
    });
  }

  async register(firstname: string, lastname: string, email: string, phone: string, password: string, profile: File): Promise<void> {

    const regStatus = await this.fbAuth.createUserWithEmailAndPassword(email, password);

    if (regStatus) {

      await regStatus.user!.updateProfile({
        displayName: `${firstname} ${lastname}`
      });
      if (profile !== undefined) {
        const fileId = new Date().getTime().toString();
        const filePath = `users-profiles/${fileId}_${profile.name}`;
        const fileRef = this.fbStorage.ref(filePath);
  
        await this.fbStorage.upload(filePath, profile);
  
        fileRef.getDownloadURL().subscribe(async(url) => {
          await regStatus.user!.updateProfile({
            photoURL: url,
          });
        });
      }

      // this.userCredentials = regStatus;
      console.log(regStatus);

      this.route.navigate(['./Home']);
    }

  }

}
