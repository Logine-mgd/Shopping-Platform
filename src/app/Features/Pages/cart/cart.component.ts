import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { CartService } from '../../../Core/Services/Cart/cart.service';
import { Cart } from '../../../Shared/Interfaces/Cart/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  providers:[MessageService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  _CartService = inject(CartService);
  _router = inject(Router);
  messageService = inject(MessageService);

  cart !: Cart;

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this._CartService.getloggeduserCart().subscribe({
      next: (res) => {
        console.log('logged user cart', res.data);
        this.cart = res.data;
      },
      error: (err) => console.log(err),
      complete: () => console.log('Cart fetched')
    });
  }

  removeitem(productId: string) {
    this._CartService.removeCartItem(productId).subscribe({
      next: (res) => {
        this.cart = res.data;
        this.messageService.add({ severity: 'success', summary: 'Item Removed', detail: res.message });
        console.log('deleted');
        this.getCart();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'OOPS!',
          detail: 'Something went wrong. Please try again.'
        });
      }
    });
  }

  updatecount(productId: string, count: string) {
    if (Number(count) === 0) {
      this.removeitem(productId);
      return;
    }

    this._CartService.updatecartproductQuantity(productId, count).subscribe({
      next: (res) => {
        this.cart = res.data;
        this.messageService.add({ severity: 'success', summary: 'Quantity Updated', detail: res.message });
        console.log('updated');
        this.getCart();
      },
      error: (err) => console.log(err)
    });
  }

  clearcart() {
    this._CartService.clearUserCart().subscribe({
      next: (res) => {
        this.cart = res.data;
        this.messageService.add({ severity: 'success', summary: 'Cart Cleared', detail: res.message });
        console.log('cleared');
        this.getCart();
      },
      error: (err) => console.log(err)
    });
  }

  choosepayment() {
    if (this.cart?._id) {
      this._router.navigate(['/choosepayment', this.cart._id]);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'OOPS!',
        detail: 'Something went wrong. Please try again.'
      });
    }
  }
}
