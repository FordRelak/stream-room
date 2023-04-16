import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RoomListComponent } from './components';

const routes: Routes = [
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
