import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
    selectUserState,
    (state) => state.user
);

export const selectToken = createSelector(
    selectUserState,
    (state) => state.access_token
);

export const selectAuthError = createSelector(
    selectUserState,
    (state) => state.error
);

export const selectAuthLoading = createSelector(
    selectUserState,
    (state) => state.loading
);

export const selectIsLoggedIn = createSelector(
  selectToken,
  (token) => !!token
);
