import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { SpinnerComponent } from './components';

@NgModule({
    declarations: [SpinnerComponent],
    imports: [CommonModule, MatProgressSpinnerModule],
    exports: [SpinnerComponent],
})
export class UISharedModule {}
