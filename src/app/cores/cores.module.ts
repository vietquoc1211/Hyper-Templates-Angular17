import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

//Models

//Guards
import { throwIfAlreadyLoaded } from './guards/module-import.guard';

//Services
import {
    AuthService,
    ApiService,
    PermissionsService,
    CommonService,
    ToastService
} from './services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthStore } from './stores/actions';
import { CookieService } from 'ngx-cookie-service';
import { MenuService } from '../shared/services/app.menu.service';
import { LayoutService } from '../shared/services/app.layout.service';
import { NgxSpinnerService } from 'ngx-spinner';

//Modules

const DATA_SERVICES = [
    MessageService,
    ConfirmationService,
    ApiService,
    AuthService,
    PermissionsService,
    CookieService,
    CommonService,
    ToastService,
    MenuService,
    LayoutService,
    NgxSpinnerService,
    AuthStore
];

@NgModule({
    declarations: [],
    providers: [...DATA_SERVICES]
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return <ModuleWithProviders<CoreModule>>{
            ngModule: CoreModule,
            providers: [
                ...DATA_SERVICES,
            ],
        };
    }
}