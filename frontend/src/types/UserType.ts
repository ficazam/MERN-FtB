export type UserType = {
    _id?: string, 
    name?: string,
    email:string,
    password?:string,
    password2?:string,
    token?: string
}

export const emptyUser:UserType = {
    name: '',
    email: '',
    password: '',
    password2:''

}