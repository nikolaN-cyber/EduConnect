import { getUser, getToken } from "../../auth/user-context";
import { User } from "../../models/user";
import { createReducer, on } from "@ngrx/store";
import {
    loginUser,
    loginSuccess,
    loginFailure,
    logoutUser,
    editUserFailure,
    editUserSuccess
} from "./user.actions";

export interface UserState {
    user: User | null;
    access_token: string | null;
    error: string | null;
    loading: boolean;
}

export const initialUserState: UserState = {
    user: getUser(),
    access_token: getToken(),
    error: null,
    loading: false,
};

export const userReducer = createReducer(
    initialUserState,

    on(loginUser, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(loginSuccess, (state, { data }) => ({
        ...state,
        user: data.user,
        access_token: data.access_token,
        loading: false,
        error: null
    })),

    on(loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    })),

    on(logoutUser, state => ({
        ...state,
        user: null,
        access_token: null,
        loading: false
    })),
    on(editUserSuccess, (state, { user }) => ({
        ...state,
        user: user,
        loading: false,
        error: null
    })),
    on(editUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
