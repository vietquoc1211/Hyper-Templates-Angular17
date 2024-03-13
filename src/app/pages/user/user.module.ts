import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule
    ],
    exports: [
        UserComponent
    ],
    declarations: [
        UserComponent
    ],
    providers: [
    ],
})
export class UserModule { }