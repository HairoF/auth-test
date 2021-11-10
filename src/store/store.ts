import { User } from "../models/User";
import LoginError from '../models/LoginError';
import AuthService from "../services/AuthService";
import AboutService from '../services/AboutService';

import { makeAutoObservable } from 'mobx';


export default class Store {
    user = {} as User
    isAuth = false
    loginError: LoginError = {
        error: false,
        message: null
    };
    registerMessage: string = '';

    constructor() {
        makeAutoObservable(this);
        this.setAuth = this.setAuth.bind(this);
        this.logout = this.logout.bind(this);
        this.registration = this.registration.bind(this);
        this.checkAuth = this.checkAuth.bind(this);
        this.setLoginError = this.setLoginError.bind(this);
        this.setRegiserMessage = this.setRegiserMessage.bind(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: User) {
        this.user = user;
    }

    async setLoginError(err: boolean, message: null | string = null) {
        this.loginError = { error: err, message: message }
    }

    setRegiserMessage(message: string) {
        this.registerMessage = message;
    }

    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password)
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                this.setAuth(true)
            }
        } catch (error) {
            console.log(error.response.status);
            if (error?.response?.status === 401) {
                this.setLoginError(true, `${error.response?.data.error}`)
            } else {
                this.setLoginError(true, `Ошибка сервера. Попробуйте позже`)
            }
        }
    }

    async registration(username: string, password: string) {
        try {
            const response = await AuthService.registration(username, password)
            if (response.data.message && response.status === 200) {
                this.setRegiserMessage(response.data.message)
                setTimeout(() => this.setRegiserMessage(''), 3000)
            } else {
                throw new Error('Ошибка при регистрации');
            }
            return this.registerMessage
        } catch (error) {
            console.log(error?.response.status);
            if (error.response?.status === 400) {
                await this.setLoginError(true, `${error.response.data.error}`)
                return null
            } else {
                await this.setLoginError(true, `Ошибка сервера. Попробуйте позже`)
                return null
            }
        }
    }

    async checkAuth() {
        try {
            let response = await AboutService.fetchAbout();
            if (response.data.data) {
                this.setAuth(true);
                this.setUser(response.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async logout() {
        try {
            this.setAuth(false);
            this.setUser({} as User)
            localStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }
    }
}