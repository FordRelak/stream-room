import { Injectable, OnDestroy } from '@angular/core';

import { ReplaySubject } from 'rxjs';

@Injectable()
export class Destroyable implements OnDestroy {
    protected readonly destroy$: ReplaySubject<void> = new ReplaySubject<void>(
        1
    );

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
