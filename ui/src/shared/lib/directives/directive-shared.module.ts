import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisableEnterDirective } from './disable-enter.directive';

@NgModule({
    declarations: [DisableEnterDirective],
    imports: [CommonModule],
    exports: [DisableEnterDirective],
})
export class DirectiveSharedModule {}
