export interface BaseUser {
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User extends BaseUser {
  _id: string;
}
