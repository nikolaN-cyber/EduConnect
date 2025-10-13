import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { isTokenValid } from '../auth/user-context';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        const requiresAuth = route.data['requiresAuth'] ?? false;
        const redirectIfLoggedIn = route.data['redirectIfLoggedIn'] ?? false;

        if (requiresAuth && !isTokenValid()) {
            return this.router.createUrlTree(['/']);
        }

        if (redirectIfLoggedIn && isTokenValid()) {
            return this.router.createUrlTree(['/home']);
        }

        return true;
    }
}
