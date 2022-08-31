import { UserType } from "./UserType";

export type AuthType = {
    user: UserType | null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message:string | any
}

export const initAuth = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}