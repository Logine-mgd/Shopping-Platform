import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../Interfaces/Product/brand';
import { BrandService } from '../../Services/brand.service';

@Component({
  selector: 'app-brand-detail',
  standalone: true,
  imports: [],
  templateUrl: './brand-detail.component.html',
  styleUrl: './brand-detail.component.scss'
})
export class BrandDetailComponent {
   branddetail !: Brand;
  id!: string;
private _ActivatedRoute = inject(ActivatedRoute);
    private _BrandsService= inject(BrandService);

  constructor() {}

  ngOnInit(): void {
    this.getID();
    if (this.id) {
      this.getBrandById(this.id);
    }
  }

  getID(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params?.get('id')!;
        if (this.id) this.getBrandById(this.id);
      },
      error: (err) => console.log(err),
    });
  }

  getBrandById(id: string): void {
    this._BrandsService.getBrandById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.branddetail = res.data;
      },
      error: (err) => console.log(err),
      complete: () => console.log('Completed'),
    });
  }
}
