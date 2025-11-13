import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorComponent } from "./Features/Pages/Error/error/error.component";
import { SignupComponent } from "./Core/Pages/signup/signup.component";
import { LoginComponent } from "./Core/Pages/login/login.component";
import { SubcategoryComponent } from "./Features/Pages/SubCategory/subcategory/subcategory.component";
import { CategoryComponent } from "./Features/Pages/category/category.component";
import { FooterComponent } from "./Core/layouts/footer/footer.component";
import { NavbarComponent } from "./Core/layouts/navbar/navbar.component";
import { ProgressSpinnerModule, ProgressSpinner } from 'primeng/progressspinner';
import { Observable } from 'rxjs';
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ErrorComponent, SignupComponent, LoginComponent, SubcategoryComponent, CategoryComponent, FooterComponent, NavbarComponent, ProgressSpinner, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ShoppingPlatform';

}
