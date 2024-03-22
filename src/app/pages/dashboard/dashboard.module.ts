import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardAnalyticsComponent } from './dashboard-analytics/dashboard-analytics.component';
import { DashboardProjectComponent } from './dashboard-projects/dashboard-projects.component';
import { DashboardCrmComponent } from './dashboard-crm/dashboard-crm.component';
import { DashboardWalletComponent } from './dashboard-wallet/dashboard-wallet.component';

@NgModule({
    imports: [
        SharedModule,
        DashboardRoutingModule
    ],
    exports: [
        DashboardComponent,
        DashboardAnalyticsComponent,
        DashboardProjectComponent,
        DashboardCrmComponent,
        DashboardWalletComponent
    ],
    declarations: [
        DashboardComponent,
        DashboardAnalyticsComponent,
        DashboardProjectComponent,
        DashboardCrmComponent,
        DashboardWalletComponent
    ],
    providers: [
    ],
})
export class DashboardModule { }