export interface LoginForm {
    email: string
    passwor: string
}

export interface RegisterForm extends LoginForm {
    rePassword: string
}
export interface IUserApi {
    me: () => Promise<any>
    login: (params: LoginForm) => Promise<any>
    logout: () => Promise<any>
    register: (params: RegisterForm) => Promise<any>
}