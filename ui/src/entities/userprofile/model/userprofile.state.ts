import { map, Observable } from 'rxjs';
import {
    Action,
    Selector,
    SelectorOptions,
    State,
    StateContext,
} from '@ngxs/store';

import { Injectable } from '@angular/core';
import { USER_PROFILE_STATE_TOKEN } from './userprofile-state.token';
import { UserProfileStateModel } from './userprofile-state.model';
import { UserProfileActions } from './userprofile-state.actions';
import { UserApi } from '@shared/api/user';
import { User } from '@shared/types';

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
export class UserProfileState {
    constructor(private readonly _userApi: UserApi) {}

    @Action(UserProfileActions.SetNickname)
    public setNickname(
        context: StateContext<UserProfileStateModel>,
        { nickname }: UserProfileActions.SetNickname
    ): Observable<void> {
        const state = context.getState();

        const updateUser = <User>{
            ...state,
            name: nickname,
        };

        return this._userApi.update(updateUser).pipe(
            map(() => {
                context.patchState({
                    nickname,
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
}
