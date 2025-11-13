import { Component, OnInit, inject } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Product } from '../../../../Shared/Interfaces/Product/product';
import { ProductService } from '../../../../Shared/Services/Product/product.service';
import { CartService } from '../../../../Core/Services/Cart/cart.service';
import { WishlistService } from '../../../../Core/Services/WishList/wishlist.service';
import { RouterLink } from '@angular/router';
import { IconService } from '../../../../Shared/Services/IconService/icon.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-remainproducts',
  standalone: true,
  imports: [RouterLink,FaIconComponent,ToastModule],
  providers:[MessageService],
  templateUrl: './remainproducts.component.html',
  styleUrl: './remainproducts.component.scss'
})
export class RemainproductsComponent {

  products: Product[] = [];
   icons = inject(IconService);
  private _ProductService = inject(ProductService);
  private _CartService = inject(CartService);
  private _WishlistService = inject(WishlistService);
  private messageService = inject(MessageService);

  constructor() {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._ProductService.getAllProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  add2Cart(id: string) {
    this._CartService.add2cart(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Added to Cart',
          detail: res.message,
        });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'OOPS!',
          detail: 'Something went wrong. Please try again.',
        });
      },
      complete: () => {
        console.log('Added to cart');
      },
    });
  }

  add2WishList(id: string) {
    this._WishlistService.add2WishList(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Added to Wishlist',
          detail: res.message,
        });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'OOPS!',
          detail: 'Something went wrong. Please try again.',
        });
      },
      complete: () => {
        console.log('Added to wishlist');
      },
    });
  }
}
