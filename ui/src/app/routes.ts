import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('../pages/rooms/rooms.module').then(
                (module) => module.RoomsModule
            ),
    },
    {
        path: ':id',
        loadChildren: () =>
            import('../pages/room/room.module').then(
                (module) => module.RoomModule
            ),
    },
];
