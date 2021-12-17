import Cookies from 'js-cookie';
import { AxiosInstance } from 'axios';
import { AxiosService } from 'service/defaultAxiosService';

export default function login() {
    if (Cookies.get('token')) {
        console.log('있음', Cookies.get('token'));
    }

    if (AxiosService.instance.defaults.headers.common.Authorization) {
        console.log('헤더', AxiosService.instance.defaults.headers.common.Authorization);
    }

    return (
        <>
            <div>test</div>
        </>
    );
}
