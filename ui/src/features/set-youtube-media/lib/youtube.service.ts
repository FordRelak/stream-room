import { Inject, Injectable } from '@angular/core';
import { YOUTUBE_REGEX } from '../youtube-regex.token';

@Injectable()
export class YoutubeService {
    constructor(@Inject(YOUTUBE_REGEX) private readonly _regex: RegExp) {}

    extractVideoId(url: string): string | undefined {
        const match = url.match(this._regex);

        if (match && match[1]) {
            return match[1];
        }

        return undefined;
    }
}
