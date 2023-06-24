import { Actions, Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { NgXsActionable } from '@shared/lib';
import { UserProfileActions } from './userprofile-state.actions';
import { UserProfileState } from './userprofile.state';

@Injectable({
    providedIn: 'root',
})
export class UserProfileStateFacade extends NgXsActionable {
    @Select(UserProfileState.nickname)
    public readonly nickname$!: Observable<string>;

    @Select(UserProfileState.isProfileSet)
    public readonly isProfileSet$!: Observable<boolean>;

    public isLoaded$!: Observable<boolean>;
    public nicknameSetted$!: Observable<boolean>;

    private readonly _isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private readonly _nicknameSetted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private readonly _storeActions: Actions, private readonly _store: Store) {
        super(_storeActions);

        this._configureIsLoaded();
        this._configureNicknameSetted();
    }

    public setNickname(nickname: string): void {
        this._store.dispatch(new UserProfileActions.SetNickname(nickname));
    }

    public fetchProfile(): void {
        this._store.dispatch(new UserProfileActions.FetchProfile());
    }

    public clear(): void {
        this._store.dispatch(new UserProfileActions.ClearProfile());
    }

    private _configureIsLoaded() {
        this.isLoaded$ = this._isLoaded$.asObservable();

        this._listenDispached(this._isLoaded$, false, UserProfileActions.FetchProfile);

        this._listenSuccessful(this._isLoaded$, true, UserProfileActions.FetchProfile);
    }

    private _configureNicknameSetted() {
        this.nicknameSetted$ = this._nicknameSetted$.asObservable();

        this._listenSuccessful(this._nicknameSetted$, true, UserProfileActions.SetNickname);
    }
}
