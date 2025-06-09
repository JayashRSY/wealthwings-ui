export interface ILoginResponse {
    success: boolean
    message: string
    accessToken: string;
    user: IUser
}

export interface IRegisterResponse {
    success: boolean
    message: string
}

export interface IRefreshToken {
    success: boolean
    message: string
    accessToken: string;
}

export interface IGoogleResponse {
    success: boolean
    message: string
    accessToken: string;
    user: IUser
}

export interface ILogoutResponse {
    success: boolean
    message: string
}

export interface IUser {
    _id: string;
    name?: string;
    email: string;
    profilePicture?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}
