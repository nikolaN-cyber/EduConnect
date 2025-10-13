import { createAction, props } from "@ngrx/store";
import { CreatePostDto, Post } from "../../models/post";

export const loadPosts = createAction('loadPosts');

export const loadPostsSuccess = createAction(
    'loadPostsSuccess',
    props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
    'loadPostsFailure',
    props<{ error: string }>()
)

export const addPost = createAction(
    'addPost',
    props<{ createPostDto: CreatePostDto }>()
)

export const addPostSuccess = createAction(
    'addPostSuccess',
    props<{ post: Post }>()
)

export const addPostFailure = createAction(
    'addPostFailure',
    props<{ error: string }>()
)

export const deletePost = createAction(
    'deletePost',
    props<{ postId: string }>()
)

export const deletePostSuccess = createAction(
    'deletePostSuccess',
    props<{ postId: string }>()
)

export const deletePostFailure = createAction(
    'deletePostFailure',
    props<{ error: string }>()
)

export const likePost = createAction(
    'likePost',
    props<{postId: string}>()
)

export const likePostSuccess = createAction(
    'likePostSuccess',
    props<{ post: Post }>()
);

export const likePostFailure = createAction(
    'likePostFailure',
    props<{ error: string }>()
);

