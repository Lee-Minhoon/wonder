import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export class AxiosService {
    static readonly instance: AxiosInstance = axios.create({
        withCredentials: true,
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

AxiosService.instance.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        if (!config.headers.common.Authorization && Cookies.get('token')) {
            const token = Cookies.get('token');
            AxiosService.addHeaderToken(token);
            config.headers.common.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// AxiosService.instance.interceptors.response.use(
//     (res: any) => res,
//     async (error) => {
//         const {
//             config,
//             response: { status },
//         } = error;
//         console.log(error);
//         // if (error.response.data.message === 'TokenExpriedError') {
//         // 그럼 요기서 클라이언트가 내가 원래 보냈던 컨피그를 저장해놔
//         //     const originalRequest = config;
//         // 요기서 만료시간이 긴 리프레시 토큰을 꺼내와 얘는 보통 << 좀 길게잡음
//         //     const refreshToken = Cookies.get('refreshToken');
//         // 그리고 리프레시 토큰을 토큰을 갱신하는 에이피아이 를 호출을해
//         // 서버에서는 리프레시 토큰 을 디비에 저장해놨따가 이 리프레시 토큰이 들어오면
//         // 내가 원래 발급해줬던 유저가 누군지 검사하고 다시 토큰을 재발행 해서 보내줘

//         // 좀더 까다롭게 검사하고 싶으면 만료된 토큰도 같이 보내줘도됨

//         //     const { data } = await axios.post('http// ~~~~', { refreshToken });
//         // 요기서 갱신된 토큰과 갱신된 리프레시 토큰을 서버로 부터 받아서 다시 쿠키에 저장함
//         //     const { accessToken: newAccessToken, refreshToken, newRefreshToken } = data;
//         //     Cookies.set('token', newAccessToken);
//         //     Cookies.set('refreshToken', newRefreshToken);
//         // 그리고 오리진 리퀘스트 헤더에 갱신된 토큰을 붙여서 서버에 다시 그 컨피그를 넘김
//         //     return AxiosService.instance(originalRequest);
//         // }
//         // if (error.status === 403) {
//         //     console.log('유효하지 않은 response catch');
//         // }

//         return Promise.reject(error);
//     }
// );
