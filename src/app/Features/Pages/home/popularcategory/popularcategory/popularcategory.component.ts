import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../../../../Shared/Services/Category/category.service';
import { Category } from '../../../../../Shared/Interfaces/Category/category';

@Component({
  selector: 'app-popularcategory',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './popularcategory.component.html',
  styleUrl: './popularcategory.component.scss'
})
export class PopularcategoryComponent implements OnInit{
  _CategoryService = inject(CategoryService);
  categories !: Category[];
  ngOnInit(){
    this.getCategories();
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  customOptions2: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,   
  pullDrag: true,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  items: 1,          
  nav: true,

};

  getCategories()
  {
    this._CategoryService.getAllCategories().subscribe({
      next:(resp)=>
      {
        console.log(resp);
        this.categories = resp.data;
      },
      error:(err)=>{
        console.log(err);
      }

    });
  }
}
