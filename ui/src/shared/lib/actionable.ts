import { ActionType, Actions, ofActionDispatched, ofActionSuccessful } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';

import { Destroyable } from './destroyable';
import { Injectable } from '@angular/core';

@Injectable()
export class NgXsActionable extends Destroyable {
    constructor(protected readonly _actions: Actions) {
        super();
    }

    protected _listenSuccessful<T>(subject$: Subject<T>, nextValue: T, ...actions: ActionType[]) {
        this._actions.pipe(ofActionSuccessful(...actions), takeUntil(this.destroy$)).subscribe(() => subject$.next(nextValue));
    }

    protected _listenDispached<T>(subject$: Subject<T>, nextValue: T, ...actions: ActionType[]) {
        this._actions.pipe(ofActionDispatched(...actions), takeUntil(this.destroy$)).subscribe(() => subject$.next(nextValue));
    }
}
