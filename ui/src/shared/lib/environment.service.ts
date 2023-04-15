import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { IEnvironment } from '@env/environment.interface';

export const ENVIRONMENT_TOKEN = new InjectionToken<{ [key: string]: any }>('APP_ENVIRONMENT');

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService {
    private readonly _environment: IEnvironment;

    constructor(@Optional() @Inject(ENVIRONMENT_TOKEN) environment: IEnvironment) {
        if (environment === null) {
            throw new Error('Enviroment not present.');
        }

        this._environment = environment;
    }

    public get<TValue>(key: keyof IEnvironment): TValue {
        return this._environment[key] as unknown as TValue;
    }
}
