import $api from '../http';
import { AxiosResponse } from 'axios';
import AuthResponse from '../models/AuthResponse';
import RegisterResponse from '../models/RegisterResponse';

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { username, password })
    }

    static async registration(username: string, password: string): Promise<AxiosResponse<RegisterResponse>> {
        return $api.post<RegisterResponse>('/register', { username, password })
    }
}

