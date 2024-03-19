import { CUSTOM_ELEMENTS_SCHEMA, Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStore } from './cores/stores/actions';
import { getState } from '@ngrx/signals';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { COOKIE_SERVICE_KEYS, LocalStorageKey } from './shared/enums';
import { PrimeNGConfig } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from './cores/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    NgxSpinnerModule, 
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthStore, TranslateService, NgxSpinnerService, CommonService]
})
export class AppComponent {
  readonly authStore = inject(AuthStore);
  readonly router = inject(Router);
  readonly translationService = inject(TranslateService);
  readonly primengConfig = inject(PrimeNGConfig);
  readonly cookieService = inject(CookieService);

  constructor() {
    effect(() => {
      const state = getState(this.authStore);
      
    });

    this.primengConfig.ripple = true;

    //Fake auth data
    localStorage.setItem(LocalStorageKey.USER,
      JSON.stringify({
        firstName: "Viet",
        lastName: "Bui",
        username: "vietbui"
      })
    );
    
    //Update token from cookie to state
    this.authStore.updateToken(this.cookieService.get(COOKIE_SERVICE_KEYS.TOKEN) as string);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    const language = localStorage.getItem(LocalStorageKey.LANGUAGE) || 'vi';
    this.translationService.use(language);
  }
}
