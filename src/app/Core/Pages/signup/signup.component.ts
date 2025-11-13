import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Authentication/auth.service';
import { CommonModule } from '@angular/common';
import { Signinfo } from '../../Interfaces/Auth/signinfo';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  _authenticationService = inject(AuthService);
  _router = inject(Router);
  constructor() {}
  signdata!: Signinfo;
  completedError: string = '';

  signupForm:FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Za-z]).*$/)]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{11}$/)]),
    },{ validators: SignupComponent.validateRePassword }
  );


   static validateRePassword(form: AbstractControl) {
    const pass = form.get('password')?.value;
    const rePass = form.get('rePassword')?.value;
    return pass === rePass ? null : { mismatch: true };
  }

  signup() {
    if (this.signupForm.valid) {
      this.completedError = '';
      console.log(this.signupForm.value);
      console.log();
      this.signdata = this.signupForm.value;
      console.log(this.signdata);
      this._authenticationService.signup(this.signdata).subscribe({
        next: (res) => {
          console.log('Signup success:', res);
          this._router.navigate(['/auth/signin']);
        },
        error: (err) => {
          console.error(err);
          this.completedError = err.error.message;
        },
        complete: () => {
          console.log('Signup completed');
          this.signupForm.reset();
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
