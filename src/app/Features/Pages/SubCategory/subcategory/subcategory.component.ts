import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategory } from '../../../../Shared/Interfaces/Product/sub-category';
import { SubcategoryService } from '../../../Services/subcategory.service';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.scss'
})
export class SubcategoryComponent implements OnInit {

  _SubcategoryService = inject(SubcategoryService);

  subcategories: SubCategory[] = [];

  constructor() {}

  ngOnInit() {
    this.getAllSubcategories();
  }

  getAllSubcategories() {
    this._SubcategoryService.getAllSubCategories().subscribe({
      next: (res) => {
        console.log('Subcategories:', res);
        this.subcategories = res.data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Completed fetching subcategories');
      }
    });
  }
}
