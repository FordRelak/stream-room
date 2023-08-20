import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RoomStateFacade } from '@entities/room';
import { YOUTUBE_REGEX } from '@features/set-youtube-media/youtube-regex.token';
import { FormDirection } from '@shared/types/form-direction';

@Component({
    selector: 'app-set-youtube-video',
    templateUrl: './set-youtube-video.component.html',
    styleUrls: ['./set-youtube-video.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetYoutubeVideoComponent {
    @Input()
    public direction: FormDirection = 'row';

    public readonly urlFormControl: FormControl;

    constructor(
        @Inject(YOUTUBE_REGEX) regex: string | RegExp,
        private readonly _roomStateFacade: RoomStateFacade
    ) {
        this.urlFormControl = new FormControl('', [Validators.required, Validators.pattern(regex)]);
    }

    public setYoutubeVideo(): void {
        this._roomStateFacade.setSource(this.urlFormControl.value);
    }

    public getExtraClasses(): string {
        let classes: string[] = [];

        const directionClass = this.direction === 'row' ? 'flex-row' : 'flex-column';
        classes.push(directionClass);

        return classes.join(' ');
    }
}
