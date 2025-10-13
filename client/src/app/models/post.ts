import { User } from "./user";
import { Comment } from "./comment";

export interface PostContent {
    text?: string;
    imageUrl?: string;
}

export interface Post {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    likes: number;
    content?: PostContent;
    comments: Comment[];
    user: User;
    usersLiked: User[];
}

export interface CreatePostDto {
    title: string;
    content: PostContent;
}