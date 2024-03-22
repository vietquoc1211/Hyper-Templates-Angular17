import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardAnalyticsComponent } from './dashboard-analytics/dashboard-analytics.component';
import { DashboardCrmComponent } from './dashboard-crm/dashboard-crm.component';
import { DashboardProjectComponent } from './dashboard-projects/dashboard-projects.component';
import { DashboardWalletComponent } from './dashboard-wallet/dashboard-wallet.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'analytics', component: DashboardAnalyticsComponent },
    { path: 'crm', component: DashboardCrmComponent },
    { path: 'project', component: DashboardProjectComponent },
    { path: 'wallet', component: DashboardWalletComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }