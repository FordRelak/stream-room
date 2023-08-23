import { StateToken } from '@ngxs/store';
import { PlayerStateModel } from './player-state.model';

export const PLAYER_STATE_TOKEN = new StateToken<PlayerStateModel>('player');
