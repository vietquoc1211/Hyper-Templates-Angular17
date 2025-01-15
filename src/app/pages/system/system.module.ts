import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RolePermissionComponent } from './components/role-permission/role-permission.component';
import { SystemRoutingModule } from './system-routing.module';
import { CommonModule } from '@angular/common';
import {Ripple} from "primeng/ripple";
import { CoreModule } from '../../cores/cores.module';

@NgModule({
    declarations: [
        RolePermissionComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        SystemRoutingModule,
        Ripple
    ],
    providers: []
})
export class SystemModule { }
