import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { UserProfileStateFacade } from '@entities/userprofile/model';

/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

@Injectable({
    providedIn: 'root',
})
export class ProfileNotSetGuard implements CanActivate, CanActivateChild {
    constructor(
        private readonly _userProfileStateFacade: UserProfileStateFacade
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this._userProfileStateFacade.isProfileSet$.pipe(
            map((isProfileSet) => !isProfileSet)
        );
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(childRoute, state);
    }
}
