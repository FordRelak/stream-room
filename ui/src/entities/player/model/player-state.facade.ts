import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PlayerState } from './player.state';
import { Observable } from '@apollo/client';
import { PlayerStatus } from './player-state.model';
import { PlayerActions } from './player-state.actions';

@Injectable()
export class PlayerStateFacade {
    @Select(PlayerState.position)
    public readonly position$!: Observable<number>;

    @Select(PlayerState.status)
    public readonly status$!: Observable<PlayerStatus>;

    @Select(PlayerState.source)
    public readonly source$!: Observable<string>;

    constructor(private readonly _store: Store) {}

    public play(): void {
        this._store.dispatch(PlayerActions.Play);
    }

    public pause(): void {
        this._store.dispatch(PlayerActions.Pause);
    }

    public rewind(seconds: number): void {
        this._store.dispatch(new PlayerActions.Rewind(seconds));
    }

    public updateSource(source: string): void {
        this._store.dispatch(new PlayerActions.UpdateSource(source));
    }
}
