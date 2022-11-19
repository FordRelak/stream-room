import { Apollo, TypedDocumentNode } from 'apollo-angular';
import { Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { EmptyObject, MutationOptions } from 'apollo-angular/types';
import {
    DocumentNode,
    QueryOptions,
    SubscriptionOptions,
} from '@apollo/client/core';

@Injectable({
    providedIn: 'root',
})
export class GraphQLApi {
    constructor(private readonly _apollo: Apollo) {}

    public get<TValue, TVariables = EmptyObject>(
        graphqlRequest: DocumentNode | TypedDocumentNode<TValue, TVariables>,
        variables?: TVariables
    ): Observable<TValue> {
        const options = <QueryOptions<TVariables, TValue>>{
            query: graphqlRequest,
        };

        if (variables) {
            options.variables = variables;
        }

        return this._apollo
            .query<TValue, TVariables>(options)
            .pipe(map((result) => result.data));
    }

    public mutate<TValue, TVariables = EmptyObject>(
        graphqlRequest: DocumentNode | TypedDocumentNode<TValue, TVariables>,
        variables: TVariables
    ): Observable<TValue> {
        const options = <MutationOptions<TValue, TVariables>>{
            mutation: graphqlRequest,
        };

        if (variables) {
            options.variables = variables;
        }

        return this._apollo
            .mutate<TValue, TVariables>(options)
            .pipe(map((result) => result.data!));
    }

    public subscribe<TValue, TVariables = EmptyObject>(
        graphqlRequest: DocumentNode | TypedDocumentNode<TValue, TVariables>,
        variables?: TVariables
    ): Observable<TValue> {
        const options = <SubscriptionOptions<TVariables, TValue>>{
            query: graphqlRequest,
        };

        if (variables) {
            options.variables = variables;
        }

        return this._apollo
            .subscribe<TValue, TVariables>(options)
            .pipe(map((result) => result.data!));
    }
}
