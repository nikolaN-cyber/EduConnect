import { User } from "../models/user";

export const setUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

export const getUser = (): User | null => {
  const user = localStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

export const setToken = (token: string | null) => {
  if (token === null) {
    localStorage.removeItem('token');
  } else {
    localStorage.setItem('token', JSON.stringify(token));
  }
};

export const getToken = (): string | null => {
  const token = localStorage.getItem('token');

  if (token) {
    return JSON.parse(token);
  }
  return null;
};

export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp > now;
  } catch (e) {
    return false;
  }
};