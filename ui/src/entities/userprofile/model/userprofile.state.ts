import { map, Observable, of } from 'rxjs';
import { Action, NgxsOnInit, Selector, SelectorOptions, State, StateContext } from '@ngxs/store';

import { Injectable } from '@angular/core';
import { USER_PROFILE_STATE_TOKEN } from './userprofile-state.token';
import { UserProfileStateModel } from './userprofile-state.model';
import { UserProfileActions } from './userprofile-state.actions';
import { CreateUserModel, UpdateUserModel, UserApi } from '@shared/api/user';

const userProfileStateModelDefault: UserProfileStateModel = {
    id: '',
    nickname: '',
};

@State<UserProfileStateModel>({
    name: USER_PROFILE_STATE_TOKEN,
    defaults: userProfileStateModelDefault,
})
@SelectorOptions({
    suppressErrors: false,
    injectContainerState: false,
})
@Injectable({
    providedIn: 'root',
})
export class UserProfileState implements NgxsOnInit {
    constructor(private readonly _userApi: UserApi) {}

    @Action(UserProfileActions.SetNickname)
    public setNickname(
        context: StateContext<UserProfileStateModel>,
        { nickname }: UserProfileActions.SetNickname
    ): Observable<void> {
        const state = context.getState();

        if (state.id) {
            return this._updateUserNickname(state.id, nickname, context);
        }

        return this._createUserWithNickname(nickname, context);
    }

    @Action(UserProfileActions.FetchProfile)
    public fetchProfile(context: StateContext<UserProfileStateModel>): Observable<void> {
        const state = context.getState();

        if (!state.id) {
            return of();
        }

        return this._userApi.get(state.id).pipe(
            map((user) => {
                context.setState({
                    ...user,
                });
            })
        );
    }

    @Selector([USER_PROFILE_STATE_TOKEN])
    static nickname(state: UserProfileStateModel): string {
        return state.nickname;
    }

    @Selector([USER_PROFILE_STATE_TOKEN])
    static isProfileSet(state: UserProfileStateModel): boolean {
        return !!state.id;
    }

    ngxsOnInit(context: StateContext<UserProfileStateModel>): void {
        const state = context.getState();

        if (!state.id) {
            return;
        }

        context.dispatch(new UserProfileActions.FetchProfile());
    }

    private _createUserWithNickname(nickname: string, context: StateContext<UserProfileStateModel>) {
        const newUser = <CreateUserModel>{
            nickname,
        };

        return this._userApi.create(newUser).pipe(
            map((userId) => {
                context.setState({
                    id: userId,
                    nickname: nickname,
                });
            })
        );
    }

    private _updateUserNickname(
        userId: string,
        newNickname: string,
        context: StateContext<UserProfileStateModel>
    ) {
        const updateUser = <UpdateUserModel>{
            id: userId,
            nickname: newNickname,
        };

        return this._userApi.update(updateUser).pipe(
            map(() => {
                context.patchState({
                    nickname: newNickname,
                });
            })
        );
    }
}
