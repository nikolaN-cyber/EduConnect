import { Injectable } from "@angular/core";
import { Comment, CreateCommentDto, GetCommentsDto, UpdateCommentDto } from "../models/comment";
import { getToken } from "../auth/user-context";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor() { }

    async addComment(comment: CreateCommentDto): Promise<Comment> {
        const token = getToken()
        const response = await fetch(`${environment.api}/comments/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(comment)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.message || 'Adding comment failed');
        return data;
    }

    async editComment(commentId: string, editDto: UpdateCommentDto): Promise<Comment> {
        const token = getToken()
        const response = await fetch(`${environment.api}/comments/edit/${commentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(editDto)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.message || 'Editing comment failed');
        return data;
    }

    async deleteComment(commentId: string): Promise<void> {
        const token = getToken()
        const response = await fetch(`${environment.api}/comments/delete/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data?.message || 'Delete comment failed.')
        }
    }
    async loadNext10(nextComments: GetCommentsDto): Promise<Comment[]> {
        const token = getToken()
        const query = new URLSearchParams({
            postId: nextComments.postId,
            offset: String(nextComments.offset ?? 0),
            limit: String(nextComments.limit ?? 10)
        }).toString();
        const response = await fetch(`${environment.api}/comments/load-next-10?${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.message || 'Loading comments failed');
        return data;
    }
}