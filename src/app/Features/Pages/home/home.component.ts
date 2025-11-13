import { Component } from '@angular/core';
import { RemainproductsComponent } from "./remainproducts/remainproducts.component";
import { PopularcategoryComponent } from "./popularcategory/popularcategory/popularcategory.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RemainproductsComponent, PopularcategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
