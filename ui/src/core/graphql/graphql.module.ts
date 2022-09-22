import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

import { EnvironmentService } from './../services/environment.service';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';

export function createApollo(
    httpLink: HttpLink,
    environmentService: EnvironmentService
): ApolloClientOptions<any> {
    const URI = environmentService.get<string>('graphqlUri');

    return {
        link: httpLink.create({ uri: URI }),
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
