import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { getToken } from '../auth/user-context';
import { Store } from '@ngrx/store';
import { UserState } from '../store/user/user.reducer';
import { logoutUser } from '../store/user/user.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private store: Store<UserState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = getToken();
        let authReq = req;

        if (token) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    const ok = window.confirm('Your session has expired! Please log in again.');
                    if (ok) {
                        this.store.dispatch(logoutUser());
                        this.router.navigate(['/']);
                    }
                }
                return throwError(() => error);
            })
        );
    }
}
