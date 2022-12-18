import { UserGraphQlService } from '@core/services';
import { EnitityBase } from '@core/models/base';
import { Observable, ReplaySubject, take, tap, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { User } from '@core/models';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public readonly user$: Observable<User>;

    private readonly _user$: ReplaySubject<User>;

    constructor(private readonly _userGraphQLService: UserGraphQlService) {
        this._user$ = new ReplaySubject<User>();
        this.user$ = this._user$.asObservable();
    }

    public setUser(user: User): void {
        if (!user) {
            throw new Error('User is null');
        }

        this._user$.next(user);
    }

    // eslint-disable-next-line @typescript-eslint/no-dupe-class-members
    public setUser(nickname: string): Observable<void> {
        return this._userGraphQLService.createUser(nickname).pipe(
            tap((userId) => {
                this._user$.next({
                    id: userId,
                    name: nickname,
                });
            }),
            map(() => {
                return;
            })
        );
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
