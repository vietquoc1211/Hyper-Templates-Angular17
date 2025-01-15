import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService, CommonService, ToastService } from '../../../cores/services';
import { Column } from '../../../shared/models';
import { endpoints } from '../../../shared/constants/endpoints';
import { LocalStorageKey, StatusCodes } from '../../../shared/enums';
import { MenuPage } from '../../../shared/models/masterdata.model';
import { User } from '../../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class SystemService {
    readonly apiService: ApiService = inject(ApiService);
    readonly commonService: CommonService = inject(CommonService);
    readonly toastService: ToastService = inject(ToastService);
    readonly router: Router = inject(Router);
    readonly apiPath: string = 'role-permission';
    readonly apiPagePath: string = 'page';

    constructor() { }

    getBreadcrumb() {
        const groupName = { label: 'breadcrumbs.system.systemManagement' };
        return [
            groupName,
            { label: 'breadcrumbs.system.roleAndPermission' },
        ];
    }

    getRoles(filterParams: Column[]) {
        const params = this.commonService.onCreateHttpParams(filterParams);
        return this.apiService.get(endpoints.systems.getRoles, params);
    }

    getPermissionsByRoleId(roleId: string) {
        const params: HttpParams = new HttpParams().set('roleId', roleId);
        return this.apiService.get<any>(endpoints.systems.pagePermissions, params);
    }

    getPages() {
        return this.apiService.get(endpoints.systems.getPages);
    }

    getPermissions() {
        return this.apiService.get(endpoints.systems.getPermissions);
    }

    savePermissionDetail(permissionDetail: any) {
        return this.apiService.post(endpoints.systems.assignPermissions, permissionDetail);
    }

    addRole({ roleName, permissionGroup, level, description }: { roleName: string, permissionGroup: string, level: number, description: string }) {
        return this.apiService.post(endpoints.systems.addRole, { roleName, permissionGroup, level, description });
    }

    getPageMenus(roleId: string) {
        const params: HttpParams = new HttpParams().set('roleId', roleId);
        return this.apiService.get(endpoints.systems.getPageMenus, params);
    }

    getPermissionsByPage(path: string, roleId: string) {
        const params: HttpParams = new HttpParams().set('path', path).set('roleId', roleId);
        return this.apiService.get<any>(endpoints.systems.getPermissionsByPage, params);
    }

    async canAccessByRoleId(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            const userInfo = localStorage.getItem(LocalStorageKey.USER);
            if (!userInfo) {
                this.router.navigateByUrl('/auth/login');
                return false;
            }
            const user: User = JSON.parse(userInfo);
            const params: HttpParams = new HttpParams().set('roleId', user.role ?? "");

            const payload = await lastValueFrom(this.apiService.getByHttpParams<MenuPage[]>(endpoints.systems.getPageMenus, params));
            if (payload) {
                if (payload?.statusCode !== StatusCodes.SUCCESS || !payload.data?.length) {
                    this.router.navigateByUrl('/auth/access');
                    return false;
                }
                const isValidPage = payload.data.filter(x => x.level !== 0).find(el => {
                    if (state.url === '/' && state.url === el.path) return el;
                    if (state.url.indexOf(el.path) !== (-1) && !['/'].includes(el.path)) return el;
                    return null;
                });

                if (!isValidPage) {
                    this.router.navigateByUrl('/auth/access');
                    return false;
                }
            }
        } catch (error) {
            this.toastService.showError(await this.commonService.getTranslateAsync('notification.somethingWrong'));
            this.router.navigateByUrl('/auth/access');
            return false;
        }
        return true;
    }

    editRoleStatus(data: { roleId: string, isActive: boolean }) {
        return this.apiService.put(endpoints.systems.editRoleStatus, data);
    }
}