import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolePermissionComponent } from './components/role-permission/role-permission.component';
import { TitleTranslate } from '../../cores/helpers';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'role-permission',
            component: RolePermissionComponent,
            data: {
                title: 'tabs.systems.role&permission'
            },
            resolve: {
                title: TitleTranslate
            },
            title: TitleTranslate,
        }
    ])],
    exports: [RouterModule]
})
export class SystemRoutingModule { }