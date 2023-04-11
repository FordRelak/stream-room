import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { GraphQLApi } from '../graphql.api';
import { User } from '@shared/types';
import {
    CreateUserDocument,
    CreateUserMutation,
    CreateUserMutationVariables,
    UpdateUserDocument,
    UpdateUserInput,
    UpdateUserMutation,
    UpdateUserMutationVariables,
    UserDocument,
    UserQuery,
    UserQueryVariables,
} from '@shared/graphql';
import { CreateUser, UpdateUser } from './models';

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

    public create(newUser: CreateUser): Observable<string> {
        return this._api
            .mutate<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, {
                user: {
                    nickname: newUser.nickname,
                },
            })
            .pipe(map((createUserDocument) => <string>createUserDocument.addUser.id));
    }

    public update(user: UpdateUser): Observable<string> {
        return this._api
            .mutate<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, {
                user: <UpdateUserInput>{
                    ...user,
                },
            })
            .pipe(map((updateUserDocument) => updateUserDocument.updateUser.id));
    }
}
