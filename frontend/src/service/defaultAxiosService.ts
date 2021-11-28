import axios, { AxiosInstance } from 'axios';

export class AxiosService {
    static readonly instance: AxiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    static addHeaderToken(token: string): void {
        this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
}
