import { ExitRoomGuard } from './guards/exit-room.guard';
import { JoinRoomGuard } from './guards/join-room.guard';
import { RoomComponent } from './components/room/room.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: RoomComponent,
        canActivate: [JoinRoomGuard],
        canDeactivate: [ExitRoomGuard],
    },
];
