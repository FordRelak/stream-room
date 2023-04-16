import { RippleManualComponent, SpinnerComponent } from './components';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [SpinnerComponent, RippleManualComponent],
    imports: [CommonModule, MatProgressSpinnerModule, MatCardModule, MatRippleModule],
    exports: [SpinnerComponent, MatCardModule, RippleManualComponent],
})
export class UISharedModule {}
