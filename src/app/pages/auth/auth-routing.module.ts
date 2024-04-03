import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { RecoverpwComponent } from './recoverpw/recoverpw.component';
import { ConfirmMailComponent } from './confirm-mail/confirm-mail.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recoverpw',component: RecoverpwComponent },
    { path: 'confirm-mail', component: ConfirmMailComponent},
    { path: 'lock-screen', component: LockScreenComponent} 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }