import { IUser } from "../models/IUser"
import {makeAutoObservable, toJS} from 'mobx';
import AuthService from "../services/AuthService";
import AboutService from '../services/AboutService';

export default class Store {
    user = {} as IUser
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login(username:string, password:string) {
        try {
            const response = await AuthService.login(username, password)
            console.log(response);
            localStorage.setItem('token', response.data.token);
            this.setAuth(true)
        } catch (error) {
            console.log(error.response?.data?.error);
            
        }
    }
    async registration(username:string, password:string) {
        try {
            const response = await AuthService.registration(username, password)
            console.log(response);
            // localStorage.setItem('token', response.data.token);
            // this.setAuth(true)
            console.log(response.data.message);
        } catch (error) {
            console.log(error.response?.data?.error);
            
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
}