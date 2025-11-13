import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UpdateauthenticationService } from '../../../../Core/Services/Authentication/updateauthentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-updateuserdata',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './updateuserdata.component.html',
  styleUrl: './updateuserdata.component.scss'
})
export class UpdateuserdataComponent {
  private _UpdateauthenticationService = inject(UpdateauthenticationService) ;
  messageService = inject(MessageService);
   private router = inject( Router);
   updateuserForm:FormGroup = new FormGroup({
   name: new FormControl('', [Validators.required]),
   email: new FormControl('', [Validators.required,Validators.email]),
    phone: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{11}$/),]),
  });

  updateUser(): void { 
    if (this.updateuserForm.valid) {
      this._UpdateauthenticationService.updateUser(this.updateuserForm.value).subscribe({
        next: (res) => {
          console.log('Updated successfully');
          this.messageService.add({ severity: 'success', summary: 'User Updated', detail: res.message });
        
        },
        error: (err) => console.error(err),
      });
    } else {
      this.updateuserForm.markAllAsTouched();
    }
  }
}
