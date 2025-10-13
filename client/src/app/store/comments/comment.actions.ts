import { createAction, props } from '@ngrx/store';
import { Comment, CreateCommentDto, UpdateCommentDto } from '../../models/comment';

export const loadComments = createAction(
    'loadComments',
    props<{ postId: string; offset?: number; limit?: number }>()
);

export const loadCommentsSuccess = createAction(
    'loadCommentsSuccess',
    props<{ comments: Comment[] }>()
);

export const loadCommentsFailure = createAction(
    'loadCommentsFailure',
    props<{ error: string }>()
);

export const addComment = createAction(
    'addComment',
    props<{ createCommentDto: CreateCommentDto }>()
);

export const addCommentSuccess = createAction(
    'addCommentSuccess',
    props<{ comment: Comment }>()
);

export const addCommentFailure = createAction(
    'addCommentFailure',
    props<{ error: string }>()
);

export const editComment = createAction(
    'editComment',
    props<{ id: string; updateCommentDto: UpdateCommentDto }>()
);

export const editCommentSuccess = createAction(
    'editCommentSuccess',
    props<{ comment: Comment }>()
);

export const editCommentFailure = createAction(
    'editCommentFailure',
    props<{ error: string }>()
);

export const deleteComment = createAction(
    'deleteComment',
    props<{ id: string }>()
);

export const deleteCommentSuccess = createAction(
    'deleteCommentSuccess',
    props<{ id: string }>()
);

export const deleteCommentFailure = createAction(
    'deleteCommentFailure',
    props<{ error: string }>()
);
