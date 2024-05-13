import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrmComponent } from './crm.component';
import { CrmClientComponent } from './crm-client/crm-client.component';
import { CrmManagementComponent } from './crm-management/crm-management.component';
import { CrmProjectComponent } from './crm-project/crm-project.component';
import { CrmOrderListComponent } from './crm-order-list/crm-order-list.component';


const routes: Routes = [
    { path: '', component: CrmComponent },
    { path: 'projects', component: CrmProjectComponent },
    { path: 'orders-list', component: CrmOrderListComponent},
    { path: 'clients-list', component: CrmClientComponent },
    { path: 'management', component: CrmManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CRMRoutingModule { }