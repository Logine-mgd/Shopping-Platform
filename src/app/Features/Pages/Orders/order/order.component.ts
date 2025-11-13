import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../../../Core/Services/Order/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [MessageService],

  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})

export class OrderComponent {

  _OrderService = inject(OrderService);
  _ActivatedRoute = inject(ActivatedRoute);
  messageService = inject(MessageService);

  id!: string ;

  addShippingForm = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{11}$/)]),
    city: new FormControl(null, [Validators.required])
  });

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe(params => {
   //   this.id = params.get('id');
    });
  }

  order() {
    if (this.addShippingForm.valid) {
      this._OrderService.createCashOrder(this.id, this.addShippingForm.value).subscribe({
        next: (res) => {
          console.log("Order success", res);
          this.messageService.add({ severity: 'success', summary: 'Address Added', detail: res.message });
        },
        error: (err) => console.error(err),
        complete: () => console.log("Order completed")
      });
    } else {
      this.addShippingForm.markAllAsTouched();
    }
  }

}

