import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, PostsState } from './post.reducer';

export const selectPostState = createFeatureSelector<PostsState>('posts');

const { selectAll } = adapter.getSelectors();

export const selectAllPosts = createSelector(
    selectPostState,
    selectAll
);

export const selectPostsLoading = createSelector(
    selectPostState,
    state => state.loading
);

export const selectPostsError = createSelector(
    selectPostState,
    state => state.error
);
