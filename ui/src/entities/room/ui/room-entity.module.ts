import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomCardComponent } from './components';

@NgModule({
    declarations: [RoomCardComponent],
    imports: [CommonModule],
    exports: [RoomCardComponent],
})
export class RoomEntityModule {}
