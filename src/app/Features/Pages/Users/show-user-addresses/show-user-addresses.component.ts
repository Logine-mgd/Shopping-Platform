import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, inject ,OnInit} from '@angular/core';
import { UserAddress } from '../../../Interfaces/User/user-address';
import { AddressService } from '../../../../Shared/Services/Addresses/address.service';

@Component({
  selector: 'app-show-user-addresses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './show-user-addresses.component.html',
  styleUrl: './show-user-addresses.component.scss'
})
export class ShowUserAddressesComponent implements OnInit {
  addresses: UserAddress[] = [];
  private addressService = inject(AddressService) ;
  constructor() {}

  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses(): void {
    this.addressService.getAllUserAddresses().subscribe({
      next: (res) => {
        console.log(res);
        this.addresses = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  removeAddress(id: string): void {
    this.addressService.removeAddress(id).subscribe({
      next: (res) => {
        console.log(res);
        this.addresses = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
