import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

const MIN_NICKNAME_LENGTH = 5;

@Component({
    selector: 'app-set-nickname-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
    ],
    templateUrl: './set-nickname-form.component.html',
    styleUrls: ['./set-nickname-form.component.scss'],
})
export class SetNicknameFormComponent {
    public readonly nicknameFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_NICKNAME_LENGTH),
    ]);

    public getErrorMessage() {
        if (this.nicknameFormControl.hasError('required')) {
            return 'You must enter a value';
        }

        return this.nicknameFormControl.hasError('minLength')
            ? 'Min nickname lengis is' + MIN_NICKNAME_LENGTH
            : '';
    }
}
