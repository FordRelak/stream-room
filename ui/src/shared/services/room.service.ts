import { RoomDocument } from './../../core/graphql/generated/graphql';
import {
    RoomQueryVariables,
    RoomQuery,
    RoomsQuery,
    RoomsDocument,
} from '@core/graphql/generated/graphql';

import { GraphQLApi } from '@core/graphql/graphql-api';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Room } from '@core/models';

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    constructor(private readonly _graphQL: GraphQLApi) {}

    public getRooms(): Observable<Room[]> {
        return this._graphQL
            .get<RoomsQuery>(RoomsDocument)
            .pipe(map((result) => <Room[]>result.rooms));
    }

    public getRoom(id: string): Observable<Room> {
        if (!id) {
            throw new Error('Id is null.');
        }

        const variables = <RoomQueryVariables>{
            id: id,
        };

        return this._graphQL
            .get<RoomQuery, RoomQueryVariables>(RoomDocument, variables)
            .pipe(map((result) => <Room>result.roomById));
    }
}
