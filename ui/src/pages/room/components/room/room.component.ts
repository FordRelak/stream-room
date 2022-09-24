import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, switchMap, takeUntil } from 'rxjs';

import { Component } from '@angular/core';
import { DestroyableComponent } from '@shared/components/destroyable/destroyable.component';
import Room from '@core/models/room';
import { RoomService } from '@shared/services/room.service';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
})
export class RoomComponent extends DestroyableComponent {
    public readonly room$: Observable<Room>;

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _roomService: RoomService
    ) {
        super();
        this.room$ = _route.paramMap.pipe(
            switchMap((parameters: ParamMap) =>
                of(<string>parameters.get('id'))
            ),
            switchMap((id) => _roomService.getRoom(id)),
            takeUntil(this._alive$)
        );
    }
}
