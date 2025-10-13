import { createFeatureSelector, createSelector } from '@ngrx/store';
import { commentAdapter, CommentsState } from './comment.reducer';

export const selectCommentState = createFeatureSelector<CommentsState>('comments');

const { selectAll } = commentAdapter.getSelectors();

export const selectAllComments = createSelector(
    selectCommentState,
    selectAll
);

export const selectCommentsLoading = createSelector(
    selectCommentState,
    state => state.loading
);

export const selectCommentsError = createSelector(
    selectCommentState,
    state => state.error
);
