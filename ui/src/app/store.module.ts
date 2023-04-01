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
    ],
})
export class StoreModule {}
