import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-add-room-form',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './add-room-form.component.html',
    styleUrls: ['./add-room-form.component.scss'],
})
export class AddRoomFormComponent {}
