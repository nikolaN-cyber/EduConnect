import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    loadPosts,
    loadPostsFailure,
    loadPostsSuccess,
    addPost,
    addPostSuccess,
    addPostFailure,
    deletePost,
    deletePostSuccess,
    deletePostFailure,
    likePostSuccess,
    likePostFailure,
    likePost
} from './post.actions';
import { Post } from '../../models/post';

@Injectable()
export class PostEffects {

    loadPosts$;
    addPost$;
    deletePost$;
    likePost$;

    constructor(
        private actions$: Actions,
        private postService: PostService,
    ) {
        this.loadPosts$ = createEffect(() =>
            this.actions$.pipe(
                ofType(loadPosts),
                mergeMap(() =>
                    from(this.postService.getPosts()).pipe(
                        map((posts: Post[]) => loadPostsSuccess({ posts })),
                        catchError(err => of(loadPostsFailure({ error: err.message || 'Server error' })))
                    )
                )
            )
        );

        this.addPost$ = createEffect(() =>
            this.actions$.pipe(
                ofType(addPost),
                mergeMap(action =>
                    from(this.postService.createPost(action.createPostDto)).pipe(
                        map((post: Post) => addPostSuccess({ post })),
                        catchError(err => of(addPostFailure({ error: err.message || 'Failed to add post' })))
                    )
                )
            )
        );

        this.deletePost$ = createEffect(() =>
            this.actions$.pipe(
                ofType(deletePost),
                mergeMap(action =>
                    from(this.postService.deletePost(action.postId)).pipe(
                        map(() => deletePostSuccess({ postId: action.postId })),
                        catchError(err => of(deletePostFailure({ error: err.message || 'Failed to delete post' })))
                    )
                )
            )
        );

        this.likePost$ = createEffect(() =>
            this.actions$.pipe(
                ofType(likePost),
                mergeMap(action =>
                    from(this.postService.likePost(action.postId)).pipe(
                        map((post: Post) => likePostSuccess({ post })),
                        catchError(err => of(likePostFailure({ error: err.message || 'Failed to like post' })))
                    )
                )
            )
        );
    }
}
