import { CommandTypeEnum } from './command.enum';

export interface Command {
    roomId: string;
    userId: string;
    commandType: CommandTypeEnum;
}
