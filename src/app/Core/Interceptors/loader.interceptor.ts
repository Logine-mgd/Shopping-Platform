import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  var _Loader = inject(NgxSpinnerService);
  _Loader.show();

  return next(req).pipe(
    finalize(()=> _Loader.hide())
  );
};
