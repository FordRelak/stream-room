import {
    RoomsDocument,
    RoomsQuery,
    RoomsQueryVariables,
    RoomQuery,
    RoomQueryVariables,
    RoomDocument,
    AddRoomMutation,
    AddRoomMutationVariables,
    AddRoomDocument,
    SetRoomSourceMutation,
    SetRoomSourceMutationVariables,
    SetRoomSourceDocument,
    RoomCommandSubscriptionVariables,
    RoomCommandDocument,
    RoomCommandSubscription,
    RoomSourceQuery,
    RoomSourceQueryVariables,
    RoomSourceDocument,
} from '@shared/graphql';
import { Observable, map } from 'rxjs';

import { GraphQLApi } from '../graphql.api';
import { Injectable } from '@angular/core';
import { Command, Room } from '@shared/types';
import { AddRoomModel, SetRoomSourceModel } from './models';

@Injectable({
    providedIn: 'root',
})
export class RoomApi {
    constructor(private readonly _api: GraphQLApi) {}

    public getRooms(): Observable<Room[]> {
        return this._api
            .get<RoomsQuery, RoomsQueryVariables>(RoomsDocument)
            .pipe(map((roomsQuery) => roomsQuery.rooms?.map((room) => <Room>{ ...room }) ?? []));
    }

    public getRoom(id: string): Observable<Room> {
        return this._api
            .get<RoomQuery, RoomQueryVariables>(RoomDocument, {
                id,
            })
            .pipe(map((roomQuery) => <Room>{ ...roomQuery.room }));
    }

    public addRoom(newRoom: AddRoomModel): Observable<string> {
        return this._api
            .mutate<AddRoomMutation, AddRoomMutationVariables>(AddRoomDocument, {
                input: {
                    ...newRoom,
                },
            })
            .pipe(map((addRoomMutation) => addRoomMutation.addRoom.id));
    }

    public setSource(newSourceModel: SetRoomSourceModel): Observable<void> {
        return this._api
            .mutate<SetRoomSourceMutation, SetRoomSourceMutationVariables>(SetRoomSourceDocument, {
                input: {
                    roomId: newSourceModel.roomId,
                    source: newSourceModel.source,
                },
            })
            .pipe(map(() => {}));
    }

    public listenCommands(roomId: string): Observable<Command> {
        return this._api
            .subscribe<RoomCommandSubscription, RoomCommandSubscriptionVariables>(RoomCommandDocument, {
                roomId,
            })
            .pipe(map((roomCommandSubscription) => roomCommandSubscription.consumeRoomCommands));
    }

    public updateSource(roomId: string): Observable<string | undefined> {
        return this._api
            .get<RoomSourceQuery, RoomSourceQueryVariables>(RoomSourceDocument, {
                roomId,
            })
            .pipe(map((roomSourceQuery) => roomSourceQuery.room?.source ?? undefined));
    }
}
