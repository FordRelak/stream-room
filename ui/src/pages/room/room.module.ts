import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './components/room/room.component';

@NgModule({
    declarations: [RoomComponent],
    imports: [CommonModule, RoomRoutingModule],
})
export class RoomModule {}
