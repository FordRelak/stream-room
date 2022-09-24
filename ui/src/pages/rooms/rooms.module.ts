import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RoomsRoutingModule } from './rooms-routing.module';

@NgModule({
    declarations: [RoomsComponent],
    imports: [CommonModule, RoomsRoutingModule],
})
export class RoomsModule {}
