import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
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

@Injectable()
export class CommentEffects {

    loadComments$;
    addComment$;
    editComment$;
    deleteComment$;

    constructor(
        private actions$: Actions,
        private commentService: CommentService
    ) {

        this.loadComments$ = createEffect(() =>
            this.actions$.pipe(
                ofType(loadComments),
                mergeMap(action =>
                    from(this.commentService.loadNext10({
                        postId: action.postId,
                        offset: action.offset,
                        limit: action.limit
                    })).pipe(
                        map((comments: Comment[]) => loadCommentsSuccess({ comments })),
                        catchError(err => of(loadCommentsFailure({ error: err.message || 'Failed to load comments' })))
                    )
                )
            )
        );

        this.addComment$ = createEffect(() =>
            this.actions$.pipe(
                ofType(addComment),
                mergeMap(action =>
                    from(this.commentService.addComment(action.createCommentDto)).pipe(
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
                    from(this.commentService.editComment(action.id, action.updateCommentDto)).pipe(
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
                    from(this.commentService.deleteComment(action.id)).pipe(
                        map(() => deleteCommentSuccess({ id: action.id })),
                        catchError(err => of(deleteCommentFailure({ error: err.message || 'Failed to delete comment' })))
                    )
                )
            )
        );
    }
}
