import { Action, Selector, SelectorOptions, State, StateContext } from '@ngxs/store';
import { Observable, map, tap } from 'rxjs';

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

    @Action(RoomActions.LoadRooms)
    public loadRooms(context: StateContext<RoomStateModel>): Observable<Room[]> {
        return this._roomApi.getRooms().pipe(tap((rooms) => context.patchState({ rooms })));
    }

    @Action(RoomActions.Add)
    public addRoom(context: StateContext<RoomStateModel>, { newRoom }: RoomActions.Add): Observable<void> {
        return this._roomApi.addRoom(newRoom).pipe(
            map((roomId) => {
                context.patchState({
                    currentRoom: {
                        id: roomId,
                        src: '',
                        ...newRoom,
                    },
                });
            })
        );
    }

    @Action(RoomActions.LoadRoom)
    public loadRoom(context: StateContext<RoomStateModel>, { id }: RoomActions.LoadRoom): Observable<void> {
        return this._roomApi.getRoom(id).pipe(
            map((room) => {
                context.patchState({ currentRoom: room });
            })
        );
    }

    @Selector([ROOM_STATE_TOKEN])
    static rooms(state: RoomStateModel): Room[] {
        return state.rooms;
    }

    @Selector([ROOM_STATE_TOKEN])
    static currentRoom(state: RoomStateModel): Room | undefined {
        return state.currentRoom;
    }
}
