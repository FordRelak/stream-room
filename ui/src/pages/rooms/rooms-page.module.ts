import { RoomDetailedComponent, RoomListComponent } from './components';

import { AddRoomSmallButtonComponent } from '@features/add-room';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomEntityModule } from '@entities/room';
import { RoomListPageRouting } from './rooms-page-routing.module';
import { UISharedModule } from '@shared/ui';

@NgModule({
    declarations: [RoomListComponent, RoomDetailedComponent],
    imports: [
        CommonModule,
        RoomEntityModule,
        UISharedModule,
        RoomListPageRouting,
        AddRoomSmallButtonComponent,
    ],
})
export class RoomListPageModule {}
