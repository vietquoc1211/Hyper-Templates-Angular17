import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        LoginRoutingModule
    ],
    exports: [
        LoginComponent
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
    ],
})
export class LoginModule { }