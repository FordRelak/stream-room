export enum PlayerStatus {
    pause,
    play,
}

export interface PlayerStateModel {
    position: number;
    status: PlayerStatus;
    source: string;
}
