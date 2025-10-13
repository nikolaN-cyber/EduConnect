import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PostsComponent } from './components/posts/posts.component';
import { RegisterComponent } from './components/register/register.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: MyProfileComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'my-posts', component: MyPostsComponent },
];
