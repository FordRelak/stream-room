import { RoomDetailedComponent, RoomListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: ':id',
        component: RoomDetailedComponent,
    },
    {
        path: '',
        component: RoomListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoomListPageRouting {}
