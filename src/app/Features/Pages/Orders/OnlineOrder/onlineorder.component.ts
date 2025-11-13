import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../../../Core/Services/Order/order.service';

@Component({
  selector: 'app-onlineorder',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers:[MessageService],
  templateUrl: './onlineorder.component.html',
  styleUrl: './onlineorder.component.scss'
})
export class OnlineorderComponent implements OnInit {

  _OrderService = inject(OrderService);
  _ActivatedRoute = inject(ActivatedRoute);
  messageService = inject(MessageService);

  id!: string;

  addShippingForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{11}$/)]),
    city: new FormControl(null, [Validators.required])
  });

  ngOnInit() {
    this.getID();
  }

    getID(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id')!;
        if (this.id) {
          this.checkout();
        }
      },
    });
  }

  checkout() {
    if (this.addShippingForm.valid) {
      this._OrderService.CheckoutSession(this.id, this.addShippingForm.value).subscribe({
        next: res => {
          console.log('online', res);
          open(res.session.url); 
          this.messageService.add({
             severity: 'success', summary: 'Checkout', detail: res.message
             });
        },
        error: err => console.log(err)

      });
    }
  }

}