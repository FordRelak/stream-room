import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SetNicknameFormComponent } from '@features/set-nickname';
import { StartupComponent } from './components';
import { UISharedModule } from '@shared/ui';

@NgModule({
    declarations: [StartupComponent],
    imports: [CommonModule, SetNicknameFormComponent, UISharedModule],
})
export class StartupPageModule {}
