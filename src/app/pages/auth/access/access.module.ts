import { NgModule } from '@angular/core';

import { AccessRoutingModule } from './access-routing.module';
import { AccessComponent } from './access.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        AccessRoutingModule
    ],
    declarations: [AccessComponent]
})
export class AccessModule { }
