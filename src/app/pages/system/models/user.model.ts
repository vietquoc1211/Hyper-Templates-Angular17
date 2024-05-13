import { GeneralColumns } from "../../../shared/models";

export interface UserType extends GeneralColumns{
    id: number;
    username: string;
    fullname: string;
    phone: string;
    email: string;
    address: string;
    refreshToken: string;
}