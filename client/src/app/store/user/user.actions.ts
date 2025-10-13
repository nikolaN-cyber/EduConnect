import { createAction, props } from '@ngrx/store';
import { CreateUserDTO, LoginUser, UpdateUserDTO, User } from '../../models/user';

export const loginUser = createAction(
    'loginUser',
    props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
    'loginSuccess',
    props<{ data: LoginUser }>()
);

export const loginFailure = createAction(
    'loginFailure',
    props<{ error: string }>()
);

export const logoutUser = createAction('logout');

export const editUser = createAction(
    'editUser',
    props<{userId: string; editUser: UpdateUserDTO}>()
)

export const editUserFailure = createAction(
    'editUserFailure',
    props<{error: string}>(),
)

export const editUserSuccess = createAction(
    'editUserSuccess',
    props<{user: User}>()
)