import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, switchMap, takeUntil } from 'rxjs';

import { Component } from '@angular/core';
import { DestroyableComponent } from '@shared/components/destroyable/destroyable.component';
import { RoomGraphQlService } from '@core/services/room-graphql.service';
import { Command, CommandTypeEnum, Room } from '@core/models';
import { RoomService } from '@shared/services';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
})
export class RoomComponent extends DestroyableComponent {
    public readonly room$: Observable<Room>;
    public readonly commands$: Observable<Command>;

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _roomGraphQlService: RoomGraphQlService,
        private readonly _roomService: RoomService
    ) {
        super();

        this.room$ = _route.paramMap.pipe(
            switchMap((parameters: ParamMap) =>
                of(<string>parameters.get('id'))
            ),
            switchMap((id) => _roomGraphQlService.getRoom(id)),
            takeUntil(this._alive$)
        );

        this.commands$ = _roomService.consumeCommand(
            'ea15f2e2-3f8b-4dab-b422-6c00c144b5d5'
        );
    }

    public send(): void {
        this._roomService
            .sendCommand(CommandTypeEnum.Pause)
            .pipe(takeUntil(this._alive$))
            .subscribe();
    }
}
