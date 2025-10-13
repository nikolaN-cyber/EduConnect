import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import {
    loginUser,
    loginSuccess,
    loginFailure,
    logoutUser,
    editUser,
    editUserSuccess,
    editUserFailure
} from './user.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { setUser, setToken } from '../../auth/user-context';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserEffects {
    login$;
    logout$;
    loginError$;
    loginSuccess$;
    editUser$;

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.login$ = createEffect(() =>
            this.actions$.pipe(
                ofType(loginUser),
                mergeMap(action =>
                    this.userService.login(action.email, action.password).pipe(
                        map(data => {
                            const cleanedToken = data.access_token.replace(/^"|"$/g, '');
                            setUser(data.user);
                            setToken(cleanedToken);
                            return loginSuccess({ data });
                        }),
                        catchError(err => {
                            setUser(null);
                            setToken(null);
                            const message = err.status === 401 ? 'Invalid email or password' : 'Server error';
                            return of(loginFailure({ error: message }));
                        })
                    )
                )
            )
        );
        this.loginSuccess$ = createEffect(
            () =>
                this.actions$.pipe(
                    ofType(loginSuccess),
                    tap(() => this.router.navigate(['/home']))
                ),
            { dispatch: false }
        );
        this.logout$ = createEffect(
            () =>
                this.actions$.pipe(
                    ofType(logoutUser),
                    tap(() => {
                        setUser(null);
                        setToken(null);
                        this.router.navigate(['/']);
                    })
                ),
            { dispatch: false }
        );
        this.loginError$ = createEffect(
            () =>
                this.actions$.pipe(
                    ofType(loginFailure),
                    tap(({ error }) => this.snackBar.open(error, 'Close', { duration: 3000 }))
                ),
            { dispatch: false }
        );
        this.editUser$ = createEffect(() =>
            this.actions$.pipe(
                ofType(editUser),
                mergeMap(action =>
                    this.userService.editUserProfile(action.editUser, action.userId).pipe(
                        map(updatedUser => editUserSuccess({ user: updatedUser })),
                        tap(() => this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 })),
                        catchError(err => {
                            const message = err.status === 400 ? err.message || err.error?.message : 'Server error';
                            this.snackBar.open(message, 'Close', { duration: 3000 });
                            return of(editUserFailure({ error: message }));
                        })
                    )
                )
            )
        );
    }
}
