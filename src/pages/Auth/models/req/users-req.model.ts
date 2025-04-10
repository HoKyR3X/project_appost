import { User } from "../index";

export interface EditUserReq {
    userId: number;
    data: Omit<User, 'id'>;
}