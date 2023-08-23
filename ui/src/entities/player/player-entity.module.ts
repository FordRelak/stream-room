import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { PlayerState } from './model';

@NgModule({
    declarations: [],
    imports: [CommonModule, NgxsModule.forFeature([PlayerState])],
})
export class PlayerEntityModule {}
