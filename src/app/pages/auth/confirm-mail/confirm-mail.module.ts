import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ConfirmMailRoutingModule } from './confirm-mail-routing.module';
import { ConfirmMailComponent } from './confirm-mail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        ConfirmMailRoutingModule
    ],
    exports: [
        ConfirmMailComponent
    ],
    declarations: [
        ConfirmMailComponent
    ],
    providers: [
    ],
})
export class ConfirmMailModule { }