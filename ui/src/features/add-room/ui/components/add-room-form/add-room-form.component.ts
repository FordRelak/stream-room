import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomEntityModule, RoomStateFacade } from '@entities/room';

import { AddRoomModel } from '@shared/api/room/models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';

const MIN_ROOM_NAME_LENGTH = 5;

@Component({
    selector: 'app-add-room-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatRippleModule,
        RoomEntityModule,
    ],
    templateUrl: './add-room-form.component.html',
    styleUrls: ['./add-room-form.component.scss'],
})
export class AddRoomFormComponent {
    @Output() public readonly needClose = new EventEmitter<void>();

    public readonly roomNameFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_ROOM_NAME_LENGTH),
    ]);

    constructor(private readonly _roomStateFacade: RoomStateFacade) {}

    public getErrorMessage() {
        if (this.roomNameFormControl.hasError('required')) {
            return 'You must enter a value';
        }

        return this.roomNameFormControl.hasError('minlength')
            ? 'Min room name length is ' + MIN_ROOM_NAME_LENGTH
            : '';
    }

    public createAndJoin(): void {
        if (this.roomNameFormControl.invalid || !this.roomNameFormControl.value) {
            return;
        }

        const newRoomModel: AddRoomModel = {
            name: this.roomNameFormControl.value,
        };

        this._roomStateFacade.createAndJoin(newRoomModel);
    }
}
