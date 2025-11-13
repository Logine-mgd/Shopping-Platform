import { Component, inject, OnInit } from '@angular/core';
import { IconService } from '../../../Shared/Services/IconService/icon.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../Services/Authentication/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FaIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  icons = inject(IconService); 
  _authService = inject(AuthService);
  _router = inject(Router);
  isLogged !:any;
  constructor() {
    
    
  }
  ngOnInit(): void {
      this._authService.user.subscribe({
      next :(res)=>{
        this.isLogged = res
      }
    });
  }

  logout()
  {
    this._authService.logout();
    this._router.navigate(['/auth/login']);
  }
}
