import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthDataStore } from '../../stores/actions';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authStates = inject(AuthDataStore);
  const router = inject(Router);

  return next(req).pipe(catchError((err: any) => {
    if ([401, 403].includes(err.status)) {
        // auto logout if 401 or 403 response returned from api
        authService.logout();
        authStates.initialDefaultStates();
        router.navigateByUrl('/auth/login');
    }

    const error = (err && err.error && err.error.message) || err.statusText;
    return throwError(() => error);
}));
};
