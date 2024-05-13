import { NgModule } from '@angular/core';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserListComponent } from './components/users-list/user-list.component';
import { UserService } from './services/user.service';

@NgModule({
    imports: [
        SystemRoutingModule,
        SharedModule,
    ],
    declarations: [
        UserListComponent
    ],
    exports: [],
    providers: [ 
        UserService
    ]
})
export class SystemModule { }