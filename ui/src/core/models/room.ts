import { Base } from './base';

export interface Room extends Base {
    name: string;
    userIds: string[];
    src?: string;
}
