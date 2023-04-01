import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Destroyable } from '@shared/lib/destroyable';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserProfileStateFacade } from '@entities/userprofile';

const MIN_NICKNAME_LENGTH = 5;

@Component({
    selector: 'app-set-nickname-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
    ],
    templateUrl: './set-nickname-form.component.html',
    styleUrls: ['./set-nickname-form.component.scss'],
})
export class SetNicknameFormComponent extends Destroyable {
    @Output()
    public readonly nicknameChange = new EventEmitter<void>();

    public readonly nicknameFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_NICKNAME_LENGTH),
    ]);

    constructor(
        private readonly _userProfileStateFacade: UserProfileStateFacade
    ) {
        super();

        _userProfileStateFacade.nicknameSetted$
            .pipe(
                tap(() => this.nicknameChange.emit()),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public getErrorMessage() {
        if (this.nicknameFormControl.hasError('required')) {
            return 'You must enter a value';
        }

        return this.nicknameFormControl.hasError('minlength')
            ? 'Min nickname length is ' + MIN_NICKNAME_LENGTH
            : '';
    }

    public setNickname(): void {
        if (
            this.nicknameFormControl.invalid ||
            !this.nicknameFormControl.value
        ) {
            return;
        }

        this._userProfileStateFacade.setNickname(
            this.nicknameFormControl.value
        );
    }
}
