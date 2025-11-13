import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../Services/Category/category.service';
import { Category } from '../../Interfaces/Category/category';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent implements OnInit {
  categorydetail !: Category;
  id!: string;
  private activatedRoute = inject(ActivatedRoute) ;
  private categoryService = inject( CategoryService);
  constructor( ) {}

  ngOnInit(): void {
    this.getID();
  }

  getID(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id')!;
        if (this.id) {
          this.getCategoryById(this.id);
        }
      },
    });
  }

  getCategoryById(id: string): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.categorydetail = res.data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }
}
