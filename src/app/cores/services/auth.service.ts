import { Injectable, inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { LocalStorageKey, SessionStorageKey, StatusCodes } from '../../shared/enums';
import { ApiService } from './api.service';
import { BaseResponse } from '../../shared/models';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from './toast.service';
import { CommonService } from './common.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AuthService {
    readonly toastService: ToastService = inject(ToastService);
    readonly commonService: CommonService = inject(CommonService);  
    protected apiService: ApiService;
    readonly cookieService = inject(CookieService);
    readonly router: Router = inject(Router);
    readonly http: ApiService = inject(ApiService);
    readonly spinnerService = inject(NgxSpinnerService);

    private readonly userSubject!: BehaviorSubject<User | null>;
    public user!: Observable<User | null>;
    
    constructor() {
        this.apiService = inject(ApiService);
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(LocalStorageKey.USER) ?? 'null'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
      return this.userSubject?.value;
    }

    login(email: string, password: string) {
        this.spinnerService.show();
        this.http.post('auth/login', { email, password }).subscribe({
          next: async (response: BaseResponse<User>) => {
            if (response.statusCode === StatusCodes.SUCCESS) {
              const user = response.data;
              localStorage.setItem(LocalStorageKey.USER, JSON.stringify(user));
              this.userSubject.next(user);
              this.toastService.showSuccess(
                await this.commonService.getTranslateAsync('notification.loginSuccess')
              );
              this.router.navigateByUrl('/');
            } else {
              this.toastService.showError(response.message);
            }
          },
          error: async (e) => {
            await this.toastService.showError(
              await this.commonService.getTranslateAsync('notification.somethingWrong')
            );
            this.spinnerService.hide();
          },
          complete: () => this.spinnerService.hide(),
        });
    }
    logout() {
        // localStorage.removeItem(LocalStorageKey.TOKEN);
        localStorage.removeItem(LocalStorageKey.USER);
        sessionStorage.removeItem(SessionStorageKey.RETURN_URL);
        this.cookieService.deleteAll();
    }

    checkLogin() {
        // this.http.getByHttpParams(endpoints.auth.checkLogin).subscribe({
        //   next: (response: BaseResponse<any>) => {
        //     if (response.statusCode !== StatusCodes.SUCCESS) {
        //       return;
        //     }
        //     this.router.navigateByUrl('/');
        //   },
        //   error: () => this.spinner.hide(),
        //   complete: () => this.spinner.hide(),
        // });
    }
}