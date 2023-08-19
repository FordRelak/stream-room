import { AddRoomModel } from '@shared/api/room/models';

export namespace RoomActions {
    export class Add {
        static readonly type: string = '[ROOM] Create Room';
        constructor(public newRoom: AddRoomModel) {}
    }

    export class Delete {
        static readonly type: string = '[ROOM] Delete Room';
        constructor(public id: string) {}
    }

    export class LoadRooms {
        static readonly type: string = '[ROOM] Get Rooms';
    }

    export class LoadRoom {
        static readonly type: string = '[ROOM] Get Room';
        constructor(public id: string) {}
    }
}
