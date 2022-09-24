import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public readonly name$: Observable<string>;

    private readonly _name$: BehaviorSubject<string>;

    constructor() {
        this._name$ = new BehaviorSubject<string>('');
        this.name$ = this._name$.asObservable();
    }

    public setName(newName: string): void {
        if (!newName) {
            throw new Error('newName is null');
        }

        this._name$.next(newName);
    }
}
