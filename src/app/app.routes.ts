import { Routes } from '@angular/router';
import { AuthComponent } from './Core/layouts/auth/auth.component';
import { authenticateGuard } from './Core/Guards/auth/authenticate.guard';
import { isloggedGuard } from './Core/Guards/auth/islogged.guard';


export const routes: Routes = [
    {path:"auth",component:AuthComponent,children:[
        {path: "signin",canActivate:[isloggedGuard],loadComponent: ()=> import('./Core/Pages/login/login.component').then(c=> c.LoginComponent)},
        {path: "signup",canActivate:[isloggedGuard],loadComponent: ()=> import('./Core/Pages/signup/signup.component').then(c=> c.SignupComponent)},
        {path: "resetpassword",canActivate:[authenticateGuard],loadComponent: ()=> import('./Core/Pages/reset-password/reset-password.component').then(c=> c.ResetPasswordComponent)}
    ]},
    {path: "",canActivate:[authenticateGuard],loadComponent: ()=> import('./Core/Pages/login/login.component').then(c=> c.LoginComponent)},
    {path: "home",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/home/home.component').then(c=> c.HomeComponent)},
    {path: "product",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/home/remainproducts/remainproducts.component').then(c=> c.RemainproductsComponent)},
    {path: "brands",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/brands/brands.component').then(c=> c.BrandsComponent)},
    {path: "brands/:id",canActivate:[authenticateGuard],loadComponent: ()=> import('./Shared/Components/brand-detail/brand-detail.component').then(c=> c.BrandDetailComponent)},
    {path: "productdetails/:id",canActivate:[authenticateGuard],loadComponent: ()=> import('./Shared/Components/Product/product-details/product-details.component').then(c=> c.ProductDetailsComponent)},
    {path: "categories/:id/subcategories",canActivate:[authenticateGuard],loadComponent: ()=> import('./Shared/Components/sub-categ-on-categ/sub-categ-on-categ.component').then(c=> c.SubCategOnCategComponent)},
    {path: "categorydetail/:id",canActivate:[authenticateGuard],loadComponent: ()=> import('./Shared/Components/category-detail/category-detail.component').then(c=> c.CategoryDetailComponent)},
    {path: "showuseraddress",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/Users/show-user-addresses/show-user-addresses.component').then(c=> c.ShowUserAddressesComponent)},
    {path: "updateuser",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/Users/updateuserdata/updateuserdata.component').then(c=> c.UpdateuserdataComponent)},

    {path: "adduseraddress",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/Users/add-user-address/add-user-address.component').then(c=> c.AddUserAddressComponent)},
    {path: "allorders",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/Users/user-orders/user-orders.component').then(c=> c.UserOrdersComponent)},
    {path: "cart",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/cart/cart.component').then(c=> c.CartComponent)},
    {path: "categories",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/category/category.component').then(c=> c.CategoryComponent)},
    {path: "order",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/Orders/order/order.component').then(c=> c.OrderComponent)},
    {path: "choosepayment/:id",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/Orders/choosepayment/choosepayment.component').then(c=> c.ChoosepaymentComponent)},
    {path: "online/:id",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/Orders/OnlineOrder/onlineorder.component').then(c=> c.OnlineorderComponent)},
    {path: "cash/:id",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/Orders/cash-order/cash-order.component').then(c=> c.CashOrderComponent)},
    {path: "wishlist",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/wish-list/wish-list.component').then(c=> c.WishListComponent)},
    {path: "subcategories",canActivate:[authenticateGuard],loadComponent: ()=> import('./Features/Pages/SubCategory/subcategory/subcategory.component').then(c=> c.SubcategoryComponent)},
    
    {path: "**",loadComponent: ()=> import('./Features/Pages/Error/error/error.component').then(c=> c.ErrorComponent)},     
];
