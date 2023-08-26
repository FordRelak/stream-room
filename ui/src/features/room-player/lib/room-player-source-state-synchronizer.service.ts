import { Injectable } from '@angular/core';
import { PlayerStateFacade } from '@entities/player';
import { RoomStateFacade } from '@entities/room';
import { Destroyable } from '@shared/lib';
import { distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs';

@Injectable()
export class RoomPlayerSourceStateSynchronizerService extends Destroyable {
    constructor(playerStateFacade: PlayerStateFacade, roomStateFacade: RoomStateFacade) {
        super();
        roomStateFacade.currentRoom$
            .pipe(
                filter((room) => !!room),
                map((room) => room.source),
                distinctUntilChanged(),
                tap((source) => playerStateFacade.updateSource(source)),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }
}
