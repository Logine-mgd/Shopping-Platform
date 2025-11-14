import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/Authentication/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private _authenticationService = inject(AuthService);
  private _router = inject(Router);

  isAuthenticated: boolean = false;
  completedError: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[A-Za-z]).*$/)
    ])
  });

  constructor() {}

  login() {
    if (this.loginForm.valid) {
      this.completedError = '';
      this._authenticationService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login success:', res);
          this.isAuthenticated = true;
          localStorage.setItem('loginusertoken', res.token);
          this._authenticationService.saveLoggedInUser();
          this._router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
          this.completedError = err.error.message;
        },
        complete: () => {
          console.log('Login completed');
          this.loginForm.reset();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
