export interface IEnvironment {
    production: boolean;
    graphqlUri: string;
    wsUri: string;
    youtubeRegex: string | RegExp;
}
