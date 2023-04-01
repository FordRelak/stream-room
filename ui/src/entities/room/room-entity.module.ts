import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomCardComponent } from './ui';

@NgModule({
    declarations: [RoomCardComponent],
    imports: [CommonModule],
    exports: [RoomCardComponent],
})
export class RoomEntityModule {}
