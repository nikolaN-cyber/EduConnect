import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { CreateUserDTO, LoginUser, UpdateUserDTO, User } from "../models/user";
import { Post } from "../models/post";
import { Comment } from "../models/comment";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<LoginUser> {
        return this.http.post<LoginUser>(`${environment.api}/auth/login`, { email, password });
    }

    register(userDTO: CreateUserDTO): Observable<User> {
        return this.http.post<User>(`${environment.api}/users/register`, userDTO);
    }

    editUserProfile(editDto: UpdateUserDTO, id: string): Observable<User> {
        return this.http.patch<User>(`${environment.api}/users/edit/${id}`, editDto);
    }

    getLikedPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.api}/users/my-liked-posts`);
    }

    getMyComments(): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${environment.api}/users/my-comments`);
    }
}
