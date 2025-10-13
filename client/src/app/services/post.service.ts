import { Injectable } from "@angular/core";
import { CreatePostDto, Post } from "../models/post";
import { environment } from "../../environments/environment";
import { getToken } from "../auth/user-context";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor() {
    }

    async getPosts(): Promise<Post[]> {
        const token = getToken()
        const response = await fetch(`${environment.api}/posts/get-all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json()

        if (!response.ok) {
            throw { status: response.status, message: data?.message || 'Failed to fetch posts' };
        }

        return data;
    }

    async createPost(createPostDto: CreatePostDto): Promise<Post> {
        const token = getToken()
        const response = await fetch(`${environment.api}/posts/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(createPostDto)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.message || 'Create post failed');
        return data;
    }

    async deletePost(postId: string): Promise<void> {
        const token = getToken()
        const response = await fetch(`${environment.api}/posts/delete/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data?.message || 'Delete post failed.')
        }
    }

    async likePost(postId: string): Promise<Post> {
        const token = getToken()
        const response = await fetch(`${environment.api}/posts/like/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data?.message || 'Failed to like post');
        return data;
    }
}