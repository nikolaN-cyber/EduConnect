import { Injectable } from "@angular/core";
import { CreateUserDTO, LoginUser, UpdateUserDTO, User } from "../models/user";
import { environment } from "../../environments/environment";
import { getToken } from "../auth/user-context";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() {
     }

    async login(email: string, password: string): Promise<LoginUser> {
        const response = await fetch(`${environment.api}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw { status: response.status, message: data?.message || 'Login failed' };
        }

        return data;
    }

    async register(userDTO: CreateUserDTO): Promise<User> {
        const response = await fetch(`${environment.api}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDTO),
        });

        const data = await response.json();

        if (!response.ok) {
            throw { status: response.status, message: data?.message || 'Register failed' };
        }

        return data;
    }

    async editUserProfile(editDto: UpdateUserDTO, id: string): Promise<User> {
        const token = getToken()
        const response = await fetch(`${environment.api}/users/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(editDto),
        });

        const data = await response.json();

        if (!response.ok) {
            throw { status: response.status, message: data?.message || 'Update failed' };
        }

        return data;
    }
}