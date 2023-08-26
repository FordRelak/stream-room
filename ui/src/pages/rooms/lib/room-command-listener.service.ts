import { Inject, Injectable } from '@angular/core';
import { RoomStateFacade } from '@entities/room';
import { RoomApi } from '@shared/api/room';
import { CommandTypeEnum } from '@shared/graphql';
import { Destroyable } from '@shared/lib';
import { Command } from '@shared/types';
import { Observable, filter, tap, takeUntil } from 'rxjs';
import { ROOM_ID_TOKEN } from './room-id.token';

@Injectable()
export class RoomCommandListenerService extends Destroyable {
    private readonly _skipCommads = [CommandTypeEnum.SourceHasChanged];

    constructor(
        @Inject(ROOM_ID_TOKEN) roomId: string,
        private readonly _roomStateFacade: RoomStateFacade,
        private readonly _roomApi: RoomApi
    ) {
        super();

        // eslint-disable-next-line newline-per-chained-call
        this._listenCommands(roomId).pipe(takeUntil(this.destroy$)).subscribe();
    }

    private _listenCommands(roomId: string): Observable<Command> {
        return this._roomApi.listenCommands(roomId).pipe(
            tap((command) => {
                if (command.commandType === CommandTypeEnum.SourceHasChanged) {
                    this._updateSource();
                }
            }),
            filter((command) => !this._skipCommads.includes(command.commandType))
        );
    }

    private _updateSource(): void {
        this._roomStateFacade.updateSource();
    }
}
