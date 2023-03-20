import { Component, Input } from '@angular/core';

import { Room } from '@shared/types';

@Component({
    selector: 'app-room-card',
    templateUrl: './room-card.component.html',
    styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent {
    @Input()
    public room?: Room;
}
