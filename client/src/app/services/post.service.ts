import { Injectable } from "@angular/core";
import { CreatePostDto, Post } from "../models/post";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.api}/posts/get-all`);
    }

    createPost(createPostDto: CreatePostDto): Observable<Post> {
        return this.http.post<Post>(`${environment.api}/posts/add`, createPostDto);
    }

    deletePost(postId: string): Observable<void> {
        return this.http.delete<void>(`${environment.api}/posts/delete/${postId}`);
    }

    likePost(postId: string): Observable<Post> {
        return this.http.patch<Post>(`${environment.api}/posts/like/${postId}`, {});
    }
}
