import { RoomsQuery } from './../../../core/graphql/generated/graphql';
import { GraphQLApi } from '@core/graphql/graphql-api';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import Room from '@core/models/room';
import { RoomsDocument } from '@core/graphql/generated/graphql';

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
}
