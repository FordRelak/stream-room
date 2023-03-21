import { StateToken } from '@ngxs/store';
import { UserProfileStateModel } from './userprofile-state.model';

export const USER_PROFILE_STATE_TOKEN = new StateToken<UserProfileStateModel>(
    'user_profile'
);
