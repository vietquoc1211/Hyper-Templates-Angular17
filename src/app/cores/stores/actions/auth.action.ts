import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { UserInfo } from '../../models';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { tapResponse } from '@ngrx/operators';

type AuthState = {
    token: string;
    userInfo: UserInfo | Object;
    isLoading: boolean;
};

const initialState: AuthState = {
    token: '',
    userInfo: {},
    isLoading: false,
};

export const AuthStore = signalStore(
    withState(initialState),
    withMethods((store, authService = inject(AuthService)) => ({
        updateToken(token: string): void {
            patchState(store, (state) => ({ token: token }));
        },
        updateUserInfo(user: UserInfo | Object): void {
            patchState(store, (state) => ({ userInfo: { ...user } }));
        },
        initialDefaultStates(): void {
            patchState(store, (state) => ({ ...initialState }));
        },
        loadByUsername: rxMethod<string>(
            pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(() => patchState(store, { isLoading: true })),
                switchMap((username: string) => {
                    return authService.getUserInfo(username).pipe(
                        tapResponse({
                            next: (response) => {
                                if (response.code === 1) {
                                    patchState(store, { userInfo: { ...response.data } })
                                }
                            },
                            error: (error) => console.error(error),
                            finalize: () => patchState(store, { isLoading: false })
                        })
                    );
                })
            )
        )
    }))
);