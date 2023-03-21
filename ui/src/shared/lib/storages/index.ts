import { InjectionToken } from '@angular/core';

export * from './local-storage';

export const STORAGE_TOKEN = new InjectionToken<Storage>('APP_STORAGE');
