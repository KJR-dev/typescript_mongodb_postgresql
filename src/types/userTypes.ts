import { Request } from 'express';

//User type
export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface RegisterUserRequest extends Request {
    body: UserData;
}

//User register response data type
export interface userRegisterResponseData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

