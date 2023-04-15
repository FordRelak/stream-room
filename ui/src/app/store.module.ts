import { LOCAL_STORAGE_ENGINE, NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { RoomState } from '@entities/room';
import { UserProfileState } from '@entities/userprofile';
import { environment } from '@env/environment';

@NgModule({
    declarations: [],
    imports: [
        NgxsModule.forRoot([RoomState, UserProfileState], {
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
})
export class StoreModule {}
