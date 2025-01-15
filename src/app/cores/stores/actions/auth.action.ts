import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { PagePermission } from '../../../shared/models/masterdata.model';
import { LocalStorageKey, SignUpStepType, StatusCodes } from '../../../shared/enums';
import { AuthService } from '../../services';
import { SystemService } from '../../../pages/system/services/system.service';

export type AuthState = {
    userInfo: User | null;
    step: number;
    pagePermission: PagePermission | null;
    isPagePermissionLoading: boolean;
};

const initialState: AuthState = {
    userInfo: null,
    step: SignUpStepType.STEP1,
    pagePermission: null,
    isPagePermissionLoading: false
};

export const AuthDataStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, authService = inject(AuthService), systemService = inject(SystemService)) => ({
        initialDefaultStates(): void {
            patchState(store, { ...initialState });
        },
        updateUserInfo: (user: User) => {
            patchState(store, { userInfo: { ...user } });
        },
        updateSignUpStep: (step: number) => {
            patchState(store, { step: step });
        },
        loadUserInfoByLogin: () => {
            const getUserLocal = localStorage.getItem(LocalStorageKey.USER);
            if (!getUserLocal) {
                patchState(store, { userInfo: { ...authService.userValue } });
                return;
            };
            patchState(store, { userInfo: JSON.parse(getUserLocal) });
        },
        loadPermissionButtons: (path: string) => {
            const getUserLocal = localStorage.getItem(LocalStorageKey.USER);
            if (!getUserLocal) return [];
            const userInfo = JSON.parse(getUserLocal) as User;
            patchState(store, { isPagePermissionLoading: true });
            return systemService.getPermissionsByPage(path, userInfo.role ?? "").subscribe({
                next: (payload) => {
                    if (payload) {
                        if (payload.statusCode !== StatusCodes.SUCCESS) {
                            patchState(store, { pagePermission: null });
                            return;
                        }
                        if (!payload.data || !Object.keys(payload.data).length) return;
                        patchState(store, { pagePermission: {...payload.data} });
                    }
                },
                error: (e) => {
                    patchState(store, { pagePermission: null });
                },
                complete: () => {
                    patchState(store, { isPagePermissionLoading: false });
                }
            })
        },
    })),
    withHooks({
        onInit({ loadUserInfoByLogin, initialDefaultStates }) {
            initialDefaultStates();
            loadUserInfoByLogin();
        }
    })
);