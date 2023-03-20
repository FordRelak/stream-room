import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RoomListComponent } from './room-list';

enum PageRoutesEnum {
    Rooms = 'rooms',
}

const routes: Routes = [
    {
        path: PageRoutesEnum.Rooms,
        component: RoomListComponent,
    },
    {
        path: '',
        redirectTo: PageRoutesEnum.Rooms,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
