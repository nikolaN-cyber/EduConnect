import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, of } from 'rxjs';
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
    likePost,
    likePostSuccess,
    likePostFailure
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
        private snackBar: MatSnackBar
    ) {
        this.loadPosts$ = createEffect(() =>
            this.actions$.pipe(
                ofType(loadPosts),
                mergeMap(() =>
                    this.postService.getPosts().pipe(
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
                    this.postService.createPost(action.createPostDto).pipe(
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
                    this.postService.deletePost(action.postId).pipe(
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
                    this.postService.likePost(action.postId).pipe(
                        map((post: Post) => likePostSuccess({ post })),
                        catchError(err => of(likePostFailure({ error: err.message || 'Failed to like post' })))
                    )
                )
            )
        );
    }
}
