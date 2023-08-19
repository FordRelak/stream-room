import { RoomDetailedComponent, RoomListComponent } from './components';

import { AddRoomSmallButtonComponent } from '@features/add-room';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoomEntityModule } from '@entities/room';
import { RoomListPageRouting } from './rooms-page-routing.module';
import { UISharedModule } from '@shared/ui';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SetYoutubeMediaModule, YOUTUBE_REGEX } from '@features/set-youtube-media';
import { EnvironmentService } from '@shared/lib';

@NgModule({
    declarations: [RoomListComponent, RoomDetailedComponent],
    imports: [
        CommonModule,
        RoomEntityModule,
        UISharedModule,
        RoomListPageRouting,
        AddRoomSmallButtonComponent,
        YouTubePlayerModule,
        SetYoutubeMediaModule,
    ],
    providers: [
        {
            provide: YOUTUBE_REGEX,
            deps: [EnvironmentService],
            useFactory: (environmentService: EnvironmentService) =>
                environmentService.get<string | RegExp>('youtubeRegex'),
        },
    ],
})
export class RoomListPageModule {}
