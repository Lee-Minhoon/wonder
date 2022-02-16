// import package, library
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// import utilities

// import components

// import etc

export class FormTypeAxiosService {
    static readonly instance: AxiosInstance = axios.create({
        withCredentials: true,
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    static addHeaderToken(token: string): void {
        this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
}

FormTypeAxiosService.instance.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        if (!config.headers.common.Authorization && Cookies.get('token')) {
            const token = Cookies.get('token');
            FormTypeAxiosService.addHeaderToken(token);
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
