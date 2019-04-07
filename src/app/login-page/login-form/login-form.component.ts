import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors
} from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  showLoading = false;

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [
          Validators.required

        ]
      ]
    });
  }

  onSubmit(): void {
    this.showLoading = true;

    this.auth.login(this.form.get('email').value, this.form.get('password').value);
  }

  getPasswordValidationMessages(): string[] {
    const validationMessages: string[] = [];

    Object.keys(this.form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          if (key === 'password') {
            validationMessages.push('The password is required!');
          }
        });
      }
    });

    return validationMessages;
  }

  getEmailValidationMessages(): string[] {
    const validationMessages: string[] = [];

    Object.keys(this.form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          if (key === 'email') {
            validationMessages.push(
              keyError === 'required'
                ? 'The email is required!'
                : 'The email is invalid'
            );
          }
        });
      }
    });

    return validationMessages;
  }

  hasEmailErros(): boolean {
    return !!this.form.get('email').errors && this.form.get('email').dirty;
  }

  hasPasswordErros(): boolean {
    return (
      !!this.form.get('password').errors && this.form.get('password').dirty
    );
  }
}
