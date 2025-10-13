import { Roles } from "../enums/user.roles";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  country: string;
  city: string;
  address: string;
  phoneNumber: string;
  role: Roles;
  createdAt: Date;
}

export interface LoginUser {
  user: User;
  access_token: string;
}

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  city: string;
  address: string;
  phoneNumber: string;
}

export interface UpdateUserDTO {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  phoneNumber: string;
}
