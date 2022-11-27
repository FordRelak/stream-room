import {
    UserQuery,
    UserQueryVariables,
    UserDocument,
} from './../graphql/generated/graphql';
import {
    CreateUserDocument,
    CreateUserMutation,
    CreateUserMutationVariables,
} from '@core/graphql/generated/graphql';
import { Observable, map } from 'rxjs';

import { GraphQLApi } from '@core/graphql/graphql-api';
import { Injectable } from '@angular/core';
import { User } from '@core/models';

@Injectable({
    providedIn: 'root',
})
export class UserGraphQlService {
    constructor(private readonly _graphQL: GraphQLApi) {}

    public createUser(nickname: string): Observable<string> {
        return this._graphQL
            .mutate<CreateUserMutation, CreateUserMutationVariables>(
                CreateUserDocument,
                {
                    name: nickname,
                }
            )
            .pipe(map((createUserMutation) => createUserMutation.addUser.id));
    }

    public getUser(userId: string): Observable<User | undefined> {
        return this._graphQL
            .get<UserQuery, UserQueryVariables>(UserDocument, {
                id: userId,
            })
            .pipe(
                map((getUserQuery) =>
                    getUserQuery.userById
                        ? <User>{ ...getUserQuery.userById }
                        : undefined
                )
            );
    }
}
