import { Action, Selector, SelectorOptions, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { ROOM_STATE_TOKEN } from './room-state.token';
import { Room } from '@shared/types';
import { RoomActions } from './room-state.actions';
import { RoomApi } from '@shared/api/room';
import { RoomStateModel } from './room-state.model';

const roomStateModelDefaults: RoomStateModel = {
    rooms: [],
};

@State<RoomStateModel>({
    name: ROOM_STATE_TOKEN,
    defaults: roomStateModelDefaults,
})
@SelectorOptions({
    suppressErrors: false,
    injectContainerState: false,
})
@Injectable({
    providedIn: 'root',
})
export class RoomState {
    constructor(private readonly _roomApi: RoomApi) {}

    @Action(RoomActions.Load)
    public loadRooms(context: StateContext<RoomStateModel>): Observable<Room[]> {
        return this._roomApi.getRooms().pipe(tap((rooms) => context.patchState({ rooms })));
    }

    @Selector([ROOM_STATE_TOKEN])
    static rooms(state: RoomStateModel): Room[] {
        return state.rooms;
    }

    @Selector([ROOM_STATE_TOKEN, RoomState.rooms])
    static currentRoom(state: RoomStateModel, rooms: Room[]): Room | undefined {
        return rooms.find((room) => room.id === state.currentRoomId);
    }
}
