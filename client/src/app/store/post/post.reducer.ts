import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../../models/post';
import { addPostSuccess, deletePostSuccess, likePostSuccess, loadPosts, loadPostsFailure, loadPostsSuccess } from './post.actions';
import { createReducer, on } from '@ngrx/store';

export interface PostsState extends EntityState<Post> {
    loading: boolean;
    error: string | null;
}

export const adapter = createEntityAdapter<Post>();

export const initialState: PostsState = adapter.getInitialState({
    loading: false,
    error: null
});

export const postsReducer = createReducer(
    initialState,

    on(loadPosts, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(loadPostsSuccess, (state, { posts }) =>
        adapter.setAll(posts, { ...state, loading: false })
    ),

    on(loadPostsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(addPostSuccess, (state, { post }) =>
        adapter.addOne(post, state)
    ),

    on(deletePostSuccess, (state, { postId }) =>
        adapter.removeOne(postId, state)
    ),

    on(likePostSuccess, (state, { post }) =>
        adapter.updateOne({ id: post.id, changes: post }, state)
    )
);
