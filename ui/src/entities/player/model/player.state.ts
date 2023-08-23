import { Action, Selector, SelectorOptions, State, StateContext } from '@ngxs/store';
import { PlayerStateModel, PlayerStatus } from './player-state.model';
import { PLAYER_STATE_TOKEN } from './player-state.token';
import { Injectable } from '@angular/core';
import { PlayerActions } from './player-state.actions';

const playerStateModelDefaults: PlayerStateModel = {
    position: 0,
    source: '',
    status: PlayerStatus.pause,
};

@State<PlayerStateModel>({
    name: PLAYER_STATE_TOKEN,
    defaults: playerStateModelDefaults,
})
@SelectorOptions({
    injectContainerState: false,
    suppressErrors: false,
})
@Injectable()
export class PlayerState {
    @Action(PlayerActions.Pause)
    public pause(context: StateContext<PlayerStateModel>): void {
        this._setStatus(context, PlayerStatus.pause);
    }

    @Action(PlayerActions.Play)
    public play(context: StateContext<PlayerStateModel>): void {
        this._setStatus(context, PlayerStatus.play);
    }

    @Action(PlayerActions.Rewind)
    public rewind(context: StateContext<PlayerStateModel>, { seconds }: PlayerActions.Rewind): void {
        context.patchState({
            position: seconds,
        });
    }

    @Action(PlayerActions.UpdateSource)
    public updateSource(
        context: StateContext<PlayerStateModel>,
        { source }: PlayerActions.UpdateSource
    ): void {
        context.patchState({
            source: source,
        });
    }

    @Selector([PLAYER_STATE_TOKEN])
    static position(state: PlayerStateModel): number {
        return state.position;
    }

    @Selector([PLAYER_STATE_TOKEN])
    static status(state: PlayerStateModel): PlayerStatus {
        return state.status;
    }

    @Selector([PLAYER_STATE_TOKEN])
    static source(state: PlayerStateModel): string {
        return state.source;
    }

    private _setStatus(context: StateContext<PlayerStateModel>, newStatus: PlayerStatus) {
        context.patchState({
            status: newStatus,
        });
    }
}
