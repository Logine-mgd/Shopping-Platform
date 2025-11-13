import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticateGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);
  const _route = inject(Router);
  if (isPlatformBrowser(_PLATFORM_ID))
  {
    if(!localStorage.getItem("loginusertoken")){
      _route.navigate(['/auth/signin']);
      return false;
    }
    return true;
  }else{
    return false;
  }
};
