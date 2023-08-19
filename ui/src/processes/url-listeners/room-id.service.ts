import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomStateFacade } from '@entities/room';
import { Destroyable } from '@shared/lib';
import { takeUntil } from 'rxjs';

@Injectable()
export class RoomIdService extends Destroyable {
    constructor(
        private readonly _roomStateFacade: RoomStateFacade,
        private readonly _router: ActivatedRoute
    ) {
        super();
        _router.params.pipe(takeUntil(this.destroy$)).subscribe((parameters) => {
            const roomId = parameters['id'];

            if (roomId) {
                _roomStateFacade.loadRoom(roomId);
            }
        });
    }
}
