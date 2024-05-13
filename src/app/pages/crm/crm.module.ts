import { NgModule } from '@angular/core';
import { CRMRoutingModule } from './crm-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        CRMRoutingModule,
        SharedModule,
    ],
    exports: []
})
export class CRMModule { }