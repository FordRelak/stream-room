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

        this._user$.next({
            id: '33e2976f-5fcc-40f9-ad32-81dbcb59b0c8',
            name: '321',
        });
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

        this._user$
            .pipe(
                take(1),
                tap((user) => {
                    const newUser = <User>{
                        ...user,
                        name: newName,
                    };

                    this._user$.next(newUser);
                })
            )
            .subscribe();
    }
}
