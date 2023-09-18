import { Component, ElementRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { faCamera, faCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheck = faCheck;
  faCamera = faCamera;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  profileUrl: string | undefined;
  profileImg: File | undefined;
  
  showPassCriteria: boolean = false;
  passCriteria: Object = {
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumeric: false,
  }

  signup = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, this.passwordStrengthValidator()]),
    confirmPassword: new FormControl('', [Validators.required, this.passwordValidator()]),
  });

  constructor(
    private authService: AuthService,
    private ref: ElementRef
  ) {}

  SignUp(): void {
    const { firstname, lastname, email, phone, password } = this.signup.value;
    if (this.signup.valid) {
      this.authService.register(firstname!, lastname!, email!, phone!, password!, this.profileImg!);
    } else {
      console.log('there\'s some errors!');
    } 
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (!value) {
        return null;
      }
  
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
  
      const criteria: { [key: string]: boolean } = {
        hasUpperCase,
        hasLowerCase,
        hasNumeric,
      };

      this.passCriteria = {
        ...criteria
      }

      if (hasLowerCase && hasLowerCase && hasNumeric) {
        return null;
      } else {
        return criteria;
      }

    };
  }

  getPasswordStrengthCriteria(control: AbstractControl): string[] {
    // const validationCriteria = this.passwordStrengthValidator()(control);
    const validationCriteria: { [key: string]: any } = this.passCriteria;
    const criteriaList: string[] = [];
    
    if (validationCriteria) {
      for (const criterion in validationCriteria) {
        if (validationCriteria[criterion]) {
          criteriaList.push(`${criterion} ✓`);
        } else {
          criteriaList.push(`${criterion} ✗`);
        }
      }
    }
    
    return criteriaList;
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (!value) {
        return null;
      }
      
      if (value !== this.signup.value.password){
        return { match: true }
      } else {
        return null;
      }

    };
  }

  loadProfile(event: any): void {
    const imageFile = event.target.files[0];
    this.profileImg = imageFile;
    this.profileUrl = URL.createObjectURL(imageFile);
  }
}
