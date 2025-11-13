import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AddressService } from '../../../../Shared/Services/Addresses/address.service';

@Component({
  selector: 'app-add-user-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user-address.component.html',
  styleUrl: './add-user-address.component.scss'
})
export class AddUserAddressComponent {
  private _addressService = inject(AddressService) ;
   private router = inject( Router);
    addAddressForm:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{11}$/),]),
    city: new FormControl('', [Validators.required]),
  });

  addAddress(): void { 
    if (this.addAddressForm.valid) {
      this._addressService.addAddress(this.addAddressForm.value).subscribe({
        next: () => {
          console.log('Added successfully');
          this.router.navigate(['/showuseraddress']);
        },
        error: (err) => console.error(err),
      });
    } else {
      this.addAddressForm.markAllAsTouched();
    }
  }
}
