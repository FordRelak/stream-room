import { Injectable, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class Destroyable implements OnDestroy {
    protected readonly alive$: Subject<void> = new Subject<void>();

    ngOnDestroy(): void {
        this.alive$.next();
        this.alive$.complete();
    }
}
