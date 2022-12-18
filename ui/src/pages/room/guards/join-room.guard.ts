import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { RoomService } from '@shared/services';

@Injectable({
    providedIn: 'root',
})
export class JoinRoomGuard implements CanActivate {
    constructor(private readonly _roomService: RoomService) {}

    canActivate(
        route: ActivatedRouteSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const roomId = route.paramMap.get('id');

        if (!roomId) {
            return false;
        }

        return this._roomService.joinRoom(roomId).pipe(
            catchError((error) => {
                console.log(error);

                return of(false);
            })
        );
    }
}
