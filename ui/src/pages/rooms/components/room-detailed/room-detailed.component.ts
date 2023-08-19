import { Component } from '@angular/core';
import { RoomStateFacade } from '@entities/room';
import { YoutubeService } from '@features/set-youtube-media';
import { Destroyable } from '@shared/lib';
import { map } from 'rxjs';

@Component({
    selector: 'app-room-detailed',
    templateUrl: './room-detailed.component.html',
    styleUrls: ['./room-detailed.component.scss'],
})
export class RoomDetailedComponent extends Destroyable {
    public readonly currentRoom$ = this._roomStateFacade.currentRoom$;

    public readonly videoId$ = this.currentRoom$.pipe(
        map((room) => this._youtubeService.extractVideoId(room.src))
    );

    constructor(
        private readonly _roomStateFacade: RoomStateFacade,
        private readonly _youtubeService: YoutubeService
    ) {
        super();
    }
}
