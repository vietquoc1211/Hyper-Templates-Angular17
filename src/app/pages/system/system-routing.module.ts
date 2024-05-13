import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { UserListComponent } from './components/users-list/user-list.component';

const routes: Routes = [
    { path: '', component: SystemComponent },
    { path: 'user-list', component: UserListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule { }