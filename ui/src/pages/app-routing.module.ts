import {
    PROFILE_NOT_SET_GUARD_CALLBACK_URL_TOKEN,
    PROFILE_SET_GUARD_CALLBACK_URL_TOKEN,
    ProfileNotSetGuard,
    ProfileSetGuard,
} from '@entities/userprofile';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { StartupComponent } from './startup';

export enum PageRoutesEnum {
    Startup = '',
    Rooms = 'rooms',
}

const routes: Routes = [
    {
        path: PageRoutesEnum.Rooms,
        loadChildren: () => import('./room-list/room-list-page.module').then((m) => m.RoomListPageModule),
        canActivate: [ProfileSetGuard],
        canActivateChild: [ProfileSetGuard],
        providers: [
            {
                provide: PROFILE_SET_GUARD_CALLBACK_URL_TOKEN,
                useValue: PageRoutesEnum.Startup,
            },
            ProfileSetGuard,
        ],
    },
    {
        path: PageRoutesEnum.Startup,
        component: StartupComponent,
        canActivate: [ProfileNotSetGuard],
        canActivateChild: [ProfileNotSetGuard],
        providers: [
            {
                provide: PROFILE_NOT_SET_GUARD_CALLBACK_URL_TOKEN,
                useValue: PageRoutesEnum.Rooms,
            },
            ProfileNotSetGuard,
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [ProfileSetGuard, ProfileNotSetGuard],
})
export class AppRoutingModule {}
