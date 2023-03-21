import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { GraphQLApi } from '../graphql.api';
import { User } from '@shared/types';
import {
    UpdateUserDocument,
    UpdateUserInput,
    UpdateUserMutation,
    UpdateUserMutationVariables,
    UserDocument,
    UserQuery,
    UserQueryVariables,
} from '@shared/graphql.generated';

@Injectable({
    providedIn: 'root',
})
export class UserApi {
    constructor(private readonly _api: GraphQLApi) {}

    public get(userId: string): Observable<User> {
        return this._api
            .get<UserQuery, UserQueryVariables>(UserDocument, {
                id: userId,
            })
            .pipe(map((userQuery) => <User>userQuery.user));
    }

    public update(user: User): Observable<string> {
        return this._api
            .mutate<UpdateUserMutation, UpdateUserMutationVariables>(
                UpdateUserDocument,
                {
                    user: <UpdateUserInput>{
                        ...user,
                    },
                }
            )
            .pipe(
                map((updateUserDocument) => updateUserDocument.updateUser.id)
            );
    }
}
