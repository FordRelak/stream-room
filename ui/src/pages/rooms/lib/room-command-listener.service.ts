import { Injectable } from '@angular/core';
import { RoomStateFacade } from '@entities/room';
import { RoomApi } from '@shared/api/room';
import { CommandTypeEnum } from '@shared/graphql';
import { Destroyable } from '@shared/lib';
import { filter, takeUntil, tap } from 'rxjs';

@Injectable()
export class RoomCommandListenerService extends Destroyable {
    private readonly _skipCommads = [CommandTypeEnum.SourceHasChanged];

    constructor(private readonly _roomStateFacade: RoomStateFacade, private readonly _roomApi: RoomApi) {
        super();
        this._roomStateFacade.currentRoom$.pipe(takeUntil(this.destroy$)).subscribe();
    }

    private _listenCommands(roomId: string): void {
        this._roomApi.listenCommands(roomId).pipe(
            tap((command) => {
                if (command.commandType === CommandTypeEnum.SourceHasChanged) {
                    this._updateSource();
                }
            }),
            filter((command) => !this._skipCommads.includes(command.commandType))
            //tap((command) => {})
        );
    }

    private _updateSource(): void {
        this._roomStateFacade.updateSource();
    }
}
