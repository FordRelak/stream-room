import {
    Actions,
    Select,
    Store,
    ofActionDispatched,
    ofActionSuccessful,
} from '@ngxs/store';
import { BehaviorSubject, Observable, take, takeUntil } from 'rxjs';

import { Destroyable } from '@shared/lib/destroyable';
import { Injectable } from '@angular/core';
import { UserProfileActions } from './userprofile-state.actions';
import { UserProfileState } from './userprofile.state';

@Injectable({
    providedIn: 'root',
})
export class UserProfileStateFacade extends Destroyable {
    @Select(UserProfileState.nickname)
    public readonly nickname$!: Observable<string>;

    @Select(UserProfileState.isProfileSet)
    public readonly isProfileSet$!: Observable<boolean>;

    public isLoaded$!: Observable<boolean>;

    private readonly _isLoaded$: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);

    constructor(
        private readonly _store: Store,
        private readonly _actions: Actions
    ) {
        super();

        this._configureIsLoaded();
    }

    public setNickname(nickname: string): void {
        this._store.dispatch(new UserProfileActions.SetNickname(nickname));
    }

    private _configureIsLoaded() {
        this.isLoaded$ = this._isLoaded$.asObservable();

        this._actions
            .pipe(
                ofActionDispatched(UserProfileActions.FetchProfile),
                take(1),
                takeUntil(this.alive$)
            )
            .subscribe(() => this._isLoaded$.next(false));

        this._actions
            .pipe(
                ofActionSuccessful(UserProfileActions.FetchProfile),
                take(1),
                takeUntil(this.alive$)
            )
            .subscribe(() => this._isLoaded$.next(true));
    }
}
