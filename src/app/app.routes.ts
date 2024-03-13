import { Routes } from '@angular/router';
import { canActivate } from './cores/guards/auth.guard';
import { AppMainComponent } from './shared/layouts/main/app.main.component';
import { TitleTranslate } from './cores/helpers';

export const routes: Routes = [
    {
        path: '',
        component: AppMainComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/dashboard/dashboard.module').then(mod => mod.DashboardModule),
                data: {
                    title: 'title.dashboard'
                },
                resolve: {
                    title: TitleTranslate
                },
                title: TitleTranslate
            },
            {
                path: 'user',
                loadChildren: () => import('./pages/user/user.module').then(mod => mod.UserModule),
                data: {
                    title: 'title.user'
                },
                resolve: {
                    title: TitleTranslate
                },
                title: TitleTranslate
            },
        ],
        canActivate: [canActivate]
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then(mod => mod.LoginModule),
        data: {
            title: 'title.login'
        },
        resolve: {
            title: TitleTranslate
        },
        title: TitleTranslate
    },
    // { path: '**', component: NotFoundComponent }
];
