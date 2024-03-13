import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { UserType } from '../../../pages/user/models/user.model';
import { UserService } from '../../../pages/user/services/user.service';
import { BaseModel } from '../../../shared/models';

type UserState = {
    users: UserType[];
    isLoading: boolean;
};

const initialState: UserState = {
    users: [],
    isLoading: false,
};

export const UserStore = signalStore(
    withState(initialState),
    withMethods((store, userService = inject(UserService)) => ({
        updateUsers(users: UserType[]): void {
            patchState(store, (state) => ({ users: [...users] }));
        },
        loadByUsername: rxMethod<BaseModel>(
            pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(() => patchState(store, { isLoading: true })),
                switchMap(() => {
                    return userService.getUsers().pipe(
                        tapResponse({
                            next: (response: BaseModel) => {
                                if (response.code === (-1)) return;
                                patchState(store, { users: [...response.data] });
                            },
                            error: console.error,
                            finalize: () => patchState(store, { isLoading: false })
                        })
                    );
                })
            )
        )
    }))
);