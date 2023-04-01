import { ProfileNotSetGuard, ProfileSetGuard } from '@entities/userprofile';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { StartupComponent } from './startup';

enum PageRoutesEnum {
    Startup = '',
    Rooms = 'rooms',
}

const routes: Routes = [
    {
        path: PageRoutesEnum.Rooms,
        loadChildren: () =>
            import('./room-list/room-list-page.module').then(
                (m) => m.RoomListPageModule
            ),
        canActivate: [ProfileSetGuard],
    },
    {
        path: PageRoutesEnum.Startup,
        component: StartupComponent,
        canActivate: [ProfileNotSetGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [ProfileSetGuard, ProfileNotSetGuard],
})
export class AppRoutingModule {}
