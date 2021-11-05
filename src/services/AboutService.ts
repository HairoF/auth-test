import $api from '../http';
import {AxiosResponse} from 'axios';
import {AboutResponse} from '../models/AuthResponse';

export default class UserService {
    static async fetchAbout():Promise<AxiosResponse<AboutResponse>> {
        return $api.get<AboutResponse>('/about')
    }

}

