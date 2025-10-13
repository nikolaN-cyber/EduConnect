import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Comment } from '../../models/comment';
import * as CommentActions from './comment.actions';

export interface CommentsState extends EntityState<Comment> {
    loading: boolean;
    error: string | null;
}

export const commentAdapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id,
    sortComparer: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
});


export const initialState: CommentsState = commentAdapter.getInitialState({
    loading: false,
    error: null,
});

export const commentReducer = createReducer(
    initialState,

    on(CommentActions.loadComments, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(CommentActions.loadCommentsSuccess, (state, { comments }) => {
        const normalizedComments = comments.map(c => ({
            ...c,
            createdAt: new Date(c.createdAt),
            updatedAt: new Date(c.updatedAt)
        }));
        return commentAdapter.setAll(normalizedComments, { ...state, loading: false });
    }),
    on(CommentActions.loadCommentsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(CommentActions.addCommentSuccess, (state, { comment }) => {
        const normalizedComment = {
            ...comment,
            createdAt: new Date(comment.createdAt),
            updatedAt: new Date(comment.updatedAt)
        };
        return commentAdapter.addOne(normalizedComment, state);
    }),
    on(CommentActions.addCommentFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(CommentActions.editCommentSuccess, (state, { comment }) => {
        const normalizedComment = {
            ...comment,
            createdAt: new Date(comment.createdAt),
            updatedAt: new Date(comment.updatedAt)
        };
        return commentAdapter.updateOne(
            { id: normalizedComment.id, changes: normalizedComment },
            state
        );
    }),
    on(CommentActions.editCommentFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(CommentActions.deleteCommentSuccess, (state, { id }) =>
        commentAdapter.removeOne(id, state)
    ),
    on(CommentActions.deleteCommentFailure, (state, { error }) => ({
        ...state,
        error,
    }))
);
