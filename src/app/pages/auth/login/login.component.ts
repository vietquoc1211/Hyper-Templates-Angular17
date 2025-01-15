import { Component, OnInit, effect, inject } from '@angular/core';
import { getState } from '@ngrx/signals';
import { AuthDataStore, AuthState } from '../../../cores/stores/actions';
import { Router } from '@angular/router';
import {  CookieNames, LocalStorageKey } from '../../../shared/enums';
import { LayoutService } from '../../../shared/services/app.layout.service';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, ToastService } from '../../../cores/services';
import { ValidateInputStatus } from '../../../shared/models';
import { emailRegex } from '../../../shared/constants';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  readonly authStore = inject(AuthDataStore);
  readonly router = inject(Router);
  readonly layoutService = inject(LayoutService);
  readonly spinnerService = inject(NgxSpinnerService);
  readonly cookieService = inject(CookieService);
  readonly toastService = inject(ToastService);

  valCheck: string[] = ['remember'];
  loginForm!: FormGroup;
  authState!: AuthState;
  username!: string;
  password!: string;
  remember: boolean = false;
  invalidStatus: ValidateInputStatus = new ValidateInputStatus();

  constructor(private readonly auth: AuthService) {
    effect(() => {
        this.authState = getState(this.authStore);
    })
  }

  ngOnInit(): void {
    this.cookieService.delete(CookieNames.SESSIONID);

    if (localStorage.getItem(LocalStorageKey.REMEMBER)) {
        const email = localStorage.getItem(LocalStorageKey.EMAIL);
        this.username = email ?? "";
        this.remember = true;
    }

    this.auth.checkLogin();
  }

  validate() {
    let check = true;
    this.invalidStatus.key = {};
    if (!this.username) {
        check = false;
        this.invalidStatus.key['email'] = 'errors.ME_GT_002';
    }
    else if (this.username && !emailRegex.exec(this.username)) {
        check = false;
        this.invalidStatus.key['email'] = 'errors.ME_GT_001';
    }

    if (!this.password) {
        check = false;
        this.invalidStatus.key['password'] = 'errors.ME_GT_003';
    }
    return check;
  }
  setErrorClass(name: string) {
    return this.invalidStatus.key[name] ? this.invalidStatus.className : '';
  }

  onclickLogin() {
    // this.spinnerService.show();
    if (!this.validate()) return;
    localStorage.setItem(LocalStorageKey.EMAIL, this.username);
    if (!this.remember) localStorage.removeItem(LocalStorageKey.REMEMBER);
    else localStorage.setItem(LocalStorageKey.REMEMBER, '1');
    this.auth.login(this.username.trim(), this.password.trim());
  }

  onClickSignup(event: any) {
    event.preventDefault();
    this.router.navigateByUrl('/auth/signup');
  }

  onClickForgotPassword() {
      this.router.navigateByUrl('/auth/forgot-password');
  }
}
