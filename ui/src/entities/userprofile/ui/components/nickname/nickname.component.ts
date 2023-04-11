import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UserProfileStateFacade } from '@entities/userprofile/model';

@Component({
    selector: 'app-nickname',
    templateUrl: './nickname.component.html',
    styleUrls: ['./nickname.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NicknameComponent {
    public readonly nickname$ = this._userProfileStateFacade.nickname$;

    constructor(private readonly _userProfileStateFacade: UserProfileStateFacade) {}
}
