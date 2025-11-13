import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../Shared/Services/Category/category.service';
import { RouterLink } from '@angular/router';
import { Category } from '../../../Shared/Interfaces/Category/category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  _CategoryService = inject(CategoryService);
  constructor() {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res.data;
      },
      error: (err) => console.log(err),
      complete: () => console.log('Completed')
    });
  }
}
