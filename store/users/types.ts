export interface InitialState {
  user: User;
  access_token: string;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  balance: number;
}

export interface SetToken {
  access_token: string;
}

export interface SetUser {
  user: User;
}

export type UsersUpdateUserResponse = /** status 200  */ UpdateUserResponse;
export type UsersUpdateUserRequest = {
  updateUser: UpdateUser;
};
export type UpdateUserResponse = {
  id: number;
  phoneNumber: string;
  email: string;
};
export type UpdateUser = {
  phoneNumber?: string;
  email?: string;
};
