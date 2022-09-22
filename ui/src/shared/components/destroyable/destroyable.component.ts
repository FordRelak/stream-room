import { Component, OnDestroy } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
    standalone: true,
    imports: [CommonModule],
    template: '',
})
export class DestroyableComponent implements OnDestroy {
    protected readonly _alive$: Subject<void> = new Subject<void>();

    ngOnDestroy(): void {
        this._alive$.next();
        this._alive$.complete();
    }
}
