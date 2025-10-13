import { Post } from "./post";
import { User } from "./user";

export interface Comment {
    id: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    post: Post;
}

export interface CreateCommentDto {
    postId: string;
    text: string;
}

export interface UpdateCommentDto {
    text: string;
}

export interface GetCommentsDto {
    postId: string;
    offset?: number;
    limit?: number;
}