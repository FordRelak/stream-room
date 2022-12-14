import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, switchMap, takeUntil, tap, ReplaySubject } from 'rxjs';

import { Component } from '@angular/core';
import { DestroyableComponent } from '@shared/components/destroyable/destroyable.component';
import { Command, CommandTypeEnum, Room } from '@core/models';
import { RoomService } from '@shared/services';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
})
export class RoomComponent extends DestroyableComponent {
    public readonly room$: Observable<Room>;
    public readonly commands$: Observable<Command>;

    private readonly _commands$: ReplaySubject<Command>;
    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _roomService: RoomService
    ) {
        super();

        this._commands$ = new ReplaySubject<Command>();
        this.commands$ = this._commands$.asObservable();

        this.room$ = _route.paramMap.pipe(
            switchMap((parameters: ParamMap) =>
                of(<string>parameters.get('id'))
            ),
            switchMap((id) => _roomService.getRoom(id)),
            tap((room) => {
                this._roomService.joinRoom(room);
                this._handleSubscription();
            }),
            takeUntil(this._alive$)
        );
    }

    public send(): void {
        this._roomService
            .sendCommand(CommandTypeEnum.Pause)
            .pipe(takeUntil(this._alive$))
            .subscribe();
    }

    private _handleSubscription() {
        this._roomService
            .consumeCommand()
            .pipe(
                tap((command) => this._commands$.next(command)),
                takeUntil(this._alive$)
            )
            .subscribe();
    }
}
