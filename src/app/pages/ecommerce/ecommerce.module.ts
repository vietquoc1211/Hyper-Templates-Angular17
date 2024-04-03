import { NgModule } from '@angular/core';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        EcommerceRoutingModule,
        SharedModule,
    ],
    exports: []
})
export class EcommerceModule { }