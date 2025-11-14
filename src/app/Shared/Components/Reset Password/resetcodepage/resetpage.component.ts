import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UpdateauthenticationService } from '../../../../Core/Services/Authentication/updateauthentication.service';

@Component({
  selector: 'app-resetpage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resetpage.component.html',
  styleUrl: './resetpage.component.scss'
})
export class ResetpageComponent {

   private _UpdateauthenticationService = inject(UpdateauthenticationService) ;
   private router = inject( Router);
    resetForm:FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });

  reset(): void { 
    if (this.resetForm.valid) {
      console.log(this.resetForm.value);
      this._UpdateauthenticationService.verifyResetCode(this.resetForm.value).subscribe({
        next: () => {
          console.log(' successfull');
          this.router.navigate(['auth/resetpassword']);
        },
        error: (err) => console.error(err),
      });
    } else {
      this.resetForm.markAllAsTouched();
    }
  }
}
