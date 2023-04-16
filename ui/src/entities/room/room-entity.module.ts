import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomCardComponent } from './ui';
import { UISharedModule } from '@shared/ui';

@NgModule({
    declarations: [RoomCardComponent],
    imports: [CommonModule, UISharedModule],
    exports: [RoomCardComponent],
})
export class RoomEntityModule {}
