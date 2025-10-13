import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, take, from, takeUntil } from 'rxjs';
import {
    loadComments,
    loadCommentsSuccess,
    loadCommentsFailure,
    addComment,
    addCommentSuccess,
    addCommentFailure,
    editComment,
    editCommentSuccess,
    editCommentFailure,
    deleteComment,
    deleteCommentSuccess,
    deleteCommentFailure,
} from './comment.actions';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { Store } from '@ngrx/store';
import { selectToken } from '../user/user.selectors';

@Injectable()
export class CommentEffects {

    loadComments$;
    addComment$;
    editComment$;
    deleteComment$;

    constructor(
        private actions$: Actions,
        private commentService: CommentService,
        private store: Store
    ) {

        this.loadComments$ = createEffect(() =>
            this.actions$.pipe(
                ofType(loadComments),
                mergeMap(({ postId, offset = 0, limit = 10 }) =>
                    this.store.select(selectToken).pipe(
                        take(1),
                        mergeMap(token =>
                            from(this.commentService.loadNext10({ postId, offset, limit })).pipe(
                                takeUntil(this.store.select(selectToken).pipe(
                                    map(t => t === null)
                                )),
                                map((comments: Comment[]) => loadCommentsSuccess({ comments, offset })),
                                catchError(err => of(loadCommentsFailure({ error: err.message || 'Failed to load comments', offset })))
                            )
                        )
                    )
                )
            )
        );

        this.addComment$ = createEffect(() =>
            this.actions$.pipe(
                ofType(addComment),
                mergeMap(action =>
                    this.commentService.addComment(action.createCommentDto).pipe(
                        map((comment: Comment) => addCommentSuccess({ comment })),
                        catchError(err => of(addCommentFailure({ error: err.message || 'Failed to add comment' })))
                    )
                )
            )
        );

        this.editComment$ = createEffect(() =>
            this.actions$.pipe(
                ofType(editComment),
                mergeMap(action =>
                    this.commentService.editComment(action.id, action.updateCommentDto).pipe(
                        map((comment: Comment) => editCommentSuccess({ comment })),
                        catchError(err => of(editCommentFailure({ error: err.message || 'Failed to edit comment' })))
                    )
                )
            )
        );

        this.deleteComment$ = createEffect(() =>
            this.actions$.pipe(
                ofType(deleteComment),
                mergeMap(action =>
                    this.commentService.deleteComment(action.id).pipe(
                        map(() => deleteCommentSuccess({ id: action.id })),
                        catchError(err => of(deleteCommentFailure({ error: err.message || 'Failed to delete comment' })))
                    )
                )
            )
        );
    }
}
