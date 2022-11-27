import { EnitityBase } from './../../core/models/base';
import { Observable, ReplaySubject, take, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { User } from '@core/models';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public readonly user$: Observable<User>;

    private readonly _user$: ReplaySubject<User>;

    constructor() {
        this._user$ = new ReplaySubject<User>();
        this.user$ = this._user$.asObservable();
    }

    public setUser(user: User): void {
        if (!user) {
            throw new Error('User is null');
        }

        this._user$.next(user);
    }

    public setName(newName: string): void {
        if (!newName) {
            throw new Error('newName is null');
        }

        this._updateUser({ name: newName });
    }

    private _updateUser(
        newUserData: Omit<Partial<User>, keyof EnitityBase>
    ): void {
        this._user$
            .pipe(
                take(1),
                tap((user) => {
                    const newUser = <User>{
                        ...user,
                        ...newUserData,
                    };

                    this._user$.next(newUser);
                })
            )
            .subscribe();
    }
}
