import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerStateFacade } from '@entities/player';
import { RoomStateFacade } from '@entities/room';
import { RoomPlayerSourceStateSynchronizerService } from '@features/room-player';
import { YoutubeService } from '@features/set-youtube-media';
import { ROOM_ID_TOKEN, RoomCommandListenerService } from '@pages/rooms/lib';
import { Destroyable } from '@shared/lib';
import { map, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-room-detailed',
    templateUrl: './room-detailed.component.html',
    styleUrls: ['./room-detailed.component.scss'],
    providers: [
        {
            provide: ROOM_ID_TOKEN,
            useFactory: (route: ActivatedRoute) => {
                return route.snapshot.paramMap.get('id');
            },
            deps: [ActivatedRoute],
        },
        RoomCommandListenerService,
        RoomPlayerSourceStateSynchronizerService,
    ],
})
export class RoomDetailedComponent extends Destroyable {
    public readonly source$ = this._playerStateFacade.source$;

    public readonly videoId$ = this.source$.pipe(
        map((source) => this._youtubeService.extractVideoId(source)),
        tap((source) => {
            console.log(source);
        })
    );

    constructor(
        route: ActivatedRoute,
        roomCommandListenerService: RoomCommandListenerService,
        roomPlayerSourceStateSynchronizerService: RoomPlayerSourceStateSynchronizerService,
        private readonly _roomStateFacade: RoomStateFacade,
        private readonly _youtubeService: YoutubeService,
        private readonly _playerStateFacade: PlayerStateFacade
    ) {
        super();

        route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((parameters) => {
            const roomId = parameters.get('id');
            if (roomId) {
                _roomStateFacade.loadRoom(roomId);
            }
        });
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.append(tag);
    }
}
