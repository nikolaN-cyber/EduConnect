import { Injectable } from "@angular/core";
import { Comment, CreateCommentDto, GetCommentsDto, UpdateCommentDto } from "../models/comment";
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient) { }

    addComment(comment: CreateCommentDto): Observable<Comment> {
        return this.http.post<Comment>(`${environment.api}/comments/create`, comment);
    }

    editComment(commentId: string, editDto: UpdateCommentDto): Observable<Comment> {
        return this.http.patch<Comment>(`${environment.api}/comments/edit/${commentId}`, editDto);
    }

    deleteComment(commentId: string): Observable<void> {
        return this.http.delete<void>(`${environment.api}/comments/delete/${commentId}`);
    }

    loadNext10(nextComments: GetCommentsDto): Observable<Comment[]> {
        let params = new HttpParams()
            .set('postId', nextComments.postId)
            .set('offset', String(nextComments.offset ?? 0))
            .set('limit', String(nextComments.limit ?? 10));

        return this.http.get<Comment[]>(`${environment.api}/comments/load-next-10`, { params });
    }
}
