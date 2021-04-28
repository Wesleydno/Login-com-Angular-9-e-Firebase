export interface User {
  uid: string;
  email: string;
  name?: string;
  photo?: string;
  emailVerified?: boolean;
  authorized: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}
