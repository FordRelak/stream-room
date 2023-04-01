import { Component } from '@angular/core';
import { UserProfileStateFacade } from '@entities/userprofile';

@Component({
    selector: 'app-startup',
    templateUrl: './startup.component.html',
    styleUrls: ['./startup.component.scss'],
})
export class StartupComponent {
    public readonly isLoaded$ = this._userProfileStateFacade.isLoaded$;

    constructor(
        private readonly _userProfileStateFacade: UserProfileStateFacade
    ) {
        _userProfileStateFacade.fetchProfile();
    }

    public routeToRooms(): void {
        console.log('Hell yeee');
    }
}
