import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { COOKIE_SERVICE_KEYS, SessionStorageKey } from '../../shared/enums';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class PermissionsService {
    readonly authService = inject(AuthService);
    readonly cookieService = inject(CookieService);
    readonly router = inject(Router);

    constructor() { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log(state)
        const token = this.cookieService.get(COOKIE_SERVICE_KEYS.TOKEN);
        if (!token) {
            sessionStorage.setItem(SessionStorageKey.RETURN_URL, state.url);
            this.authService.logout();
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //do something
        return true;
    }
}