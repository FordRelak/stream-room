import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomEntityModule } from '@entities/room';
import { RoomListComponent } from './components';
import { RoomListPageRouting } from './rooms-page-routing.module';
import { UISharedModule } from '@shared/ui';

@NgModule({
    declarations: [RoomListComponent],
    imports: [CommonModule, RoomEntityModule, UISharedModule, RoomListPageRouting],
})
export class RoomListPageModule {}
