import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterOutlet } from "@angular/router";

//Components
import { AppPaginatorComponent } from "./components/paginator/paginator.component";
import { AppMainComponent } from "./layouts/main/app.main.component";

//Modules
import { SharedPrimeNgModule } from "./primeng.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

//Service
import { MenuService } from "./services/app.menu.service";
import { LayoutService } from "./services/app.layout.service";

//Pipie
import { DateFormatPipe } from "./pipes/date.pipe";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { AccountUserComponent } from "./layouts/components/account-user/account-user.component";
import { BrandsComponent } from "./layouts/components/brands/brands.component";
import { HelpBoxComponent } from "./layouts/components/help-box/help-box.component";
import { LanguagesComponent } from "./layouts/components/languages/languages.component";
import { NotificationComponent } from "./layouts/components/notification/notification.component";
import { PageTitleBoxComponent } from "./layouts/components/page-title-box/page-title-box.component";
import { TopSearchComponent } from "./layouts/components/top-search/top-search.component";
import { FooterComponent } from "./layouts/footer/footer.component";
import { HeaderComponent } from "./layouts/header/header.component";
import { AppMenuComponent } from "./layouts/app-menu/app-menu.component";
import { RightSidebarComponent } from "./layouts/right-sidebar/right-sidebar.component";
@NgModule({
    declarations: [
        AppMainComponent,
        FooterComponent,
        HeaderComponent,
        RightSidebarComponent,
        HelpBoxComponent,
        LanguagesComponent,
        NotificationComponent,
        BrandsComponent,
        TopSearchComponent,
        AccountUserComponent,
        PageTitleBoxComponent,
        AppPaginatorComponent,
        DateFormatPipe,
        AppMenuComponent
    ],
    imports: [
        CommonModule,
        RouterOutlet,
        FormsModule,
        SharedPrimeNgModule,
        TranslateModule
    ],
    exports: [
        CommonModule,
        RouterOutlet,
        FormsModule,
        SharedPrimeNgModule,
        TranslateModule,
        AppPaginatorComponent,
        DateFormatPipe,
        LanguagesComponent
    ],
    providers: [
        
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class SharedModule { }