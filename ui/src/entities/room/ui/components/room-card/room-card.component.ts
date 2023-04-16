import { Component, HostListener, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Room } from '@shared/types';

@Component({
    selector: 'app-room-card',
    templateUrl: './room-card.component.html',
    styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent {
    @Input()
    public room?: Room;

    public readonly rippleLaunch$: Observable<void>;

    private readonly _rippleLaunch$: Subject<void> = new Subject<void>();

    constructor() {
        this.rippleLaunch$ = this._rippleLaunch$.asObservable();
    }

    @HostListener('mouseenter')
    public lauchRipple(): void {
        this._rippleLaunch$.next();
    }
}
