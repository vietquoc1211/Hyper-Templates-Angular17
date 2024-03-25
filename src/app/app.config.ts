import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

//Interceptors
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor, ErrorInterceptor } from './cores/interceptors';

//Modules
import { SharedModule } from './shared/shared.module';
import {
  MissingTranslationHandler, MissingTranslationHandlerParams,
  TranslateLoader, TranslateModule
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './cores/cores.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return '';
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([
        TokenInterceptor,
        ErrorInterceptor
      ])
    ),
    importProvidersFrom([
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      RouterOutlet,
      CoreModule,
      SharedModule,
      TranslateModule.forRoot({
        defaultLanguage: localStorage.getItem('locale') || 'vi',
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        },
        missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler }
      })
    ])
  ]
};