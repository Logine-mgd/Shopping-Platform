import { Component, inject } from '@angular/core';
import { Product } from '../../../Interfaces/Product/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Services/Product/product.service';
import { CartService } from '../../../../Core/Services/Cart/cart.service';
import { WishlistService } from '../../../../Core/Services/WishList/wishlist.service';
import { MessageService } from 'primeng/api';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconService } from '../../../Services/IconService/icon.service';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FaIconComponent, Toast],
  providers:[MessageService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  productItem!: Product;
  id!: string;
  icons = inject(IconService);  
  private _ActivatedRoute = inject(ActivatedRoute) ;
    private _ProductService= inject(ProductService);
    private _CartService= inject(CartService);
    private _WishlistService= inject(WishlistService);
    private messageService= inject(MessageService);
  constructor() {}

  ngOnInit(): void {
    this.getID();
    if (this.id) this.getProductById(this.id);
  }

  getID(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id')!;
      },
      error: (err) => console.error(err)
    });
  }

  getProductById(id: string): void {
    this._ProductService.getProductById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.productItem = res.data;
      },
      error: () => {
        console.error('Failed to load product');
        this.messageService.add({
          severity: 'error',
          summary: 'OOPS!',
          detail: 'Something went wrong. Please try again.'
        });
      },
      complete: () => console.log('Product loaded')
    });
  }

  add2Cart(productId: string): void {
    this._CartService.add2cart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Added to Cart',
          detail: res.message
        });
      },
      error: (err) => console.error(err),
      complete: () => console.log('Added to cart')
    });
  }

  add2WishList(productId: string): void {
    this._WishlistService.add2WishList(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Added to Wishlist',
          detail: res.message
        });
      },
      error: (err) => console.error(err),
      complete: () => console.log('Added to wishlist')
    });
  }
}
