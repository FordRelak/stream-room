import { Destroyable } from '@shared/lib';
import { Injectable } from '@angular/core';
import { RoomStateFacade } from '@entities/room';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

@Injectable()
export class RoomStateCurrentRoomListenerRedirectorService extends Destroyable {
    constructor(private readonly _roomStateFacade: RoomStateFacade, private readonly _router: Router) {
        super();

        _roomStateFacade.currentRoom$.pipe(takeUntil(this.destroy$)).subscribe((room) => {
            if (room) {
                _router.navigate(['rooms', room.id]);
            }
        });
    }
}
