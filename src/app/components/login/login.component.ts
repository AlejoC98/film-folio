import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faRightToBracket, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  faRightToBracket = faRightToBracket;
  faKey = faKey;
  faUser = faUser;

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
      console.log(userCredentials);
      this.route.navigate(['./Home']);
    }).catch((error) => {
      console.log(error.message);
    });
  }

}
