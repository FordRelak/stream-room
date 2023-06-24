import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloError } from '@apollo/client/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserProfileStateFacade } from '@entities/userprofile';

@Injectable()
export class GraphQLErrorHandler implements ErrorHandler {
    constructor(
        private readonly _userProfileStateFacade: UserProfileStateFacade,
        private readonly _router: Router
    ) {}

    handleError(error: any): void {
        if (error instanceof ApolloError) {
            this._handleApolloError(error);
        }
    }

    private _handleApolloError(error: ApolloError): void {
        const { networkError } = error;

        if (this._isHttpErrorResponse(networkError)) {
            if (networkError.status === 401) {
                this._handleUnauthorizedError();
            }

            return;
        }

        console.error('Unknown type of error:', typeof networkError);
    }

    private _handleUnauthorizedError(): void {
        this._userProfileStateFacade.clear();
        this._router.navigateByUrl('/');
    }

    private _isHttpErrorResponse(error: any): error is HttpErrorResponse {
        return error !== undefined && error.status !== undefined;
    }
}
