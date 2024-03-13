import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from '../../services/api.service';
import { COOKIE_SERVICE_KEYS } from '../../../shared/enums';
import { AuthStore } from '../../stores/actions';
import { AuthService } from '../../services';
import { CookieService } from 'ngx-cookie-service';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authState = inject(AuthStore);
  const apiService = inject(ApiService);
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);

  try {
    const token = cookieService.get(COOKIE_SERVICE_KEYS.TOKEN);

    //Hanlde token is empty so redirect to login page
    if (!token) {
      authState.initialDefaultStates();
      router.navigateByUrl('/login');
      return next(req);
    }

    //Hanlde detect token expire datetime and configure header options
    const decodedToken = jwtDecode(token);
    const isExpired = decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;
    if (isExpired) {
      authService.logout();
      authState.initialDefaultStates();
      router.navigateByUrl('/login');
    }
    else {
      req = req.clone({
        setHeaders: {
          ...apiService.headerOptionsValue,
          Authorization: req.url.indexOf('/assets') === (-1) ? `Bearer ${token}` : '',
          // 'x-access-name': currentUser?.username as string,
          // 'Key-Lang': this.currentLang ?? 'EN'
        }
      });
    }
  } catch (error) {
    authService.logout();
    authState.initialDefaultStates();
    router.navigateByUrl('/login');
  }
  return next(req);
};
