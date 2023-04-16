import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RoomStateFacade } from '@entities/room';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomListComponent {
    public readonly rooms$ = this._roomStateFacade.rooms$;

    constructor(private readonly _roomStateFacade: RoomStateFacade) {
        _roomStateFacade.loadRooms();
    }
}
