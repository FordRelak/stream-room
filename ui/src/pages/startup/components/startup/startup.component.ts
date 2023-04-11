import { Component } from '@angular/core';
import { PageRoutesEnum } from '@pages/app-routing.module';
import { Router } from '@angular/router';
import { UserProfileStateFacade } from '@entities/userprofile';

@Component({
    selector: 'app-startup',
    templateUrl: './startup.component.html',
    styleUrls: ['./startup.component.scss'],
})
export class StartupComponent {
    public readonly isLoaded$ = this._userProfileStateFacade.isLoaded$;

    constructor(private readonly _userProfileStateFacade: UserProfileStateFacade, private readonly _router: Router) {
        _userProfileStateFacade.fetchProfile();
    }

    public routeToRooms(): void {
        this._router.navigateByUrl(PageRoutesEnum.Rooms);
    }
}
