import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { BrandService } from '../../../Shared/Services/brand.service';
import { Brand } from '../../../Shared/Interfaces/Product/brand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,RouterLink],
  providers:[MessageService],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  _router = inject(Router);
  messageService = inject(MessageService);
  BrandService = inject(BrandService);
  Brands !: Brand[];

  ngOnInit() {
    this.getBrands();
  }

  getBrands() {
    this.BrandService.getAllBrands().subscribe({
      next: (res) => {
        console.log('logged user cart', res.data);
        this.Brands = res.data;
      },
      error: (err) => console.log(err),
      complete: () => console.log('Brands fetched')
    });
  }

}
