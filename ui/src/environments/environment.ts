/* eslint-disable @typescript-eslint/naming-convention */

import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,
    graphqlUri: 'http://localhost:5255/graphql/',
    wsUri: 'ws://localhost:5255/graphql',
};
