import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { StartupComponent } from './startup';

enum PageRoutesEnum {
    Rooms = 'rooms',
}

const routes: Routes = [
    {
        path: PageRoutesEnum.Rooms,
        loadChildren: () =>
            import('./room-list/room-list-page.module').then(
                (m) => m.RoomListPageModule
            ),
    },
    {
        path: '',
        component: StartupComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
