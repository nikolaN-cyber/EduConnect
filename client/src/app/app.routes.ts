import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PostsComponent } from './components/posts/posts.component';
import { AuthGuard } from './auth/auth-guard';
import { MyEngagementComponent } from './components/my-engagement/my-engagement.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [AuthGuard],
        data: { redirectIfLoggedIn: true }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard],
        data: { redirectIfLoggedIn: true }
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { requiresAuth: true }
    },
    {
        path: 'profile',
        component: MyProfileComponent,
        canActivate: [AuthGuard],
        data: { requiresAuth: true }
    },
    {
        path: 'posts',
        component: PostsComponent,
        canActivate: [AuthGuard],
        data: { requiresAuth: true }
    },
    {
        path: 'my-engagement',
        component: MyEngagementComponent,
        canActivate: [AuthGuard],
        data: { requiresAuth: true }
    },

    { path: '**', redirectTo: '' }
];
