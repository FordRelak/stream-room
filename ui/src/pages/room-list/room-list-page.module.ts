import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomEntityModule } from '@entities/room';
import { RoomListComponent } from './components';

@NgModule({
    declarations: [RoomListComponent],
    imports: [CommonModule, RoomEntityModule],
})
export class RoomListPageModule {}
