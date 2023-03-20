import { EntityBase } from './entity-base';

export interface Room extends EntityBase {
    name: string;
    userIds: string[];
}
