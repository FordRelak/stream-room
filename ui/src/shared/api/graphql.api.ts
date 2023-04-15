import { Apollo, TypedDocumentNode } from 'apollo-angular';
import { Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { DocumentNode, MutationOptions, QueryOptions, SubscriptionOptions } from '@apollo/client/core';
import { EmptyObject } from 'apollo-angular/build/types';

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

        return this._apollo.query<TValue, TVariables>(options).pipe(map((result) => result.data));
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

        return this._apollo.mutate<TValue, TVariables>(options).pipe(map((result) => result.data!));
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

        return this._apollo.subscribe<TValue, TVariables>(options).pipe(map((result) => result.data!));
    }
}
