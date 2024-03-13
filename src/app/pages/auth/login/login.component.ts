import { Component, OnInit, effect, inject } from '@angular/core';
import { getState } from '@ngrx/signals';
import { AuthStore } from '../../../cores/stores/actions';
import { Router } from '@angular/router';
import { COOKIE_SERVICE_KEYS, SessionStorageKey } from '../../../shared/enums';
import { LayoutService } from '../../../shared/services/app.layout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { makeId } from '../../../cores/helpers/index';
import { ToastService } from '../../../cores/services';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `
  ]
})
export class LoginComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  readonly router = inject(Router);
  readonly layoutService = inject(LayoutService);
  readonly spinnerService = inject(NgxSpinnerService);
  readonly cookieService = inject(CookieService);
  readonly toastService = inject(ToastService);

  valCheck: string[] = ['remember'];
  loginForm!: FormGroup;
  usernameId: string = makeId(10);
  passwordId: string = makeId(10);

  constructor() {
    effect(() => {
      const state = getState(this.authStore);
      if (state.token) this.router.navigateByUrl(sessionStorage.getItem(SessionStorageKey.RETURN_URL) as string)
    });

    this.loginForm = new FormGroup({
      username: new FormControl('vietbui', [Validators.required]),
      password: new FormControl('123456', Validators.required),
    });
  }

  ngOnInit(): void {

  }

  handleSubmit() {
    console.log(this.loginForm)
    this.spinnerService.show();
    this.toastService.showSuccess('Đang làm plan tiếp')

    if (!this.username || !this.password) {
      return;
    }

    setTimeout(() => {
      this.spinnerService.hide();
      const tokenStr = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDY0OTczOTQsImV4cCI6MTczODAzMzM5OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.e_qUyE_V2h1QOX90MD6dpGQ-xIx2yuUv69f5xvw0THI";
      this.spinnerService.hide();
      this.cookieService.set(COOKIE_SERVICE_KEYS.TOKEN, tokenStr);
      this.authStore.updateToken(tokenStr);
      this.router.navigateByUrl(sessionStorage.getItem(SessionStorageKey.RETURN_URL) ?? '/')
    }, 1000);
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
