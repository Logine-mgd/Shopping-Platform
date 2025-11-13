import { NgClass } from '@angular/common';
import { Component, OnInit, Input, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { SubCategory } from '../../Interfaces/Product/sub-category';
import { SubcategoryService } from '../../../Features/Services/subcategory.service';

@Component({
  selector: 'app-sub-categ-on-categ',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './sub-categ-on-categ.component.html',
  styleUrl: './sub-categ-on-categ.component.scss'
})
export class SubCategOnCategComponent {

  subcategories: SubCategory[] = [];
  id!: string;
  private readonly  _ActivatedRoute = inject(ActivatedRoute);
  private readonly _SubcategoryService = inject(SubcategoryService);
  constructor(){}

  ngOnInit(): void {
    this.getID();
    this.getSubCategoriesOnCategory();
  }

  getID(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id')!;
        if (this.id) {
          this.getSubCategoriesOnCategory();
        }
      },
    });
  }


  getSubCategoriesOnCategory(): void {
    if (!this.id) return;
    this._SubcategoryService.getSubCategoriesOnCategory(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.subcategories = res.data;
      },
      error: (err) => console.error(err),
      complete: () => console.log('Completed')
    });
  }
}

