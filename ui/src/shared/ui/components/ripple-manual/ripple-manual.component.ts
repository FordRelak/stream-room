import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatRipple, RippleAnimationConfig, RippleRef } from '@angular/material/core';
import { Observable, takeUntil } from 'rxjs';

import { Destroyable } from '@shared/lib';

@Component({
    selector: 'app-ripple-manual',
    templateUrl: './ripple-manual.component.html',
    styleUrls: ['./ripple-manual.component.scss'],
})
export class RippleManualComponent extends Destroyable implements OnInit {
    @Input()
    public color: string = '';

    @Input()
    public launch$?: Observable<void>;

    @Input()
    public fadeOut$?: Observable<void>;

    @ViewChild(MatRipple, { static: true })
    private readonly _ripple!: MatRipple;

    @ViewChild('ripple', { static: true })
    private readonly _rippleDiv!: ElementRef<HTMLDivElement>;

    public readonly rippleAnimationConfig: RippleAnimationConfig = { enterDuration: 1000, exitDuration: 500 };

    private _rippleRef?: RippleRef;

    ngOnInit(): void {
        this.launch$?.pipe(takeUntil(this.destroy$)).subscribe(() => this.launch());
        this.fadeOut$?.pipe(takeUntil(this.destroy$)).subscribe(() => this.fadeOut());
    }

    public launch(): void {
        const domRect = this._rippleDiv.nativeElement.getBoundingClientRect();

        const y = domRect.y + domRect.height / 2;

        this._rippleRef = this._ripple?.launch(+domRect.x, y, this._ripple.rippleConfig);
    }

    public fadeOut(): void {
        this._rippleRef?.fadeOut();
    }
}
