import { InjectionToken, NgModule } from '@angular/core';

import { LocalStorage } from '@core/storages/local-storage';

export const STORAGE = new InjectionToken<Storage>('APP_STORAGE');

@NgModule({
    providers: [
        {
            provide: STORAGE,
            useClass: LocalStorage,
        },
    ],
})
export class StorageModule {}
