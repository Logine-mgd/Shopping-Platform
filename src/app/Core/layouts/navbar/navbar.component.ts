import { Component, inject, OnInit } from '@angular/core';
import { IconService } from '../../../Shared/Services/IconService/icon.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../Services/Authentication/auth.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Menu, MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FaIconComponent,AvatarGroupModule,AvatarModule,MenuModule, ToastModule,TooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  icons = inject(IconService); 
  _authService = inject(AuthService);
  _router = inject(Router);
  isLogged !:any;
  items: MenuItem[] | undefined;

  constructor() {}
  ngOnInit(): void {
      this._authService.user.subscribe({
      next :(res)=>{
        this.isLogged = res
      }
    });

     this.items = [
                  {
                label: 'Shopping',
                items: [
                    {
                        label: 'Cart',
                        icon: 'pi pi-shopping-bag',
                        routerLink: '/cart'
                    },
                    {
                        label: 'Orders',
                        icon: 'pi pi-list',
                        routerLink: '/allorders'
                    }
                ]
            },
 
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Update ',
                        icon: 'pi pi-user-edit',
                        routerLink: '/updateuser'
                    },
                    {
                        label: 'Address',
                        icon: 'pi pi-map-marker',
                        routerLink: '/showuseraddress'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: ()=> {this.logout();}
                    }
                ]
            }
        ];
        
  }

  logout()
  {
    this._authService.logout();
    this._router.navigate(['/auth/signin']);
  }
}
