import { Routes } from '@angular/router';
import { canActivate } from './cores/guards/auth.guard';
import { AppMainComponent } from './shared/layouts/main/app.main.component';
import { TitleTranslate } from './cores/helpers';
import { Page404AltComponent } from './pages/error/page404-alt/page404-alt.component';
import { Page404Component } from './pages/error/page404/page404.component';
import { Page406Component } from './pages/error/page406/page406.component';
import { Page500Component } from './pages/error/page500/page500.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

export const routes: Routes = [
    {
        path: '',
        component: AppMainComponent,
        children: [
            {
                path: 'dashboard',
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
            {
                path: 'calendar',
                component: CalendarComponent,
                data: {
                    title: 'title.calendar'
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
    {
        path: "page-404",
        component: Page404Component,
        data: {
            title: 'Page Not Found'
        }
    },
    {
        path: "page-406-alt",
        component: Page404AltComponent,
        data: {
            title: 'Page Not Found'
        }
    },
    {
        path: "page-406",
        component: Page406Component,
        data: {
            title: 'Page Not Acceptable'
        }
    },
    {
        path: "page-500",
        component: Page500Component,
        data: {
            title: 'Internal Server Error'
        }
    },
    {
          "path": "**",
          "redirectTo": "page-404",
          "pathMatch": "full"
    },
    // { path: '**', component: NotFoundComponent }
];
