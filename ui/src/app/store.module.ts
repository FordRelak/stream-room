import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { RoomState } from '@entities/room';
import { environment } from '@env/environment';

@NgModule({
    declarations: [],
    imports: [
        NgxsModule.forRoot([RoomState], {
            developmentMode: !environment.production,
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
})
export class StoreModule {}
