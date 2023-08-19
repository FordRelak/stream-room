import { Actions, Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { AddRoomModel } from '@shared/api/room/models';
import { Injectable } from '@angular/core';
import { NgXsActionable } from '@shared/lib';
import { Room } from '@shared/types';
import { RoomActions } from './room-state.actions';
import { RoomState } from './room.state';

@Injectable({
    providedIn: 'root',
})
export class RoomStateFacade extends NgXsActionable {
    @Select(RoomState.rooms)
    public readonly rooms$!: Observable<Room[]>;

    @Select(RoomState.currentRoom)
    public readonly currentRoom$!: Observable<Room>;

    public isRoomsLoaded$!: Observable<boolean>;

    private readonly _isRoomsLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private readonly _isRoomLoadedDispachedActions = [RoomActions.LoadRooms];
    private readonly _isRoomLoadedSuccessfulActions = [RoomActions.LoadRooms];

    constructor(private readonly _store: Store, private readonly _storeActions: Actions) {
        super(_storeActions);

        this._configureIsRoomLoaded();
    }

    public loadRooms(): void {
        this._store.dispatch(RoomActions.LoadRooms);
    }

    public loadRoom(id: string): void {
        this._store.dispatch(new RoomActions.LoadRoom(id));
    }

    public createAndJoin(newRoomModel: AddRoomModel): void {
        this._store.dispatch(new RoomActions.Add(newRoomModel));
    }

    private _configureIsRoomLoaded() {
        this.isRoomsLoaded$ = this._isRoomsLoaded$.asObservable();

        this._listenDispached(this._isRoomsLoaded$, false, ...this._isRoomLoadedDispachedActions);

        this._listenSuccessful(this._isRoomsLoaded$, true, ...this._isRoomLoadedSuccessfulActions);
    }
}
