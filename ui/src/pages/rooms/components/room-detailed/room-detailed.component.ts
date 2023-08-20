import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomStateFacade } from '@entities/room';
import { YoutubeService } from '@features/set-youtube-media';
import { Destroyable } from '@shared/lib';
import { map, takeUntil } from 'rxjs';

@Component({
    selector: 'app-room-detailed',
    templateUrl: './room-detailed.component.html',
    styleUrls: ['./room-detailed.component.scss'],
})
export class RoomDetailedComponent extends Destroyable {
    public readonly currentRoom$ = this._roomStateFacade.currentRoom$;

    public readonly videoId$ = this.currentRoom$.pipe(
        map((room) => this._youtubeService.extractVideoId(room.source))
    );

    constructor(
        private readonly _roomStateFacade: RoomStateFacade,
        private readonly _youtubeService: YoutubeService,
        route: ActivatedRoute
    ) {
        super();

        route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((parameters) => {
            const roomId = parameters.get('id');
            if (roomId) {
                _roomStateFacade.loadRoom(roomId);
            }
        });
    }
}
