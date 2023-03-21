import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SetNicknameFormComponent } from '@features/set-nickname';
import { StartupComponent } from './components';

@NgModule({
    declarations: [StartupComponent],
    imports: [CommonModule, SetNicknameFormComponent],
})
export class StartupPageModule {}
