import { CanActivate, UrlTree } from '@angular/router';
import { Observable, filter, switchMap } from 'rxjs';

import { DialogService } from '@shared/services/dialog.service';
import { Injectable } from '@angular/core';
import { RoomService } from '@shared/services';

@Injectable({
    providedIn: 'root',
})
export class ExitRoomGuard implements CanActivate {
    constructor(
        private readonly _roomService: RoomService,
        private readonly _dialogService: DialogService
    ) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this._dialogService.confirm().pipe(
            filter((isConfirm) => isConfirm),
            switchMap(() => {
                return this._roomService.leaveRoom();
            })
        );
    }
}
