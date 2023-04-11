/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable, map } from 'rxjs';

import { UserProfileStateFacade } from '@entities/userprofile';

export const PROFILE_SET_GUARD_CALLBACK_URL_TOKEN = new InjectionToken<string>('APP_PROFILE_SET_GUARD_CALLBACK_URL');

@Injectable({
    providedIn: 'root',
})
export class ProfileSetGuard implements CanActivate, CanActivateChild {
    constructor(
        private readonly _userProfileStateFacade: UserProfileStateFacade,
        private readonly _router: Router,
        @Inject(PROFILE_SET_GUARD_CALLBACK_URL_TOKEN)
        @Optional()
        private readonly _profileSetGuardCallbackUrl: string
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._userProfileStateFacade.isProfileSet$.pipe(
            map((isProfileSet) => {
                if (!isProfileSet && this._profileSetGuardCallbackUrl) {
                    return this._router.createUrlTree([this._profileSetGuardCallbackUrl]);
                }

                return isProfileSet;
            })
        );
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }
}
