import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AddressService } from '../../../../Shared/Services/Addresses/address.service';
import { UpdateauthenticationService } from '../../../../Core/Services/Authentication/updateauthentication.service';


@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})  
export class ForgetpasswordComponent {
   private _UpdateauthenticationService = inject(UpdateauthenticationService) ;
   private router = inject( Router);
    forgetpassForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email])});


  forget(): void { 
    if (this.forgetpassForm.valid) {
      this._UpdateauthenticationService.forgotPassword(this.forgetpassForm.value).subscribe({
        next: () => {
          console.log(' successfull');
          this.router.navigate(['/auth/resetcode']);
        },
        error: (err) => console.error(err),
      });
    } else {
      this.forgetpassForm.markAllAsTouched();
    }
  }
}
