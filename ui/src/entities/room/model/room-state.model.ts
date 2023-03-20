import { Room } from '@shared/types';

export interface RoomStateModel {
    rooms: Room[];
    currentRoomId?: string;
}
