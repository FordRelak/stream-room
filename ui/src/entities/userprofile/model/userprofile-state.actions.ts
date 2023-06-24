export namespace UserProfileActions {
    export class SetNickname {
        static readonly type = '[User Profile] Set Nickname';
        constructor(public nickname: string) {}
    }

    export class FetchProfile {
        static readonly type = '[User Profile] Fetch Profile';
    }

    export class ClearProfile {
        static readonly type = '[User Profile] Clear Profile';
    }
}
