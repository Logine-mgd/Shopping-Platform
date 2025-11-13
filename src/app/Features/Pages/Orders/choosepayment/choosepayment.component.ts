import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-choosepayment',
  standalone: true,
  imports: [],
  templateUrl: './choosepayment.component.html',
  styleUrl: './choosepayment.component.scss'
})  
export class ChoosepaymentComponent implements OnInit {

  _ActivatedRoute = inject(ActivatedRoute);
  _router = inject(Router);
  id!: string;

  ngOnInit() {
    this.getId();
  }

  getId() {
    this._ActivatedRoute.paramMap.subscribe({
      next: params => { this.id = params.get('id') || ''; }
    });
  }

  online() {
    this._router.navigate(['/online', this.id]);
  }

  cash() {
    this._router.navigate(['/cash', this.id]);
  }
}
