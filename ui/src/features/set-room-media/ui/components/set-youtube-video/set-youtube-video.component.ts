import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormDirection } from '@shared/types/form-direction';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DirectiveSharedModule } from '@shared/lib/directives';

const YOUTUBE_URL_PATTERN = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=[\w-]+$/gm;

@Component({
    selector: 'app-set-youtube-video',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        DirectiveSharedModule,
    ],
    templateUrl: './set-youtube-video.component.html',
    styleUrls: ['./set-youtube-video.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetYoutubeVideoComponent {
    @Input()
    public direction: FormDirection = 'row';

    public readonly urlFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(YOUTUBE_URL_PATTERN),
    ]);

    public setYoutubeVideo(): void {
        console.log(this.urlFormControl.value);
    }

    public getExtraClasses(): string {
        let classes: string[] = [];

        const directionClass = this.direction === 'row' ? 'flex-row' : 'flex-column';
        classes.push(directionClass);

        return classes.join(' ');
    }
}
