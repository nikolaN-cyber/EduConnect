import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer } from './store/user/user.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserEffects } from './store/user/user.effects';
import { postsReducer } from './store/post/post.reducer';
import { PostEffects } from './store/post/post.effects';
import { commentReducer } from './store/comments/comment.reducer';
import { CommentEffects } from './store/comments/comment.effects';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),

    provideStore({
      user: userReducer,
      posts: postsReducer,
      comments: commentReducer
    }),

    provideEffects([UserEffects, PostEffects, CommentEffects]),

    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: false,
      })
    ), provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
};
