import { IUser } from "../models/IUser";
import LoginError from '../models/LoginError';
import AuthService from "../services/AuthService";
import AboutService from '../services/AboutService';

import {makeAutoObservable} from 'mobx';


export default class Store {
    user = {} as IUser
    isAuth = false

    loginError:LoginError = {
        error: false,
        message: null
    };

    registerMessage:string = '';


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

    setUser(user: IUser) {
        this.user = user;
    }
    setLoginError( err:boolean, message: null|string = null ) {
        this.loginError = { error:err, message:message }
    }
    setRegiserMessage(message:string) {
        this.registerMessage = message;
    }

    async login(username:string, password:string) {
        try {
            const response = await AuthService.login(username, password)

            if(response.data.token) {
                localStorage.setItem('token', response.data.token);
                this.setAuth(true)
            }


        } catch (error) {   
            console.log(error);
            this.setLoginError(true, `${error.response.data.error}`)
            setTimeout(() => this.setLoginError(false), 3000)

        }
    }
    async registration(username:string, password:string) {
        try {
            const response = await AuthService.registration(username, password)

            if(response.data.message) {
                this.setRegiserMessage(response.data.message)
                setTimeout(() => this.setRegiserMessage(''), 2000)
            }
        } catch (error) {
            console.log(error.response?.data?.error);
            this.setLoginError(true, `${error.response.data.error}`)
            setTimeout(() => this.setLoginError(false), 2000)
        }
    }

    async checkAuth() {
        try {
            let response = await AboutService.fetchAbout()
            console.log(response);
            
            if(response.data.data) {
                this.setAuth(true);
                this.setUser(response.data.data)
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async logout() {
        try {
            console.log(this);
            
            this.setAuth(false);
            this.setUser({} as IUser)
            localStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }
    }
}