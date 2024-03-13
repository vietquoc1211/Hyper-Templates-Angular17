import { Injectable, inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { LocalStorageKey, SessionStorageKey } from '../../shared/enums';
import { ApiService } from './api.service';
import { BaseModel } from '../../shared/models';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
    protected apiService: ApiService;
    readonly cookieService = inject(CookieService);

    constructor() {
        this.apiService = inject(ApiService);
    }

    getUserInfo(username: string) {
        return this.apiService.get<BaseModel>(`http://localhost:4001/api/user/user-info`, new HttpParams().set('username', username));
    }

    logout() {
        // localStorage.removeItem(LocalStorageKey.TOKEN);
        localStorage.removeItem(LocalStorageKey.USER);
        sessionStorage.removeItem(SessionStorageKey.RETURN_URL);
        this.cookieService.deleteAll();
    }
}