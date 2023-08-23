import { CommandTypeEnum } from '@shared/graphql';

export interface Command {
    commandType: CommandTypeEnum;
    roomId: string;
    userId: string;
}
