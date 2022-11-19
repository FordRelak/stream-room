import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '@core/models';
import { RoomGraphQlService } from '@core/services/room-graphql.service';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent {
    public readonly rooms$: Observable<Room[]>;

    constructor(private readonly _roomService: RoomGraphQlService) {
        this.rooms$ = _roomService.getRooms();
    }
}
