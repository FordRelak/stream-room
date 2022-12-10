import { RoomGraphQlService } from '@core/services/room-graphql.service';
import { Command, CommandTypeEnum, Room } from '@core/models';
import {
    Observable,
    ReplaySubject,
    combineLatest,
    filter,
    map,
    switchMap,
    withLatestFrom,
} from 'rxjs';

import { CommandGraphQlService } from '@core/services';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    public readonly room$: Observable<Room>;

    private readonly _room$: ReplaySubject<Room>;

    constructor(
        private readonly _userService: UserService,
        private readonly _commandGraphQLService: CommandGraphQlService,
        private readonly _roomGraphQlService: RoomGraphQlService
    ) {
        this._room$ = new ReplaySubject<Room>();
        this.room$ = this._room$.asObservable();
    }

    public createRoom(roomName: string): Observable<Room> {
        return this._roomGraphQlService.createRoom(roomName).pipe(
            map((roomId) => {
                const newRoom = <Room>{
                    id: roomId,
                    name: roomName,
                };

                this._room$.next(newRoom);

                return newRoom;
            })
        );
    }

    public getRoom(id: string): Observable<Room> {
        return this._roomGraphQlService.getRoom(id);
    }

    public joinRoom(room: Room): void {
        this._room$.next(room);
    }

    public consumeCommand(): Observable<Command> {
        return combineLatest([this.room$]).pipe(
            switchMap(([room]) => {
                return this._commandGraphQLService.consumeCommands(room.id);
            }),
            withLatestFrom(this._userService.user$),
            filter(([, user]) => !!user),
            //filter(([command, user]) => command.userId !== user.id), todo
            map(([command]) => command)
        );
    }

    public sendCommand(command: CommandTypeEnum): Observable<boolean> {
        return combineLatest([this._userService.user$, this.room$]).pipe(
            filter(([user, room]) => !!user && !!room),
            switchMap(([user, room]) =>
                this._commandGraphQLService.sendCommand(
                    room.id,
                    user.id,
                    command
                )
            )
        );
    }
}
