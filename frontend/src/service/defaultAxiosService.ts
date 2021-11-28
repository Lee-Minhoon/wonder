import axios, { AxiosInstance } from 'axios';

export class AxiosService {
    static readonly instance: AxiosInstance = axios.create({
        baseURL: '자바 스프링 주소',
        timeout: 10000, // 10 s
        headers: {
            'Content-Type': 'application/json',
        },
    });

    static addHeaderToken(token: string): void {
        this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
}
