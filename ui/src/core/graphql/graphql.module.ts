import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';

import { EnvironmentService } from './../services/environment.service';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

export function createApollo(
    httpLink: HttpLink,
    environmentService: EnvironmentService
): ApolloClientOptions<any> {
    const httpUri = environmentService.get<string>('graphqlUri');
    const wsUri = environmentService.get<string>('wsUri');

    const http = httpLink.create({
        uri: httpUri,
    });

    const ws = new GraphQLWsLink(
        createClient({
            url: wsUri,
            shouldRetry: () => true,
        })
    );

    const link = split(
        ({ query }) => {
            const definition = getMainDefinition(query);

            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        ws,
        http
    );

    return {
        link: link,
        cache: new InMemoryCache(),
    };
}

@NgModule({
    exports: [ApolloModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink, EnvironmentService],
        },
    ],
})
export class GraphQLModule {}
