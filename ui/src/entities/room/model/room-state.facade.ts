import {
    Actions,
    Select,
    Store,
    ofActionDispatched,
    ofActionSuccessful,
} from '@ngxs/store';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';

import { Destroyable } from '@shared/lib/destroyable';
import { Injectable } from '@angular/core';
import { Room } from '@shared/types';
import { RoomActions } from './room-state.actions';
import { RoomState } from './room.state';

@Injectable({
    providedIn: 'root',
})
export class RoomStateFacade extends Destroyable {
    @Select(RoomState.rooms)
    public readonly rooms$!: Observable<Room[]>;

    @Select(RoomState.currentRoom)
    public readonly currentRoom$!: Observable<Room[]>;

    public isRoomsLoaded$!: Observable<boolean>;

    private _isRoomsLoaded!: BehaviorSubject<boolean>;

    private readonly _isRoomLoadedDispachedActions = [RoomActions.Load];
    private readonly _isRoomLoadedSuccessfulActions = [RoomActions.Load];

    constructor(
        private readonly _store: Store,
        private readonly _actions: Actions
    ) {
        super();
        this._configureIsRoomLoaded();
    }

    public loadRooms(): void {
        this._store.dispatch(RoomActions.Load);
    }

    private _configureIsRoomLoaded() {
        this._isRoomsLoaded = new BehaviorSubject<boolean>(false);

        this.isRoomsLoaded$ = this._isRoomsLoaded.asObservable();

        this._actions
            .pipe(
                ofActionDispatched(...this._isRoomLoadedDispachedActions),
                takeUntil(this.alive$)
            )
            .subscribe(() => this._isRoomsLoaded.next(false));

        this._actions
            .pipe(
                ofActionSuccessful(...this._isRoomLoadedSuccessfulActions),
                takeUntil(this.alive$)
            )
            .subscribe(() => this._isRoomsLoaded.next(true));
    }
}
