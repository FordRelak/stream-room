import { Component } from '@angular/core';
import { DestroyableComponent } from '@shared/components/destroyable/destroyable.component';
import { Observable } from 'rxjs';
import Room from '@core/models/room';
import { RoomService } from './../services/room.service';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
})
export class TestComponent extends DestroyableComponent {
    public readonly rooms$: Observable<Room[]> = this._roomService.getRooms();

    constructor(private readonly _roomService: RoomService) {
        super();
    }
}
