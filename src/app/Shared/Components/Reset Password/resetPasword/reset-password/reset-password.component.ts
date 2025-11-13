import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UpdateauthenticationService } from '../../../../../Core/Services/Authentication/updateauthentication.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  private _UpdateauthenticationService = inject(UpdateauthenticationService) ;
   private router = inject( Router);
   str = "";
    resetpassForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

  forget(): void { 
    if (this.resetpassForm.valid) {
      this._UpdateauthenticationService.resetPassword(this.resetpassForm.value).subscribe({
        next: () => {
          console.log(' successfull');
          this.str = "Password is reset"
          // navigate
        },
        error: (err) => console.error(err),
      });
    } else {
      this.resetpassForm.markAllAsTouched();
    }
  }
}
