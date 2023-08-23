export namespace PlayerActions {
    export class Play {
        static readonly type: string = '[PLAYER] Play';
    }
    export class Pause {
        static readonly type: string = '[PLAYER] Pause';
    }

    export class Rewind {
        static readonly type: string = '[PLAYER] Rewind';
        constructor(public seconds: number) {}
    }

    export class UpdateSource {
        static readonly type: string = '[PLAYER] Update Source';
        constructor(public source: string) {}
    }
}
