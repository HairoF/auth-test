import {IUser} from './IUser';

interface AuthResponse {
    error: string | null,
    token: string
}
interface AboutResponse {
    data?: IUser
    error?: string
}

interface RegisterResponse {
    message?: string
    error?: string
}
export {AuthResponse, AboutResponse, RegisterResponse}
