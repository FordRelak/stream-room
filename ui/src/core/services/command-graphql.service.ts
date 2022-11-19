import {
    SendCommandDocument,
    SendCommandMutation,
    SendCommandMutationVariables,
    ConsumeRoomCommandsDocument,
    ConsumeRoomCommandsSubscription,
    ConsumeRoomCommandsSubscriptionVariables,
} from '@core/graphql/generated/graphql';
import { GraphQLApi } from '@core/graphql/graphql-api';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Command, CommandTypeEnum } from '@core/models';

@Injectable({
    providedIn: 'root',
})
export class CommandGraphQlService {
    constructor(private readonly _graphQL: GraphQLApi) {}

    public consumeCommands(roomId: string): Observable<Command> {
        if (!roomId) {
            throw new Error('Room id is null.');
        }

        return this._graphQL
            .subscribe<
                ConsumeRoomCommandsSubscription,
                ConsumeRoomCommandsSubscriptionVariables
            >(ConsumeRoomCommandsDocument, { roomId: roomId })
            .pipe(map((result) => <Command>result.consumeRoomCommands));
    }

    public sendCommand(
        roomId: string,
        userId: string,
        commandType: CommandTypeEnum
    ): Observable<boolean> {
        if (!roomId) {
            throw new Error('Room id is null.');
        }
        if (!userId) {
            throw new Error('User id is null.');
        }

        return this._graphQL
            .mutate<SendCommandMutation, SendCommandMutationVariables>(
                SendCommandDocument,
                {
                    roomId: roomId,
                    userId: userId,
                    commandType: commandType,
                }
            )
            .pipe(map((result) => result.sendCommand.isSuccess));
    }
}
