import { EnitityBase } from './base';

export interface Room extends EnitityBase {
    name: string;
    userIds: string[];
    src?: string;
}
