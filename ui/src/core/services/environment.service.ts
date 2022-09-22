import { IEnvironment } from './../../environments/ienvironment';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

export const ENVIRONMENT = new InjectionToken<{ [key: string]: any }>(
    'environment'
);

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService {
    private readonly _environment: IEnvironment;

    constructor(@Optional() @Inject(ENVIRONMENT) environment: IEnvironment) {
        if (environment === null) {
            throw new Error('Enviroment not present.');
        }

        this._environment = environment;
    }

    public get<TValue>(key: keyof IEnvironment): TValue {
        return this._environment[key] as unknown as TValue;
    }
}
