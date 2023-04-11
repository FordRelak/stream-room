import { RoomsDocument, RoomsQuery, RoomsQueryVariables, RoomQuery, RoomQueryVariables, RoomDocument } from '@shared/graphql';
import { Observable, map } from 'rxjs';

import { GraphQLApi } from '../graphql.api';
import { Injectable } from '@angular/core';
import { Room } from '@shared/types';

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
}
