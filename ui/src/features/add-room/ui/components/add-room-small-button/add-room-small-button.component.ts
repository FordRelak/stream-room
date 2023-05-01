import { animate, state, style, transition, trigger } from '@angular/animations';

import { AddRoomFormComponent } from '../add-room-form/add-room-form.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UISharedModule } from '@shared/ui';

@Component({
    selector: 'app-add-room-small-button',
    standalone: true,
    imports: [CommonModule, UISharedModule, AddRoomFormComponent],
    templateUrl: './add-room-small-button.component.html',
    styleUrls: ['./add-room-small-button.component.scss'],
    animations: [
        trigger('slideDownAnimation', [
            state('void', style({ height: '0', opacity: '0' })),
            state('*', style({ height: '*', opacity: '1' })),
            transition(':enter', animate('300ms ease-out')),
            transition(':leave', animate('300ms ease-out')),
        ]),
    ],
})
export class AddRoomSmallButtonComponent {
    public isShowForm = false;

    public toggleShowingForm(): void {
        this.isShowForm = !this.isShowForm;
    }
}
