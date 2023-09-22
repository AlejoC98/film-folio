import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faRightToBracket, faKey, faUser, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  faRightToBracket = faRightToBracket;
  faKey = faKey;
  faUser = faUser;
  faChevronLeft = faChevronLeft;

  constructor(
    private authService: AuthService,
    private route: Router
  ) {}

  login = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  Authentication() {
    const { username, password } = this.login.value;
    this.authService.login(username!, password!).then((userCredentials)  => {
      this.route.navigate(['./Home']);
    }).catch((error) => {

      let message = '';

      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          message = 'User or password incorrect!'
          break;
          default:
          message = 'Ops! there was a problem login in!'
          break;
      }

      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'warning',
        confirmButtonText: 'Dismiss'
      })
    });
  }

  googleLogin(): void {
    this.authService.GoogleAuth();
  }

}
