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
        private readonly _commandGraphQLService: CommandGraphQlService
    ) {
        this._room$ = new ReplaySubject<Room>();
        this.room$ = this._room$.asObservable();

        this._room$.next({
            id: 'ea15f2e2-3f8b-4dab-b422-6c00c144b5d5',
            name: '321',
            userIds: [],
        });
    }

    public consumeCommand(roomId: string): Observable<Command> {
        return this._commandGraphQLService.consumeCommands(roomId).pipe(
            withLatestFrom(this._userService.user$),
            filter(([, user]) => !!user),
            //filter(([command, user]) => command.userId !== user.id),
            map(([command]) => command)
        );
    }

    public sendCommand(command: CommandTypeEnum): Observable<boolean> {
        return combineLatest([this._userService.user$, this._room$]).pipe(
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
