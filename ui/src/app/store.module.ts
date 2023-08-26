import { LOCAL_STORAGE_ENGINE, NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { RoomState } from '@entities/room';
import { RoomStateCurrentRoomListenerRedirectorService } from '@processes/state-listeners';
import { UserProfileState } from '@entities/userprofile';
import { environment } from '@env/environment';
import { PlayerState } from '@entities/player';

@NgModule({
    declarations: [],
    imports: [
        NgxsModule.forRoot([RoomState, UserProfileState, PlayerState], {
            developmentMode: !environment.production,
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsStoragePluginModule.forRoot({
            key: [
                {
                    key: UserProfileState,
                    engine: LOCAL_STORAGE_ENGINE,
                },
            ],
            namespace: 'stream-room',
        }),
    ],
    providers: [RoomStateCurrentRoomListenerRedirectorService],
})
export class StoreModule {
    constructor(
        private readonly _roomStateCurrentRoomListenerRedirectorService: RoomStateCurrentRoomListenerRedirectorService
    ) {}
}
