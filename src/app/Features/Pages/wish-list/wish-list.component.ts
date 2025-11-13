import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../Core/Services/WishList/wishlist.service';
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [],
  providers: [MessageService],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{

  wishlist: any;
  constructor(private _WishlistService: WishlistService, private messageService: MessageService) {}
  ngOnInit(): void {
    this.getWishList();
  }

  getWishList(): void {
    this._WishlistService.getloggedWishList().subscribe({
      next: (res) => {
        console.log('Logged user wishlist:', res.data);
        this.wishlist = res.data;
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      },
      complete: () => {
        console.log('Wishlist fetch completed.');
      },
    });
  }

  removeItem(id: string): void {
    this._WishlistService.removeWishListItem(id).subscribe({
      next: (res) => {
        this.wishlist = res.data;
        this.messageService.add({
          severity: 'success',
          summary: 'Item Removed',
          detail: res.message,
        });
        console.log('Item removed.');
        this.getWishList(); // refresh the list
      },
      error: (err) => {
        console.error('Error removing item:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'OOPS!',
          detail: 'Something went wrong. Please try again.',
        });
      },
      complete: () => {
        console.log('Remove item  completed.');
      },
    });
  }
  
  
}
