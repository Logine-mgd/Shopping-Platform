import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../../../Core/Services/Order/order.service';

@Component({
  selector: 'app-cash-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './cash-order.component.html',
  styleUrl: './cash-order.component.scss'
})
export class CashOrderComponent implements OnInit {
  private _OrderService = inject(OrderService);
  private _router = inject(Router);
  private _ActivatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  id!: string;
  addShippingForm = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{11}$/)]),
    city: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
    this.getId();
  }

  getId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: params => {
        this.id = params?.get('id')!;
      }
    });
  }

  order(): void {
    if (this.addShippingForm.valid) {
      this._OrderService.createCashOrder(this.id, this.addShippingForm.value).subscribe({
        next: res => {
          console.log('Order created', res);
          this._router.navigate(['allorders'])
          this.messageService.add(
            { severity: 'success', summary: 'Address Added', detail: res.message });
        },
        error: err => console.log(err),
        complete: () => console.log('Added successfully')
      });
    } else {
      this.addShippingForm.markAllAsTouched();
    }
  }
}
