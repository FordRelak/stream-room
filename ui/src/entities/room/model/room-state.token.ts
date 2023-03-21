import { RoomStateModel } from './room-state.model';
import { StateToken } from '@ngxs/store';

export const ROOM_STATE_TOKEN = new StateToken<RoomStateModel>('room');
