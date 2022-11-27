import { STORAGE } from './../modules/storage/storage.module';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap, map, of } from 'rxjs';
import { UserGraphQlService } from '@core/services';

enum AuthStorageKeysEnum {
    UserId = 'userId',
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private readonly _userGraphQlService: UserGraphQlService,
        @Inject(STORAGE)
        private readonly _storage: Storage
    ) {}

    public login(nickName: string): Observable<string> {
        return this._userGraphQlService.createUser(nickName).pipe(
            tap((userId) => {
                this._storage?.setItem(AuthStorageKeysEnum.UserId, userId);
            })
        );
    }

    public isAuthorized(): Observable<boolean> {
        const userId = this._storage.getItem(AuthStorageKeysEnum.UserId) ?? '';

        if (!userId) {
            return of(false);
        }

        return this._userGraphQlService
            .getUser(userId)
            .pipe(map((user) => !!user));
    }

    public logout(): Observable<void> {
        const userId = this._storage.getItem(AuthStorageKeysEnum.UserId) ?? '';

        if (!userId) {
            return of();
        }

        //todo
        return of();
    }
}
