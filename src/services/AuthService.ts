import $api from '../http';
import {AxiosResponse} from 'axios';
import {AuthResponse, RegisterResponse} from '../models/AuthResponse';

export default class AuthService {
    static async login(username:string, password: string):Promise<AxiosResponse> {
        return $api.post<AuthResponse>('/login', {username, password})
    }

    static async registration(username:string, password: string):Promise<AxiosResponse> {
        return $api.post<RegisterResponse>('/register', {username, password})
    }
}

