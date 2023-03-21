export namespace RoomActions {
    export class Create {
        static readonly type: string = '[ROOM] Create Room';
        constructor(public name: string) {}
    }

    export class Delete {
        static readonly type: string = '[ROOM] Delete Room';
        constructor(public id: string) {}
    }

    export class Load {
        static readonly type: string = '[ROOM] Get Rooms';
    }
}
