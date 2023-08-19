import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DirectiveSharedModule } from '@shared/lib/directives';
import { SetYoutubeVideoComponent } from './ui';

@NgModule({
    declarations: [SetYoutubeVideoComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        DirectiveSharedModule,
    ],
    exports: [SetYoutubeVideoComponent],
})
export class SetYoutubeMediaModule {}
