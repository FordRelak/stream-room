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
    forkJoin,
    throwError,
    of,
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

    public getRooms(): Observable<Room[]> {
        return this._roomGraphQlService.getRooms();
    }

    public joinRoom(roomId: string): Observable<boolean> {
        return this._userService.user$.pipe(
            switchMap((user) =>
                this._roomGraphQlService.addUserToRoom(roomId, user.id)
            ),
            switchMap((isJoined) => {
                if (!isJoined) {
                    throwError(() => new Error('Error when joined room'));
                }

                return forkJoin([of(isJoined), this.getRoom(roomId)]);
            }),
            map(([isJoined, room]) => {
                this._room$.next(room);

                return isJoined;
            })
        );
    }

    public leaveRoom(): Observable<boolean> {
        return forkJoin([this.room$, this._userService.user$]).pipe(
            switchMap(([room, user]) =>
                this._roomGraphQlService.removeUserFromRoom(room.id, user.id)
            )
        );
    }

    public consumeCommand(): Observable<Command> {
        return this.room$.pipe(
            switchMap((room) =>
                this._commandGraphQLService.consumeCommands(room.id)
            ),
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
